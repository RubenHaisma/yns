import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { searchRealTimeFlights, getAirportCode, getFlightPrices } from '@/lib/aviasales';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { destinationId, departDate, returnDate, travelers } = await request.json();

    if (!destinationId || !departDate) {
      return NextResponse.json({ 
        error: 'Destination ID and departure date are required' 
      }, { status: 400 });
    }

    // Get destination details
    const destination = await prisma.destination.findUnique({
      where: { id: destinationId }
    });

    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    // Get airport code
    const airportCode = destination.airport || getAirportCode(destination.city, destination.country);

    // Fetch real-time flight price
    const flightResults = await searchRealTimeFlights(
      'AMS', // Amsterdam as origin
      airportCode,
      departDate,
      returnDate,
      travelers || 1,
      'EUR'
    );

    const flightPrice = flightResults.length > 0 ? flightResults[0] : null;

    // Update destination with latest real-time flight price
    if (flightPrice) {
      await prisma.destination.update({
        where: { id: destinationId },
        data: {
          lastFlightCheck: new Date(),
          avgFlightPrice: flightPrice.price
        }
      });
    }

    return NextResponse.json({
      success: true,
      flightPrice,
      allOptions: flightResults, // Return all available options
      destination: {
        id: destination.id,
        name: destination.name,
        city: destination.city,
        country: destination.country,
        airport: airportCode
      }
    });

  } catch (error) {
    console.error('Error fetching flight prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flight prices' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const departDate = searchParams.get('departDate');
    const returnDate = searchParams.get('returnDate');
    const travelers = parseInt(searchParams.get('travelers') || '1');

    if (!departDate) {
      return NextResponse.json({ 
        error: 'Departure date is required' 
      }, { status: 400 });
    }

    // Get all active destinations with airports
    const destinations = await prisma.destination.findMany({
      where: { 
        isActive: true,
        airport: { not: null }
      },
      orderBy: { avgFlightPrice: 'asc' }
    });

    // Update flight prices for destinations that haven't been checked recently
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const destinationsToUpdate = destinations.filter((dest: any) => 
      !dest.lastFlightCheck || dest.lastFlightCheck < oneHourAgo
    );

    const flightPrices = [];
    for (const dest of destinationsToUpdate.slice(0, 10)) { // Limit to 10 to avoid rate limits
      try {
        const airportCode = (dest.airport ?? getAirportCode(dest.city, dest.country)) || '';
        let prices;
        if (returnDate) {
          prices = await getFlightPrices([airportCode], departDate, returnDate, travelers);
        } else {
          prices = await getFlightPrices([airportCode], departDate, '', travelers);
        }

        const flightPrice = prices[0];

        if (flightPrice) {
          // Update destination
          await prisma.destination.update({
            where: { id: dest.id },
            data: {
              lastFlightCheck: new Date(),
              avgFlightPrice: flightPrice.price
            }
          });

          flightPrices.push({
            destinationId: dest.id,
            ...flightPrice
          });
        }
      } catch (error) {
        console.error(`Error updating flight price for ${dest.city}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      flightPrices,
      destinationsUpdated: destinationsToUpdate.length
    });

  } catch (error) {
    console.error('Error in flight prices endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}