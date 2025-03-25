'use client';
import { memo } from 'react';
import styles from '../../styles/ThemePage.module.css';

const Instruction = ({ title }) => {
  return (
    <div className={styles.instruction}>
      <h2>{title}</h2>
      <p>Focus on your question as you select your cards. Trust your intuition.</p>
    </div>
  );
};

export default memo(Instruction); 