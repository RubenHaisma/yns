import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.waitlistUser.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered', position: existingUser.position },
        { status: 409 }
      );
    }

    // Create new waitlist user
    const waitlistUser = await prisma.waitlistUser.create({
      data: {
        email,
        name: name || null,
        source: source || 'website'
      }
    });

    // Also add to newsletter if they want updates
    try {
      await prisma.newsletterSubscriber.create({
        data: {
          email,
          name: name || null,
          source: 'waitlist'
        }
      });
    } catch (error) {
      // Newsletter subscription failed, but waitlist signup succeeded
      console.log('Newsletter subscription failed:', error);
    }

    // Send welcome email to all waitlist signups
    try {
      await sendWelcomeEmail(email, name || 'Voetbalfan', waitlistUser.position);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist!',
      position: waitlistUser.position
    });

  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const totalUsers = await prisma.waitlistUser.count();
    
    return NextResponse.json({
      totalUsers,
      message: `${totalUsers} people are waiting for their next stadium!`
    });
  } catch (error) {
    console.error('Error fetching waitlist stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}