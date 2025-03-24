'use client';
import { useEffect } from 'react';

// 성능 최적화 및 리소스 관리를 위한 컴포넌트
const PerformanceOptimizer = () => {
  useEffect(() => {
    // 1. 주요 리소스 프리로딩
    const preloadResources = () => {
      // 자주 사용되는 이미지와 폰트 프리로딩
      const resources = [
        { type: 'font', href: '/fonts/main-font.woff2', as: 'font', crossOrigin: 'anonymous' },
        { type: 'image', href: '/images/logo1.svg', as: 'image' },
        { type: 'image', href: '/images/mainBG.png', as: 'image' }
      ];

      resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        
        if (resource.crossOrigin) {
          link.crossOrigin = resource.crossOrigin;
        }
        
        document.head.appendChild(link);
      });
    };

    // 2. 리소스 힌팅
    const addResourceHints = () => {
      // DNS 프리페치 및 연결 프리로드
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com'
      ];

      domains.forEach(domain => {
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
      });
    };

    // 3. 이미지 지연 로딩
    const setupLazyLoading = () => {
      if ('loading' in HTMLImageElement.prototype) {
        // 브라우저 네이티브 lazy 로딩 지원
        document.querySelectorAll('img').forEach(img => {
          if (!img.loading && !img.hasAttribute('loading')) {
            img.loading = 'lazy';
          }
        });
      } else {
        // 대체 IntersectionObserver 기반 lazy 로딩 구현
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
    };

    // 4. CSS와 JS의 효율적인 로딩
    const optimizeAssetLoading = () => {
      // 비필수적인 CSS 파일의 지연 로딩
      const loadNonCriticalCSS = () => {
        const links = [
          '/styles/non-critical.css'
        ];

        links.forEach(href => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.media = 'print';
          link.onload = () => {
            link.media = 'all';
          };
          document.head.appendChild(link);
        });
      };

      // 비필수적인 JS 파일의 지연 로딩
      const loadNonCriticalJS = () => {
        const scripts = [
          '/scripts/analytics.js',
          '/scripts/feedback.js'
        ];

        scripts.forEach(src => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
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