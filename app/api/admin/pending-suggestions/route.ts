import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get bookings with flight packages that don't have destinations yet but have suggestions
    const bookingsWithSuggestions = await prisma.booking.findMany({
      where: {
        AND: [
          { destination: null }, // No destination revealed yet
          { OR: [{ package: 'comfort' }, { package: 'premium' }] }, // Only flight packages
          { destinationSuggestions: { some: {} } } // Has suggestions
        ]
      },
      include: {
        destinationSuggestions: {
          include: { destination: true },
          orderBy: { flightPrice: 'asc' } // Cheapest first
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const pendingSuggestions = bookingsWithSuggestions.map((booking: any) => {
      const topSuggestion = booking.destinationSuggestions[0];
      
      return {
        bookingId: booking.bookingId,
        customerName: booking.name,
        customerEmail: booking.email,
        package: booking.package,
        date: booking.date,
        travelers: booking.travelers,
        totalPrice: booking.totalPrice,
        createdAt: booking.createdAt,
        topSuggestion: topSuggestion ? {
          destinationId: topSuggestion.destinationId,
          name: topSuggestion.destination.name,
          city: topSuggestion.destination.city,
          country: topSuggestion.destination.country,
          stadium: topSuggestion.destination.stadium,
          league: topSuggestion.destination.league,
          airport: topSuggestion.destination.airport,
          flightPrice: topSuggestion.flightPrice,
          currency: topSuggestion.currency,
          reason: topSuggestion.reason
        } : null,
        totalSuggestions: booking.destinationSuggestions.length
      };
    });

    return NextResponse.json({
      success: true,
      pendingSuggestions,
      total: pendingSuggestions.length
    });

  } catch (error) {
    console.error('Error fetching pending suggestions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}