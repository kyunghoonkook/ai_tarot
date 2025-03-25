'use client';
import { memo } from 'react';
import styles from '../../styles/ThemePage.module.css';

const Card = ({ 
  card, 
  design, 
  onClick, 
  onTouchStart, 
  onTouchEnd,
  isFlipped,
  isReversed
}) => {
  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ''} ${isReversed ? styles.reversed : ''}`}
      data-card={card.number}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
  );
};

export default memo(Card); 