'use client';
import { useEffect } from 'react';

function KakaoScript() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.Kakao) {
                window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
}

export default KakaoScript;
