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
  stops?: number;
  departureTime?: string;
  arrivalTime?: string;
  bookingToken?: string;
}

interface AviasalesSearchResponse {
  search_id: string;
  currency: string;
  prices?: FlightOffer[];
  error?: string;
  message?: string;
}

interface FlightOffer {
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;
  return_at?: string;
  duration: number;
  stops: number;
  booking_token: string;
  deep_link?: string;
}

interface SearchResultsResponse {
  data?: {
    [key: string]: FlightOffer;
  };
  currency?: string;
  search_id?: string;
  error?: string;
}

// Real-time flight search using Aviasales Search API
export async function searchRealTimeFlights(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  adults: number = 1,
  currency: string = 'EUR'
): Promise<FlightPrice[]> {
  try {
    console.log(`[searchRealTimeFlights] Searching ${origin} to ${destination} on ${departDate}`);

    if (!process.env.AVIASALES_API_TOKEN) {
      console.error('[searchRealTimeFlights] AVIASALES_API_TOKEN not configured');
      return [];
    }

    // Step 1: Initiate search
    const searchParams = new URLSearchParams({
      origin,
      destination,
      depart_date: departDate,
      adults: adults.toString(),
      currency,
      token: process.env.AVIASALES_API_TOKEN
    });

    if (returnDate) {
      searchParams.append('return_date', returnDate);
    }

    const searchUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${searchParams}`;
    console.log(`[searchRealTimeFlights] Initiating search:`, searchUrl);

    const searchResponse = await fetch(searchUrl, {
      headers: {
        'X-Access-Token': process.env.AVIASALES_API_TOKEN,
        'Accept': 'application/json',
        'User-Agent': 'YourNextStadium/1.0'
      },
    });

    if (!searchResponse.ok) {
      console.warn(`[searchRealTimeFlights] Search initiation failed: HTTP ${searchResponse.status}`);
      return await fallbackToCalendarAPI(origin, destination, departDate, returnDate, adults, currency);
    }

    const searchData: AviasalesSearchResponse = await searchResponse.json();
    console.log(`[searchRealTimeFlights] Search response:`, searchData);

    if (searchData.error) {
      console.warn(`[searchRealTimeFlights] Search error: ${searchData.error}`);
      return await fallbackToCalendarAPI(origin, destination, departDate, returnDate, adults, currency);
    }

    // If we get immediate results, process them
    if (searchData.prices && searchData.prices.length > 0) {
      console.log(`[searchRealTimeFlights] Got immediate results: ${searchData.prices.length} offers`);
      return processFlightOffers(searchData.prices, origin, destination, departDate, returnDate, searchData.currency || currency);
    }

    // If we have a search_id, wait and fetch results
    if (searchData.search_id) {
      console.log(`[searchRealTimeFlights] Got search_id: ${searchData.search_id}, waiting for results...`);
      
      // Wait a bit for search to complete
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Step 2: Get search results
      const resultsUrl = `https://api.travelpayouts.com/aviasales/v3/get_search_results?search_id=${searchData.search_id}&token=${process.env.AVIASALES_API_TOKEN}`;
      
      const resultsResponse = await fetch(resultsUrl, {
        headers: {
          'X-Access-Token': process.env.AVIASALES_API_TOKEN,
          'Accept': 'application/json',
          'User-Agent': 'YourNextStadium/1.0'
        },
      });

      if (!resultsResponse.ok) {
        console.warn(`[searchRealTimeFlights] Results fetch failed: HTTP ${resultsResponse.status}`);
        return await fallbackToCalendarAPI(origin, destination, departDate, returnDate, adults, currency);
      }

      const resultsData: SearchResultsResponse = await resultsResponse.json();
      console.log(`[searchRealTimeFlights] Results response:`, resultsData);

      if (resultsData.error) {
        console.warn(`[searchRealTimeFlights] Results error: ${resultsData.error}`);
        return await fallbackToCalendarAPI(origin, destination, departDate, returnDate, adults, currency);
      }

      if (resultsData.data) {
        const offers = Object.values(resultsData.data);
        console.log(`[searchRealTimeFlights] Got ${offers.length} flight offers from results`);
        return processFlightOffers(offers, origin, destination, departDate, returnDate, resultsData.currency || currency);
      }
    }

    // If no results, fallback to calendar API
    console.log(`[searchRealTimeFlights] No results from real-time search, falling back to calendar API`);
    return await fallbackToCalendarAPI(origin, destination, departDate, returnDate, adults, currency);

  } catch (error) {
    console.error(`[searchRealTimeFlights] Error in real-time search:`, error);
    return await fallbackToCalendarAPI(origin, destination, departDate, returnDate, adults, currency);
  }
}

