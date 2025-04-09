import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Logout successful.'
      },
      { status: 200 }
    );
    
    // Remove auth cookie
    removeAuthCookie(response);
    
    return response;
    
  } catch (error) {
    console.error('Error during logout:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error. Please try again later.'
      },
      { status: 500 }
    );
  }
} 