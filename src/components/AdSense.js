'use client'

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function AdSense() {
    const advertRef = useRef(null);
    const initialized = useRef(false);
    
    useEffect(() => {
        // 이미 초기화되었는지 확인하고 중복 초기화 방지
        if (initialized.current) return;
        
        // 사용자 인터랙션 후에 광고 로드 (페이지 로딩 속도 향상)
        const loadAdsAfterInteraction = () => {
            try {
                if (typeof window !== 'undefined' && window.adsbygoogle) {
                    console.log('애드센스 초기화 시도');
                    
                    // 이 광고 슬롯이 이미 초기화되었는지 확인
                    const adElements = document.querySelectorAll('.adsbygoogle');
                    let alreadyInitialized = false;
                    
                    for (let i = 0; i < adElements.length; i++) {
                        if (adElements[i].getAttribute('data-adsbygoogle-status') === 'done') {
                            alreadyInitialized = true;
                            break;
                        }
                    }
                    
                    if (!alreadyInitialized) {
                        window.adsbygoogle.push({});
                        initialized.current = true;
                    } else {
                        console.log('광고가 이미 초기화되어 있습니다.');
                    }
                }
            } catch (error) {
                console.error('애드센스 초기화 오류:', error);
            }
            
            // 이벤트 리스너 제거
            window.removeEventListener('scroll', loadAdsAfterInteraction);
            window.removeEventListener('mousemove', loadAdsAfterInteraction);
            window.removeEventListener('touchstart', loadAdsAfterInteraction);
        };
        
        // 사용자 인터랙션 감지하여 광고 로드
        window.addEventListener('scroll', loadAdsAfterInteraction, { once: true, passive: true });
        window.addEventListener('mousemove', loadAdsAfterInteraction, { once: true, passive: true });
        window.addEventListener('touchstart', loadAdsAfterInteraction, { once: true, passive: true });
        
        // 페이지가 완전히 로드된 후에도 광고 초기화되지 않았다면 로드
        const fallbackTimer = setTimeout(() => {
            if (!initialized.current) {
                loadAdsAfterInteraction();
            }
        }, 3000);
        
        return () => {
            clearTimeout(fallbackTimer);
            window.removeEventListener('scroll', loadAdsAfterInteraction);
            window.removeEventListener('mousemove', loadAdsAfterInteraction);
            window.removeEventListener('touchstart', loadAdsAfterInteraction);
        };
    }, []);

    return (
        <>
            <Script
                id="adsbygoogle-init"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6444523705828999"
                strategy="lazyOnload"
                crossOrigin="anonymous"
                onLoad={() => {
                    console.log('애드센스 스크립트 로드 완료');
                }}
                onError={(e) => {
                    console.error('애드센스 스크립트 로드 실패:', e);
                }}
            />
            {/* <div className="ad-container" style={{ minHeight: '280px', width: '100%', margin: '20px 0', overflow: 'hidden', background: '#f9f9f9' }}>
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', height: '280px' }}
                    data-ad-client="ca-pub-6444523705828999"
                    data-ad-slot="6447010341"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    ref={advertRef}
                />
            </div> */}
        </>
    );
} 