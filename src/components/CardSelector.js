'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/ThemePage.module.css';

export default function CardSelector({ theme, design }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [remainingCards, setRemainingCards] = useState([]);
    const [result, setResult] = useState([]);

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
            setSelectedCards([...selectedCards, card]);
            setRemainingCards(remainingCards.filter((c) => c !== card));

            // Add 'selected' class to the selected card element
            const selectedCardElement = document.querySelector(`.card[data-card="${card.number}"]`);
            if (selectedCardElement) {
                selectedCardElement.classList.add('selected');
            }
        }
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
                CHOOSE YOUR DECK
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
                                <img src={`/images/${design}/뒷면 1.png`} alt={'1'} />
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
                        <img
                            src={`/images/${design}/${card.number}.png`}
                            alt={`Card ${parseInt(card.number)}`}
                            className={card.isReversed ? styles['reversed'] : ''}
                            style={{
                                opacity: 0,
                                transform: card.isReversed ? 'rotateX(180deg)' : 'rotateX(0deg)',
                                transition: 'opacity 0.6s, transform 0.6s',
                            }}
                            onLoad={(e) => {
                                e.target.style.opacity = 1;
                                // e.target.style.transform = 'translateY(0px)';
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className={styles['button_wrap']}>
                {selectedCards.length === 3 && (
                    <Link href={`/${theme}/${design}/result/${result}`}>
                        <button className={styles['pretty-button']}>Start Reading</button>
                    </Link>
                )}
            </div>
        </div>
    );
}
