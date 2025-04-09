import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    console.log('로그인 API 호출됨');
    await connectToDatabase();
    
    const body = await request.json();
    const { email, password } = body;
    
    console.log('로그인 시도:', email);
    
    // Validate required fields
    if (!email || !password) {
      console.log('이메일 또는 비밀번호 누락');
      return NextResponse.json(
        { success: false, message: 'Please enter both email and password.' },
        { status: 400 }
      );
    }
    
    // Find user in database
    const user = await User.findOne({ email }).select('+password');
    
    // Check if user exists
    if (!user) {
      console.log('사용자를 찾을 수 없음:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }
    
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      console.log('비밀번호 불일치:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user._id.toString());
    console.log('토큰 생성됨:', user._id.toString());
    
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
    console.log('인증 쿠키 설정됨');
    
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