import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAuth(request);
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: 'Authenticated' });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { message: 'Authentication verification failed' },
      { status: 500 }
    );
  }
}