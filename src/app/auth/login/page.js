'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'Login failed. Please try again.';
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      // Google login implementation
      router.push('/');
    } catch (err) {
      setError(getErrorMessage(err.code));
      setLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      // Kakao login implementation
      router.push('/');
    } catch (err) {
      setError(getErrorMessage(err.code));
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your email address"
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <div className={styles.forgotPassword}>
            <Link href="/auth/reset-password">Forgot password?</Link>
          </div>
          
          <button 
            type="submit" 
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {/* <div className={styles.socialLogin}>
          <p className={styles.socialText}>or</p>
          <div className={styles.socialButtons}>
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              className={`${styles.socialButton} ${styles.google}`}
              disabled={loading}
            >
              Login with Google
            </button>
            <button 
              type="button" 
              onClick={handleKakaoLogin}
              className={`${styles.socialButton} ${styles.kakao}`}
              disabled={loading}
            >
              Login with Kakao
            </button>
          </div>
        </div> */}
        
        <div className={styles.register}>
          <span>Don't have an account? </span>
          <Link href="/auth/register">Register</Link>
        </div>
      </div>
    </div>
  );
} 