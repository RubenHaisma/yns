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

// Get cheapest flights from multiple origins (AMS and EIN) to multiple destinations
export async function getFlightPrices(
  destinations: string[],
  departDate: string,
  returnDate: string,
  adults: number = 1
): Promise<FlightPrice[]> {
  const origins = ['AMS', 'EIN']; // Amsterdam Schiphol and Eindhoven
  const results: FlightPrice[] = [];

  console.log('[getFlightPrices] Starting flight price check for', destinations.length, 'destinations');

  try {
    // Check each destination from both origins
    for (const destination of destinations) {
      let bestPrice: FlightPrice | null = null;

      for (const origin of origins) {
        try {
          const flightPrice = await getSpecificFlightPrice(
            origin,
            destination,
            departDate,
            returnDate,
            adults
          );

          if (flightPrice && (!bestPrice || flightPrice.price < bestPrice.price)) {
            bestPrice = flightPrice;
          }
        } catch (error) {
          console.warn(`[getFlightPrices] Error checking ${origin} to ${destination}:`, error);
        }
      }

      if (bestPrice) {
        results.push(bestPrice);
      }
    }

    console.log('[getFlightPrices] Found', results.length, 'flight prices');
    return results.sort((a, b) => a.price - b.price); // Sort by price ascending
  } catch (error) {
    console.error('[getFlightPrices] Error in getFlightPrices:', error);
    return [];
  }
}

