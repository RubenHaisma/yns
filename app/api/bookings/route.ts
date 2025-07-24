import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendBookingConfirmation } from '@/lib/resend';
import { suggestDestinations } from '@/lib/destination-selector';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      name, 
      phone, 
      package: packageType, 
      date, 
      travelers, 
      preferences,
      totalPrice 
    } = body;

    // Extract locale from the request URL
    const url = new URL(request.url);
    const pathname = url.pathname;
    const locale = pathname.startsWith('/en/') ? 'en' : 'nl';

    // Validate required fields
    if (!email || !name || !packageType || !date || !travelers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate booking ID
    const bookingId = `YNS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingId,
        email,
        name,
        phone,
        package: packageType,
        date: new Date(date),
        travelers: parseInt(travelers),
        preferences: preferences ? JSON.stringify(preferences) : null,
        totalPrice,
        status: 'confirmed',
        paymentStatus: 'paid'
      }
    });

    // Automatically suggest cheapest destination for packages that include flights
    if (packageType === 'comfort' || packageType === 'premium') {
      try {
        console.log('[bookings] Auto-suggesting destinations for:', bookingId);
        
        // Parse preferences if they exist
        let parsedPreferences;
        try {
          parsedPreferences = preferences ? JSON.parse(preferences) : {};
        } catch (error) {
          parsedPreferences = {};
        }

        // Run destination suggestion in background (don't await to avoid blocking response)
        setTimeout(async () => {
          try {
            await suggestDestinations(
              bookingId,
              packageType,
              new Date(date).toISOString().split('T')[0],
              parseInt(travelers),
              parsedPreferences
            );
            console.log('[bookings] Auto-suggestion completed for:', bookingId);
          } catch (error) {
            console.error('[bookings] Auto-suggestion failed for:', bookingId, error);
          }
        }, 1000); // 1 second delay to ensure booking is saved
      } catch (error) {
        console.error('[bookings] Error triggering destination suggestion:', error);
      }
    }

    // Send confirmation email with locale
    try {
      await sendBookingConfirmation(email, {
        bookingId,
        name,
        package: packageType,
        date: new Date(date).toLocaleDateString(locale === 'en' ? 'en-US' : 'nl-NL'),
        travelers,
        totalPrice
      }, locale);
    } catch (error) {
      console.error('Failed to send booking confirmation email:', error);
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Booking confirmed successfully!'
    });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const email = searchParams.get('email');
    const paymentIntentId = searchParams.get('paymentIntentId');

    if (!bookingId && !email && !paymentIntentId) {
      return NextResponse.json(
        { error: 'BookingId, email, or paymentIntentId required' },
        { status: 400 }
      );
    }

    let booking;
    if (bookingId) {
      booking = await prisma.booking.findFirst({
        where: { bookingId },
        orderBy: { createdAt: 'desc' }
      });
    } else if (email) {
      booking = await prisma.booking.findFirst({
        where: { email },
        orderBy: { createdAt: 'desc' }
      });
    } else if (paymentIntentId) {
      booking = await prisma.booking.findFirst({
        where: { stripePaymentIntentId: paymentIntentId },
        orderBy: { createdAt: 'desc' }
      });
    }

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      booking: {
        ...booking,
        preferences: booking.preferences ? JSON.parse(booking.preferences) : null
      }
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}