import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { sendBookingConfirmation } from '@/lib/email';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handleSuccessfulPayment(paymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await handleFailedPayment(failedPayment);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(paymentIntent: any) {
  try {
    const metadata = paymentIntent.metadata;
    
    // Generate booking ID
    const bookingId = `YNS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        bookingId,
        email: metadata.customerEmail,
        name: metadata.customerName,
        package: metadata.bookingPackage,
        date: new Date(metadata.bookingDate),
        travelers: parseInt(metadata.travelers),
        totalPrice: `€${(paymentIntent.amount / 100).toFixed(2)}`,
        status: 'confirmed',
        paymentStatus: 'paid',
        stripePaymentIntentId: paymentIntent.id,
      }
    });

    // Send confirmation email
    await sendBookingConfirmation(metadata.customerEmail, {
      bookingId,
      name: metadata.customerName,
      package: metadata.bookingPackage,
      date: new Date(metadata.bookingDate).toLocaleDateString('nl-NL'),
      travelers: metadata.travelers,
      totalPrice: `€${(paymentIntent.amount / 100).toFixed(2)}`,
    });

    console.log('Booking created successfully:', bookingId);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent: any) {
  console.log('Payment failed for intent:', paymentIntent.id);
  // Handle failed payment logic here
}