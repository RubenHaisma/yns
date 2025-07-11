import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { resend } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      bookingId, 
      destination, 
      stadium, 
      city, 
      country, 
      matchDetails, 
      hotelInfo, 
      transportInfo, 
      specialInstructions 
    } = await request.json();

    // Update booking with destination
    const booking = await prisma.booking.update({
      where: { bookingId },
      data: {
        destination,
        revealedAt: new Date(),
      },
    });

    // Send destination reveal email
    await sendDestinationRevealEmail(
      booking.email, 
      booking.name, 
      {
        destination,
        stadium,
        city,
        country,
        matchDetails,
        hotelInfo,
        transportInfo,
        specialInstructions
      },
      bookingId
    );

    return NextResponse.json({
      success: true,
      message: 'Destination revealed successfully!',
    });
  } catch (error) {
    console.error('Error revealing destination:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendDestinationRevealEmail(email: string, name: string, revealData: any, bookingId: string) {
  try {
    await resend.emails.send({
      from: 'YourNextStadium <bookings@yournextstadium.nl>',
      to: [email],
      subject: '🎉 Je Mystery Bestemming is Onthuld!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Mystery Bestemming Onthuld!</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #FF6D00, #F57C00); padding: 40px 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 32px; font-weight: 700; }
            .content { padding: 40px 30px; text-align: center; }
            .destination-reveal { background: linear-gradient(135deg, #1B5E20, #2E7D32); color: white; padding: 40px; border-radius: 16px; margin: 30px 0; }
            .destination-name { font-size: 48px; font-weight: 800; margin: 20px 0; }
            .cta-button { background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 700; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎭 Het Mysterie is Opgelost!</h1>
            </div>
            <div class="content">
              <h2>Hoi ${name}!</h2>
              <p>Het moment waar je op hebt gewacht is eindelijk daar...</p>
              
              <div class="destination-reveal">
                <h3>Je Mystery Bestemming is:</h3>
                <div class="destination-name">${revealData.destination}</div>
                <p>Bereid je voor op een onvergetelijke ervaring!</p>
              </div>
              
              <p>Je volledige reisdetails en tickets worden binnenkort naar je verzonden.</p>
              
              <a href="https://yournextstadium.nl/nl/dashboard" class="cta-button">
                Bekijk Je Dashboard
              </a>
              
              <p><strong>Boekingnummer:</strong> ${bookingId}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
  } catch (error) {
    console.error('Failed to send destination reveal email:', error);
    throw error;
  }
}