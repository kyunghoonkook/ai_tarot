'use client'

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function AdSense() {
    const advertRef = useRef(null);
    
    useEffect(() => {
        try {
            // 스크립트가 이미 로드된 후에만 광고 초기화
            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
                console.log('애드센스 초기화 시도');
            }
        } catch (error) {
            console.error('애드센스 초기화 오류:', error);
        }
    }, []);

    return (
        <>
            <Script
                id="adsbygoogle-init"
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6444523705828999"
                crossOrigin="anonymous"
                strategy="beforeInteractive"
                onLoad={() => {
                    console.log('애드센스 스크립트 로드 완료');
                    try {
                        window.adsbygoogle = window.adsbygoogle || [];
                        window.adsbygoogle.push({});
                    } catch (error) {
                        console.error('스크립트 로드 후 초기화 오류:', error);
                    }
                }}
            />
            <div className="ad-container" style={{ minHeight: '280px', width: '100%', margin: '20px 0', overflow: 'hidden' }}>
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', height: '280px' }}
                    data-ad-client="ca-pub-6444523705828999"
                    data-ad-slot="6447010341"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    ref={advertRef}
                />
            </div>
        </>
    );
} 