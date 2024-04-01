'use client';
import React, { useState } from 'react';
import axios from 'axios';
import ThemeSelector from '@/components/ThemeSelector';
import styles from './page.module.css';

function App() {
    const [theme, setTheme] = useState('');
    const [card1, setCard1] = useState('');
    const [card2, setCard2] = useState('');
    const [card3, setCard3] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/tarot', {
                theme,
                card1,
                card2,
                card3,
            });
            setResponse(res.data.message);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.bgWrap}>
            <img src="/images/mainBG.png" className={styles['main-bg']} />
            <ThemeSelector />
        </div>
    );
}

export default App;
