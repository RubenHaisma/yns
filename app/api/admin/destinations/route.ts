import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const destinations = await prisma.destination.findMany({
      orderBy: [
        { avgFlightPrice: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json({ 
      destinations: destinations.map((dest: any) => ({ 
        ...dest,
        hasRecentFlightData: dest.lastFlightCheck && 
          dest.lastFlightCheck > new Date(Date.now() - 24 * 60 * 60 * 1000) // Within 24 hours
      }))
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const destination = await prisma.destination.create({
      data,
    });

    return NextResponse.json({
      success: true,
      destination,
    });
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}