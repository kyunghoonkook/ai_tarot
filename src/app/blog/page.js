import Link from 'next/link';
import styles from './blog.module.css';
import Image from 'next/image';

export default function BlogPage() {
    return (
        <div className={styles.blogContainer}>
            <h1 className={styles.blogTitle}>Tarot Insights & Guides</h1>
            <p className={styles.blogDescription}>
                Explore our collection of articles, guides, and insights about tarot reading, 
                spirituality, and personal growth.
            </p>
            
            <div className={styles.featuredPost}>
                <div className={styles.featuredImage}>
                    <img 
                        src="/images/cardBG.png" 
                        alt="Tarot Reading for Beginners" 
                    />
                </div>
                <div className={styles.featuredContent}>
                    <span className={styles.tag}>Featured</span>
                    <h2>
                        <Link href="/blog/tarot-reading-beginners-guide">
                            The Complete Tarot Reading Guide for Beginners
                        </Link>
                    </h2>
                    <p className={styles.excerpt}>
                        New to tarot reading? This comprehensive guide covers everything you need to know
                        to start your journey with tarot cards, from understanding basic symbolism to conducting
                        your first reading.
                    </p>
                    <div className={styles.meta}>
                        <span className={styles.date}>June 15, 2023</span>
                        <span className={styles.readTime}>12 min read</span>
                    </div>
                </div>
            </div>
            
            <div className={styles.blogGrid}>
                <div className={styles.blogCard}>
                    <div className={styles.cardImage}>
                        <img 
                            src="/images/love.png" 
                            alt="Love Tarot Spreads" 
                        />
                    </div>
                    <div className={styles.cardContent}>
                        <span className={styles.tag}>Love</span>
                        <h3>
                            <Link href="/blog/5-powerful-love-tarot-spreads">
                                5 Powerful Love Tarot Spreads for Relationship Insights
                            </Link>
                        </h3>
                        <p className={styles.excerpt}>
                            Discover specialized tarot spreads that can help you navigate
                            your love life, relationship challenges, and romantic future.
                        </p>
                        <div className={styles.meta}>
                            <span className={styles.date}>June 10, 2023</span>
                            <span className={styles.readTime}>8 min read</span>
                        </div>
                    </div>
                </div>
                
                <div className={styles.blogCard}>
                    <div className={styles.cardImage}>
                        <img 
                            src="/images/symbolBG.png" 
                            alt="Daily Tarot Practice" 
                        />
                    </div>
                    <div className={styles.cardContent}>
                        <span className={styles.tag}>Practice</span>
                        <h3>
                            <Link href="/blog/daily-tarot-practice-tips">
                                How to Incorporate Tarot into Your Daily Practice
                            </Link>
                        </h3>
                        <p className={styles.excerpt}>
                            Learn how to use tarot cards for daily guidance, reflection, and 
                            spiritual growth with these practical tips and routines.
                        </p>
                        <div className={styles.meta}>
                            <span className={styles.date}>June 5, 2023</span>
                            <span className={styles.readTime}>6 min read</span>
                        </div>
                    </div>
                </div>
                
                <div className={styles.blogCard}>
                    <div className={styles.cardImage}>
                        <img 
                            src="/images/money.png" 
                            alt="Career Guidance Tarot" 
                        />
                    </div>
                    <div className={styles.cardContent}>
                        <span className={styles.tag}>Career</span>
                        <h3>
                            <Link href="/blog/tarot-career-guidance">
                                Using Tarot for Career Guidance and Professional Decisions
                            </Link>
                        </h3>
                        <p className={styles.excerpt}>
                            Explore how tarot readings can provide insights into your career path, 
                            job changes, and professional development.
                        </p>
                        <div className={styles.meta}>
                            <span className={styles.date}>May 28, 2023</span>
                            <span className={styles.readTime}>9 min read</span>
                        </div>
                    </div>
                </div>
                
                <div className={styles.blogCard}>
                    <div className={styles.cardImage}>
                        <img 
                            src="/images/health.png" 
                            alt="Health and Wellness Tarot" 
                        />
                    </div>
                    <div className={styles.cardContent}>
                        <span className={styles.tag}>Health</span>
                        <h3>
                            <Link href="/blog/health-wellness-tarot">
                                Tarot for Health and Wellness Insights
                            </Link>
                        </h3>
                        <p className={styles.excerpt}>
                            Discover how tarot cards can provide guidance for your 
                            physical and mental wellbeing through targeted readings.
                        </p>
                        <div className={styles.meta}>
                            <span className={styles.date}>May 20, 2023</span>
                            <span className={styles.readTime}>7 min read</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.pagination}>
                <span className={styles.currentPage}>Page 1</span>
                <Link href="/blog/page/2" className={styles.pageLink}>Next →</Link>
            </div>
            
            <div className={styles.subscribeSection}>
                <h3>Get Weekly Tarot Insights</h3>
                <p>Subscribe to our newsletter for weekly tarot readings, guides, and spiritual advice.</p>
                <form className={styles.subscribeForm}>
                    <input type="email" placeholder="Your email address" required />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
    );
} 