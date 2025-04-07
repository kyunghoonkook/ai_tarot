"use client"
import { useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import Image from 'next/image';

export default function BlogPage() {
    // 카테고리 필터 상태 관리
    const [activeCategory, setActiveCategory] = useState('all');
    
    // 카테고리 목록
    const categories = [
        { id: 'all', name: 'All Posts' },
        { id: 'love', name: 'Love & Relationships' },
        { id: 'career', name: 'Career & Finance' },
        { id: 'practice', name: 'Tarot Practice' },
        { id: 'health', name: 'Health & Wellness' }
    ];
    
    // 블로그 게시물 데이터
    const blogPosts = [
        {
            id: 'tarot-reading-beginners-guide',
            title: 'The Complete Tarot Reading Guide for Beginners',
            excerpt: 'New to tarot reading? This comprehensive guide covers everything you need to know to start your journey with tarot cards, from understanding basic symbolism to conducting your first reading.',
            image: '/images/symbolBG.png',
            category: 'practice',
            featured: true,
            date: 'June 15, 2023',
            readTime: '12 min read'
        },
        {
            id: '5-powerful-love-tarot-spreads',
            title: '5 Powerful Love Tarot Spreads for Relationship Insights',
            excerpt: 'Discover specialized tarot spreads that can help you navigate your love life, relationship challenges, and romantic future.',
            image: '/images/love.png',
            category: 'love',
            featured: false,
            date: 'June 10, 2023',
            readTime: '8 min read'
        },
        {
            id: 'daily-tarot-practice-tips',
            title: 'How to Incorporate Tarot into Your Daily Practice',
            excerpt: 'Learn how to use tarot cards for daily guidance, reflection, and spiritual growth with these practical tips and routines.',
            image: '/images/symbolBG.png',
            category: 'practice',
            featured: false,
            date: 'June 5, 2023',
            readTime: '6 min read'
        },
        {
            id: 'tarot-career-guidance',
            title: 'Using Tarot for Career Guidance and Professional Decisions',
            excerpt: 'Explore how tarot readings can provide insights into your career path, job changes, and professional development.',
            image: '/images/money.png',
            category: 'career',
            featured: false,
            date: 'May 28, 2023',
            readTime: '9 min read'
        },
        {
            id: 'health-wellness-tarot',
            title: 'Tarot for Health and Wellness Insights',
            excerpt: 'Discover how tarot cards can provide guidance for your physical and mental wellbeing through targeted readings.',
            image: '/images/health.png',
            category: 'health',
            featured: false,
            date: 'May 20, 2023',
            readTime: '7 min read'
        }
    ];
    
    // 필터링된 게시물
    const filteredPosts = activeCategory === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === activeCategory);
    
    // 배너 게시물 (featured)
    const featuredPost = blogPosts.find(post => post.featured);
    
    // 일반 게시물 (non-featured)
    const regularPosts = filteredPosts.filter(post => !post.featured || activeCategory !== 'all');

    // 카테고리 변경 핸들러
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };
    
    // 현재는 블로그 상세 페이지가 없으므로 클릭 이벤트 처리
    const handleArticleClick = (e, postId) => {
        e.preventDefault();
        alert('The blog detail page is under development. It will be available soon.');
    };

    // 구독 폼 제출 처리
    const handleSubscribe = (e) => {
        e.preventDefault();
        alert('The subscription feature is under development. It will be available soon.');
    };

    return (
        <div className={styles.blogContainer}>
            <div className={styles.heroSection}>
                <h1 className={styles.mainTitle}>Tarot Insights & Guides</h1>
                <p className={styles.heroText}>
                    Explore our collection of articles, guides, and insights about tarot reading, 
                    spirituality, and personal growth. Deepen your understanding and enhance your practice.
                </p>
            </div>
            
            <div className={styles.contentSection}>
                {/* 카테고리 필터 */}
                <div className={styles.categoryFilter}>
                    <div className={styles.filterHeader}>
                        <h2>Filter by Category</h2>
                        <div className={styles.decorativeLine}></div>
                    </div>
                    <div className={styles.categoryButtons}>
                        {categories.map(category => (
                            <button 
                                key={category.id} 
                                className={`${styles.categoryButton} ${activeCategory === category.id ? styles.activeCategory : ''}`}
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* 특집 게시물 (all 카테고리일 때만 표시) */}
                {activeCategory === 'all' && featuredPost && (
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.title}>Featured Article</h2>
                            <div className={styles.decorativeLine}></div>
                        </div>
                        <div className={styles.featuredPost}>
                            <div className={styles.featuredImage}>
                                <img 
                                    src={featuredPost.image} 
                                    alt={featuredPost.title} 
                                    className={styles.featuredImg}
                                />
                            </div>
                            <div className={styles.featuredContent}>
                                <div className={styles.featuredMeta}>
                                    <span className={`${styles.tag} ${styles[featuredPost.category]}`}>{featuredPost.category}</span>
                                    <div className={styles.metaDetails}>
                                        <span className={styles.date}>{featuredPost.date}</span>
                                        <span className={styles.readTime}>{featuredPost.readTime}</span>
                                    </div>
                                </div>
                                <h2 className={styles.featuredTitle}>
                                    <a 
                                        href="#" 
                                        onClick={(e) => handleArticleClick(e, featuredPost.id)}
                                    >
                                        {featuredPost.title}
                                    </a>
                                </h2>
                                <p className={styles.excerpt}>
                                    {featuredPost.excerpt}
                                </p>
                                <a 
                                    href="#" 
                                    className={styles.readMoreLink}
                                    onClick={(e) => handleArticleClick(e, featuredPost.id)}
                                >
                                    Read Full Article →
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* 게시물 그리드 */}
                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.title}>{activeCategory === 'all' ? 'Latest Articles' : categories.find(c => c.id === activeCategory).name}</h2>
                        <div className={styles.decorativeLine}></div>
                    </div>
                    
                    {regularPosts.length > 0 ? (
                        <div className={styles.blogGrid}>
                            {regularPosts.map(post => (
                                <div key={post.id} className={styles.blogCard}>
                                    <div className={styles.cardImage}>
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className={styles.postImage}
                                        />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.postMeta}>
                                            <span className={`${styles.tag} ${styles[post.category]}`}>{post.category}</span>
                                            <div className={styles.metaInfo}>
                                                <span className={styles.date}>{post.date}</span>
                                                <span className={styles.readTime}>{post.readTime}</span>
                                            </div>
                                        </div>
                                        <h3 className={styles.postTitle}>
                                            <a 
                                                href="#" 
                                                onClick={(e) => handleArticleClick(e, post.id)}
                                            >
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className={styles.excerpt}>
                                            {post.excerpt}
                                        </p>
                                        <a 
                                            href="#" 
                                            className={styles.cardLink}
                                            onClick={(e) => handleArticleClick(e, post.id)}
                                        >
                                            Read Article →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <p>No articles found in this category yet. Check back soon!</p>
                        </div>
                    )}
                    
                    <div className={styles.pagination}>
                        <span className={styles.currentPage}>Page 1</span>
                        <span className={styles.comingSoon}>More pages coming soon</span>
                    </div>
                </div>
            </div>
            
            <div className={styles.ctaSection}>
                <h2>Get Weekly Tarot Insights</h2>
                <p>Subscribe to our newsletter for exclusive tarot readings, guides, and spiritual advice delivered to your inbox every week.</p>
                <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
                    <input type="email" placeholder="Your email address" required />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
    );
} 