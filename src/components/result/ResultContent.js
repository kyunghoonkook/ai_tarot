'use client';
import { memo } from 'react';
import styles from '../../styles/ResultPage.module.css';
import SpecialCard from '../SpecialCard';

const ResultContent = ({ 
  response, 
  unlockedSpecialCard, 
  showShareSuccessMessage 
}) => {
  return (
    <>
      <h2 className={styles['title_ai']}>AI Tarot Interpretation</h2>
      
      <div
        className={styles['result-text-box']}
        dangerouslySetInnerHTML={{ __html: response }}
      />

      <div className={styles['incentive-message']}>
        <p>Share with friends to unlock a special tarot card insight!</p>
        <span>Daily readings across different themes provide more accurate future predictions.</span>
      </div>

      {showShareSuccessMessage && (
        <div className={styles['share-success']}>
          <p>Thank you for sharing! You've unlocked a special insight for your next tarot session.</p>
        </div>
      )}

      {unlockedSpecialCard && (
        <div className={styles['special-card']}>
          <h3>🎴 Your Special Card: The Star ✨</h3>
          <div className={styles['special-card-content']}>
            <SpecialCard />
            <p>This special card represents hope, inspiration, and spiritual guidance. Its appearance suggests that you should maintain faith in yourself during challenging times.</p>
          </div>
        </div>
      )}

      <div className={styles['next-action']}>
        <a href="/" className={styles['home-button']}>
          Start a New Tarot Reading
        </a>
      </div>

      <div className={styles['daily-tip']}>
        <h3>🔮 Tarot Tip of the Day</h3>
        <p>Tarot cards don't predict a fixed future but help you understand your current situation and make better choices that align with your true path.</p>
      </div>
    </>
  );
};

export default memo(ResultContent); 