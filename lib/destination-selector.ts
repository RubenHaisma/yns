import { prisma } from './prisma';
import { getFlightPrices, getAirportCode } from './aviasales';

interface DestinationOption {
  id: string;
  name: string;
  city: string;
  country: string;
  league: string;
  stadium: string;
  airport: string;
  flightPrice?: number;
  currency?: string;
  isRandomPick?: boolean;
  reason: string;
}

interface BookingPreferences {
  hatedTeams?: string[];
  visitedCities?: string[];
  preferredLeagues?: string[];
  travelStyle?: string;
}

export async function suggestDestinations(
  bookingId: string,
  packageType: string,
  departDate: string,
  travelers: number,
  preferences?: BookingPreferences
): Promise<DestinationOption[]> {
  try {
    // Get all active destinations
    const allDestinations = await prisma.destination.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });

    if (allDestinations.length === 0) {
      throw new Error('No destinations available');
    }

    // Filter destinations based on preferences
    let filteredDestinations = allDestinations.filter(dest => {
      // Exclude hated teams
      if (preferences?.hatedTeams?.some(team => 
        dest.name.toLowerCase().includes(team.toLowerCase())
      )) {
        return false;
      }

      // Exclude visited cities
      if (preferences?.visitedCities?.some(city => 
        dest.city.toLowerCase() === city.toLowerCase()
      )) {
        return false;
      }

      return true;
    });

    // If no destinations left after filtering, use all destinations
    if (filteredDestinations.length === 0) {
      filteredDestinations = allDestinations;
    }

    const suggestions: DestinationOption[] = [];

    // Check if package includes flights
    const includesFlight = packageType === 'comfort' || packageType === 'premium';

    if (includesFlight) {
      // Get flight prices for destinations with airports
      const destinationsWithAirports = filteredDestinations.filter(dest => dest.airport);
      
      if (destinationsWithAirports.length > 0) {
        // Prepare airport codes for flight search
        const airportCodes = destinationsWithAirports.map(dest => 
          dest.airport || getAirportCode(dest.city, dest.country)
        );

        // Calculate return date (assuming 2-3 day trip)
        const returnDate = new Date(departDate);
        returnDate.setDate(returnDate.getDate() + 2);

        try {
          // Get flight prices from Amsterdam to all destinations
          const flightPrices = await getFlightPrices(
            airportCodes,
            departDate,
            returnDate.toISOString().split('T')[0],
            travelers
          );

          // Match flight prices with destinations
          for (const dest of destinationsWithAirports) {
            const airportCode = dest.airport || getAirportCode(dest.city, dest.country);
            const flightPrice = flightPrices.find(fp => fp.destination === airportCode);

            suggestions.push({
              id: dest.id,
              name: dest.name,
              city: dest.city,
              country: dest.country,
              league: dest.league,
              stadium: dest.stadium,
              airport: airportCode,
              flightPrice: flightPrice?.price,
              currency: flightPrice?.currency || 'EUR',
              isRandomPick: false,
              reason: flightPrice 
                ? `Flight available for €${flightPrice.price} per person`
                : 'Flight price not available'
            });
          }

          // Sort by flight price (cheapest first)
          suggestions.sort((a, b) => {
            if (!a.flightPrice && !b.flightPrice) return 0;
            if (!a.flightPrice) return 1;
            if (!b.flightPrice) return -1;
            return a.flightPrice - b.flightPrice;
          });

        } catch (error) {
          console.error('Error fetching flight prices:', error);
          
          // Fallback to random selection if API fails
          const randomDestinations = getRandomDestinations(filteredDestinations, 3);
          suggestions.push(...randomDestinations.map(dest => ({
            id: dest.id,
            name: dest.name,
            city: dest.city,
            country: dest.country,
            league: dest.league,
            stadium: dest.stadium,
            airport: dest.airport || getAirportCode(dest.city, dest.country),
            isRandomPick: true,
            reason: 'Random selection (flight API unavailable)'
          })));
        }
      }
    } else {
      // For basic package (no flights), select randomly
      const randomDestinations = getRandomDestinations(filteredDestinations, 5);
      suggestions.push(...randomDestinations.map(dest => ({
        id: dest.id,
        name: dest.name,
        city: dest.city,
        country: dest.country,
        league: dest.league,
        stadium: dest.stadium,
        airport: dest.airport || getAirportCode(dest.city, dest.country),
        isRandomPick: true,
        reason: 'Random selection (basic package)'
      })));
    }

    // Ensure we have at least 3 suggestions
    if (suggestions.length < 3) {
      const additionalDestinations = getRandomDestinations(
        filteredDestinations.filter(dest => 
          !suggestions.some(s => s.id === dest.id)
        ), 
        3 - suggestions.length
      );

      suggestions.push(...additionalDestinations.map(dest => ({
        id: dest.id,
        name: dest.name,
        city: dest.city,
        country: dest.country,
        league: dest.league,
        stadium: dest.stadium,
        airport: dest.airport || getAirportCode(dest.city, dest.country),
        isRandomPick: true,
        reason: 'Additional random selection'
      })));
    }

    return suggestions.slice(0, 5); // Return top 5 suggestions
  } catch (error) {
    console.error('Error in suggestDestinations:', error);
    throw error;
  }
}

function getRandomDestinations(destinations: any[], count: number): any[] {
  const shuffled = [...destinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function selectDestinationForBooking(
  bookingId: string,
  destinationId: string,
  adminNotes?: string
): Promise<boolean> {
  try {
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
        revealedAt: new Date(),
        // Store admin notes in preferences if provided
        preferences: adminNotes ? JSON.stringify({ 
          adminNotes,
          selectedDestinationId: destinationId,
          selectionDate: new Date().toISOString()
        }) : undefined
      }
    });

    return true;
  } catch (error) {
    console.error('Error selecting destination:', error);
    return false;
  }
}