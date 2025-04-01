'use client'

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function AdSense() {
    const advertRef = useRef(null);
    const initialized = useRef(false);
    // 클라이언트에서만 광고를 렌더링하기 위한 상태
    const [isClient, setIsClient] = useState(false);

    // isDevelopment는 빌드 시점에 결정되므로, 클라이언트/서버 여부로 판단
    const isDevelopment = process.env.NODE_ENV === 'development';

    useEffect(() => {
        // 클라이언트 측임을 표시
        setIsClient(true);

        // 개발 환경에서는 광고 비활성화
        if (isDevelopment) {
            console.log('개발 환경에서는 AdSense가 비활성화됩니다.');
            return;
        }

        // 컴포넌트 마운트 시 한 번만 실행 (클라이언트 측에서)
        if (!initialized.current && typeof window !== 'undefined' && window.adsbygoogle) {
            console.log('애드센스 초기화 시도 (useEffect)');
            try {
                // 특정 슬롯을 타겟팅하지 않고 전역적으로 push (자동으로 빈 슬롯을 찾음)
                window.adsbygoogle.push({});
                initialized.current = true; // 초기화 완료 표시
                console.log('애드센스 초기화 완료 (useEffect)');
            } catch (error) {
                console.error('애드센스 초기화 오류 (useEffect): ', error);
            }
        }

        // Cleanup 함수는 불필요할 수 있음 (initialized.current로 중복 방지)

    }, [isDevelopment]); // 의존성 배열 [isDevelopment] 유지 (변경 시 리렌더링 방지 목적)

    // 개발 환경이거나 서버 사이드 렌더링 시에는 아무것도 렌더링하지 않음
    if (isDevelopment || !isClient) {
        return null;
    }

    return (
        <>
            {/* AdSense 스크립트 로드 */}
            <Script
                id="adsbygoogle-script" // 스크립트에 고유 ID 부여
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6444523705828999`} // 실제 클라이언트 ID 사용
                crossOrigin="anonymous"
                strategy="afterInteractive" // 페이지 로드 후 상호작용 가능할 때 로드
                onLoad={() => {
                    console.log('애드센스 스크립트 로드 완료');
                    // 스크립트 로드 후 초기화 시도 (useEffect에서도 처리하지만, 이중 확인)
                    if (!initialized.current && typeof window !== 'undefined' && window.adsbygoogle && !isDevelopment) {
                         console.log('스크립트 onLoad에서 애드센스 초기화 시도');
                         try {
                             window.adsbygoogle.push({});
                             initialized.current = true;
                             console.log('스크립트 onLoad에서 애드센스 초기화 완료');
                         } catch (error) {
                             // 이미 초기화된 경우 오류 발생 가능 (무시 가능)
                             if (!error.message.includes("already have ads")) {
                                 console.error('스크립트 onLoad에서 애드센스 초기화 오류:', error);
                             }
                         }
                     }
                }}
                onError={(e) => {
                    console.error('애드센스 스크립트 로드 실패:', e);
                }}
            />
            {/* 광고 슬롯 컨테이너 (클라이언트에서만 렌더링) */}
            {/* 광고 컨테이너 스타일링은 필요에 따라 조정 */}
            {/* <div className="ad-container" style={{ minHeight: '280px', width: '100%', margin: '20px auto', overflow: 'hidden', textAlign: 'center' }}>
                <ins
                    className="adsbygoogle"
                    style={{ display: 'inline-block', width: '100%', maxWidth:'728px', height: '90px' }} // 예시 크기, 실제 광고 단위에 맞게 조정
                    data-ad-client="ca-pub-6444523705828999" // 실제 클라이언트 ID 사용
                    data-ad-slot="6447010341" // 실제 슬롯 ID 사용
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    ref={advertRef}
                ></ins>
            
            </div> */}
        </>
    );
} 