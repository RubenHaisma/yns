import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { suggestDestinations } from '@/lib/destination-selector';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { bookingId }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
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

    return NextResponse.json({
      success: true,
      suggestions,
      booking: {
        id: booking.id,
        bookingId: booking.bookingId,
        name: booking.name,
        email: booking.email,
        package: booking.package,
        date: booking.date,
        travelers: booking.travelers,
        preferences
      }
    });

  } catch (error) {
    console.error('Error suggesting destinations:', error);
    return NextResponse.json(
      { error: 'Failed to suggest destinations' },
      { status: 500 }
    );
  }
}