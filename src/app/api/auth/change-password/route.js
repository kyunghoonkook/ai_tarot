import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function PUT(request) {
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
    
    // 요청 본문 파싱
    const body = await request.json();
    const { currentPassword, newPassword } = body;
    
    // 필수 필드 검증
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: '현재 비밀번호와 새 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }
    
    // 새 비밀번호 길이 검증
    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: '비밀번호는 최소 8자 이상이어야 합니다.' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // 사용자 찾기 (비밀번호 필드 포함)
    const user = await User.findById(decoded.userId).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    // 현재 비밀번호 일치 여부 확인
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: '현재 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }
    
    // 새 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // 사용자 비밀번호 업데이트
    user.password = hashedPassword;
    await user.save();
    
    return NextResponse.json(
      { 
        success: true, 
        message: '비밀번호가 성공적으로 변경되었습니다.'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('비밀번호 변경 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.'
      },
      { status: 500 }
    );
  }
} 