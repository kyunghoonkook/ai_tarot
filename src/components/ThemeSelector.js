import Link from 'next/link';
import React from 'react';
import styles from '../styles/ThemeSelector.module.css';

export default function ThemeSelector() {
    const cards = [
        { theme: 'Love', image: '/images/love.png', text: 'Love Tarot\n3-Card Tarot Spread' },
        { theme: 'Money', image: '/images/money.png', text: 'Money Tarot\n3-Card Tarot Spread' },
        { theme: 'Health', image: '/images/health.png', text: 'Health Tarot\n3-Card Tarot Spread' },
    ];

    return (
        <div className={styles['tarot-cards']}>
            {cards.map((card) => (
                <Link key={card.theme} href={`/${card.theme}`}>
                    <div className={styles['tarot-card']}>
                        <img src={card.image} alt={`${card.theme} tarot`} />
                        {/* <img src={card.image} alt={`${card.theme} tarot`} />
                        <img src={card.image} alt={`${card.theme} tarot`} /> */}
                        <p>
                            {card.text.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {index === 0 ? <span>{line}</span> : <small>{line}</small>}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
