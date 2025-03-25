'use client';
import { memo } from 'react';
import styles from '../../styles/ThemePage.module.css';

const SelectedCards = ({ 
  selectedCards, 
  design, 
  positions 
}) => {
  return (
    <div className={styles.selectedCardsSection}>
      <h3>Your Selected Cards: {selectedCards.length}/3</h3>
      <div className={styles.selectedCardsContainer}>
        {selectedCards.map((card, idx) => (
          <div key={idx} className={styles.selectedCardWrapper}>
            <h4>{positions[idx]}</h4>
            <div
              className={`${styles.selectedCard} ${card.isFlipped ? styles.flipped : ''} ${card.isReversed ? styles.reversed : ''}`}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SelectedCards); 