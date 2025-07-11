import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message
      }
    });

    // Send notification email to admin
    try {
      await sendContactNotification(submission);
    } catch (error) {
      console.error('Failed to send contact notification:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendContactNotification(submission: any) {
  try {
    await resend.emails.send({
      from: 'YourNextStadium <noreply@yournextstadium.nl>',
      to: ['info@yournextstadium.nl'],
      subject: `Nieuw Contact Formulier: ${submission.subject}`,
      html: `
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
      `,
    });
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    throw error;
  }
}