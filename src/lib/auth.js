import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

// Generate JWT token
export const generateToken = (userId) => {
//   console.log('JWT_SECRET 길이:', JWT_SECRET.length);
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    // console.log('토큰 검증 시도');
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log('토큰 검증 성공:', decoded.userId);
    return decoded;
  } catch (error) {
    // console.error('토큰 검증 실패:', error.message);
    return null;
  }
};

// Set JWT cookie
export const setAuthCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // CSRF 보호와 소셜 로그인 호환성 사이에서 타협
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };

//   console.log('쿠키 설정 옵션:', JSON.stringify(cookieOptions));
  res.cookies.set('auth-token', token, cookieOptions);
};

// Get user ID from request
export const getUserFromRequest = (req) => {
  try {
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
    //   console.log('토큰이 없음');
      return null;
    }
    
    const decoded = verifyToken(token);
    return decoded?.userId || null;
  } catch (error) {
    console.error('getUserFromRequest 에러:', error.message);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = async (req) => {
  const userId = getUserFromRequest(req);
//   console.log('인증 상태 확인:', !!userId);
  return !!userId;
};

// Get token from Next.js cookies
export const getTokenFromCookies = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');
  if (token) {
    // console.log('쿠키에서 토큰 찾음');
  } else {
    // console.log('쿠키에서 토큰 없음');
  }
  return token?.value || null;
};

// Remove auth cookie
export const removeAuthCookie = (res) => {
//   console.log('인증 쿠키 제거');
  res.cookies.set('auth-token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
}; 