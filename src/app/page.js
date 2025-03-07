'use client';
import React, { useState } from 'react';
import ThemeSelector from '@/components/ThemeSelector';
import styles from './page.module.css';

function App() {
    return (
        <div className={styles['bgWrap']}>
            <img src="/images/mainBG.png" className={styles['main-bg']} />

            <div className={styles['hero-content']}>
                <h1 className={styles['hero-title']}>Explore Your Future with AI Tarot</h1>
                <p className={styles['hero-description']}>
                    Gain insights into your love, finances, and health with our accurate <br />
                    AI-powered tarot readings.
                    <br />
                    Discover your potential with personalized daily guidance.
                </p>
                <div className={styles['features-container']}>
                    <div className={styles['feature']}>
                        <div className={styles['feature-icon']}>✨</div>
                        <div className={styles['feature-text']}>AI-Powered Analysis</div>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-icon']}>🔮</div>
                        <div className={styles['feature-text']}>3 Unique Themes</div>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-icon']}>🎴</div>
                        <div className={styles['feature-text']}>Beautiful Card Designs</div>
                    </div>
                </div>
            </div>

            <div className={styles['theme-selector-container']}>
                <h2 className={styles['theme-title']}>Choose Your Reading Theme</h2>
                <ThemeSelector />
            </div>

            <div className={styles['testimonials-container']}>
                <h2 className={styles['testimonials-title']}>What Our Users Say</h2>
                <div className={styles['testimonials-grid']}>
                    <div className={styles['testimonial']}>
                        <div className={styles['testimonial-stars']}>★★★★★</div>
                        <p className={styles['testimonial-text']}>
                            "The reading was incredibly accurate and gave me exactly the guidance I needed for my
                            relationship."
                        </p>
                        <p className={styles['testimonial-author']}>— Sarah M.</p>
                    </div>
                    <div className={styles['testimonial']}>
                        <div className={styles['testimonial-stars']}>★★★★★</div>
                        <p className={styles['testimonial-text']}>
                            "I was skeptical at first, but the financial advice from my reading helped me make a crucial
                            decision."
                        </p>
                        <p className={styles['testimonial-author']}>— James T.</p>
                    </div>
                    <div className={styles['testimonial']}>
                        <div className={styles['testimonial-stars']}>★★★★★</div>
                        <p className={styles['testimonial-text']}>
                            "I use AI Tarot weekly for guidance and the insights have been consistently helpful for my
                            well-being."
                        </p>
                        <p className={styles['testimonial-author']}>— Eliza K.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
