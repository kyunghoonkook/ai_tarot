import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Set JWT cookie
export const setAuthCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };

  res.cookies.set('auth-token', token, cookieOptions);
};

// Get user ID from request
export const getUserFromRequest = (req) => {
  try {
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }
    
    const decoded = verifyToken(token);
    return decoded?.userId || null;
  } catch (error) {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = async (req) => {
  const userId = getUserFromRequest(req);
  return !!userId;
};

// Get token from Next.js cookies
export const getTokenFromCookies = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');
  return token?.value || null;
};

// Remove auth cookie
export const removeAuthCookie = (res) => {
  res.cookies.set('auth-token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
}; 