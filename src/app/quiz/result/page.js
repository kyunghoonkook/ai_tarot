// app/quiz/result.js
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Result.module.css';

const ResultPage = () => {
    const router = useRouter();
    const { results } = router.query;

    // results가 undefined일 경우 빈 배열로 초기화
    const parsedResults = results ? JSON.parse(results) : [];

    return (
        <div className={styles.resultContainer}>
            <h1>퀴즈 결과</h1>
            <p>당신의 선택은 다음과 같습니다:</p>
            <ul className={styles.resultList}>
                {parsedResults.map((result, index) => (
                    <li key={index} className={styles.resultItem}>
                        {result.question}: {result.answer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultPage;
