import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import TarotReading from '@/models/TarotReading';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    // console.log('Processing request to fetch tarot readings');
    // 인증 토큰 확인
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      // console.log('No authentication token found');
      return NextResponse.json(
        { success: false, message: 'Authentication required.' },
        { status: 401 }
      );
    }
    
    // 토큰 검증
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      // console.log('Invalid authentication token');
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token.' },
        { status: 401 }
      );
    }
    
    // console.log('Token verified, user ID:', decoded.userId);
    await connectToDatabase();
    
    // 사용자 조회 및 타로 리딩 필드 확인
    const user = await User.findById(decoded.userId)
      .select('tarotReadings readingsCount')
      .populate({
        path: 'tarotReadings',
        options: { sort: { createdAt: -1 } }
      });
    
    if (!user) {
      // console.log('User not found');
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }
    
    // console.log(`Found user with ${user.tarotReadings ? user.tarotReadings.length : 0} readings`);
    
    // 타로 리딩이 없는 경우 빈 배열 반환
    if (!user.tarotReadings || user.tarotReadings.length === 0) {
      // console.log('No readings found for user');
      return NextResponse.json({
        success: true,
        readings: []
      });
    }
    
    // console.log(`Returning ${user.tarotReadings.length} readings`);
    return NextResponse.json({
      success: true,
      readings: user.tarotReadings,
      count: user.readingsCount || 0
    });
    
  } catch (error) {
    console.error('Error fetching tarot readings:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error. Please try again later.'
      },
      { status: 500 }
    );
  }
} 