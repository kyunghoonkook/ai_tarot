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
    try {
      // 응답이 빈 경우 일정 시간(2초) 기다린 후 저장 시도
      if (!response || response.trim() === '') {
        // console.log('응답이 비어있어 2초 후 저장을 시도합니다.');
        setTimeout(async () => {
          if (response && response.trim() !== '') {
            await performSave();
          } else {
            // console.log('응답이 여전히 비어있어 저장하지 않습니다.');
          }
        }, 2000);
      } else {
        await performSave();
      }
    } catch (err) {
      console.error('타로 리딩 저장 오류:', err);
      // 저장 실패해도 사용자 경험에 영향 없도록 조용히 처리
    }
  };

  // 실제 저장 수행 함수
  const performSave = async () => {
    // HTML 태그 제거 (순수 텍스트만 저장)
    const plainTextInterpretation = response.replace(/<\/?[^>]+(>|$)/g, "");
    
    // 내용이 너무 짧으면 저장하지 않음
    if (plainTextInterpretation.length < 10) {
      // console.log('해석 내용이 너무 짧아 저장하지 않습니다.');
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
      // console.log('로그인이 필요하거나 저장 중 오류가 발생했습니다:', saveData.message);
      // 로그인이 필요한 경우 조용히 실패 (유저 경험에 영향 없음)
    } else {
      // console.log('타로 리딩이 성공적으로 저장되었습니다.');
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