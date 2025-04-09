'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

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
    location: ''
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
      setIsLoading(true);
      try {
        const response = await fetch('/api/auth/user', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
          setTarotReadings(data.readings || []);
          setProfileData({
            name: data.user.name || '',
            location: data.user.location || ''
          });
        } else {
          throw new Error(data.message || 'Failed to load user information');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Failed to load user information');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (authUser) {
      fetchUserData();
    }
  }, [authUser]);
  
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
          location: profileData.location
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

  // Render tarot readings section
  const renderTarotReadings = () => {
    if (tarotReadings.length === 0) {
      return (
        <div className={styles.emptyReadings}>
          <p>You haven't saved any readings yet.</p>
          <Link href="/cards" className={styles.button}>
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
                {reading.cards.map((card, idx) => (
                  <div key={idx} className={styles.cardItem}>
                    <div className={styles.cardNumber}>{card}</div>
                    <div className={styles.cardName}>{getCardName(card)}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.readingInterpretation}>
              <strong>Interpretation:</strong>
              <p>{reading.interpretation}</p>
            </div>
            
            <Link 
              href={`/${reading.type.split(' ')[0].toLowerCase()}/${reading.design || 'Beauty'}/result/${reading.cards.join(',')}`}
              className={styles.viewReadingButton}
            >
              View Full Reading
            </Link>
          </div>
        ))}
      </div>
    );
  };
  
  if (isLoading && !user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (error && !user) {
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
                <div className={styles.avatarPlaceholder}>{user.name.charAt(0).toUpperCase()}</div>
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