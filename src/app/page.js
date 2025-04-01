import ThemeSelector from '@/components/ThemeSelector';
import styles from './page.module.css';

// Next.js 13+의 메타데이터 설정
export const metadata = {
    title: 'AI Tarot - Free Online Tarot Reading | Discover Your Future Today',
    description: 'Get accurate AI-powered tarot readings for love, career, health, and more. Free personalized insights and guidance available 24/7. Start your spiritual journey today!',
    keywords: 'free tarot reading, AI tarot, online tarot cards, love tarot, career guidance, fortune telling, daily tarot, accurate readings, spiritual guidance',
    openGraph: {
        title: 'AI Tarot - Free Online Tarot Reading | Discover Your Future',
        description: 'Gain insights into your love, finances, and health with our accurate AI-powered tarot readings. Start your free reading now!',
        images: [
            {
                url: 'https://www.aifree-tarot.com/images/main-tarot-reading.jpg',
                width: 1200,
                height: 630,
                alt: 'AI Tarot Reading Experience',
            },
        ],
        type: 'website',
        locale: 'en_US',
        siteName: 'AI Tarot Reading',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free AI Tarot Readings - Discover Your Future Today',
        description: 'Get personalized insights for love, career and more. Start your free reading now!',
        images: ['https://www.aifree-tarot.com/images/twitter-main.jpg'],
        creator: '@AiTarot',
    },
};

function App() {
    return (
        <div className={styles['bgWrap']}>
            {/* 메인 배경 이미지 제거 */}
            {/* 
            <img 
                src="/images/mainBG.png" 
                className={styles['main-bg']} 
                alt="Mystical tarot background with stars" 
                loading="eager" 
                priority="true"
            />
            */}
            
            <div className={styles['hero-content']}>
                <h1 className={styles['hero-title']}>Explore Your Future with AI Tarot</h1>
                <p className={styles['hero-description']}>
                    Gain insights into your love, finances, and health with our accurate <br />
                    AI-powered tarot readings.
                    <br />
                    Discover your potential with personalized daily guidance.
                </p>
                <div className={styles['cta-button']}>
                    <a href="/cards" className={styles['primary-button']}>Get Your Free Reading</a>
                </div>
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

            <div className={styles['social-share-container']}>
                <h3 className={styles['social-share-title']}>Share with Friends</h3>
                <div className={styles['social-share-buttons']}>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.aifree-tarot.com" target="_blank" rel="noopener noreferrer" className={styles['social-button']}>
                        <img src="/images/Icons/facebook-logo-black.png" alt="Share on Facebook" width="24" height="24" />
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=https://www.aifree-tarot.com&text=Get your free AI tarot reading!" target="_blank" rel="noopener noreferrer" className={styles['social-button']}>
                        <img src="/images/Icons/twitter-x-logo.png" alt="Share on Twitter" width="24" height="24" />
                    </a>
                    <a href="https://www.pinterest.com/pin/create/button/?url=https://www.aifree-tarot.com&media=https://www.aifree-tarot.com/images/main-tarot-reading.jpg&description=Free AI Tarot Readings" target="_blank" rel="noopener noreferrer" className={styles['social-button']}>
                        <img src="/images/Icons/share-btn.png" alt="Share on Pinterest" width="24" height="24" />
                    </a>
                </div>
            </div>
            
            <div className={styles['blog-preview-container']}>
                <h2 className={styles['blog-preview-title']}>Latest from Our Blog</h2>
                <div className={styles['blog-preview-grid']}>
                    <a href="/blog/tarot-reading-beginners-guide" className={styles['blog-preview-card']}>
                        <img src="/images/cardBG.png" alt="Tarot Reading Guide" className={styles['blog-preview-image']} />
                        <h3 className={styles['blog-preview-heading']}>The Complete Tarot Reading Guide for Beginners</h3>
                        <p className={styles['blog-preview-excerpt']}>New to tarot reading? This comprehensive guide covers everything...</p>
                    </a>
                    <a href="/blog/5-powerful-love-tarot-spreads" className={styles['blog-preview-card']}>
                        <img src="/images/love.png" alt="Love Tarot Spreads" className={styles['blog-preview-image']} />
                        <h3 className={styles['blog-preview-heading']}>5 Powerful Love Tarot Spreads</h3>
                        <p className={styles['blog-preview-excerpt']}>Discover specialized tarot spreads for relationship insights...</p>
                    </a>
                </div>
                <div className={styles['blog-preview-link']}>
                    <a href="/blog">View All Articles →</a>
                </div>
            </div>
        </div>
    );
}

export default App;
