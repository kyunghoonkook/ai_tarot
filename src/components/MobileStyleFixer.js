'use client';
import { useEffect, useState } from 'react';

export default function MobileStyleFixer() {
  // 모바일 여부를 상태로 관리
  const [isMobile, setIsMobile] = useState(false);

  // 첫 마운트 시와 화면 크기 변경 시 호출될 함수
  const applyMobileStyles = () => {
    const currentIsMobile = window.innerWidth <= 767;
    setIsMobile(currentIsMobile);
    
    if (currentIsMobile) {
      // 핵심 스타일을 즉시 적용 - 최대한 빨리 적용되도록 함
      Object.assign(document.body.style, {
        background: 'linear-gradient(to bottom, #042831, #253438, #122d34)',
        minHeight: '100vh',
        color: '#fff'
      });
      
      // DOM에 배경 요소가 없으면 생성 및 추가
      try {
        if (!document.getElementById('mobile-bg-element')) {
          const bgElement = document.createElement('div');
          Object.assign(bgElement.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'url("/images/symbolBG.png") no-repeat center',
            backgroundSize: 'contain',
            opacity: '0.3',
            zIndex: '-1',
            pointerEvents: 'none'
          });
          bgElement.id = 'mobile-bg-element';
          document.body.appendChild(bgElement);
        }
      } catch (error) {
        console.error('Error adding background element:', error);
      }
      
      // DOM 요소 찾아서 스타일 적용하는 헬퍼 함수
      const applyStyleToElements = (selector, styles) => {
        try {
          const elements = document.querySelectorAll(selector);
          if (elements && elements.length > 0) {
            elements.forEach(el => Object.assign(el.style, styles));
          }
        } catch (error) {
          console.error(`Error applying styles to ${selector}:`, error);
        }
      };
      
      // 핵심 요소 스타일 적용
      setTimeout(() => {
        // 약간의 지연을 두고 다른 요소 스타일을 적용
        // DOM이 완전히 로드된 후 스타일을 적용하기 위함
        applyStyleToElements('.header', {
          background: 'rgba(4, 40, 49, 0.8)',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          padding: '10px 15px',
          width: '100%'
        });
        
        applyStyleToElements('.footer', {
          background: 'rgba(4, 40, 49, 0.8)',
          padding: '1rem',
          borderTop: '1px solid rgba(255, 215, 0, 0.1)',
          width: '100%'
        });
        
        applyStyleToElements('.title', {
          color: '#ffd700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        });
        
        applyStyleToElements('.cards_wrap .link', {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          marginBottom: '15px'
        });
        
        applyStyleToElements('.header ul li a', {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
        });
      }, 100);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 스타일 즉시 적용
    applyMobileStyles();
    
    // 레이아웃 효과 위해 한번 더 약간 지연 후 적용
    const timeoutId = setTimeout(applyMobileStyles, 200);
    
    // 리사이즈 이벤트 핸들러 등록
    window.addEventListener('resize', applyMobileStyles);
    window.addEventListener('orientationchange', applyMobileStyles);
    
    // 스크롤 이벤트에서도 확인 (일부 모바일 브라우저가 스크롤 시 재계산)
    window.addEventListener('scroll', applyMobileStyles);
    
    // 클린업 함수
    return () => {
      window.removeEventListener('resize', applyMobileStyles);
      window.removeEventListener('orientationchange', applyMobileStyles);
      window.removeEventListener('scroll', applyMobileStyles);
      clearTimeout(timeoutId);
    };
  }, []);
  
  useEffect(() => {
    // 모바일 환경인 경우 CSS 클래스 추가
    if (isMobile) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
  }, [isMobile]);
  
  return null; // 아무것도 렌더링하지 않음
} 