'use client';
import { useEffect } from 'react';

function KakaoScript() {
    useEffect(() => {
        // 로컬 환경이거나 API 키가 설정되어 있지 않다면 초기화하지 않음
        if (typeof window !== 'undefined' && 
            (window.location.hostname === 'localhost' || !process.env.NEXT_PUBLIC_KAKAO_API_KEY)) {
            // console.log('개발 환경에서는 Kakao API 초기화를 건너뜁니다.');
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.Kakao && process.env.NEXT_PUBLIC_KAKAO_API_KEY) {
                try {
                    // 이미 초기화되었는지 확인
                    if (!window.Kakao.isInitialized()) {
                        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
                        // console.log('Kakao API 초기화 성공');
                    }
                } catch (error) {
                    console.error('Kakao API 초기화 실패:', error);
                }
            }
        };

        return () => {
            // script가 아직 body에 있는 경우에만 제거
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return null;
}

export default KakaoScript;
