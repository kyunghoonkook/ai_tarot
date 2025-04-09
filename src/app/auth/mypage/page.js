'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import { generatePDF } from '@/utils/pdfGenerator';

export default function MyPage() {
  const router = useRouter();
  const { user: authUser, logout } = useAuth();
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [tarotReadings, setTarotReadings] = useState([]);
  
  // 프로필 편집 상태
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    location: '',
    profileImage: ''
  });
  
  // 비밀번호 변경 상태
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  // 계정 삭제 상태
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  
  useEffect(() => {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!authUser && !isLoading) {
      router.push('/auth/login');
    }
  }, [authUser, isLoading, router]);
  
  useEffect(() => {
    // 실제 사용자 데이터와 타로 리딩 정보 가져오기
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // 먼저 새 API 엔드포인트 시도
        let response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        // 실패하면 이전 API 엔드포인트로 시도
        if (!response.ok && response.status === 404) {
          console.log('Falling back to legacy API endpoint');
          response = await fetch('/api/auth/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
        }
        
        if (!response.ok) {
          if (response.status === 401) {
            // 로그인 필요시 리다이렉트
            router.push('/auth/login?redirect=/auth/mypage');
            return;
          }
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUser(data.user);
        
        // 유저의 tarotReadings 배열이 있는 경우 해당 ID로 타로 리딩 가져오기
        if (data.user && data.user.tarotReadings && data.user.tarotReadings.length > 0) {
          // 새 API에서는 이미 타로 리딩이 포함되어 있음
          if (Array.isArray(data.user.tarotReadings)) {
            setTarotReadings(data.user.tarotReadings);
          } else {
            // 이전 API에서는 별도 호출 필요
            const readingsResponse = await fetch('/api/tarot/get-readings', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
            
            if (readingsResponse.ok) {
              const readingsData = await readingsResponse.json();
              setTarotReadings(readingsData.readings);
            } else {
              console.error('Failed to fetch tarot readings:', await readingsResponse.text());
            }
          }
        } else if (data.readings) {
          // 이전 API에서는 readings가 응답에 포함됨
          setTarotReadings(data.readings);
        } else {
          setTarotReadings([]);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load user data. Please try again.');
        setIsLoading(false);
      }
    };
    
    if (authUser) {
      fetchUserData();
    }
  }, [authUser, router]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 탭 변경 시 편집 모드 해제
    setIsEditing(false);
    setIsChangingPassword(false);
    setIsDeleting(false);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      setError('An error occurred during logout.');
    }
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(prev => ({
          ...prev,
          name: profileData.name,
          location: profileData.location,
          profileImage: profileData.profileImage
        }));
        setIsEditing(false);
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    
    // 비밀번호 유효성 검사
    if (passwordData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPasswordSuccess('Password changed successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        // 3초 후 성공 메시지 제거
        setTimeout(() => {
          setPasswordSuccess('');
          setIsChangingPassword(false);
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to change password');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setPasswordError(err.message || 'Error changing password');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== user.email) {
      setError('Please enter your email correctly to confirm account deletion');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        await logout();
        router.push('/');
      } else {
        throw new Error(data.message || 'Failed to delete account');
      }
    } catch (err) {
      console.error('Error deleting account:', err);
      setError(err.message || 'Error deleting account');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Function to get card name from card number
  const getCardName = (cardNumber) => {
    const majorArcanaNames = {
      '00': 'The Fool',
      '01': 'The Magician',
      '02': 'The High Priestess',
      '03': 'The Empress',
      '04': 'The Emperor',
      '05': 'The Hierophant',
      '06': 'The Lovers',
      '07': 'The Chariot',
      '08': 'Strength',
      '09': 'The Hermit',
      '10': 'Wheel of Fortune',
      '11': 'Justice',
      '12': 'The Hanged Man',
      '13': 'Death',
      '14': 'Temperance',
      '15': 'The Devil',
      '16': 'The Tower',
      '17': 'The Star',
      '18': 'The Moon',
      '19': 'The Sun',
      '20': 'Judgement',
      '21': 'The World'
    };
    
    // Handle reversed cards (marked with 'r' suffix)
    if (cardNumber.endsWith('r')) {
      const baseCard = cardNumber.slice(0, -1);
      return `${majorArcanaNames[baseCard]} (Reversed)`;
    }
    
    return majorArcanaNames[cardNumber] || `Card ${cardNumber}`;
  };
  
  // Function to format interpretation text
  const formatInterpretation = (text) => {
    if (!text) return '';
    
    // 마크다운 헤딩 형식(###)을 HTML로 변환
    let formatted = text.replace(/###\s+(.*?)(?=\n|$)/g, '<h3>$1</h3>');
    formatted = formatted.replace(/####\s+(.*?)(?=\n|$)/g, '<h4>$1</h4>');
    
    // 단락 구분
    formatted = formatted.split('\n\n').map(para => `<p>${para}</p>`).join('');
    
    // 줄바꿈
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  };

  // Render tarot readings section
  const renderTarotReadings = () => {
    console.log('타로 리딩 렌더링 시도:', tarotReadings);
    
    if (!tarotReadings || tarotReadings.length === 0) {
      return (
        <div className={styles.emptyReadings}>
          <p>You haven't saved any readings yet.</p>
          <Link href="/Love" className={styles.button}>
            Get Your First Reading
          </Link>
        </div>
      );
    }
    
    return (
      <div className={styles.readingsList}>
        {tarotReadings.map((reading, index) => (
          <div key={index} className={styles.readingCard}>
            <div className={styles.readingHeader}>
              <h3>{reading.type}</h3>
              <span className={styles.readingDate}>{formatDate(reading.createdAt || reading.savedDate)}</span>
            </div>
            
            <div className={styles.readingQuestion}>
              <strong>Question:</strong> {reading.question}
            </div>
            
            <div className={styles.cardsList}>
              <strong>Cards:</strong>
              <div className={styles.cardsDisplay}>
                {reading.cards && reading.cards.length > 0 ? (
                  reading.cards.map((card, idx) => (
                    <div key={idx} className={styles.cardItem}>
                      <div className={styles.cardImage}>
                        <img 
                          src={`/images/${reading.design || 'Beauty'}/${card.endsWith('r') ? 'reversed/' : ''}${card.replace('r', '')}.jpg`} 
                          alt={getCardName(card)}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/symbolBG.png';
                          }}
                        />
                      </div>
                      <div className={styles.cardNumber}>{card}</div>
                      <div className={styles.cardName}>{getCardName(card)}</div>
                    </div>
                  ))
                ) : (
                  <div className={styles.cardItem}>
                    <div className={styles.cardName}>No cards available</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.readingInterpretation}>
              <strong>Interpretation:</strong>
              <div 
                className={styles.interpretationText}
                dangerouslySetInnerHTML={{ __html: formatInterpretation(reading.interpretation) }}
              />
            </div>
            
            <button 
              className={styles.saveAsPdfButton}
              onClick={() => generatePDF(reading.cards, reading.interpretation, reading.type.split(' ')[0], reading.design || 'Beauty')}
            >
              Save as PDF
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  if (isLoading && !user) {
    return (
      <div className={styles.myPageContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (error && !user) {
    return (
      <div className={styles.myPageContainer}>
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
      </div>
    );
  }
  
  if (!user) {
    return null; // 사용자 정보가 로드되지 않은 경우 아무것도 표시하지 않음 (로그인 페이지로 리다이렉트됨)
  }
  
  return (
    <div className={styles.myPageContainer}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
              )}
            </div>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userSince}>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            <p className={styles.readingsCount}>Total Readings: {user.readingsCount}</p>
            {user.location && <p className={styles.userLocation}>Location: {user.location}</p>}
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
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className={styles.mainContent}>
          {error && <div className={styles.error}>{error}</div>}
          
          {activeTab === 'profile' && (
            <div className={styles.profileSection}>
              <h2 className={styles.sectionTitle}>My Profile</h2>
              {!isEditing ? (
                <div className={styles.profileInfo}>
                  <div className={styles.profileItem}>
                    <span className={styles.profileLabel}>Name:</span>
                    <span className={styles.profileValue}>{user.name}</span>
                  </div>
                  <div className={styles.profileItem}>
                    <span className={styles.profileLabel}>Email:</span>
                    <span className={styles.profileValue}>{user.email}</span>
                  </div>
                  {user.location && (
                    <div className={styles.profileItem}>
                      <span className={styles.profileLabel}>Location:</span>
                      <span className={styles.profileValue}>{user.location}</span>
                    </div>
                  )}
                  <button className={styles.button} onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className={styles.profileForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Profile Image URL</label>
                    <input
                      type="text"
                      name="profileImage"
                      className={styles.input}
                      value={profileData.profileImage}
                      onChange={handleProfileChange}
                      placeholder="https://example.com/your-profile-image.jpg"
                    />
                    <small className={styles.helpText}>Enter a URL to an image (leave empty for default icon)</small>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Name</label>
                    <input
                      type="text"
                      name="name"
                      className={styles.input}
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      className={styles.input}
                      value={user.email}
                      readOnly
                      disabled
                    />
                    <small className={styles.helpText}>Email cannot be changed</small>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Location</label>
                    <input
                      type="text"
                      name="location"
                      className={styles.input}
                      value={profileData.location}
                      onChange={handleProfileChange}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData({
                          name: user.name,
                          location: user.location || '',
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className={styles.saveButton} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === 'readings' && (
            <section className={styles.readingsSection}>
              <h2 className={styles.sectionTitle}>My Tarot Readings</h2>
              {isLoading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p>Loading your readings...</p>
                </div>
              ) : (
                renderTarotReadings()
              )}
            </section>
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
                  {!isChangingPassword ? (
                    <button className={styles.button} onClick={() => setIsChangingPassword(true)}>
                      Change Password
                    </button>
                  ) : (
                    <form onSubmit={handleChangePassword} className={styles.passwordForm}>
                      {passwordError && <div className={styles.formError}>{passwordError}</div>}
                      {passwordSuccess && (
                        <div className={styles.formSuccess}>{passwordSuccess}</div>
                      )}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          className={styles.input}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          className={styles.input}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={8}
                        />
                        <small className={styles.helpText}>
                          Password must be at least 8 characters long
                        </small>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className={styles.input}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div className={styles.buttonGroup}>
                        <button
                          type="button"
                          className={styles.cancelButton}
                          onClick={() => {
                            setIsChangingPassword(false);
                            setPasswordData({
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: '',
                            });
                            setPasswordError('');
                            setPasswordSuccess('');
                          }}
                        >
                          Cancel
                        </button>
                        <button type="submit" className={styles.saveButton} disabled={isLoading}>
                          {isLoading ? 'Changing...' : 'Change Password'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className={styles.settingItem}>
                  <h3 className={styles.settingTitle}>Delete Account</h3>
                  <p className={styles.settingDescription}>
                    All your data will be permanently deleted. This action cannot be undone.
                  </p>
                  {!isDeleting ? (
                    <button
                      className={`${styles.button} ${styles.dangerButton}`}
                      onClick={() => setIsDeleting(true)}
                    >
                      Delete Account
                    </button>
                  ) : (
                    <div className={styles.deleteConfirmation}>
                      <p className={styles.deleteWarning}>
                        This action is permanent and cannot be undone. All your data, including
                        reading history, will be deleted.
                      </p>
                      <p>
                        To confirm, please enter your email address: <strong>{user.email}</strong>
                      </p>
                      <input
                        type="email"
                        className={styles.input}
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        placeholder="Enter your email to confirm"
                      />
                      <div className={styles.buttonGroup}>
                        <button
                          type="button"
                          className={styles.cancelButton}
                          onClick={() => {
                            setIsDeleting(false);
                            setDeleteConfirmation('');
                            setError('');
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className={`${styles.button} ${styles.dangerButton}`}
                          onClick={handleDeleteAccount}
                          disabled={isLoading || deleteConfirmation !== user.email}
                        >
                          {isLoading ? 'Deleting...' : 'Permanently Delete Account'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 