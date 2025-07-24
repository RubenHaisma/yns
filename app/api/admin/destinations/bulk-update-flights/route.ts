import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { getFlightPrices, getAirportCode } from '@/lib/aviasales';
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

    // Prepare airport codes
    const airportCodes = destinations.map(dest => 
      dest.airport || getAirportCode(dest.city, dest.country)
    ).filter(Boolean);

    // Get flight prices
    const flightPrices = await getFlightPrices(
      airportCodes,
      departDate,
      returnDate || '',
      1 // Base price for 1 person
    );

    // Update destinations with flight prices
    const updatePromises = destinations.map(async (dest) => {
      const airportCode = dest.airport || getAirportCode(dest.city, dest.country);
      const flightPrice = flightPrices.find(fp => fp.destination === airportCode);

      return prisma.destination.update({
        where: { id: dest.id },
        data: {
          lastFlightCheck: new Date(),
          avgFlightPrice: flightPrice?.price || null,
          // Update airport code if it was generated
          airport: dest.airport || airportCode
        }
      });
    });

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: `Updated flight prices for ${destinations.length} destinations`,
      flightPrices: flightPrices.length,
      destinationsUpdated: destinations.length
    });

  } catch (error) {
    console.error('Error bulk updating flight prices:', error);
    return NextResponse.json(
      { error: 'Failed to update flight prices' },
      { status: 500 }
    );
  }
}