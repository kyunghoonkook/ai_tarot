import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import TarotReading from '@/models/TarotReading';
import { verifyToken } from '@/lib/auth';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    console.log('User API called');
    // Get auth token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      console.log('No authentication token');
      return NextResponse.json(
        { success: false, message: 'Authentication required.' },
        { status: 401 }
      );
    }
    
    console.log('Starting token verification');
    
    // Verify token
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      console.log('Token verification failed');
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token.' },
        { status: 401 }
      );
    }
    
    console.log('Token verification successful, user ID:', decoded.userId);
    await connectToDatabase();
    
    // Find user in database
    const user = await User.findById(decoded.userId)
      .populate({
        path: 'tarotReadings',
        options: { sort: { createdAt: -1 } }
      });
    
    if (!user) {
      console.log('User not found:', decoded.userId);
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }
    
    console.log('User found:', user.email);
    
    // Format user data for response
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.image || user.profileImage,
      createdAt: user.createdAt,
      readingsCount: user.readingsCount || 0,
      role: user.role || 'user',
      location: user.location || '',
      tarotReadings: user.tarotReadings || []
    };
    
    return NextResponse.json(
      { 
        success: true,
        user: userData
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error fetching user information:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error. Please try again later.'
      },
      { status: 500 }
    );
  }
} 