interface FlightSearchParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  currency?: string;
}

interface FlightPrice {
  origin: string;
  destination: string;
  price: number;
  currency: string;
  departDate: string;
  returnDate?: string;
  airline: string;
  flightNumber?: string;
  duration?: number;
}

interface AviasalesResponse {
  success: boolean;
  data?: {
    [key: string]: {
      price: number;
      airline: string;
      flight_number: number;
      departure_at: string;
      return_at?: string;
      expires_at: string;
    };
  };
  currency?: string;
  error?: string;
}

// Get cheapest flights from Amsterdam (main departure point) to multiple destinations
export async function getFlightPrices(
  destinations: string[],
  departDate: string,
  returnDate: string,
  adults: number = 1
): Promise<FlightPrice[]> {
  const origin = 'AMS'; // Amsterdam Schiphol as main departure point
  const results: FlightPrice[] = [];

  try {
    // Aviasales API endpoint for cheap flights
    const baseUrl = 'https://api.travelpayouts.com/v1/prices/cheap';
    
    for (const destination of destinations) {
      try {
        const params = new URLSearchParams({
          origin,
          destination,
          depart_date: departDate,
          return_date: returnDate,
          currency: 'EUR',
          token: process.env.AVIASALES_API_TOKEN || ''
        });

        const response = await fetch(`${baseUrl}?${params}`, {
          headers: {
            'X-Access-Token': process.env.AVIASALES_API_TOKEN || '',
          },
        });

        if (!response.ok) {
          console.warn(`Failed to fetch prices for ${destination}: ${response.status}`);
          continue;
        }

        const data: AviasalesResponse = await response.json();

        if (data.success && data.data) {
          // Find the cheapest flight for this destination
          const flights = Object.values(data.data);
          if (flights.length > 0) {
            const cheapestFlight = flights.reduce((min, flight) => 
              flight.price < min.price ? flight : min
            );

            results.push({
              origin,
              destination,
              price: cheapestFlight.price,
              currency: data.currency || 'EUR',
              departDate,
              returnDate,
              airline: cheapestFlight.airline,
              flightNumber: cheapestFlight.flight_number?.toString(),
              duration: undefined // Not provided by this endpoint
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching flight price for ${destination}:`, error);
        continue;
      }
    }

    return results;
  } catch (error) {
    console.error('Error in getFlightPrices:', error);
    return [];
  }
}

// Get specific flight price between two airports
export async function getSpecificFlightPrice(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  adults: number = 1
): Promise<FlightPrice | null> {
  try {
    const params = new URLSearchParams({
      origin,
      destination,
      depart_date: departDate,
      currency: 'EUR',
      token: process.env.AVIASALES_API_TOKEN || ''
    });

    if (returnDate) {
      params.append('return_date', returnDate);
    }

    const response = await fetch(`https://api.travelpayouts.com/v1/prices/cheap?${params}`, {
      headers: {
        'X-Access-Token': process.env.AVIASALES_API_TOKEN || '',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: AviasalesResponse = await response.json();

    if (data.success && data.data) {
      const flights = Object.values(data.data);
      if (flights.length > 0) {
        const cheapestFlight = flights[0];
        return {
          origin,
          destination,
          price: cheapestFlight.price,
          currency: data.currency || 'EUR',
          departDate,
          returnDate,
          airline: cheapestFlight.airline,
          flightNumber: cheapestFlight.flight_number?.toString(),
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching specific flight price:', error);
    return null;
  }
}

// Alternative API endpoint for more detailed flight search
export async function searchFlights(params: FlightSearchParams): Promise<FlightPrice[]> {
  try {
    const searchParams = new URLSearchParams({
      origin: params.origin,
      destination: params.destination,
      depart_date: params.departDate,
      adults: params.adults.toString(),
      currency: params.currency || 'EUR',
      token: process.env.AVIASALES_API_TOKEN || ''
    });

    if (params.returnDate) {
      searchParams.append('return_date', params.returnDate);
    }

    const response = await fetch(`https://api.travelpayouts.com/v2/prices/latest?${searchParams}`, {
      headers: {
        'X-Access-Token': process.env.AVIASALES_API_TOKEN || '',
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data.map((flight: any) => ({
        origin: params.origin,
        destination: params.destination,
        price: flight.price || flight.value,
        currency: flight.currency || 'EUR',
        departDate: params.departDate,
        returnDate: params.returnDate,
        airline: flight.airline,
        flightNumber: flight.flight_number,
        duration: flight.duration
      }));
    }

    return [];
  } catch (error) {
    console.error('Error in searchFlights:', error);
    return [];
  }
}

// Utility function to get airport code from city name
export function getAirportCode(city: string, country: string): string {
  const airportMap: { [key: string]: string } = {
    // Major European cities
    'Amsterdam': 'AMS',
    'London': 'LHR',
    'Paris': 'CDG',
    'Berlin': 'BER',
    'Madrid': 'MAD',
    'Barcelona': 'BCN',
    'Rome': 'FCO',
    'Milan': 'MXP',
    'Munich': 'MUC',
    'Frankfurt': 'FRA',
    'Zurich': 'ZUR',
    'Vienna': 'VIE',
    'Brussels': 'BRU',
    'Copenhagen': 'CPH',
    'Stockholm': 'ARN',
    'Oslo': 'OSL',
    'Helsinki': 'HEL',
    'Dublin': 'DUB',
    'Lisbon': 'LIS',
    'Prague': 'PRG',
    'Warsaw': 'WAW',
    'Budapest': 'BUD',
    'Athens': 'ATH',
    'Istanbul': 'IST',
    
    // UK cities
    'Manchester': 'MAN',
    'Liverpool': 'LPL',
    'Birmingham': 'BHX',
    'Glasgow': 'GLA',
    'Edinburgh': 'EDI',
    
    // German cities
    'Hamburg': 'HAM',
    'Cologne': 'CGN',
    'Düsseldorf': 'DUS',
    'Stuttgart': 'STR',
    'Hannover': 'HAJ',
    'Dresden': 'DRS',
    'Leipzig': 'LEJ',
    'Dortmund': 'DTM',
    
    // Spanish cities
    'Valencia': 'VLC',
    'Seville': 'SVQ',
    'Bilbao': 'BIO',
    'Málaga': 'AGP',
    'Palma': 'PMI',
    'Las Palmas': 'LPA',
    'Alicante': 'ALC',
    
    // Italian cities
    'Naples': 'NAP',
    'Turin': 'TRN',
    'Bologna': 'BLQ',
    'Florence': 'FLR',
    'Venice': 'VCE',
    'Genoa': 'GOA',
    'Palermo': 'PMO',
    'Catania': 'CTA',
    
    // French cities
    'Lyon': 'LYS',
    'Marseille': 'MRS',
    'Nice': 'NCE',
    'Toulouse': 'TLS',
    'Bordeaux': 'BOD',
    'Nantes': 'NTE',
    'Strasbourg': 'SXB',
    'Lille': 'LIL',
    
    // Dutch cities
    'Rotterdam': 'RTM',
    'Eindhoven': 'EIN',
    'Groningen': 'GRQ',
    'Maastricht': 'MST',
    
    // Other European cities
    'Porto': 'OPO',
    'Geneva': 'GVA',
    'Basel': 'BSL',
    'Salzburg': 'SZG',
    'Innsbruck': 'INN',
    'Antwerp': 'ANR',
    'Charleroi': 'CRL',
    'Luxembourg': 'LUX',
  };

  return airportMap[city] || city.toUpperCase().substring(0, 3);
}