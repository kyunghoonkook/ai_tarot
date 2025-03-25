'use client';
import { memo } from 'react';
import styles from '../../styles/ThemePage.module.css';

const ShufflingAnimation = ({ title }) => {
  return (
    <div className={styles.shuffling}>
      <div className={styles['shuffling-cards']}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={index} 
            className={styles['shuffling-card']} 
            style={{ animationDelay: `${index * 0.2}s` }}
          ></div>
        ))}
      </div>
      <p>Shuffling the cards...</p>
    </div>
  );
};

export default memo(ShufflingAnimation); 