// Get specific flight price between two airports with better error handling
export async function getSpecificFlightPrice(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  adults: number = 1
): Promise<FlightPrice | null> {
  try {
    // Use the calendar endpoint which is more reliable for future dates
    const baseUrl = 'https://api.travelpayouts.com/v1/prices/calendar';
    
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

    const url = `${baseUrl}?${params}`;
    console.log(`[getSpecificFlightPrice] Fetching ${origin} to ${destination}:`, url);

    const response = await fetch(url, {
      headers: {
        'X-Access-Token': process.env.AVIASALES_API_TOKEN || '',
        'Accept': 'application/json',
        'User-Agent': 'YourNextStadium/1.0'
      },
    });

    if (!response.ok) {
      console.warn(`[getSpecificFlightPrice] HTTP ${response.status} for ${origin} to ${destination}`);
      return null;
    }

    const data: AviasalesResponse = await response.json();
    console.log(`[getSpecificFlightPrice] Response for ${destination}:`, data);

    if (data.success && data.data) {
      const flights = Object.values(data.data);
      if (flights.length > 0) {
        const cheapestFlight = flights.reduce((min, flight) => 
          flight.price < min.price ? flight : min
        );

        console.log(`[getSpecificFlightPrice] Found flight ${origin} to ${destination}: €${cheapestFlight.price}`);

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

    console.log(`[getSpecificFlightPrice] No flights found for ${origin} to ${destination}`);
    return null;
  } catch (error) {
    console.error(`[getSpecificFlightPrice] Error fetching flight price for ${origin} to ${destination}:`, error);
    return null;
  }
}

// Alternative search using different endpoint for better coverage
export async function searchFlightsAlternative(params: FlightSearchParams): Promise<FlightPrice[]> {
  try {
    // Try the latest prices endpoint
    const baseUrl = 'https://api.travelpayouts.com/v2/prices/latest';
    
    const searchParams = new URLSearchParams({
      origin: params.origin,
      destination: params.destination,
      period_type: 'month',
      currency: params.currency || 'EUR',
      token: process.env.AVIASALES_API_TOKEN || ''
    });

    const response = await fetch(`${baseUrl}?${searchParams}`, {
      headers: {
        'X-Access-Token': process.env.AVIASALES_API_TOKEN || '',
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    if (data.success && data.data && Array.isArray(data.data)) {
      return data.data
        .filter((flight: any) => flight.price && flight.price > 0)
        .map((flight: any) => ({
          origin: params.origin,
          destination: params.destination,
          price: flight.price || flight.value,
          currency: flight.currency || 'EUR',
          departDate: params.departDate,
          returnDate: params.returnDate,
          airline: flight.airline || 'Unknown',
          flightNumber: flight.flight_number?.toString(),
          duration: flight.duration
        }))
        .sort((a: FlightPrice, b: FlightPrice) => a.price - b.price)
        .slice(0, 3); // Return top 3 cheapest
    }

    return [];
  } catch (error) {
    console.error('[searchFlightsAlternative] Error:', error);
    return [];
  }
}

// Enhanced airport code mapping with more European airports
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
    'Newcastle upon Tyne': 'NCL',
    'Newcastle': 'NCL',
    'Leeds': 'LBA',
    
    // German cities
    'Hamburg': 'HAM',
    'Cologne': 'CGN',
    'Düsseldorf': 'DUS',
    'Stuttgart': 'STR',
    'Hannover': 'HAJ',
    'Dresden': 'DRS',
    'Leipzig': 'LEJ',
    'Dortmund': 'DTM',
    'Kaiserslautern': 'FRA', // Use Frankfurt for Kaiserslautern
    
    // Spanish cities
    'Valencia': 'VLC',
    'Seville': 'SVQ',
    'Sevilla': 'SVQ',
    'Bilbao': 'BIO',
    'Málaga': 'AGP',
    'Malaga': 'AGP',
    'Palma': 'PMI',
    'Las Palmas': 'LPA',
    'Alicante': 'ALC',
    'Pamplona': 'PNA',
    'Oviedo': 'OVD',
    'Gijón': 'OVD', // Use Asturias for Gijón
    'Gijon': 'OVD',
    
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
    'Saint-Étienne': 'EBU',
    'Le Havre': 'DOL',
    'Bastia': 'BIA',
    
    // Dutch cities
    'Rotterdam': 'RTM',
    'Eindhoven': 'EIN',
    'Groningen': 'GRQ',
    'Maastricht': 'MST',
    'Utrecht': 'AMS', // Use Amsterdam for Utrecht
    'Den Haag': 'RTM', // Use Rotterdam for Den Haag
    'Doetinchem': 'EIN', // Use Eindhoven for Doetinchem
    'Breda': 'EIN', // Use Eindhoven for Breda
    
    // Belgian cities
    'Antwerp': 'ANR',
    'Antwerpen': 'ANR',
    'Charleroi': 'CRL',
    'Luxembourg': 'LUX',
    'Luik': 'LGG',
    'Liège': 'LGG',
    'Brugge': 'OST',
    'Bruges': 'OST',
    'Beveren': 'ANR', // Use Antwerp for Beveren
    'Brussel': 'BRU',
  };

  const cityKey = city.trim();
  const airportCode = airportMap[cityKey];
  
  if (airportCode) {
    console.log(`[getAirportCode] Mapped ${cityKey} to ${airportCode}`);
    return airportCode;
  }

  // Fallback: use first 3 letters of city name
  const fallback = cityKey.toUpperCase().substring(0, 3);
  console.log(`[getAirportCode] No mapping found for ${cityKey}, using fallback: ${fallback}`);
  return fallback;
}

// Get multiple flight options with fallback strategies
export async function getFlightOptionsWithFallback(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  adults: number = 1
): Promise<FlightPrice[]> {
  const results: FlightPrice[] = [];

  // Strategy 1: Calendar endpoint
  try {
    const calendarResult = await getSpecificFlightPrice(origin, destination, departDate, returnDate, adults);
    if (calendarResult) {
      results.push(calendarResult);
    }
  } catch (error) {
    console.warn(`[getFlightOptionsWithFallback] Calendar endpoint failed for ${origin} to ${destination}`);
  }

  // Strategy 2: Alternative search
  try {
    const alternativeResults = await searchFlightsAlternative({
      origin,
      destination,
      departDate,
      returnDate,
      adults
    });
    results.push(...alternativeResults);
  } catch (error) {
    console.warn(`[getFlightOptionsWithFallback] Alternative search failed for ${origin} to ${destination}`);
  }

  // Remove duplicates and sort by price
  const uniqueResults = results.filter((result, index, self) => 
    index === self.findIndex(r => r.price === result.price && r.airline === result.airline)
  );

  return uniqueResults.sort((a, b) => a.price - b.price);
}