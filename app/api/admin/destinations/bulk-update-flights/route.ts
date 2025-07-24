import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { batchSearchFlights, getAirportCode } from '@/lib/aviasales';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { departDate, returnDate } = await request.json();

    if (!departDate) {
      return NextResponse.json({ 
        error: 'Departure date is required' 
      }, { status: 400 });
    }

    // Get all active destinations with airports
    const destinations = await prisma.destination.findMany({
      where: { 
        isActive: true,
        OR: [
          { airport: { not: null } },
          { airport: { not: '' } }
        ]
      }
    });

    if (destinations.length === 0) {
      return NextResponse.json({ 
        error: 'No destinations with airports found' 
      }, { status: 404 });
    }

    // Prepare destinations for batch search
    const destinationsForSearch = destinations.map((dest: any) => ({
      id: dest.id,
      airport: dest.airport || getAirportCode(dest.city, dest.country),
      city: dest.city,
      country: dest.country
    }));

    console.log(`[bulk-update-flights] Starting batch search for ${destinationsForSearch.length} destinations`);

    // Use batch search for real-time flight prices
    const batchResults = await batchSearchFlights(
      destinationsForSearch,
      departDate,
      returnDate,
      1 // Base price for 1 person
    );

    console.log(`[bulk-update-flights] Got batch results for ${batchResults.length} destinations`);

    // Update destinations with real-time flight prices
    const updatePromises = batchResults.map(async (result) => {
      const dest = destinations.find((d: any) => d.id === result.destinationId);
      if (!dest) return null;

      const airportCode = dest.airport || getAirportCode(dest.city, dest.country);

      return prisma.destination.update({
        where: { id: dest.id },
        data: {
          lastFlightCheck: new Date(),
          avgFlightPrice: result.flightPrice?.price || null,
          // Update airport code if it was generated
          airport: dest.airport || airportCode
        }
      });
    });

    const updateResults = await Promise.all(updatePromises.filter(Boolean));
    const successfulUpdates = updateResults.filter(Boolean).length;
    const flightPricesFound = batchResults.filter(r => r.flightPrice).length;

    return NextResponse.json({
      success: true,
      message: `Updated flight prices for ${successfulUpdates} destinations using real-time data`,
      flightPrices: flightPricesFound,
      destinationsUpdated: successfulUpdates,
      totalDestinations: destinations.length
    });

  } catch (error) {
    console.error('Error bulk updating real-time flight prices:', error);
    return NextResponse.json(
      { error: 'Failed to update real-time flight prices' },
      { status: 500 }
    );
  }
}