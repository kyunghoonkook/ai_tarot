'use client'

import { useEffect } from 'react';
import Script from 'next/script';

export default function AdSense() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error('애드센스 초기화 오류:', error);
        }
    }, []);

    return (
        <>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6444523705828999"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
            <div className="ad-container">
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-6444523705828999"
                    data-ad-slot="6447010341"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </>
    );
} 