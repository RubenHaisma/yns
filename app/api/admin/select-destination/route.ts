import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { selectDestinationForBooking } from '@/lib/destination-selector';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId, destinationId, adminNotes } = await request.json();

    if (!bookingId || !destinationId) {
      return NextResponse.json({ 
        error: 'Booking ID and destination ID are required' 
      }, { status: 400 });
    }

    // Get booking and destination details
    const [booking, destination] = await Promise.all([
      prisma.booking.findUnique({ where: { bookingId } }),
      prisma.destination.findUnique({ where: { id: destinationId } })
    ]);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    // Select the destination
    const success = await selectDestinationForBooking(bookingId, destinationId, adminNotes);

    if (!success) {
      return NextResponse.json({ 
        error: 'Failed to select destination' 
      }, { status: 500 });
    }

    // Send destination reveal email
    try {
      await sendDestinationRevealEmail(
        booking.email,
        booking.name,
        {
          destination: `${destination.stadium}, ${destination.city}`,
          stadium: destination.stadium,
          city: destination.city,
          country: destination.country,
          league: destination.league,
          description: destination.description
        },
        bookingId
      );
    } catch (emailError) {
      console.error('Failed to send destination reveal email:', emailError);
      // Don't fail the entire operation if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Destination selected and revealed successfully!',
      destination: {
        name: destination.name,
        stadium: destination.stadium,
        city: destination.city,
        country: destination.country,
        league: destination.league
      }
    });

  } catch (error) {
    console.error('Error selecting destination:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendDestinationRevealEmail(
  email: string, 
  name: string, 
  revealData: any, 
  bookingId: string
) {
  try {
    await resend.emails.send({
      from: 'YourNextStadium <bookings@yournextstadium.com>',
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
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #FF6D00, #F57C00); padding: 40px 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 32px; font-weight: 700; }
            .content { padding: 40px 30px; text-align: center; }
            .destination-reveal { background: linear-gradient(135deg, #1B5E20, #2E7D32); color: white; padding: 40px; border-radius: 16px; margin: 30px 0; position: relative; overflow: hidden; }
            .destination-reveal::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: shimmer 3s infinite; }
            .destination-name { font-size: 48px; font-weight: 800; margin: 20px 0; position: relative; z-index: 1; }
            .stadium-info { font-size: 24px; margin: 15px 0; opacity: 0.9; position: relative; z-index: 1; }
            .league-badge { background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; font-weight: 600; position: relative; z-index: 1; }
            .cta-button { background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 700; display: inline-block; margin: 20px 0; box-shadow: 0 4px 15px rgba(255,109,0,0.3); }
            .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; text-align: left; }
            .detail-item { background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #1B5E20; }
            .detail-label { font-weight: 600; color: #1B5E20; margin-bottom: 5px; }
            .detail-value { color: #374151; }
            @keyframes shimmer { 0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); } 100% { transform: translateX(100%) translateY(100%) rotate(45deg); } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎭 Het Mysterie is Opgelost!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">Je voetbal avontuur kan beginnen</p>
            </div>
            <div class="content">
              <h2 style="color: #1B5E20; margin-bottom: 20px;">Hoi ${name}!</h2>
              <p style="color: #374151; font-size: 18px; margin-bottom: 30px;">
                Het moment waar je op hebt gewacht is eindelijk daar. Je mystery bestemming is onthuld!
              </p>
              
              <div class="destination-reveal">
                <h3 style="margin: 0 0 10px 0; font-size: 20px; opacity: 0.9;">Je Mystery Bestemming is:</h3>
                <div class="destination-name">${revealData.city}</div>
                <div class="stadium-info">${revealData.stadium}</div>
                <div class="league-badge">${revealData.league}</div>
                <p style="margin: 20px 0 0 0; font-size: 18px; opacity: 0.9;">Bereid je voor op een onvergetelijke ervaring!</p>
              </div>
              
              <div class="details-grid">
                <div class="detail-item">
                  <div class="detail-label">🏟️ Stadium</div>
                  <div class="detail-value">${revealData.stadium}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">🌍 Locatie</div>
                  <div class="detail-value">${revealData.city}, ${revealData.country}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">🏆 Competitie</div>
                  <div class="detail-value">${revealData.league}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">📋 Boeking</div>
                  <div class="detail-value">${bookingId}</div>
                </div>
              </div>
              
              <p style="color: #6b7280; margin: 30px 0;">
                Je volledige reisdetails, tickets en verdere instructies worden binnenkort naar je verzonden.
              </p>
              
              <a href="https://yournextstadium.com/nl/dashboard?bookingId=${bookingId}" class="cta-button">
                Bekijk Je Dashboard
              </a>
              
              <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: left;">
                <h4 style="color: #92400e; margin: 0 0 10px 0;">📞 Belangrijke Contactgegevens</h4>
                <p style="color: #92400e; margin: 5px 0;"><strong>24/7 Noodlijn:</strong> +31 20 987 6543</p>
                <p style="color: #92400e; margin: 5px 0;"><strong>Email Support:</strong> support@yournextstadium.com</p>
                <p style="color: #92400e; margin: 5px 0;"><strong>Boekingnummer:</strong> ${bookingId}</p>
              </div>
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