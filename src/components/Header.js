'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };
  
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/images/logo1.svg" alt="AI Tarot" className={styles.logo} />
          </Link>
        </div>
        
        <nav className={styles.mainNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/major" className={styles.navLink}>
                Major Tarot
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/[theme]" as="/love" className={styles.navLink}>
                Love Tarot
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/[theme]" as="/career" className={styles.navLink}>
                Career Tarot
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/guide" className={styles.navLink}>
                Tarot Guide
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/blog" className={styles.navLink}>
                Blog
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/faq" className={styles.navLink}>
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className={styles.userActions}>
          {isAuthenticated && (
            <button 
              className={styles.notificationButton} 
              aria-label="Notifications"
              onClick={() => {/* Notification feature implementation */}}
            >
              <span className={styles.notificationIcon}>🔔</span>
            </button>
          )}
          
          <div className={styles.userMenuContainer}>
            <button 
              className={styles.userButton} 
              onClick={toggleUserMenu}
              aria-expanded={isUserMenuOpen}
            >
              <span className={styles.userIcon}>
                {isAuthenticated ? (
                  user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className={styles.userAvatar} 
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )
                ) : (
                  '👤'
                )}
              </span>
            </button>
            
            {isUserMenuOpen && (
              <div className={styles.userDropdown}>
                {isAuthenticated ? (
                  <>
                    <div className={styles.userInfo}>
                      <p className={styles.userName}>{user.name}</p>
                      <p className={styles.userEmail}>{user.email}</p>
                    </div>
                    <Link href="/auth/mypage" className={styles.userMenuItem}>
                      My Page
                    </Link>
                    <button 
                      className={styles.userMenuItem} 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className={styles.userMenuItem}>
                      Login
                    </Link>
                    <Link href="/auth/register" className={styles.userMenuItem}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Menu"
        >
          <span className={styles.menuIcon}></span>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav>
            <ul className={styles.mobileNavList}>
              <li>
                <Link href="/major" className={styles.mobileNavLink}>
                  Major Tarot
                </Link>
              </li>
              <li>
                <Link href="/[theme]" as="/love" className={styles.mobileNavLink}>
                  Love Tarot
                </Link>
              </li>
              <li>
                <Link href="/[theme]" as="/career" className={styles.mobileNavLink}>
                  Career Tarot
                </Link>
              </li>
              <li>
                <Link href="/guide" className={styles.mobileNavLink}>
                  Tarot Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className={styles.mobileNavLink}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className={styles.mobileNavLink}>
                  FAQ
                </Link>
              </li>
              <li className={styles.mobileUserSection}>
                {isAuthenticated ? (
                  <>
                    <Link href="/auth/mypage" className={styles.mobileNavLink}>
                      My Page
                    </Link>
                    <button 
                      className={`${styles.mobileNavLink} ${styles.logoutButton}`} 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className={styles.mobileNavLink}>
                      Login
                    </Link>
                    <Link href="/auth/register" className={styles.mobileNavLink}>
                      Register
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 