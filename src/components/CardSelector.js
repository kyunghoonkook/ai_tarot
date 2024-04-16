'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/ThemePage.module.css';

export default function CardSelector({ theme, design }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [remainingCards, setRemainingCards] = useState([]);
    const [result, setResult] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        const cards = Array.from({ length: 22 }, (_, i) => ({
            number: i < 10 ? `0${i}` : `${i}`,
            isReversed: Math.random() < 0.3, // 30% 확률로 카드가 뒤집어지도록 설정
        }));
        const shuffledCards = shuffleArray(cards);
        setRemainingCards(shuffledCards);
    }, []);

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
            setSelectedCards([...selectedCards, { ...card, isFlipped: true }]);
            setRemainingCards(remainingCards.filter((c) => c !== card));

            const selectedCardElement = document.querySelector(`.card[data-card="${card.number}"]`);
            if (selectedCardElement) {
                selectedCardElement.classList.add('selected');
            }
        }
    };

    const handleButtonClick = () => {
        setIsButtonClicked(true);
        setTimeout(() => {
            window.location.href = `/${theme}/${design}/result/${result}`;
        }, 1500);
    };

    return (
        <div>
            <h2
                className={styles['sub_title']}
                style={{
                    marginTop: '0px',
                    paddingTop: '125px',
                }}
            >
                CHOOSE YOUR CARD
            </h2>
            <div className={styles['cards']}>
                {remainingCards.map((card, idx) => (
                    <div
                        key={idx}
                        className={`${styles['card']}`}
                        data-card={card.number}
                        onClick={() => handleCardClick(card)}
                    >
                        <div className={`${styles['card-inner']} ${card.isReversed ? styles['reversed'] : ''}`}>
                            <div className={styles['card-front']}>
                                <img
                                    src={`/images/${design}/${card.number}.png`}
                                    alt={`Card ${parseInt(card.number)}`}
                                />
                            </div>
                            <div className={styles['card-back']}>
                                <img src={`/images/${design}/뒷면 1.png`} alt={'카드 뒷면'} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles['selected-cards']}>
                {selectedCards.map((card, index) => (
                    <div key={index}>
                        {theme === 'Love' && (
                            <>
                                {index === 0 && <h3>Past</h3>}
                                {index === 1 && <h3>Present</h3>}
                                {index === 2 && <h3>Future</h3>}
                            </>
                        )}
                        {theme === 'Money' && (
                            <>
                                {index === 0 && <h3>What am i doing wrong</h3>}
                                {index === 1 && <h3>What am i doing right</h3>}
                                {index === 2 && <h3>What to do next</h3>}
                            </>
                        )}
                        {theme === 'Health' && (
                            <>
                                {index === 0 && <h3>Mind</h3>}
                                {index === 1 && <h3>Body</h3>}
                                {index === 2 && <h3>Spirit</h3>}
                            </>
                        )}
                        <div className={`${styles['card_sel']} ${isButtonClicked ? styles['flipped'] : ''}`}>
                            <div className={styles['front']}>
                                <img src={`/images/${design}/뒷면 1.png`} alt="Card Back" />
                            </div>
                            <div className={styles['back']}>
                                <img
                                    src={`/images/${design}/${card.number}.png`}
                                    alt={`Card ${card.number}`}
                                    className={card.isReversed ? styles['reversed'] : ''}
                                    style={{
                                        transform: card.isReversed ? 'rotateX(180deg)' : 'rotateX(0deg)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* <img
                            src={`/images/${design}/${isButtonClicked ? card.number : '뒷면 1'}.png`}
                            alt={`Card ${parseInt(card.number)}`}
                            className={card.isReversed ? styles['reversed'] : ''}
                            style={{
                                opacity: isButtonClicked ? 1 : 0,
                                transform: card.isReversed ? 'rotateX(180deg)' : 'rotateX(0deg)',
                                transition: 'opacity 0.6s, transform 0.6s',
                            }}
                            onLoad={(e) => {
                                e.target.style.opacity = 1;
                            }}
                        /> */}
                    </div>
                ))}
            </div>
            <div className={styles['button_wrap']}>
                {selectedCards.length === 3 && (
                    <button className={styles['pretty-button']} onClick={handleButtonClick}>
                        Start Reading
                    </button>
                )}
            </div>
        </div>
    );
}