// Process flight offers into our standard format
function processFlightOffers(
  offers: FlightOffer[],
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  currency: string = 'EUR'
): FlightPrice[] {
  return offers
    .filter(offer => offer.price && offer.price > 0)
    .map(offer => ({
      origin,
      destination,
      price: offer.price,
      currency,
      departDate,
      returnDate,
      airline: offer.airline,
      flightNumber: offer.flight_number,
      duration: offer.duration,
      stops: offer.stops,
      departureTime: offer.departure_at,
      arrivalTime: offer.return_at,
      bookingToken: offer.booking_token
    }))
    .sort((a, b) => a.price - b.price)
    .slice(0, 5); // Return top 5 cheapest options
}

// Fallback to calendar API for historical/cached data
async function fallbackToCalendarAPI(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  adults: number = 1,
  currency: string = 'EUR'
): Promise<FlightPrice[]> {
  try {
    console.log(`[fallbackToCalendarAPI] Using calendar API for ${origin} to ${destination}`);

    const baseUrl = 'https://api.travelpayouts.com/v1/prices/calendar';
    
    const params = new URLSearchParams({
      origin,
      destination,
      depart_date: departDate,
      currency,
      token: process.env.AVIASALES_API_TOKEN || ''
    });

    if (returnDate) {
      params.append('return_date', returnDate);
    }

    const url = `${baseUrl}?${params}`;
    const response = await fetch(url, {
      headers: {
        'X-Access-Token': process.env.AVIASALES_API_TOKEN || '',
        'Accept': 'application/json',
        'User-Agent': 'YourNextStadium/1.0'
      },
    });

    if (!response.ok) {
      console.warn(`[fallbackToCalendarAPI] HTTP ${response.status} for ${origin} to ${destination}`);
      return [];
    }

    const data = await response.json();

    if (data.success && data.data) {
      const flights = Object.values(data.data) as any[];
      if (flights.length > 0) {
        const cheapestFlight = flights.reduce((min: any, flight: any) => 
          flight.price < min.price ? flight : min
        );

        return [{
          origin,
          destination,
          price: cheapestFlight.price,
          currency: data.currency || currency,
          departDate,
          returnDate,
          airline: cheapestFlight.airline,
          flightNumber: cheapestFlight.flight_number?.toString(),
        }];
      }
    }

    return [];
  } catch (error) {
    console.error(`[fallbackToCalendarAPI] Error:`, error);
    return [];
  }
}

