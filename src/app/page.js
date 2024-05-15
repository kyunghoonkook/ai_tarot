'use client';
import React, { useState } from 'react';
import ThemeSelector from '@/components/ThemeSelector';
import styles from './page.module.css';

function App() {
    return (
        <div className={styles['bgWrap']}>
            <img src="/images/mainBG.png" className={styles['main-bg']} />

            <ThemeSelector />
        </div>
    );
}

export default App;
