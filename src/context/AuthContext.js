'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Load user data from API if authenticated
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // console.log('사용자 데이터 로드 시도');
        const res = await fetch('/api/auth/user');
        const data = await res.json();

        if (res.ok && data.success) {
          // console.log('사용자 데이터 로드 성공:', data.user.email);
          setUser(data.user);
        } else {
          // console.log('사용자 데이터 로드 실패:', data.message);
          setUser(null);
        }
      } catch (error) {
        // console.error('사용자 데이터 로드 중 오류:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // console.log('회원가입 시도:', userData.email);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // console.log('회원가입 성공:', data.user.email);
        setUser(data.user);
        router.push('/');
        return { success: true };
      } else {
        // console.log('회원가입 실패:', data.message);
        setError(data.message || 'Registration failed');
        return { success: false, message: data.message };
      }
    } catch (error) {
      // console.error('회원가입 오류:', error);
      setError('An error occurred during registration. Please try again.');
      return { success: false, message: 'An error occurred during registration' };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // console.log('로그인 시도:', email);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // 쿠키 포함
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // console.log('로그인 성공:', data.user.email);
        setUser(data.user);
        router.push('/');
        return { success: true };
      } else {
        // console.log('로그인 실패:', data.message);
        setError(data.message || 'Login failed');
        return { success: false, message: data.message };
      }
    } catch (error) {
      // console.error('로그인 오류:', error);
      setError('An error occurred during login. Please try again.');
      return { success: false, message: 'An error occurred during login' };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);

    try {
      // console.log('로그아웃 시도');
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // 쿠키 포함
      });

      if (res.ok) {
        // console.log('로그아웃 성공');
        setUser(null);
        router.push('/');
      } else {
        // console.log('로그아웃 실패');
      }
    } catch (error) {
      // console.error('로그아웃 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; 