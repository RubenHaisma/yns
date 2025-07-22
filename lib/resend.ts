import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string, position: number, locale: 'en' | 'nl' = 'nl') {
  try {
    const emailContent = locale === 'en' ? getEnglishWelcomeEmail(name, position) : getDutchWelcomeEmail(name, position);
    
    const { data, error } = await resend.emails.send({
      from: 'YourNextStadium <noreply@yournextstadium.com>', 
      to: [email],
      subject: locale === 'en' ? 'Welcome to the YourNextStadium Waitlist! 🏟️' : 'Welkom bij de YourNextStadium Waitlist! 🏟️',
      html: emailContent,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }

    console.log('Welcome email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
}

function getDutchWelcomeEmail(name: string, position: number): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welkom bij YourNextStadium</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 40px 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .header p { color: #E8F5E8; margin: 10px 0 0 0; font-size: 16px; }
        .content { padding: 40px 30px; }
        .position-badge { background: #F1F8E9; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; }
        .position-number { font-size: 48px; font-weight: 800; color: #FF6D00; margin: 15px 0; }
        .benefits { margin: 30px 0; }
        .benefit { display: flex; align-items: flex-start; margin: 20px 0; }
        .benefit-icon { width: 24px; height: 24px; background: #1B5E20; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; font-size: 12px; }
        .cta { text-align: center; margin: 40px 0; }
        .cta-button { background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 700; display: inline-block; }
        .footer { padding: 30px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welkom bij YourNextStadium!</h1>
          <p>Je mystery voetbal avontuur begint hier</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1B5E20; margin-bottom: 20px;">Hoi ${name}!</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Geweldig dat je je hebt aangemeld voor onze waitlist! Je bent nu officieel onderdeel van de YourNextStadium community.
          </p>
          
          <div class="position-badge">
            <h3 style="color: #1B5E20; margin: 0 0 10px 0;">Je Positie op de Waitlist</h3>
            <div class="position-number">#${position}</div>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">Hoe eerder je je aanmeldt, hoe eerder je toegang krijgt!</p>
          </div>
          
          <h3 style="color: #1B5E20; margin: 30px 0 20px 0;">Wat kun je verwachten?</h3>
          <div class="benefits">
            <div class="benefit">
              <div class="benefit-icon">🎯</div>
              <div>
                <strong>Exclusieve vroege toegang</strong> tot onze mystery trips
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">💰</div>
              <div>
                <strong>Speciale kortingen</strong> voor waitlist leden
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">📧</div>
              <div>
                <strong>Updates</strong> over nieuwe bestemmingen en features
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">🏟️</div>
              <div>
                <strong>Insider tips</strong> over Europese stadions
              </div>
            </div>
          </div>
          
          <div class="cta">
            <a href="https://yournextstadium.com" class="cta-button">
              Bezoek Onze Website
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Heb je vragen? Stuur ons een email op <a href="mailto:info@yournextstadium.com" style="color: #1B5E20;">info@yournextstadium.com</a>
          </p>
        </div>
        
        <div class="footer">
          <p>© 2025 YourNextStadium. Alle rechten voorbehouden.</p>
          <p>Je ontvangt deze email omdat je je hebt aangemeld voor onze waitlist.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getEnglishWelcomeEmail(name: string, position: number): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to YourNextStadium</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 40px 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .header p { color: #E8F5E8; margin: 10px 0 0 0; font-size: 16px; }
        .content { padding: 40px 30px; }
        .position-badge { background: #F1F8E9; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; }
        .position-number { font-size: 48px; font-weight: 800; color: #FF6D00; margin: 15px 0; }
        .benefits { margin: 30px 0; }
        .benefit { display: flex; align-items: flex-start; margin: 20px 0; }
        .benefit-icon { width: 24px; height: 24px; background: #1B5E20; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; font-size: 12px; }
        .cta { text-align: center; margin: 40px 0; }
        .cta-button { background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 700; display: inline-block; }
        .footer { padding: 30px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to YourNextStadium!</h1>
          <p>Your mystery football adventure starts here</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1B5E20; margin-bottom: 20px;">Hi ${name}!</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Amazing that you've signed up for our waitlist! You're now officially part of the YourNextStadium community.
          </p>
          
          <div class="position-badge">
            <h3 style="color: #1B5E20; margin: 0 0 10px 0;">Your Position on the Waitlist</h3>
            <div class="position-number">#${position}</div>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">The earlier you sign up, the sooner you get access!</p>
          </div>
          
          <h3 style="color: #1B5E20; margin: 30px 0 20px 0;">What can you expect?</h3>
          <div class="benefits">
            <div class="benefit">
              <div class="benefit-icon">🎯</div>
              <div>
                <strong>Exclusive early access</strong> to our mystery trips
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">💰</div>
              <div>
                <strong>Special discounts</strong> for waitlist members
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">📧</div>
              <div>
                <strong>Updates</strong> about new destinations and features
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">🏟️</div>
              <div>
                <strong>Insider tips</strong> about European stadiums
              </div>
            </div>
          </div>
          
          <div class="cta">
            <a href="https://yournextstadium.com" class="cta-button">
              Visit Our Website
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Have questions? Send us an email at <a href="mailto:info@yournextstadium.com" style="color: #1B5E20;">info@yournextstadium.com</a>
          </p>
        </div>
        
        <div class="footer">
          <p>© 2025 YourNextStadium. All rights reserved.</p>
          <p>You're receiving this email because you signed up for our waitlist.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendContactNotification(submission: any, locale: 'en' | 'nl' = 'nl') {
  try {
    const emailContent = locale === 'en' ? getEnglishContactNotification(submission) : getDutchContactNotification(submission);
    
    const { data, error } = await resend.emails.send({
      from: 'YourNextStadium <noreply@yournextstadium.com>',
      to: ['admin@yournextstadium.com'],
      subject: locale === 'en' ? `New Contact Form: ${submission.subject}` : `Nieuw Contact Formulier: ${submission.subject}`,
      html: emailContent,
    });

    if (error) {
      console.error('Error sending contact notification:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    throw error;
  }
}

function getDutchContactNotification(submission: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nieuw Contact Formulier</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 30px; color: white; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #374151; margin-bottom: 5px; }
        .value { color: #6b7280; line-height: 1.5; }
        .message-box { background: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #1B5E20; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Nieuw Contact Formulier</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Ingediend via YourNextStadium website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Naam:</div>
            <div class="value">${submission.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${submission.email}</div>
          </div>
          <div class="field">
            <div class="label">Telefoon:</div>
            <div class="value">${submission.phone || 'Niet opgegeven'}</div>
          </div>
          <div class="field">
            <div class="label">Onderwerp:</div>
            <div class="value">${submission.subject}</div>
          </div>
          <div class="field">
            <div class="label">Bericht:</div>
            <div class="message-box">${submission.message}</div>
          </div>
          <div class="field">
            <div class="label">Ingediend op:</div>
            <div class="value">${new Date().toLocaleString('nl-NL')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getEnglishContactNotification(submission: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 30px; color: white; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #374151; margin-bottom: 5px; }
        .value { color: #6b7280; line-height: 1.5; }
        .message-box { background: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #1B5E20; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">New Contact Form</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Submitted via YourNextStadium website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${submission.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${submission.email}</div>
          </div>
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${submission.phone || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${submission.subject}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="message-box">${submission.message}</div>
          </div>
          <div class="field">
            <div class="label">Submitted on:</div>
            <div class="value">${new Date().toLocaleString('en-US')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendBookingConfirmation(email: string, bookingDetails: any, locale: 'en' | 'nl' = 'nl') {
  try {
    const emailContent = locale === 'en' ? getEnglishBookingConfirmation(bookingDetails) : getDutchBookingConfirmation(bookingDetails);
    
    const { data, error } = await resend.emails.send({
      from: 'YourNextStadium <bookings@yournextstadium.com>',
      to: [email],
      subject: locale === 'en' ? 'Booking Confirmed - Your Mystery Trip Adventure Begins! 🎉' : 'Boeking Bevestigd - Je Mystery Trip Avontuur Begint! 🎉',
      html: emailContent,
    });

    if (error) {
      console.error('Error sending booking confirmation:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send booking confirmation:', error);
    throw error;
  }
}

function getDutchBookingConfirmation(bookingDetails: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Boeking Bevestigd</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 40px 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 40px 30px; }
        .booking-details { background: #f8fafc; padding: 30px; border-radius: 12px; margin: 30px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 15px 0; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
        .detail-row:last-child { border-bottom: none; }
        .mystery-box { background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; }
        .timeline { margin: 30px 0; }
        .timeline-item { display: flex; align-items: center; margin: 20px 0; }
        .timeline-icon { width: 40px; height: 40px; background: #1B5E20; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-weight: bold; }
        .emergency { background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin: 30px 0; }
        .dashboard-link { display: inline-block; background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 700; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Boeking Bevestigd!</h1>
          <p style="color: #E8F5E8; margin: 10px 0 0 0;">Je mystery avontuur kan beginnen</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1B5E20;">Hoi ${bookingDetails.name || ''}</h2>
          <p>Geweldig nieuws! Je mystery trip is succesvol geboekt. Hieronder vind je alle details van je boeking.</p>
          
          <div class="booking-details">
            <h3 style="color: #1B5E20; margin-top: 0;">Boekingsdetails</h3>
            <div class="detail-row">
              <span><strong>Boekingnummer:</strong></span>
              <span>${bookingDetails.bookingId}</span>
            </div>
            <div class="detail-row">
              <span><strong>Pakket:</strong></span>
              <span>${bookingDetails.package}</span>
            </div>
            <div class="detail-row">
              <span><strong>Vertrekdatum:</strong></span>
              <span>${bookingDetails.date}</span>
            </div>
            <div class="detail-row">
              <span><strong>Aantal reizigers:</strong></span>
              <span>${bookingDetails.travelers}</span>
            </div>
            <div class="detail-row">
              <span><strong>Totaalprijs:</strong></span>
              <span><strong>${bookingDetails.totalPrice}</strong></span>
            </div>
            ${bookingDetails.phone ? `<div class="detail-row"><span><strong>Telefoonnummer:</strong></span><span>${bookingDetails.phone}</span></div>` : ''}
          </div>
          
          <a href="${bookingDetails.dashboardUrl}" class="dashboard-link">Bekijk je dashboard &rarr;</a>
          
          <div class="mystery-box">
            <h3 style="margin-top: 0;">Het Mysterie Begint Nu!</h3>
            <p style="margin-bottom: 0;">Je bestemming blijft geheim tot 1-2 weken voor vertrek. Bereid je voor op een onvergetelijke ervaring!</p>
          </div>
          
          <h3 style="color: #1B5E20;">Wat gebeurt er nu?</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-icon">1</div>
              <div>
                <strong>Nu:</strong> Je ontvangt deze bevestiging en toegang tot je persoonlijke dashboard
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">2</div>
              <div>
                <strong>Komende weken:</strong> Ontvang hints en updates over je mystery bestemming
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">3</div>
              <div>
                <strong>1-2 weken voor vertrek:</strong> De grote onthulling van je bestemming!
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">✈️</div>
              <div>
                <strong>Vertrekdag:</strong> Je avontuur begint - geniet ervan!
              </div>
            </div>
          </div>
          
          <div class="emergency">
            <h4 style="color: #dc2626; margin-top: 0;">Belangrijk - Bewaar Deze Informatie</h4>
            <p><strong>24/7 Noodlijn:</strong> +31 20 987 6543</p>
            <p><strong>Email Support:</strong> support@yournextstadium.com</p>
            <p style="margin-bottom: 0;"><strong>Boekingnummer:</strong> ${bookingDetails.bookingId}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Heb je vragen over je boeking? Neem contact met ons op via <a href="mailto:support@yournextstadium.com" style="color: #1B5E20;">support@yournextstadium.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getEnglishBookingConfirmation(bookingDetails: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmed</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 40px 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 40px 30px; }
        .booking-details { background: #f8fafc; padding: 30px; border-radius: 12px; margin: 30px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 15px 0; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
        .detail-row:last-child { border-bottom: none; }
        .mystery-box { background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; }
        .timeline { margin: 30px 0; }
        .timeline-item { display: flex; align-items: center; margin: 20px 0; }
        .timeline-icon { width: 40px; height: 40px; background: #1B5E20; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-weight: bold; }
        .emergency { background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin: 30px 0; }
        .dashboard-link { display: inline-block; background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 700; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed!</h1>
          <p style="color: #E8F5E8; margin: 10px 0 0 0;">Your mystery adventure can begin</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1B5E20;">Hi ${bookingDetails.name || ''}</h2>
          <p>Great news! Your mystery trip has been successfully booked. Below you'll find all the details of your booking.</p>
          
          <div class="booking-details">
            <h3 style="color: #1B5E20; margin-top: 0;">Booking Details</h3>
            <div class="detail-row">
              <span><strong>Booking Number:</strong></span>
              <span>${bookingDetails.bookingId}</span>
            </div>
            <div class="detail-row">
              <span><strong>Package:</strong></span>
              <span>${bookingDetails.package}</span>
            </div>
            <div class="detail-row">
              <span><strong>Departure Date:</strong></span>
              <span>${bookingDetails.date}</span>
            </div>
            <div class="detail-row">
              <span><strong>Number of Travelers:</strong></span>
              <span>${bookingDetails.travelers}</span>
            </div>
            <div class="detail-row">
              <span><strong>Total Price:</strong></span>
              <span><strong>${bookingDetails.totalPrice}</strong></span>
            </div>
            ${bookingDetails.phone ? `<div class="detail-row"><span><strong>Phone Number:</strong></span><span>${bookingDetails.phone}</span></div>` : ''}
          </div>
          
          <a href="${bookingDetails.dashboardUrl}" class="dashboard-link">View your dashboard &rarr;</a>
          
          <div class="mystery-box">
            <h3 style="margin-top: 0;">The Mystery Begins Now!</h3>
            <p style="margin-bottom: 0;">Your destination remains secret until 1-2 weeks before departure. Prepare for an unforgettable experience!</p>
          </div>
          
          <h3 style="color: #1B5E20;">What happens now?</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-icon">1</div>
              <div>
                <strong>Now:</strong> You receive this confirmation and access to your personal dashboard
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">2</div>
              <div>
                <strong>Coming weeks:</strong> Receive hints and updates about your mystery destination
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">3</div>
              <div>
                <strong>1-2 weeks before departure:</strong> The big reveal of your destination!
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">✈️</div>
              <div>
                <strong>Departure day:</strong> Your adventure begins - enjoy it!
              </div>
            </div>
          </div>
          
          <div class="emergency">
            <h4 style="color: #dc2626; margin-top: 0;">Important - Save This Information</h4>
            <p><strong>24/7 Emergency Line:</strong> +31 20 987 6543</p>
            <p><strong>Email Support:</strong> support@yournextstadium.com</p>
            <p style="margin-bottom: 0;"><strong>Booking Number:</strong> ${bookingDetails.bookingId}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Have questions about your booking? Contact us via <a href="mailto:support@yournextstadium.com" style="color: #1B5E20;">support@yournextstadium.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}