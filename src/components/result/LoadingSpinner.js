'use client';
import { FaSpinner } from 'react-icons/fa';
import styles from '../../styles/ResultPage.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles['loading-container']}>
      <FaSpinner className={styles['loading-spinner']} />
      <p>Our AI is interpreting your tarot cards...</p>
    </div>
  );
};

export default LoadingSpinner; 