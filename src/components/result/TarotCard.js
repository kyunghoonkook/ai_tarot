'use client';
import { memo } from 'react';
import styles from '../../styles/ResultPage.module.css';

const TarotCard = ({ card, index, theme, design }) => {
  // 테마에 따른 카드 제목 설정
  let cardTitle = '';
  if (theme === 'Love') {
    const titles = ['Past', 'Present', 'Future'];
    cardTitle = titles[index];
  } else if (theme === 'Money') {
    const titles = ['What am I doing wrong', 'What am I doing right', 'What to do next'];
    cardTitle = titles[index];
  } else if (theme === 'Health') {
    const titles = ['Mind', 'Body', 'Spirit'];
    cardTitle = titles[index];
  }

  // 카드가 역방향인지 확인
  const isReversed = card.includes('r');
  const cardNumber = card.replace('r', '');
  
  return (
    <div className={styles['card_wrap']}>
      <h3>{cardTitle}</h3>
      <img
        src={`/images/${design}/${cardNumber}.png`}
        alt={`Card ${parseInt(cardNumber)}`}
        className={`${styles['card-image']} ${isReversed ? styles['reversed'] : ''}`}
        loading="eager"
      />
    </div>
  );
};

export default memo(TarotCard); 