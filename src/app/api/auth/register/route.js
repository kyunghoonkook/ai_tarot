import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { name, email, password } = body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all fields.' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    
    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email is already registered.' },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
      readingsCount: 0,
      image: null
    });
    
    // Generate JWT token
    const token = generateToken(user._id.toString());
    
    // Create response
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful.', 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.image,
          readingsCount: user.readingsCount,
          role: user.role,
          createdAt: user.createdAt
        }
      },
      { status: 201 }
    );
    
    // Set auth cookie
    setAuthCookie(response, token);
    
    return response;
    
  } catch (error) {
    console.error('Error during registration:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error. Please try again later.'
      },
      { status: 500 }
    );
  }
} 