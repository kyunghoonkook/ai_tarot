'use client';
import { memo } from 'react';
import styles from '../../styles/ThemePage.module.css';
import Card from './Card';

const CardDeck = ({ 
  remainingCards, 
  design, 
  onCardClick, 
  onTouchStart, 
  onTouchEnd 
}) => {
  return (
    <div className={styles.cardsContainer}>
      {remainingCards.map((card, idx) => (
        <Card
          key={idx}
          card={card}
          design={design}
          onClick={() => onCardClick(card)}
          onTouchStart={(e) => onTouchStart(e, card)}
          onTouchEnd={(e) => onTouchEnd(e, card)}
          isFlipped={false}
          isReversed={false}
        />
      ))}
    </div>
  );
};

export default memo(CardDeck); 