import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import TarotReading from '@/models/TarotReading';
import { verifyToken } from '@/lib/auth';

export async function POST(request) {
  try {
    // 인증 토큰 확인
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required.' },
        { status: 401 }
      );
    }
    
    // 토큰 검증
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token.' },
        { status: 401 }
      );
    }
    
    // 요청 본문 파싱
    const body = await request.json();
    const { type, question, cards, interpretation, design } = body;
    
    // 필수 필드 검증
    if (!type || !cards || !interpretation) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing.' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // 사용자 조회
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }
    
    // 타로 리딩 저장
    const newReading = new TarotReading({
      userId: decoded.userId,
      type: `${type} Tarot`,
      question: question || `${type} Reading`,
      cards: cards,
      interpretation: interpretation,
      design: design || 'Beauty',
    });
    
    console.log('저장할 타로 리딩:', {
      userId: decoded.userId,
      type: `${type} Tarot`,
      cards: cards,
      design: design || 'Beauty'
    });
    
    try {
      await newReading.save();
      console.log('타로 리딩 저장 성공, ID:', newReading._id);
    } catch (saveError) {
      console.error('타로 리딩 저장 실패:', saveError);
      return NextResponse.json(
        { success: false, message: 'Failed to save reading: ' + saveError.message },
        { status: 500 }
      );
    }
    
    // 사용자의 readingsCount 증가
    user.readingsCount = (user.readingsCount || 0) + 1;
    await user.save();
    
    // 사용자의 타로 리딩 수 제한 (최대 10개까지 유지)
    try {
      const userReadings = await TarotReading.find({ userId: decoded.userId }).sort({ createdAt: -1 });
      console.log('사용자 리딩 조회 성공, 개수:', userReadings.length);
      
      if (userReadings.length > 10) {
        // 가장 오래된 리딩 삭제 (정렬은 이미 최신순으로 되어 있으므로 마지막 항목부터 삭제)
        const readingsToDelete = userReadings.slice(10);
        console.log('삭제할 리딩 수:', readingsToDelete.length);
        
        for (const reading of readingsToDelete) {
          await TarotReading.findByIdAndDelete(reading._id);
          console.log('오래된 리딩 삭제:', reading._id);
        }
      }
    } catch (cleanupError) {
      console.error('오래된 리딩 정리 중 오류 (무시됨):', cleanupError);
      // 리딩 정리 오류는 무시하고 계속 진행 (새 리딩은 저장되었으므로)
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Tarot reading saved successfully.',
        reading: newReading
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error saving tarot reading:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error. Please try again later.'
      },
      { status: 500 }
    );
  }
} 