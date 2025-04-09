import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import TarotReading from '@/models/TarotReading';
import { verifyToken } from '@/lib/auth';

export async function DELETE(request) {
  try {
    // 쿠키에서 인증 토큰 가져오기
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }
    
    // 토큰 검증
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 인증 토큰입니다.' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    // 사용자 찾기
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    // 사용자의 타로 리딩 기록 삭제
    await TarotReading.deleteMany({ userId: decoded.userId });
    
    // 사용자 계정 삭제
    await User.findByIdAndDelete(decoded.userId);
    
    // 쿠키 삭제 (로그아웃)
    const response = NextResponse.json(
      { 
        success: true, 
        message: '계정이 성공적으로 삭제되었습니다.'
      },
      { status: 200 }
    );
    
    response.cookies.delete('auth-token');
    
    return response;
    
  } catch (error) {
    console.error('계정 삭제 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.'
      },
      { status: 500 }
    );
  }
} 