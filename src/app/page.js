'use client';
import { useState, useEffect, useRef } from 'react';
import ThemeSelector from '@/components/ThemeSelector';
import styles from './page.module.css';
import Link from 'next/link';

// Next.js 13+의 메타데이터 설정
    

function App() {
    // 스크롤 애니메이션을 위한 상태와 참조 설정
    const [isVisible, setIsVisible] = useState({
        testimonials: false,
        blog: false,
        social: false
    });
    
    const testimonialsRef = useRef(null);
    const blogRef = useRef(null);
    const socialRef = useRef(null);
    
    // 스크롤 이벤트 핸들러
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { ref: testimonialsRef, key: 'testimonials' },
                { ref: blogRef, key: 'blog' },
                { ref: socialRef, key: 'social' }
            ];
            
            sections.forEach(section => {
                if (section.ref.current) {
                    const top = section.ref.current.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (top < windowHeight * 0.8) {
                        setIsVisible(prev => ({ ...prev, [section.key]: true }));
                    }
                }
            });
        };
        
        // 초기 체크 및 이벤트 리스너 등록
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // 테스티모니얼 데이터
    const testimonials = [
        {
            id: 1,
            stars: 5,
            text: "The reading was incredibly accurate and gave me exactly the guidance I needed for my relationship.",
            author: "Sarah M."
        },
        {
            id: 2,
            stars: 5,
            text: "I was skeptical at first, but the financial advice from my reading helped me make a crucial decision.",
            author: "James T."
        },
        {
            id: 3,
            stars: 5,
            text: "I use AI Tarot weekly for guidance and the insights have been consistently helpful for my well-being.",
            author: "Eliza K."
        }
    ];
    
    // 블로그 프리뷰 데이터
    const blogPreviews = [
        {
            id: 1,
            image: "/images/cardBG.png",
            title: "The Complete Tarot Reading Guide for Beginners",
            excerpt: "New to tarot reading? This comprehensive guide covers everything you need to know to get started with tarot cards.",
            url: "/blog/tarot-reading-beginners-guide"
        },
        {
            id: 2,
            image: "/images/love.png",
            title: "5 Powerful Love Tarot Spreads",
            excerpt: "Discover specialized tarot spreads for relationship insights and navigate your love life with clarity.",
            url: "/blog/5-powerful-love-tarot-spreads"
        }
    ];
    
    // 별 아이콘 렌더링 함수
    const renderStars = (count) => {
        return Array(count).fill(0).map((_, index) => (
            <span key={index} className={styles['star-icon']}>★</span>
        ));
    };
    
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
                    <Link href="/cards" className={styles['primary-button']}>
                        Get Your Free Reading
                        <span className={styles['button-shine']}></span>
                    </Link>
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

            <div 
                ref={testimonialsRef} 
                className={`${styles['testimonials-container']} ${isVisible.testimonials ? styles['fade-in'] : styles['fade-out']}`}
            >
                <h2 className={styles['testimonials-title']}>What Our Users Say</h2>
                <div className={styles['testimonials-grid']}>
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={testimonial.id} 
                            className={styles['testimonial']}
                            style={{ 
                                animationDelay: `${index * 0.2}s`,
                                opacity: isVisible.testimonials ? 1 : 0,
                                transform: isVisible.testimonials 
                                    ? 'translateY(0)' 
                                    : 'translateY(30px)'
                            }}
                        >
                            <div className={styles['testimonial-stars']}>
                                {renderStars(testimonial.stars)}
                            </div>
                            <p className={styles['testimonial-text']}>
                                "{testimonial.text}"
                            </p>
                            <p className={styles['testimonial-author']}>— {testimonial.author}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div 
                ref={socialRef}
                className={`${styles['social-share-container']} ${isVisible.social ? styles['fade-in'] : styles['fade-out']}`}
                style={{ 
                    opacity: isVisible.social ? 1 : 0,
                    transform: isVisible.social ? 'translateY(0)' : 'translateY(30px)'
                }}
            >
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
            
            <div 
                ref={blogRef}
                className={`${styles['blog-preview-container']} ${isVisible.blog ? styles['fade-in'] : styles['fade-out']}`}
                style={{ 
                    opacity: isVisible.blog ? 1 : 0,
                    transform: isVisible.blog ? 'translateY(0)' : 'translateY(30px)'
                }}
            >
                <h2 className={styles['blog-preview-title']}>Latest from Our Blog</h2>
                <div className={styles['blog-preview-grid']}>
                    {blogPreviews.map((blog, index) => (
                        <Link 
                            key={blog.id} 
                            href={blog.url} 
                            className={styles['blog-preview-card']}
                            style={{ 
                                animationDelay: `${index * 0.2}s`,
                                opacity: isVisible.blog ? 1 : 0,
                                transform: isVisible.blog 
                                    ? 'translateY(0)' 
                                    : 'translateY(20px)',
                                transition: 'all 0.5s ease',
                                transitionDelay: `${index * 0.2}s`
                            }}
                        >
                            <img src={blog.image} alt={blog.title} className={styles['blog-preview-image']} />
                            <h3 className={styles['blog-preview-heading']}>{blog.title}</h3>
                            <p className={styles['blog-preview-excerpt']}>{blog.excerpt}</p>
                        </Link>
                    ))}
                </div>
                <div className={styles['blog-preview-link']}>
                    <Link href="/blog">View All Articles →</Link>
                </div>
            </div>
        </div>
    );
}

export default App;
