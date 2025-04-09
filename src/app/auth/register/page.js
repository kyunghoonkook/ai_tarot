'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    
    if (!formData.email) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    
    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 회원가입 API 호출
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const registerData = await registerResponse.json();
      
      // 회원가입 실패
      if (!registerResponse.ok) {
        throw new Error(registerData.message || '회원가입 중 오류가 발생했습니다.');
      }
      
      // 자동 로그인 처리
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const loginData = await loginResponse.json();
      
      if (!loginResponse.ok) {
        // 자동 로그인은 실패해도 회원가입은 성공했으므로 로그인 페이지로 안내
        console.log('자동 로그인 실패, 로그인 페이지로 이동');
        setSuccess(true);
        
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
        
        return;
      }
      
      // 로그인 상태 업데이트
      // 로그인 상태 업데이트 로직을 구현해야 합니다.
      
      // 홈페이지로 리다이렉트
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (err) {
      console.error('회원가입 오류:', err);
      setError(err.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Register</h1>
        
        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your name"
              disabled={loading}
            />
            {errors.name && <div className={styles.errorText}>{errors.name}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email address"
              disabled={loading}
            />
            {errors.email && <div className={styles.errorText}>{errors.email}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your password (at least 8 characters)"
              disabled={loading}
            />
            {errors.password && <div className={styles.errorText}>{errors.password}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              placeholder="Confirm your password"
              disabled={loading}
            />
            {errors.confirmPassword && <div className={styles.errorText}>{errors.confirmPassword}</div>}
          </div>
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={styles.checkbox}
              disabled={loading}
            />
            <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
              I agree to the <Link href="/terms" className={styles.termsLink}>Terms of Service</Link> and 
              <Link href="/privacy" className={styles.termsLink}> Privacy Policy</Link>.
            </label>
            {errors.agreeTerms && <div className={styles.errorText}>{errors.agreeTerms}</div>}
          </div>
          
          <button 
            type="submit" 
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>
        
        {/* <div className={styles.socialLogin}>
          <p className={styles.socialText}>Register with social account</p>
          <div className={styles.socialButtons}>
            <button className={`${styles.socialButton} ${styles.kakao}`}>
              Register with Kakao
            </button>
            <button className={`${styles.socialButton} ${styles.google}`}>
              Register with Google
            </button>
          </div>
        </div> */}
        
        <div className={styles.login}>
          <p>
            Already have an account? {' '}
            <Link href="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 