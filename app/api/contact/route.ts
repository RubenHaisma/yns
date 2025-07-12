import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactNotification } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Extract locale from the request URL
    const url = new URL(request.url);
    const pathname = url.pathname;
    const locale = pathname.startsWith('/en/') ? 'en' : 'nl';

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

    // Send notification email to admin with locale
    try {
      await sendContactNotification(submission, locale);
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