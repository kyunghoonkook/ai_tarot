'use client';
import { memo } from 'react';
import styles from '../../styles/ResultPage.module.css';
import TarotCard from './TarotCard';

const CardDisplay = ({ selectedCards, design, theme }) => {
  if (!selectedCards.length || !design) {
    return null;
  }
  
  return (
    <div className={styles['card_box']}>
      {selectedCards.map((card, index) => (
        <TarotCard 
          key={index} 
          card={card} 
          index={index} 
          theme={theme} 
          design={design} 
        />
      ))}
    </div>
  );
};

export default memo(CardDisplay); 