// app/quiz/page.js
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Quiz.module.css';
const questions = [
    {
        question: '당신의 현재 기분은?',
        answers: [
            { text: '행복', value: 'happy' },
            { text: '슬픔', value: 'sad' },
            { text: '화남', value: 'angry' },
            { text: '평온', value: 'calm' },
        ],
    },
    {
        question: '오늘의 주제는?',
        answers: [
            { text: '사랑', value: 'love' },
            { text: '일', value: 'work' },
            { text: '건강', value: 'health' },
            { text: '재정', value: 'finance' },
        ],
    },
];

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState([]);
    const router = useRouter();

    const handleAnswerClick = (answer) => {
        const newResult = {
            question: questions[currentQuestion].question,
            answer: answer.text,
        };
        const updatedResults = [...results, newResult];
        setResults(updatedResults);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // 퀴즈가 끝나면 결과 페이지로 이동
            router.push({
                pathname: '/quiz/result',
                query: { results: JSON.stringify(updatedResults) },
            });
        }
    };

    return (
        <div className={styles.quizContainer}>
            <h1>타로 카드 퀴즈</h1>
            <div>
                <h2 className={styles.question}>{questions[currentQuestion].question}</h2>
                <ul className={styles.answers}>
                    {questions[currentQuestion].answers.map((answer, index) => (
                        <li key={index}>
                            <button className={styles.answerButton} onClick={() => handleAnswerClick(answer)}>
                                {answer.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuizPage;
