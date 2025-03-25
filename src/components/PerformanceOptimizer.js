'use client';
import { useEffect } from 'react';

// 성능 최적화 및 리소스 관리를 위한 컴포넌트
const PerformanceOptimizer = () => {
  useEffect(() => {
    // 개발 환경인지 확인
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                          window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
    
    // 개발 환경에서는 일부 최적화 비활성화
    if (isDevelopment) {
      console.log('개발 환경에서는 일부 성능 최적화가 비활성화됩니다.');
    }

    // 1. 주요 리소스 프리로딩
    const preloadResources = () => {
      // 주요 이미지와 폰트 프리로딩
      const criticalResources = [
        { type: 'image', href: '/images/logo1.svg', as: 'image' },
        { type: 'image', href: '/images/mainBG.png', as: 'image' }
      ];

      criticalResources.forEach(resource => {
        try {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource.href;
          link.as = resource.as;
          
          if (resource.crossOrigin) {
            link.crossOrigin = resource.crossOrigin;
          }
          
          document.head.appendChild(link);
        } catch (error) {
          console.warn(`리소스 프리로딩 실패: ${resource.href}`);
        }
      });
    };

    // 2. 리소스 힌팅 - 외부 리소스 연결 최적화
    const addResourceHints = () => {
      if (isDevelopment) return;
      
      // DNS 프리페치 및 연결 프리로드
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://pagead2.googlesyndication.com',
        'https://adservice.google.com'
      ];

      domains.forEach(domain => {
        try {
          // DNS 프리페치
          const dnsPrefetch = document.createElement('link');
          dnsPrefetch.rel = 'dns-prefetch';
          dnsPrefetch.href = domain;
          document.head.appendChild(dnsPrefetch);

          // 연결 프리로드
          const preconnect = document.createElement('link');
          preconnect.rel = 'preconnect';
          preconnect.href = domain;
          document.head.appendChild(preconnect);
        } catch (error) {
          console.warn(`리소스 힌팅 실패: ${domain}`);
        }
      });
    };

    // 3. 네이티브 브라우저 최적화 적용
    const applyBrowserOptimizations = () => {
      try {
        // Intersection Observer 지원 확인
        if ('IntersectionObserver' in window) {
          // 이미지 지연 로딩 관련 코드는 next/image로 대체되었으므로 삭제
        }
        
        // 브라우저 캐시 관리
        if ('caches' in window) {
          // 브라우저 캐시 사용 시 코드 추가
        }
      } catch (error) {
        console.warn('브라우저 최적화 적용 실패');
      }
    };

    // 4. 외부 스크립트 최적화 로딩
    const optimizeScriptLoading = () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          // 비필수적인 스크립트는 브라우저 유휴 시간에 로드
        }, { timeout: 2000 });
      } else {
        setTimeout(() => {
          // 폴백으로 타임아웃 사용
        }, 2000);
      }
    };

    // 5. 랜더링 최적화
    const optimizeRendering = () => {
      // 스크롤 스로틀 적용
      let scrollTimeout;
      const onScroll = () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
          // 스크롤 이벤트 핸들링
          scrollTimeout = null;
        }, 100);
      };
      
      window.addEventListener('scroll', onScroll, { passive: true });
      
      // 리사이즈 디바운싱
      let resizeTimeout;
      const onResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // 리사이즈 이벤트 핸들링
        }, 150);
      };
      
      window.addEventListener('resize', onResize, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    };

    // 페이지 로드 완료 후 최적화 함수 실행
    if (document.readyState === 'complete') {
      preloadResources();
      addResourceHints();
      applyBrowserOptimizations();
      optimizeScriptLoading();
      optimizeRendering();
    } else {
      window.addEventListener('load', () => {
        preloadResources();
        addResourceHints();
        applyBrowserOptimizations();
        optimizeScriptLoading();
        optimizeRendering();
      });
    }

    // 클린업 함수
    return () => {
      // 여기서 이벤트 리스너 제거
      window.removeEventListener('load', () => {});
    };
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
};

export default PerformanceOptimizer; 