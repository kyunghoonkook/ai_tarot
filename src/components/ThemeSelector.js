import Link from 'next/link';
import React from 'react';
import styles from '../styles/ThemeSelector.module.css';

export default function ThemeSelector() {
    const cards = [
        { 
            theme: 'Love', 
            image: '/images/love.png', 
            text: 'Love Tarot\n3-Card Tarot Spread',
            description: 'Explore your romantic journey - past connections, current situation, and future possibilities.'
        },
        { 
            theme: 'Money', 
            image: '/images/money.png', 
            text: 'Money Tarot\n3-Card Tarot Spread',
            description: 'Discover financial insights - areas to improve, your strengths, and steps toward prosperity.'
        },
        { 
            theme: 'Health', 
            image: '/images/health.png', 
            text: 'Health Tarot\n3-Card Tarot Spread',
            description: 'Gain wellness clarity - examining your mind, body, and soul for holistic health guidance.'
        },
    ];

    return (
        <div className={styles['tarot-cards-container']}>
            <div className={styles['tarot-cards']}>
                {cards.map((card) => (
                    <Link key={card.theme} href={`/${card.theme}`}>
                        <div className={styles['tarot-card']}>
                            <div className={styles['card-image-container']}>
                                <img src={card.image} alt={`${card.theme} tarot`} className={styles['card-image']} />
                                <div className={styles['card-hover-effect']}></div>
                            </div>
                            <div className={styles['card-content']}>
                                <div className={styles['card-title']}>
                                    {card.text.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {index === 0 ? <span>{line}</span> : <small>{line}</small>}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </div>
                                <p className={styles['card-description']}>{card.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles['cards-explanation']}>
                <h3>How Our Tarot Works</h3>
                <p>
                    Select a theme that resonates with your current situation. You'll choose 3 cards from the Major Arcana 
                    deck. Our AI will then analyze the specific combination of cards to provide you with personalized insights 
                    and guidance relevant to your chosen theme.
                </p>
            </div>
        </div>
    );
}
