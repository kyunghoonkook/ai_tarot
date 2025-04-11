import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import TarotReading from '@/models/TarotReading';
import { verifyToken } from '@/lib/auth';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    // console.log('사용자 API 호출됨');
    // Get auth token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      // console.log('인증 토큰 없음');
      return NextResponse.json(
        { success: false, message: 'Authentication required.' },
        { status: 401 }
      );
    }
    
    // console.log('토큰 검증 시작');
    
    // Verify token
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      // console.log('토큰 검증 실패');
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token.' },
        { status: 401 }
      );
    }
    
    // console.log('토큰 검증 성공, 사용자 ID:', decoded.userId);
    await connectToDatabase();
    
    // Find user in database
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      // console.log('사용자를 찾을 수 없음:', decoded.userId);
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }
    
    // console.log('사용자 찾음:', user.email);
    
    // Find user's tarot readings
    try {
      // console.log('타로 리딩 조회 시도');
      // console.log('TarotReading 모델 함수 확인:', typeof TarotReading.findByUserId);
      
      // 직접 조회 시도
      await connectToDatabase();
      const readings = await mongoose.model('TarotReading').find({ 
        userId: user._id 
      }).sort({ createdAt: -1 });
      
      // console.log('타로 리딩 직접 조회 성공, 개수:', readings.length);
      
      // Format user data for response
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.image || user.profileImage,
        createdAt: user.createdAt,
        readingsCount: user.readingsCount || 0,
        role: user.role || 'user',
        location: user.location || ''
      };
      
      return NextResponse.json(
        { 
          success: true,
          user: userData,
          readings: readings
        },
        { status: 200 }
      );
    } catch (readingError) {
      console.error('타로 리딩 조회 실패:', readingError);
      
      // 타로 리딩 조회 실패해도 사용자 정보는 반환
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.image || user.profileImage,
        createdAt: user.createdAt,
        readingsCount: user.readingsCount || 0,
        role: user.role || 'user',
        location: user.location || ''
      };
      
      return NextResponse.json(
        { 
          success: true,
          user: userData,
          readings: []
        },
        { status: 200 }
      );
    }
    
  } catch (error) {
    console.error('사용자 정보 가져오기 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error. Please try again later.'
      },
      { status: 500 }
    );
  }
} 