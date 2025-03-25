'use client';
import { memo } from 'react';
import styles from '../../styles/ResultPage.module.css';

const ActionButtons = ({ onDownloadPDF, onToggleShare }) => {
  return (
    <div className={styles['action-buttons']}>
      <button onClick={onDownloadPDF} className={styles['action-button']}>
        <span>Save as PDF</span>
      </button>
      <button onClick={onToggleShare} className={styles['action-button']}>
        <span>Share with Friends</span>
      </button>
    </div>
  );
};

export default memo(ActionButtons); 