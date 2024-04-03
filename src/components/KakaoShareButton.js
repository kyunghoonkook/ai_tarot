import React, { useEffect } from 'react';

const KakaoShareButton = ({ url, title, description }) => {
    // useEffect(() => {
    //     if (window.Kakao) {
    //         window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    //     }
    // }, []);
    // console.log(url);
    // console.log(title);
    // console.log(description);
    const handleShareToKakao = () => {
        if (window.Kakao) {
            console.log('Sharing to Kakao');
            window.Kakao.Share.createDefaultButton({
                container: '#kakao-share-button',
                objectType: 'feed',
                content: {
                    title: title,
                    description: description,
                    imageUrl: '/images/cardBG.png',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
                buttons: [
                    {
                        title: '웹으로 이동',
                        link: {
                            mobileWebUrl: url,
                            webUrl: url,
                        },
                    },
                ],
            });
        } else {
            console.log('Kakao SDK not loaded');
        }
    };

    return (
        <button id="kakao-share-button" onClick={handleShareToKakao}>
            Share on Kakao
        </button>
    );
};

export default KakaoShareButton;
