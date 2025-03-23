'use client'

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function AdSense() {
    const advertRef = useRef(null);
    
    useEffect(() => {
        // 컴포넌트가 마운트된 후에 한 번만 실행
        const initAd = setTimeout(() => {
            try {
                if (typeof window !== 'undefined' && window.adsbygoogle) {
                    console.log('애드센스 초기화 시도');
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (error) {
                console.error('애드센스 초기화 오류:', error);
            }
        }, 100); // 약간의 지연을 두어 스크립트 로드 시간 확보
        
        return () => clearTimeout(initAd);
    }, []);

    return (
        <>
            <Script
                id="adsbygoogle-init"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6444523705828999"
                strategy="afterInteractive"
                async
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