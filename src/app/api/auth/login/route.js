import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { email, password } = body;
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please enter both email and password.' },
        { status: 400 }
      );
    }
    
    // Find user in database
    const user = await User.findOne({ email }).select('+password');
    
    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }
    
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user._id.toString());
    
    // Create response without password
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      readingsCount: user.readingsCount,
      createdAt: user.createdAt
    };
    
    // Create response
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login successful.',
        user: userWithoutPassword,
      },
      { status: 200 }
    );
    
    // Set auth cookie
    setAuthCookie(response, token);
    
    return response;
    
  } catch (error) {
    console.error('Error during login:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error. Please try again later.'
      },
      { status: 500 }
    );
  }
} 