// Multi-city real-time search for multiple destinations
export async function searchMultiCityFlights(
  origins: string[],
  destinations: string[],
  departDate: string,
  returnDate?: string,
  adults: number = 1,
  currency: string = 'EUR'
): Promise<FlightPrice[]> {
  console.log(`[searchMultiCityFlights] Searching flights from ${origins.length} origins to ${destinations.length} destinations`);

  const allResults: FlightPrice[] = [];
  const searchPromises: Promise<FlightPrice[]>[] = [];

  // Create search promises for all origin-destination combinations
  for (const origin of origins) {
    for (const destination of destinations) {
      searchPromises.push(
        searchRealTimeFlights(origin, destination, departDate, returnDate, adults, currency)
      );
    }
  }

  try {
    // Execute searches with some delay to avoid rate limiting
    const batchSize = 3; // Process 3 searches at a time
    for (let i = 0; i < searchPromises.length; i += batchSize) {
      const batch = searchPromises.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch);
      
      batchResults.forEach(results => {
        allResults.push(...results);
      });

      // Add delay between batches to respect rate limits
      if (i + batchSize < searchPromises.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Sort by price and remove duplicates
    const uniqueResults = allResults.filter((result, index, self) => 
      index === self.findIndex(r => 
        r.origin === result.origin && 
        r.destination === result.destination && 
        r.price === result.price
      )
    );

    console.log(`[searchMultiCityFlights] Found ${uniqueResults.length} unique flight options`);
    return uniqueResults.sort((a, b) => a.price - b.price);

  } catch (error) {
    console.error(`[searchMultiCityFlights] Error in multi-city search:`, error);
    return allResults.sort((a, b) => a.price - b.price);
  }
}

// Get cheapest flights from multiple origins to multiple destinations (updated to use real-time API)
export async function getFlightPrices(
  destinations: string[],
  departDate: string,
  returnDate: string,
  adults: number = 1
): Promise<FlightPrice[]> {
  const origins = ['AMS', 'EIN']; // Amsterdam Schiphol and Eindhoven
  
  console.log(`[getFlightPrices] Starting real-time flight search for ${destinations.length} destinations`);

  return await searchMultiCityFlights(
    origins,
    destinations,
    departDate,
    returnDate,
    adults,
    'EUR'
  );
}

// Get specific flight price between two airports using real-time API
export async function getSpecificFlightPrice(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  adults: number = 1
): Promise<FlightPrice | null> {
  const results = await searchRealTimeFlights(
    origin,
    destination,
    departDate,
    returnDate,
    adults,
    'EUR'
  );

  return results.length > 0 ? results[0] : null;
}

// Enhanced search with flexible date options
export async function searchFlightsWithFlexibleDates(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  adults: number = 1,
  flexDays: number = 3
): Promise<FlightPrice[]> {
  console.log(`[searchFlightsWithFlexibleDates] Searching with ${flexDays} days flexibility`);

  const allResults: FlightPrice[] = [];
  const searchPromises: Promise<FlightPrice[]>[] = [];

  // Create date variations
  const baseDate = new Date(departDate);
  const dateVariations: string[] = [];

  for (let i = -flexDays; i <= flexDays; i++) {
    const variantDate = new Date(baseDate);
    variantDate.setDate(variantDate.getDate() + i);
    dateVariations.push(variantDate.toISOString().split('T')[0]);
  }

  // Search for each date variation
  for (const date of dateVariations) {
    let returnDateVariant = returnDate;
    if (returnDate) {
      const returnBaseDate = new Date(returnDate);
      const daysDiff = Math.floor((new Date(departDate).getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
      returnBaseDate.setDate(returnBaseDate.getDate() + daysDiff);
      returnDateVariant = returnBaseDate.toISOString().split('T')[0];
    }

    searchPromises.push(
      searchRealTimeFlights(origin, destination, date, returnDateVariant, adults, 'EUR')
    );
  }

  try {
    const results = await Promise.all(searchPromises);
    results.forEach(flightList => {
      allResults.push(...flightList);
    });

    // Remove duplicates and sort by price
    const uniqueResults = allResults.filter((result, index, self) => 
      index === self.findIndex(r => 
        r.departDate === result.departDate && 
        r.price === result.price && 
        r.airline === result.airline
      )
    );

    console.log(`[searchFlightsWithFlexibleDates] Found ${uniqueResults.length} options with flexible dates`);
    return uniqueResults.sort((a, b) => a.price - b.price).slice(0, 10);

  } catch (error) {
    console.error(`[searchFlightsWithFlexibleDates] Error:`, error);
    return [];
  }
}

// Get booking URL for a specific flight
export async function getFlightBookingUrl(bookingToken: string): Promise<string | null> {
  try {
    if (!bookingToken || !process.env.AVIASALES_API_TOKEN) {
      return null;
    }

    const response = await fetch(`https://api.travelpayouts.com/aviasales/v3/get_booking_url`, {
      method: 'POST',
      headers: {
        'X-Access-Token': process.env.AVIASALES_API_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        booking_token: bookingToken,
        marker: 'yournextstadium'
      })
    });

    if (!response.ok) {
      console.warn(`[getFlightBookingUrl] HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.booking_url || null;

  } catch (error) {
    console.error(`[getFlightBookingUrl] Error:`, error);
    return null;
  }
}

import { prisma } from './prisma';

// Enhanced airport code mapping: Fetch major airports from the database (active destinations with airport code)
const airportCache = new Map<string, string>();

export async function getAirportCode(city: string, country: string): Promise<string> {
  const cityKey = city.trim();
  const cacheKey = `${cityKey}|${country}`;
  if (airportCache.has(cacheKey)) {
    return airportCache.get(cacheKey)!;
  }

  // Query the database for an active destination with a valid airport code
  const destination = await prisma.destination.findFirst({
    where: {
      isActive: true,
      city: cityKey,
      country: country,
      airport: {
        not: null,
      },
    },
    select: { airport: true },
  });

  if (destination && destination.airport && destination.airport.length >= 3 && destination.airport.length <= 4 && /^[A-Z]+$/.test(destination.airport)) {
    airportCache.set(cacheKey, destination.airport);
    console.log(`[getAirportCode] DB mapped ${cityKey}, ${country} to ${destination.airport}`);
    return destination.airport;
  }

  // Fallback: use first 3 letters of city name
  const fallback = cityKey.toUpperCase().substring(0, 3);
  airportCache.set(cacheKey, fallback);
  console.log(`[getAirportCode] No DB mapping for ${cityKey}, ${country}, using fallback: ${fallback}`);
  return fallback;
}

// Get multiple flight options with real-time data and fallback strategies
export async function getFlightOptionsWithFallback(
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  adults: number = 1
): Promise<FlightPrice[]> {
  console.log(`[getFlightOptionsWithFallback] Getting options for ${origin} to ${destination}`);

  const results: FlightPrice[] = [];

  // Strategy 1: Real-time search
  try {
    const realTimeResults = await searchRealTimeFlights(origin, destination, departDate, returnDate, adults);
    results.push(...realTimeResults);
    console.log(`[getFlightOptionsWithFallback] Real-time search returned ${realTimeResults.length} results`);
  } catch (error) {
    console.warn(`[getFlightOptionsWithFallback] Real-time search failed:`, error);
  }

  // Strategy 2: Flexible dates if we don't have enough results
  if (results.length < 3) {
    try {
      const flexibleResults = await searchFlightsWithFlexibleDates(origin, destination, departDate, returnDate, adults, 2);
      results.push(...flexibleResults);
      console.log(`[getFlightOptionsWithFallback] Flexible dates search added ${flexibleResults.length} results`);
    } catch (error) {
      console.warn(`[getFlightOptionsWithFallback] Flexible dates search failed:`, error);
    }
  }

  // Remove duplicates and sort by price
  const uniqueResults = results.filter((result, index, self) => 
    index === self.findIndex(r => 
      r.origin === result.origin &&
      r.destination === result.destination &&
      r.price === result.price && 
      r.airline === result.airline &&
      r.departDate === result.departDate
    )
  );

  console.log(`[getFlightOptionsWithFallback] Returning ${uniqueResults.length} unique results`);
  return uniqueResults.sort((a, b) => a.price - b.price).slice(0, 5);
}

// Batch search for admin dashboard - optimized for multiple destinations
export async function batchSearchFlights(
  destinations: { id: string; airport: string; city: string; country: string }[],
  departDate: string,
  returnDate?: string,
  adults: number = 1
): Promise<{ destinationId: string; flightPrice: FlightPrice | null }[]> {
  console.log(`[batchSearchFlights] Batch searching ${destinations.length} destinations`);

  const results: { destinationId: string; flightPrice: FlightPrice | null }[] = [];
  const origins = ['AMS', 'EIN']; // Amsterdam and Eindhoven

  // Process destinations in smaller batches to avoid overwhelming the API
  const batchSize = 5;
  for (let i = 0; i < destinations.length; i += batchSize) {
    const batch = destinations.slice(i, i + batchSize);
    console.log(`[batchSearchFlights] Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(destinations.length / batchSize)}`);

    const batchPromises = batch.map(async (dest) => {
      let bestPrice: FlightPrice | null = null;

      // Try each origin and pick the cheapest
      for (const origin of origins) {
        try {
          const flightResults = await searchRealTimeFlights(
            origin,
            dest.airport,
            departDate,
            returnDate,
            adults
          );

          // Add logging for each search
          console.log(`[DEBUG] Search: origin=${origin}, dest=${dest.airport}, city=${dest.city}, results=${flightResults.length}`);
          if (flightResults.length > 0) {
            console.log(`[DEBUG] Prices for ${origin}->${dest.airport} (${dest.city}):`, flightResults.map(f => f.price));
          }

          if (flightResults.length > 0 && (!bestPrice || flightResults[0].price < bestPrice.price)) {
            bestPrice = flightResults[0];
          }
        } catch (error) {
          console.warn(`[batchSearchFlights] Error searching ${origin} to ${dest.airport}:`, error);
        }
      }

      return {
        destinationId: dest.id,
        flightPrice: bestPrice
      };
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Add delay between batches to respect rate limits
    if (i + batchSize < destinations.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`[batchSearchFlights] Completed batch search, found prices for ${results.filter(r => r.flightPrice).length}/${results.length} destinations`);
  return results;
}

// Alternative search using different endpoint for better coverage (kept for compatibility)
export async function searchFlightsAlternative(params: FlightSearchParams): Promise<FlightPrice[]> {
  console.log(`[searchFlightsAlternative] Fallback search for ${params.origin} to ${params.destination}`);
  
  // Use the real-time search as the alternative method
  return await searchRealTimeFlights(
    params.origin,
    params.destination,
    params.departDate,
    params.returnDate,
    params.adults,
    params.currency
  );
}