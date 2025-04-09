'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [tarotReadings, setTarotReadings] = useState([]);
  
  // 임시 데이터: 실제로는 API에서 가져와야 함
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    profileImage: null,
    createdAt: '2023-01-15',
    readingsCount: 12
  };
  
  const mockReadings = [
    {
      id: '1',
      type: 'Major Tarot',
      question: 'What does my future hold?',
      date: '2023-04-05',
      cards: ['The Fool', 'The Magician', 'The High Priestess'],
      interpretation: 'New opportunities await you...',
    },
    {
      id: '2',
      type: 'Love Tarot',
      question: 'How will my current relationship progress?',
      date: '2023-04-02',
      cards: ['The Lovers', 'The Sun', 'The World'],
      interpretation: 'Your relationship is heading in a very positive direction...',
    },
    {
      id: '3',
      type: 'Career Tarot',
      question: 'Should I pursue a new job opportunity?',
      date: '2023-03-28',
      cards: ['The Chariot', 'Strength', 'The Star'],
      interpretation: 'A new challenge has a high chance of success...',
    },
  ];
  
  useEffect(() => {
    // 실제 구현에서는 API를 호출하여 사용자 정보와 타로 리딩 기록 가져오기
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // 실제로는 아래와 같은 API 호출
        // const response = await fetch('/api/auth/user');
        // const userData = await response.json();
        // setUser(userData);
        
        // 임시 데이터 사용
        setTimeout(() => {
          setUser(mockUser);
          setTarotReadings(mockReadings);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load user information.');
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출 (실제 구현에서는 사용)
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      // 로그아웃 후 홈으로 리다이렉트
      router.push('/');
    } catch (err) {
      setError('An error occurred during logout.');
    }
  };
  
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
        <button 
          className={styles.button} 
          onClick={() => router.push('/')}
        >
          Return to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>My Page</h1>
      </div>
      
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userSince}>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            <p className={styles.readingsCount}>Total Readings: {user.readingsCount}</p>
          </div>
          
          <div className={styles.navigation}>
            <button
              className={`${styles.navButton} ${activeTab === 'profile' ? styles.active : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              My Profile
            </button>
            <button
              className={`${styles.navButton} ${activeTab === 'readings' ? styles.active : ''}`}
              onClick={() => handleTabChange('readings')}
            >
              Tarot Reading History
            </button>
            <button
              className={`${styles.navButton} ${activeTab === 'settings' ? styles.active : ''}`}
              onClick={() => handleTabChange('settings')}
            >
              Settings
            </button>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className={styles.mainContent}>
          {activeTab === 'profile' && (
            <div className={styles.profileSection}>
              <h2 className={styles.sectionTitle}>My Profile</h2>
              <div className={styles.profileForm}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Name</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    defaultValue={user.name} 
                    readOnly 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input 
                    type="email" 
                    className={styles.input} 
                    defaultValue={user.email} 
                    readOnly 
                  />
                </div>
                <button className={styles.button}>
                  Edit Profile
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'readings' && (
            <div className={styles.readingsSection}>
              <h2 className={styles.sectionTitle}>Tarot Reading History</h2>
              {tarotReadings.length > 0 ? (
                <div className={styles.readingsList}>
                  {tarotReadings.map((reading) => (
                    <div key={reading.id} className={styles.readingCard}>
                      <div className={styles.readingHeader}>
                        <span className={styles.readingType}>{reading.type}</span>
                        <span className={styles.readingDate}>{reading.date}</span>
                      </div>
                      <h3 className={styles.readingQuestion}>{reading.question}</h3>
                      <div className={styles.readingCards}>
                        {reading.cards.map((card, index) => (
                          <span key={index} className={styles.cardName}>
                            {card}
                          </span>
                        ))}
                      </div>
                      <p className={styles.readingInterpretation}>
                        {reading.interpretation}
                      </p>
                      <Link 
                        href={`/history/${reading.id}`} 
                        className={styles.viewButton}
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>You don't have any tarot reading history yet.</p>
                  <Link href="/major" className={styles.button}>
                    Start Your First Reading
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className={styles.settingsSection}>
              <h2 className={styles.sectionTitle}>Account Settings</h2>
              <div className={styles.settingsList}>
                <div className={styles.settingItem}>
                  <h3 className={styles.settingTitle}>Change Password</h3>
                  <p className={styles.settingDescription}>
                    Change your password regularly to keep your account secure.
                  </p>
                  <button className={styles.button}>
                    Change Password
                  </button>
                </div>
                <div className={styles.settingItem}>
                  <h3 className={styles.settingTitle}>Notification Settings</h3>
                  <p className={styles.settingDescription}>
                    Manage your email and push notification preferences.
                  </p>
                  <button className={styles.button}>
                    Manage Notifications
                  </button>
                </div>
                <div className={styles.settingItem}>
                  <h3 className={styles.settingTitle}>Delete Account</h3>
                  <p className={styles.settingDescription}>
                    All your data will be permanently deleted. This action cannot be undone.
                  </p>
                  <button className={`${styles.button} ${styles.dangerButton}`}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 