'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/ThemePage.module.css';

export default function CardSelector({ theme, design }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [remainingCards, setRemainingCards] = useState([]);
    const [result, setResult] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isShuffling, setIsShuffling] = useState(true);
    const [touchStartPos, setTouchStartPos] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showAd, setShowAd] = useState(false);
    const [adClicked, setAdClicked] = useState(false);
    const adInitialized = useRef(false);
    const [cardThemeText, setCardThemeText] = useState({
        title: '',
        positions: [],
    });

    // 모바일 환경 감지
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        
        // 초기 체크
        checkMobile();
        
        // 화면 크기 변경 시 체크
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // 구글 애드센스 초기화
    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        if (typeof window === 'undefined' || !showAd || adInitialized.current) return;
        
        // 광고 초기화 시도
        const timer = setTimeout(() => {
            try {
                // 초기화 플래그 설정 - 중복 초기화 방지
                adInitialized.current = true;
                
                // 광고 초기화
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                
                // 광고 클릭 감지 설정
                const handleAdClick = () => {
                    setAdClicked(true);
                    console.log("Ad was clicked!");
                };
                
                // 광고 요소에 클릭 이벤트 리스너 추가
                const adElement = document.querySelector('.adsbygoogle');
                if (adElement) {
                    adElement.addEventListener('click', handleAdClick);
                    
                    // 구글 광고 iframe 로드 후 이벤트 연결 시도
                    setTimeout(() => {
                        try {
                            const adIframes = document.querySelectorAll('iframe[id^="google_ads_iframe"]');
                            adIframes.forEach(iframe => {
                                iframe.addEventListener('click', handleAdClick);
                            });
                        } catch (e) {
                            console.error("Failed to attach event to ad iframe:", e);
                        }
                    }, 2000);
                }
            } catch (error) {
                console.error("AdSense initialization error:", error);
            }
        }, 500);
        
        return () => clearTimeout(timer);
    }, [showAd]);

    useEffect(() => {
        // Set theme-specific card positions text
        switch (theme) {
            case 'Love':
                setCardThemeText({
                    title: 'Explore Your Romantic Journey',
                    positions: ['Past Relationship', 'Current Situation', 'Future Possibilities'],
                });
                break;
            case 'Money':
                setCardThemeText({
                    title: 'Discover Your Financial Path',
                    positions: ['Current Financial State', 'Challenges & Opportunities', 'Guidance for Growth'],
                });
                break;
            case 'Career':
                setCardThemeText({
                    title: 'Illuminate Your Professional Path',
                    positions: ['Current Position', 'Hidden Factors', 'Best Path Forward'],
                });
                break;
            case 'Health':
                setCardThemeText({
                    title: 'Understand Your Wellness Journey',
                    positions: ['Mental Wellbeing', 'Physical Health', 'Spiritual Balance'],
                });
                break;
            case 'Major':
                setCardThemeText({
                    title: 'Gain Deeper Insights',
                    positions: ['Past Influences', 'Present Situation', 'Future Direction'],
                });
                break;
            default:
                setCardThemeText({
                    title: 'Your Personalized Tarot Reading',
                    positions: ['Past', 'Present', 'Future'],
                });
        }

        // Show shuffling animation first
        setIsShuffling(true);

        const shuffleTimer = setTimeout(() => {
            // 모든 카드의 isReversed를 false로 초기화 - 처음에는 회전 없음
            const cards = Array.from({ length: 22 }, (_, i) => ({
                number: i < 10 ? `0${i}` : `${i}`,
                isReversed: false, // 처음에는 회전 없이 표시
            }));
            const shuffledCards = shuffleArray(cards);
            setRemainingCards(shuffledCards);
            setIsShuffling(false);
        }, 2000);

        return () => clearTimeout(shuffleTimer);
    }, [theme]);

    // 모바일에서 카드 레이아웃 최적화를 위한 함수
    useEffect(() => {
        if (isMobile && !isShuffling) {
            // 모바일에서 카드 컨테이너 스타일 최적화
            const cardsContainer = document.querySelector(`.${styles.cardsContainer}`);
            if (cardsContainer) {
                Object.assign(cardsContainer.style, {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '5px',
                    justifyItems: 'center',
                    padding: '10px',
                    maxWidth: '100%',
                    overflowX: 'hidden',
                    transform: 'none',
                    height: 'auto'
                });
            }
            
            // 카드 개별 스타일 최적화
            const cards = document.querySelectorAll(`.${styles.card}`);
            if (cards.length > 0) {
                cards.forEach(card => {
                    Object.assign(card.style, {
                        width: '60px',
                        height: '90px',
                        margin: '2px',
                        transform: 'none',
                        position: 'relative'
                    });
                });
            }
            
            // 선택된 카드 섹션 스타일 최적화
            const selectedSection = document.querySelector(`.${styles.selectedCardsSection}`);
            if (selectedSection) {
                Object.assign(selectedSection.style, {
                    marginTop: '20px',
                    padding: '15px 5px'
                });
            }
            
            // 선택된 카드 컨테이너 스타일 최적화
            const selectedContainer = document.querySelector(`.${styles.selectedCardsContainer}`);
            if (selectedContainer) {
                Object.assign(selectedContainer.style, {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'nowrap',
                    gap: '0',
                    width: '100%',
                    padding: '5px 0'
                });
            }
            
            // 선택된 카드 래퍼 스타일 최적화
            const selectedCardWrappers = document.querySelectorAll(`.${styles.selectedCardWrapper}`);
            if (selectedCardWrappers.length > 0) {
                selectedCardWrappers.forEach(wrapper => {
                    Object.assign(wrapper.style, {
                        margin: '0',
                        width: '33.33%',
                        minWidth: 'auto',
                        flexShrink: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    });
                    
                    // 래퍼 내의 제목 스타일 추가
                    const title = wrapper.querySelector('h4');
                    if (title) {
                        Object.assign(title.style, {
                            fontSize: '0.85rem',
                            marginTop: '8px',
                            marginBottom: '0',
                            textAlign: 'center',
                            width: '100%'
                        });
                    }
                    
                    // 래퍼 내의 카드 스타일 추가
                    const cardElem = wrapper.querySelector(`.${styles.selectedCard}`);
                    if (cardElem) {
                        Object.assign(cardElem.style, {
                            width: '80px',
                            height: '120px'
                        });
                    }
                });
            }
        }
    }, [isMobile, isShuffling, styles, selectedCards]);

    useEffect(() => {
        setResult(selectedCards.map((card) => `${card.number}${card.isReversed ? 'r' : ''}`).join(','));
    }, [selectedCards]);

    useEffect(() => {
        if (selectedCards.length === 3) {
            const timeout = setTimeout(() => {
                setSelectedCards(selectedCards.map((card) => ({ ...card, isFlipped: true })));
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [selectedCards]);

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const handleCardClick = (card) => {
        if (selectedCards.length < 3 && !selectedCards.includes(card)) {
            // 카드 선택 시 50% 확률로 회전 설정 (테스트를 위해 확률 증가)
            const isCardReversed = Math.random() < 0.5; // 50% 확률로 카드 회전
            const updatedCard = {
                ...card,
                isFlipped: true,
                isReversed: isCardReversed,
            };

            const newSelectedCards = [...selectedCards, updatedCard];
            setSelectedCards(newSelectedCards);

            setRemainingCards(remainingCards.filter((c) => c !== card));

            // 선택된 카드에 애니메이션 클래스 추가
            const selectedCardElement = document.querySelector(`.${styles.card}[data-card="${card.number}"]`);
            if (selectedCardElement) {
                // 기본 선택 클래스 추가
                selectedCardElement.classList.add(styles['card-selected']);
                selectedCardElement.classList.add(styles['flipped']);

                // 위치 기반 애니메이션 클래스 추가 (1,2,3번 위치)
                const positionClass = `card-position-${selectedCards.length + 1}`;
                selectedCardElement.classList.add(styles[positionClass]);
            }
        }
    };

    // Handle touch events for better mobile experience
    const handleTouchStart = (e, card) => {
        setTouchStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchEnd = (e, card) => {
        if (!touchStartPos) return;

        const touchEndPos = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        const distance = Math.sqrt(
            Math.pow(touchEndPos.x - touchStartPos.x, 2) + Math.pow(touchEndPos.y - touchStartPos.y, 2)
        );

        // If it's a tap (not a swipe)
        if (distance < 10) {
            handleCardClick(card);
        }

        setTouchStartPos(null);
    };

    // 모바일용 카드 컨테이너 스타일
    const mobileCardsContainerStyle = isMobile ? {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
        gap: '10px',
        justifyItems: 'center',
        padding: '10px',
        maxWidth: '100%',
        overflowX: 'hidden'
    } : {};

    // 모바일용 카드 스타일
    const mobileCardStyle = isMobile ? {
        width: '60px',
        height: '90px',
        margin: '5px',
        transform: 'none',
        position: 'relative'
    } : {};

    // 모바일용 선택된 카드 섹션 스타일
    const mobileSelectedSectionStyle = isMobile ? {
        marginTop: '20px',
        padding: '15px 5px',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '10px'
    } : {};

    // 모바일용 선택된 카드 컨테이너 스타일
    const mobileSelectedContainerStyle = isMobile ? {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        gap: '0',
        width: '100%',
        padding: '5px 0'
    } : {};

    // 모바일용 선택된 카드 래퍼 스타일
    const mobileSelectedCardWrapperStyle = isMobile ? {
        margin: '0',
        width: '33.33%',
        minWidth: 'auto',
        flexShrink: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    } : {};

    // 구글 광고 표시 함수
    const showGoogleAd = () => {
        // 이미 초기화된 경우 재설정
        adInitialized.current = false;
        setAdClicked(false);
        setShowAd(true);
        setIsButtonClicked(true);
    };
    
    // 결과 페이지로 이동하는 함수
    const navigateToResult = () => {
        if (adClicked) {
            // 광고가 클릭된 경우에만 결과 페이지로 이동
            window.location.href = `/${theme}/${design}/result/${result}`;
        } else {
            // 아직 광고가 클릭되지 않은 경우 알림
            alert("Please click on the advertisement to support us before viewing your reading.");
        }
    };

    return (
        <div className={styles.container}>
            {isShuffling ? (
                <>
                    <div className={styles.instruction}>
                        <h2>{cardThemeText.title}</h2>
                        <p>Focus on your question as you select your cards. Trust your intuition.</p>
                    </div>
                    <div className={styles.shuffling}>
                        <div className={styles['shuffling-cards']}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={styles['shuffling-card']}
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                ></div>
                            ))}
                        </div>
                        <p>Shuffling the cards...</p>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.instruction}>
                        <h2>{cardThemeText.title}</h2>
                        <p>Focus on your question as you select your cards. Trust your intuition.</p>
                    </div>
                    <div className={styles.cardSection}>
                        <div className={styles.cardsContainer} style={mobileCardsContainerStyle}>
                            {remainingCards.map((card, idx) => (
                                <div
                                    key={idx}
                                    className={`${styles.card}`}
                                    data-card={card.number}
                                    onClick={() => handleCardClick(card)}
                                    onTouchStart={(e) => handleTouchStart(e, card)}
                                    onTouchEnd={(e) => handleTouchEnd(e, card)}
                                    style={mobileCardStyle}
                                >
                                    <div className={styles.cardInner}>
                                        <div className={styles.cardFront}>
                                            <img src={`/images/${design}/뒷면 1.png`} alt="Card Back" />
                                        </div>
                                        <div className={styles.cardBack}>
                                            <img
                                                src={`/images/${design}/${card.number}.png`}
                                                alt={`Card ${card.number}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.selectedCardsSection} style={mobileSelectedSectionStyle}>
                            <h3>Your Selected Cards: {selectedCards.length}/3</h3>
                            <div className={styles.selectedCardsContainer} style={mobileSelectedContainerStyle}>
                                {Array.from({ length: 3 }).map((_, idx) => {
                                    const card = selectedCards[idx];
                                    return (
                                        <div key={idx} className={styles.selectedCardWrapper} style={mobileSelectedCardWrapperStyle}>
                                            {card ? (
                                                <>
                                                    <div
                                                        className={`${styles.selectedCard} ${
                                                            card.isFlipped ? styles.flipped : ''
                                                        } ${card.isReversed ? styles.reversed : ''}`}
                                                    >
                                                        <div className={styles.selectedCardInner}>
                                                            <div className={styles.selectedCardFront}>
                                                                <img src={`/images/${design}/뒷면 1.png`} alt="Card Back" />
                                                            </div>
                                                            <div className={styles.selectedCardBack}>
                                                                <img
                                                                    src={`/images/${design}/${card.number}.png`}
                                                                    alt={`Card ${card.number}`}
                                                                    style={card.isReversed ? { transform: 'rotate(180deg)' } : {}}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h4>{cardThemeText.positions[idx]}</h4>
                                                </>
                                            ) : (
                                                <>
                                                    <div className={`${styles.selectedCard} ${styles.emptyCard}`}>
                                                        <div className={styles.selectedCardInner}>
                                                            <div className={styles.emptyCardFront}></div>
                                                        </div>
                                                    </div>
                                                    <h4>{cardThemeText.positions[idx]}</h4>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {selectedCards.length === 3 && (
                            <div className={styles.getResultSection}>
                                <p>All cards selected! Ready to see your reading?</p>
                                {showAd ? (
                                    <div className={styles.adContainer}>
                                        {/* 광고 컨테이너에 고유 ID 부여 */}
                                        <ins className="adsbygoogle"
                                            style={{ display: 'block' }}
                                            data-ad-client="ca-pub-6444523705828999"
                                            data-ad-slot="6447010341"
                                            data-ad-format="auto"
                                            data-full-width-responsive="true"></ins>
                                        <div className={styles.adNavigation}>
                                            <p>{adClicked ? "Thank you! You can now view your reading." : "Please click on the advertisement to support us."}</p>
                                            <button 
                                                onClick={navigateToResult} 
                                                className={`${styles.continueButton} ${adClicked ? styles.enabled : styles.disabled}`}
                                                disabled={!adClicked}
                                            >
                                                See My Reading
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={showGoogleAd}
                                        className={`${styles.getResultBtn} ${isButtonClicked ? styles.clicked : ''}`}
                                    >
                                        Reveal My Reading
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
