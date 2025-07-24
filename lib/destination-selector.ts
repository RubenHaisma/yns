import { prisma } from '@/lib/prisma';
import { searchRealTimeFlights } from '@/lib/aviasales';

interface FlightOption {
  price: number;
  currency: string;
  airline: string;
  flightNumber?: string;
  duration?: number;
  stops?: number;
  departureTime?: string;
  arrivalTime?: string;
  bookingToken?: string;
  originAirport: string;
}

interface DestinationSuggestion {
  id: string;
  name: string;
  city: string;
  country: string;
  league: string;
  stadium: string;
  airport: string;
  flightOptions: FlightOption[];
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

    // Calculate return date (1 day later for weekend trips)
    const departDateObj = new Date(departDate);
    const returnDateObj = new Date(departDateObj);
    returnDateObj.setDate(returnDateObj.getDate() + 1);
    const returnDate = returnDateObj.toISOString().split('T')[0];

    if (includesFlight) {
      console.log('[suggestDestinations] Package includes flight, checking prices...');
      const validDestinations = destinations.filter((dest: any) =>   
        dest.airport && 
        dest.airport.length >= 3 && 
        dest.airport.length <= 4 && 
        /^[A-Z]+$/.test(dest.airport)
      );
      console.log('[suggestDestinations] Using real-time flight search for', validDestinations.length, 'destinations');

      for (const destination of validDestinations) {
        let allFlightOptions: FlightOption[] = [];
        for (const origin of ['AMS', 'EIN']) {
          const flights = await searchRealTimeFlights(
            origin,
            destination.airport || '',
            departDate,
            returnDate,
            travelers
          );
          allFlightOptions.push(...flights.map(flight => ({
            price: flight.price,
            currency: flight.currency,
            airline: flight.airline,
            flightNumber: flight.flightNumber,
            duration: flight.duration,
            stops: flight.stops,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            bookingToken: flight.bookingToken,
            originAirport: origin
          })));
        }
        // Remove duplicates and sort by price
        allFlightOptions = allFlightOptions.filter((f, i, arr) =>
          arr.findIndex(x => x.price === f.price && x.airline === f.airline && x.departureTime === f.departureTime) === i
        ).sort((a, b) => a.price - b.price).slice(0, 5); // Top 5 cheapest

        let score = 50;
        let reason = 'Available destination';
        if (allFlightOptions.length > 0) {
          const cheapest = allFlightOptions[0];
          const priceScore = Math.max(0, 50 - (cheapest.price / 10));
          score += priceScore;
          reason = `Real-time flights available from €${cheapest.price} per person`;
          if (cheapest.stops === 0) {
            score += 10;
            reason += ' (direct flight)';
          }
          if (cheapest.duration && cheapest.duration < 240) {
            score += 5;
            reason += ' (short flight)';
          }
        } else {
          score -= 20;
          reason = 'No real-time flight data available';
        }
        if (preferences.hatedTeams?.includes(destination.name)) {
          score -= 50;
          reason += ' (customer dislikes this team)';
        }
        if (preferences.visitedCities?.includes(destination.city)) {
          score -= 30;
          reason += ' (customer has visited this city)';
        }
        const popularLeagues = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Champions League'];
        if (popularLeagues.includes(destination.league)) {
          score += 20;
        }
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
          flightOptions: allFlightOptions,
          reason,
          score
        });
      }
      suggestions.sort((a, b) => {
        if (Math.abs(a.score - b.score) < 5) {
          const priceA = a.flightOptions[0]?.price || 999999;
          const priceB = b.flightOptions[0]?.price || 999999;
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
          flightOptions: [],
          reason,
          score
        });
      }

      suggestions.sort((a, b) => b.score - a.score);
    }
    await storeDestinationSuggestionsWithFlights(bookingId, suggestions.slice(0, 10));
    return suggestions.slice(0, 10); // Return top 10 suggestions

  } catch (error) {
    console.error('[suggestDestinations] Error:', error);
    throw error;
  }
}

async function storeDestinationSuggestionsWithFlights(bookingId: string, suggestions: DestinationSuggestion[]) {
  try {
    await prisma.destinationSuggestion.deleteMany({ where: { bookingId } });
    suggestions.forEach(async (suggestion, index) => {
      const createdSuggestion = await prisma.destinationSuggestion.create({
        data: {
          bookingId,
          destinationId: suggestion.id,
          flightPrice: suggestion.flightOptions[0]?.price || null,
          currency: suggestion.flightOptions[0]?.currency || 'EUR',
          reason: suggestion.reason,
          adminNotes: `Score: ${suggestion.score}, Rank: ${index + 1}`
        }
      });
      if (suggestion.flightOptions.length > 0) {
        await prisma.flightOption.createMany({
          data: suggestion.flightOptions.map((flight: FlightOption) => ({
            destinationSuggestionId: createdSuggestion.id,
            price: flight.price,
            currency: flight.currency,
            airline: flight.airline,
            flightNumber: flight.flightNumber,
            duration: flight.duration,
            stops: flight.stops,
            departureTime: flight.departureTime ? new Date(flight.departureTime) : null,
            arrivalTime: flight.arrivalTime ? new Date(flight.arrivalTime) : null,
            bookingToken: flight.bookingToken,
            originAirport: flight.originAirport
          }))
        });
      }
    });
    console.log('[storeDestinationSuggestionsWithFlights] Stored suggestions and flight options');
  } catch (error) {
    console.error('[storeDestinationSuggestionsWithFlights] Error:', error);
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