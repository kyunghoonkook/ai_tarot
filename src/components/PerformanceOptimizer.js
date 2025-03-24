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
      // 자주 사용되는 이미지와 폰트 프리로딩
      const resources = [
        { type: 'image', href: '/images/logo1.svg', as: 'image' },
        { type: 'image', href: '/images/mainBG.png', as: 'image' }
      ];

      resources.forEach(resource => {
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
          console.warn(`리소스 프리로딩 실패: ${resource.href}`, error);
        }
      });
    };

    // 2. 리소스 힌팅
    const addResourceHints = () => {
      if (isDevelopment) return; // 개발 환경에서는 건너뜀
      
      // DNS 프리페치 및 연결 프리로드
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com'
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
          console.warn(`리소스 힌팅 실패: ${domain}`, error);
        }
      });
    };

    // 3. 이미지 지연 로딩
    const setupLazyLoading = () => {
      try {
        if ('loading' in HTMLImageElement.prototype) {
          // 브라우저 네이티브 lazy 로딩 지원
          document.querySelectorAll('img').forEach(img => {
            if (!img.loading && !img.hasAttribute('loading') && !img.hasAttribute('priority')) {
              img.loading = 'lazy';
            }
          });
        } else {
          // 대체 IntersectionObserver 기반 lazy 로딩은 유지
          // 실제 프로덕션에서는 더 정교한 구현 필요
          const lazyImages = document.querySelectorAll('img[data-src]');
          
          if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const lazyImage = entry.target;
                  if (lazyImage.dataset.src) {
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.removeAttribute('data-src');
                    imageObserver.unobserve(lazyImage);
                  }
                }
              });
            });

            lazyImages.forEach(image => imageObserver.observe(image));
          }
        }
      } catch (error) {
        console.warn('이미지 지연 로딩 설정 실패', error);
      }
    };

    // 4. CSS와 JS의 효율적인 로딩
    const optimizeAssetLoading = () => {
      if (isDevelopment) return; // 개발 환경에서는 건너뜀
      
      // 비필수적인 CSS 파일의 지연 로딩
      const loadNonCriticalCSS = () => {
        // 실제로 존재하는 CSS 파일만 로드
        const staticFileExists = (url) => {
          // 실제 구현에서는 파일 존재 여부를 확인하는 로직 필요
          return false; // 안전을 위해 기본값은 false
        };
        
        const links = [];
        
        // 존재하는 CSS 파일만 로드
        links.filter(href => staticFileExists(href)).forEach(href => {
          try {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = () => {
              link.media = 'all';
            };
            document.head.appendChild(link);
          } catch (error) {
            console.warn(`CSS 로딩 실패: ${href}`, error);
          }
        });
      };

      // 비필수적인 JS 파일의 지연 로딩 - 개발 환경에서는 비활성화
      const loadNonCriticalJS = () => {
        // 실제로 존재하는 JS 파일만 로드
        const staticFileExists = (url) => {
          // 실제 구현에서는 파일 존재 여부를 확인하는 로직 필요
          return false; // 안전을 위해 기본값은 false
        };
        
        const scripts = [];
        
        // 존재하는 JS 파일만 로드
        scripts.filter(src => staticFileExists(src)).forEach(src => {
          try {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            script.onerror = (error) => {
              console.warn(`스크립트 로딩 실패: ${src}`, error);
            };
            document.body.appendChild(script);
          } catch (error) {
            console.warn(`스크립트 로딩 실패: ${src}`, error);
          }
        });
      };

      // 중요하지 않은 리소스 지연 로딩
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          loadNonCriticalCSS();
          loadNonCriticalJS();
        });
      } else {
        setTimeout(() => {
          loadNonCriticalCSS();
          loadNonCriticalJS();
        }, 1000);
      }
    };

    // 페이지 로드 완료 후 최적화 함수 실행
    if (document.readyState === 'complete') {
      preloadResources();
      addResourceHints();
      setupLazyLoading();
      optimizeAssetLoading();
    } else {
      window.addEventListener('load', () => {
        preloadResources();
        addResourceHints();
        setupLazyLoading();
        optimizeAssetLoading();
      });
    }

    // 클린업 함수
    return () => {
      window.removeEventListener('load', optimizeAssetLoading);
    };
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
};

export default PerformanceOptimizer; 