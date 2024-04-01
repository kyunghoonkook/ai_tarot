'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/ThemePage.module.css';

export default function CardSelector({ theme, design }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [remainingCards, setRemainingCards] = useState([]);

    useEffect(() => {
        const cards = Array.from({ length: 22 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
        const shuffledCards = shuffleArray(cards);
        setRemainingCards(shuffledCards);
    }, []);

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

            setTimeout(() => {
                const selectedCardElements = document.querySelectorAll('.selected-cards > div');
                selectedCardElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('show');
                    }, index * 200);
                });
            }, 600);
        }
    };

    return (
        <div>
            <h2 className={styles['sub_title']}>CHOOSE YOUR DECK</h2>
            <div className={styles['cards']}>
                {remainingCards.map((card, idx) => (
                    <div key={idx} className={`${styles['card']}`} onClick={() => handleCardClick(card)}>
                        <div className={styles['card-inner']}>
                            <div className={styles['card-front']}>
                                <img src={`/images/${design}/${card}.png`} alt={`Card ${parseInt(card)}`} />
                            </div>
                            <div className={styles['card-back']}>
                                <img src={`/images/${design}/뒷면 1.png`} alt={'1'} />
                            </div>
                        </div>
                        {/* <p>{`Card ${parseInt(card)}`}</p> */}
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
                        {theme === 'Future' && (
                            <>
                                {index === 0 && <h3>Mind</h3>}
                                {index === 1 && <h3>Body</h3>}
                                {index === 2 && <h3>Spirit</h3>}
                            </>
                        )}
                        <img src={`/images/${design}/${card}.png`} alt={`Card ${parseInt(card)}`} />
                    </div>
                ))}
            </div>
            {selectedCards.length === 3 && (
                <Link href={`/${theme}/${selectedCards.join(',')}`}>
                    <button>Start Reading</button>
                </Link>
            )}
        </div>
    );
}
