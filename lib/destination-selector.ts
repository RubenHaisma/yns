import { prisma } from '@/lib/prisma';
import { getFlightPrices, getSpecificFlightPrice } from '@/lib/aviasales';

interface DestinationSuggestion {
  id: string;
  name: string;
  city: string;
  country: string;
  league: string;
  stadium: string;
  airport: string;
  flightPrice?: number;
  currency?: string;
  reason: string;
  score: number;
  isRandomPick?: boolean;
}

export async function suggestDestinations(
  bookingId: string,
  packageType: string,
  departDate: string,
  travelers: number,
  preferences: any = {}
): Promise<DestinationSuggestion[]> {
  try {
    console.log('[suggestDestinations] Starting suggestion process for booking:', bookingId);

    // Get all active destinations with airport codes from database
    const destinations = await prisma.destination.findMany({
      where: { 
        isActive: true,
        airport: {
          not: null,
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log('[suggestDestinations] Found', destinations.length, 'active destinations with airports');

    const suggestions: DestinationSuggestion[] = [];
    const includesFlight = packageType === 'comfort' || packageType === 'premium';

    // Calculate return date (2 days later for weekend trips)
    const departDateObj = new Date(departDate);
    const returnDateObj = new Date(departDateObj);
    returnDateObj.setDate(returnDateObj.getDate() + 2);
    const returnDate = returnDateObj.toISOString().split('T')[0];

    if (includesFlight) {
      console.log('[suggestDestinations] Package includes flight, checking prices...');
      
      // Get airport codes from database (filter out invalid ones)
      const validDestinations = destinations.filter((dest: any) =>   
        dest.airport && 
        dest.airport.length >= 3 && 
        dest.airport.length <= 4 && 
        /^[A-Z]+$/.test(dest.airport)
      );

      const airportCodes = validDestinations.map((dest: any) => dest.airport!);

      console.log('[suggestDestinations] Checking flight prices for airports:', airportCodes);

      // Get flight prices for all destinations
      const flightPrices = await getFlightPrices(airportCodes, departDate, returnDate, travelers);

      console.log('[suggestDestinations] Got', flightPrices.length, 'flight prices');

      // Match flight prices with destinations
      for (const destination of validDestinations) {
        const flightPrice = flightPrices.find(fp => fp.destination === destination.airport);
        
        let score = 50; // Base score
        let reason = 'Available destination';

        // Scoring logic
        if (flightPrice) {
          // Lower price = higher score (max 50 points for price)
          const priceScore = Math.max(0, 50 - (flightPrice.price / 10));
          score += priceScore;
          reason = `Flight available for €${flightPrice.price} per person from ${flightPrice.origin}`;
        } else {
          score -= 20; // Penalty for no flight data
          reason = 'No flight data available';
        }

        // Preference-based scoring
        if (preferences.hatedTeams?.includes(destination.name)) {
          score -= 50;
          reason += ' (customer dislikes this team)';
        }

        if (preferences.visitedCities?.includes(destination.city)) {
          score -= 30;
          reason += ' (customer has visited this city)';
        }

        // League preference scoring
        const popularLeagues = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Champions League'];
        if (popularLeagues.includes(destination.league)) {
          score += 20;
        }

        // Country diversity bonus
        const europeanCountries = ['England', 'Spain', 'Germany', 'Italy', 'France'];
        if (europeanCountries.includes(destination.country)) {
          score += 10;
        }

        suggestions.push({
          id: destination.id,
          name: destination.name,
          city: destination.city,
          country: destination.country,
          league: destination.league,
          stadium: destination.stadium || `${destination.name} Stadium`,
          airport: destination.airport || '',
          flightPrice: flightPrice?.price,
          currency: flightPrice?.currency || 'EUR',
          reason,
          score
        });
      }

      // Sort by score (highest first) and price (lowest first for same score)
      suggestions.sort((a, b) => {
        if (Math.abs(a.score - b.score) < 5) {
          // If scores are close, prefer cheaper flights
          const priceA = a.flightPrice || 999999;
          const priceB = b.flightPrice || 999999;
          return priceA - priceB;
        }
        return b.score - a.score;
      });

    } else {
      console.log('[suggestDestinations] Basic package, no flight required');
      
      // For basic package, suggest based on preferences only
      for (const destination of destinations) {
        let score = 50;
        let reason = 'Match ticket only';

        // Preference-based scoring
        if (preferences.hatedTeams?.includes(destination.name)) {
          score -= 50;
          reason += ' (customer dislikes this team)';
        }

        if (preferences.visitedCities?.includes(destination.city)) {
          score -= 30;
          reason += ' (customer has visited this city)';
        }

        // League preference scoring
        const popularLeagues = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A'];
        if (popularLeagues.includes(destination.league)) {
          score += 20;
        }

        suggestions.push({
          id: destination.id,
          name: destination.name,
          city: destination.city,
          country: destination.country,
          league: destination.league,
          stadium: destination.stadium || `${destination.name} Stadium`,
          airport: destination.airport || '',
          reason,
          score
        });
      }

      suggestions.sort((a, b) => b.score - a.score);
    }

    // Store suggestions in database
    await storeDestinationSuggestions(bookingId, suggestions.slice(0, 10));

    console.log('[suggestDestinations] Generated', suggestions.length, 'suggestions');
    return suggestions.slice(0, 10); // Return top 10 suggestions

  } catch (error) {
    console.error('[suggestDestinations] Error:', error);
    throw error;
  }
}

async function storeDestinationSuggestions(bookingId: string, suggestions: DestinationSuggestion[]) {
  try {
    // Clear existing suggestions
    await prisma.destinationSuggestion.deleteMany({
      where: { bookingId }
    });

    // Store new suggestions
    const suggestionData = suggestions.map((suggestion, index) => ({
      bookingId,
      destinationId: suggestion.id,
      flightPrice: suggestion.flightPrice || null,
      currency: suggestion.currency || 'EUR',
      reason: suggestion.reason,
      adminNotes: `Score: ${suggestion.score}, Rank: ${index + 1}`
    }));

    await prisma.destinationSuggestion.createMany({
      data: suggestionData
    });

    console.log('[storeDestinationSuggestions] Stored', suggestionData.length, 'suggestions');
  } catch (error) {
    console.error('[storeDestinationSuggestions] Error:', error);
  }
}

export async function selectDestinationForBooking(
  bookingId: string, 
  destinationId: string, 
  adminNotes?: string
): Promise<boolean> {
  try {
    // Get destination details
    const destination = await prisma.destination.findUnique({
      where: { id: destinationId }
    });

    if (!destination) {
      throw new Error('Destination not found');
    }

    // Update booking with selected destination
    await prisma.booking.update({
      where: { bookingId },
      data: {
        destination: `${destination.stadium}, ${destination.city}`,
        selectedDestinationId: destinationId,
        revealedAt: new Date()
      }
    });

    // Mark the suggestion as selected
    await prisma.destinationSuggestion.updateMany({
      where: { 
        bookingId,
        destinationId 
      },
      data: { 
        isSelected: true,
        adminNotes: adminNotes || undefined
      }
    });

    console.log('[selectDestinationForBooking] Selected destination for booking:', bookingId);
    return true;

  } catch (error) {
    console.error('[selectDestinationForBooking] Error:', error);
    return false;
  }
}

export async function getBookingSuggestions(bookingId: string) {
  try {
    const suggestions = await prisma.destinationSuggestion.findMany({
      where: { bookingId },
      include: { destination: true },
      orderBy: { createdAt: 'asc' }
    });

    return suggestions.map((suggestion: any) => ({
      id: suggestion.destination.id,
      name: suggestion.destination.name,
      city: suggestion.destination.city,
      country: suggestion.destination.country,
      league: suggestion.destination.league,
      stadium: suggestion.destination.stadium,
      airport: suggestion.destination.airport,
      flightPrice: suggestion.flightPrice,
      currency: suggestion.currency,
      reason: suggestion.reason,
      isSelected: suggestion.isSelected,
      adminNotes: suggestion.adminNotes
    }));

  } catch (error) {
    console.error('[getBookingSuggestions] Error:', error);
    return [];
  }
}

// Automatically suggest cheapest destination for a booking
export async function autoSuggestCheapestDestination(bookingId: string): Promise<DestinationSuggestion | null> {
  try {
    const booking = await prisma.booking.findUnique({
      where: { bookingId }
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Only suggest for packages that include flights
    if (booking.package !== 'comfort' && booking.package !== 'premium') {
      console.log('[autoSuggestCheapestDestination] Package does not include flights, skipping');
      return null;
    }

    // Parse preferences if they exist
    let preferences;
    try {
      preferences = booking.preferences ? JSON.parse(booking.preferences) : {};
    } catch (error) {
      preferences = {};
    }

    // Get destination suggestions
    const suggestions = await suggestDestinations(
      bookingId,
      booking.package,
      booking.date.toISOString().split('T')[0],
      booking.travelers,
      preferences
    );

    // Return the top suggestion (cheapest with highest score)
    return suggestions.length > 0 ? suggestions[0] : null;

  } catch (error) {
    console.error('[autoSuggestCheapestDestination] Error:', error);
    return null;
  }
}