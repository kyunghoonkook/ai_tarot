import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function PUT(request) {
  try {
    // Get auth token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required.' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token.' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { name, location, profileImage } = body;
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Name is required.' },
        { status: 400 }
      );
    }
    
    // Validate profile image URL if provided
    if (profileImage && !isValidUrl(profileImage)) {
      return NextResponse.json(
        { success: false, message: 'Invalid profile image URL.' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { 
        name,
        location: location || '',
        profileImage: profileImage || null
      },
      { new: true } // Return the updated document
    );
    
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }
    
    // Return updated user data
    return NextResponse.json(
      { 
        success: true, 
        message: 'Profile updated successfully.',
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          profileImage: updatedUser.profileImage || null,
          location: updatedUser.location,
          readingsCount: updatedUser.readingsCount || 0,
          createdAt: updatedUser.createdAt
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error updating profile:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Helper function to validate URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
} 