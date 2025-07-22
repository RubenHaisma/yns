import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { handleSuccessfulPayment } from '@/lib/handleSuccessfulPayment';

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }
  const { payment_intent } = await request.json();
  if (!payment_intent) {
    return NextResponse.json({ error: 'Missing payment_intent' }, { status: 400 });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    await handleSuccessfulPayment(paymentIntent);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 