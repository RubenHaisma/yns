import { prisma } from '@/lib/prisma';
import { sendBookingConfirmation } from '@/lib/resend';

export async function handleSuccessfulPayment(paymentIntent: any) {
  try {
    const metadata = paymentIntent.metadata;
    
    // Extract locale from metadata (default to 'nl' if not provided)
    const locale = metadata.locale || 'nl';
    
    // Generate booking ID
    const bookingId = `YNS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        bookingId,
        email: metadata.customerEmail,
        name: metadata.customerName,
        phone: metadata.customerPhone,
        package: metadata.bookingPackage,
        date: new Date(metadata.bookingDate),
        travelers: parseInt(metadata.travelers),
        totalPrice: `€${(paymentIntent.amount / 100).toFixed(2)}`,
        status: 'confirmed',
        paymentStatus: 'paid',
        stripePaymentIntentId: paymentIntent.id,
      }
    });

    // Send confirmation email with locale
    const dashboardUrl = `https://yournextstadium.com/${locale}/dashboard?bookingId=${bookingId}`;
    await sendBookingConfirmation(metadata.customerEmail, {
      bookingId,
      name: metadata.customerName,
      package: metadata.bookingPackage,
      date: new Date(metadata.bookingDate).toLocaleDateString(locale === 'en' ? 'en-US' : 'nl-NL'),
      travelers: metadata.travelers,
      totalPrice: `€${(paymentIntent.amount / 100).toFixed(2)}`,
      dashboardUrl,
    }, locale);

    console.log('Booking created successfully:', bookingId);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
} 