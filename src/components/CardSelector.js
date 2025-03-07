'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/ThemePage.module.css';

export default function CardSelector({ theme, design }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [remainingCards, setRemainingCards] = useState([]);
    const [result, setResult] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isShuffling, setIsShuffling] = useState(true);
    const [touchStartPos, setTouchStartPos] = useState(null);
    const [cardThemeText, setCardThemeText] = useState({
        title: '',
        positions: []
    });

    useEffect(() => {
        // Set theme-specific card positions text
        switch(theme) {
            case 'Love':
                setCardThemeText({
                    title: 'Explore Your Romantic Journey',
                    positions: ['Past', 'Present', 'Future']
                });
                break;
            case 'Money':
                setCardThemeText({
                    title: 'Discover Your Financial Path',
                    positions: ['Areas to Improve', 'Your Strengths', 'Next Steps']
                });
                break;
            case 'Health':
                setCardThemeText({
                    title: 'Understand Your Wellness Journey',
                    positions: ['Mind', 'Body', 'Soul']
                });
                break;
            default:
                setCardThemeText({
                    title: 'Tarot Reading',
                    positions: ['Card 1', 'Card 2', 'Card 3']
                });
        }
        
        // Show shuffling animation first
        setIsShuffling(true);
        
        const shuffleTimer = setTimeout(() => {
            // 모든 카드의 isReversed를 false로 초기화 - 처음에는 회전 없음
            const cards = Array.from({ length: 22 }, (_, i) => ({
                number: i < 10 ? `0${i}` : `${i}`,
                isReversed: false // 처음에는 회전 없이 표시
            }));
            const shuffledCards = shuffleArray(cards);
            setRemainingCards(shuffledCards);
            setIsShuffling(false);
        }, 2000);
        
        return () => clearTimeout(shuffleTimer);
    }, [theme]);

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
                isReversed: isCardReversed
            };
            
            console.log("Card selected:", updatedCard.number, "Reversed:", isCardReversed);
            
            const newSelectedCards = [...selectedCards, updatedCard];
            setSelectedCards(newSelectedCards);
            console.log("Selected cards:", newSelectedCards.map(c => ({number: c.number, reversed: c.isReversed})));
            
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
            Math.pow(touchEndPos.x - touchStartPos.x, 2) + 
            Math.pow(touchEndPos.y - touchStartPos.y, 2)
        );
        
        // If it's a tap (not a swipe)
        if (distance < 10) {
            handleCardClick(card);
        }
        
        setTouchStartPos(null);
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
                        <div className={styles.cardsContainer}>
                            {remainingCards.map((card, idx) => (
                                <div
                                    key={idx}
                                    className={`${styles.card}`}
                                    data-card={card.number}
                                    onClick={() => handleCardClick(card)}
                                    onTouchStart={(e) => handleTouchStart(e, card)}
                                    onTouchEnd={(e) => handleTouchEnd(e, card)}
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

                        <div className={styles.selectedCardsSection}>
                            <h3>Your Selected Cards: {selectedCards.length}/3</h3>
                            <div className={styles.selectedCardsContainer}>
                                {selectedCards.map((card, idx) => (
                                    <div key={idx} className={styles.selectedCardWrapper}>
                                        <h4>{cardThemeText.positions[idx]}</h4>
                                        <div
                                            className={`${styles.selectedCard} ${card.isFlipped ? styles.flipped : ''} ${card.isReversed ? styles.reversed : ''}`}
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedCards.length === 3 && (
                            <div className={styles.getResultSection}>
                                <p>All cards selected! Ready to see your reading?</p>
                                <Link href={`/${theme}/${design}/result/${result}`}>
                                    <button
                                        onClick={() => setIsButtonClicked(true)}
                                        className={`${styles.getResultBtn} ${isButtonClicked ? styles.clicked : ''}`}
                                    >
                                        Reveal My Reading
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
