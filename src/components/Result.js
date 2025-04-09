'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/ResultPage.module.css';

// 유틸리티와 컴포넌트 임포트
import { formatCardNumber } from '../utils/cardData';
import { generatePDF } from '../utils/pdfGenerator';
import CardDisplay from './result/CardDisplay';
import LoadingSpinner from './result/LoadingSpinner';
import ResultContent from './result/ResultContent';
import ActionButtons from './result/ActionButtons';
import ShareButtons from './result/ShareButtons';

const Result = () => {
  const pathname = usePathname();
  const pathnameArray = pathname.split('/');
  const cardNumbers = pathnameArray[pathnameArray.length - 1]?.split(',') || [];
  
  // 상태 관리
  const [theme, setTheme] = useState('');
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [card3, setCard3] = useState('');
  const [design, setDesign] = useState('');
  const [response, setResponse] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showShareSuccessMessage, setShowShareSuccessMessage] = useState(false);
  const [unlockedSpecialCard, setUnlockedSpecialCard] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveAttempts, setSaveAttempts] = useState(0);
  
  const shareButtonsRef = useRef(null);

  // 공유 버튼 토글 핸들러
  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  // 클릭 이벤트 리스너
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (shareButtonsRef.current && !shareButtonsRef.current.contains(event.target)) {
        setShowShareButtons(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // 초기 데이터 설정 및 API 호출
  useEffect(() => {
    setTheme(pathnameArray[1]);
    setCard1(formatCardNumber(cardNumbers[0]));
    setCard2(formatCardNumber(cardNumbers[1]));
    setCard3(formatCardNumber(cardNumbers[2]));
    setDesign(pathnameArray[2]);
    setSelectedCards(cardNumbers);

    const fetchData = async () => {
      if (theme && card1 && card2 && card3) {
        try {
          setLoading(true);
          
          // EventSource를 사용한 스트리밍 응답 처리
          const response = await fetch('/api/tarot', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theme, card1, card2, card3 }),
          });
          
          // 응답이 스트림인지 확인
          if (!response.ok) {
            throw new Error(`서버 오류: ${response.status}`);
          }
          
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let result = '';
          
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              break;
            }
            
            // 청크 디코딩
            const chunk = decoder.decode(value, { stream: true });
            
            try {
              // 각 청크는 JSON 형식일 수 있음
              const parsedChunk = JSON.parse(chunk);
              if (parsedChunk.message) {
                // 이전 응답에 새 청크를 추가
                result = parsedChunk.message;
                setResponse(result);
              }
            } catch (e) {
              // 청크가 유효한 JSON이 아닌 경우 그대로 추가
              // console.log('청크 파싱 오류, 원시 데이터 사용:', e);
              result += chunk;
            }
          }
          
          setLoading(false);
          
          // 타로 리딩 결과 저장 시도 (로그인한 경우에만)
          saveReadingResult();
        } catch (err) {
          console.error('타로 읽기 오류:', err);
          setError('An error occurred while retrieving your tarot reading. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [pathname, theme, card1, card2, card3]);

  // 타로 리딩 결과 저장 함수
  const saveReadingResult = async () => {
    if (saveStatus === 'success' || saveAttempts >= 5) {
      return;
    }
    
    try {
      if (!response || response.trim() === '' || loading) {
        console.log(`타로 리딩 결과가 아직 준비되지 않았습니다. 5초 후 다시 시도합니다. (시도 ${saveAttempts + 1}/5)`);
        setTimeout(() => {
          setSaveAttempts(prev => prev + 1);
          saveReadingResult();
        }, 5000);
      } else {
        await performSave();
      }
    } catch (err) {
      console.error('타로 리딩 저장 오류:', err);
      setSaveStatus('error');
      setError('타로 리딩 결과 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 실제 저장 수행 함수
  const performSave = async () => {
    try {
      // HTML 태그 제거 (순수 텍스트만 저장)
      const plainTextInterpretation = response.replace(/<\/?[^>]+(>|$)/g, "");
      
      console.log('타로 리딩 저장 시도:', {
        responseLength: response.length,
        plainTextLength: plainTextInterpretation.length
      });
      
      // 내용이 너무 짧으면 저장하지 않음 (10자 이상으로 수정 - 더 완화)
      if (plainTextInterpretation.length < 10) {
        console.log('해석 내용이 너무 짧아 저장하지 않습니다:', plainTextInterpretation);
        setSaveStatus('error');
        return;
      }
      
      const saveResponse = await fetch('/api/tarot/save-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함
        body: JSON.stringify({
          type: theme,
          question: `${theme} Reading`,
          cards: selectedCards,
          interpretation: plainTextInterpretation,
          design: design
        }),
      });
      
      const saveData = await saveResponse.json();
      
      if (!saveResponse.ok) {
        console.error('타로 리딩 저장 실패:', {
          status: saveResponse.status,
          data: saveData
        });
        
        if (saveResponse.status === 401) {
          console.log('로그인이 필요합니다. 로그인 후 마이페이지에서 저장된 리딩을 볼 수 있습니다.');
          setSaveStatus('login_required');
          // 로그인 필요 메시지는 UI에 표시
        } else {
          setSaveStatus('error');
          setError('타로 리딩 저장 중 오류가 발생했습니다.');
        }
      } else {
        console.log('타로 리딩이 성공적으로 저장되었습니다:', saveData);
        setSaveStatus('success');
      }
    } catch (error) {
      console.error('타로 리딩 저장 실패 (클라이언트 오류):', error);
      setSaveStatus('error');
    }
  };

  // PDF 생성 핸들러
  const handleGeneratePDF = () => {
    generatePDF(selectedCards, response, theme, design);
  };

  // 공유 성공 핸들러
  const handleShareSuccess = () => {
    setShowShareSuccessMessage(true);
    setUnlockedSpecialCard(true);
    setTimeout(() => {
      setShowShareSuccessMessage(false);
    }, 5000);
  };

  // 공유 URL 및 콘텐츠
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = 'My AI Tarot Reading Result';
  const shareDescription = response;

  return (
    <div className={styles['result_wrap']}>
      <CardDisplay 
        selectedCards={selectedCards}
        design={design}
        theme={theme}
      />
      
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className={styles['error-message']}>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles['retry-button']}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <ResultContent 
              response={response}
              unlockedSpecialCard={unlockedSpecialCard}
              showShareSuccessMessage={showShareSuccessMessage}
            />

            {saveStatus === 'success' && (
              <div className={styles['save-success-message']}>
                <p>Your tarot reading has been saved! You can view it in your profile page.</p>
              </div>
            )}
            {saveStatus === 'login_required' && (
              <div className={styles['save-login-message']}>
                <p>Log in to save your tarot reading and view it later.</p>
                <a href="/auth/login" className={styles['login-button']}>Login</a>
              </div>
            )}
            {saveStatus === 'error' && saveAttempts >= 5 && (
              <div className={styles['save-error-message']}>
                <p>Failed to save your tarot reading. Please try again.</p>
                <button 
                  onClick={() => {
                    setSaveAttempts(0);
                    setSaveStatus(null);
                    saveReadingResult();
                  }} 
                  className={styles['retry-save-button']}
                >
                  Try Again
                </button>
              </div>
            )}

            <ActionButtons 
              onDownloadPDF={handleGeneratePDF}
              onToggleShare={toggleShareButtons}
            />

            <div ref={shareButtonsRef} className={styles['share-buttons-container']}>
              <ShareButtons 
                showShareButtons={showShareButtons}
                shareUrl={shareUrl}
                shareTitle={shareTitle}
                shareDescription={shareDescription}
                handleShareSuccess={handleShareSuccess}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Result; 