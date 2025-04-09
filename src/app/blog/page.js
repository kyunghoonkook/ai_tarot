"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function BlogPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [activeCategory, setActiveCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogPosts, setBlogPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    // 카테고리 목록
    const categories = [
        { id: 'all', name: 'All Posts' },
        { id: 'love', name: 'Love & Relationships' },
        { id: 'career', name: 'Career & Finance' },
        { id: 'practice', name: 'Tarot Practice' },
        { id: 'health', name: 'Health & Wellness' }
    ];
    
    // 게시물 데이터 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                let url = `/api/blog/posts?page=${page}&limit=10`;
                
                if (activeCategory !== 'all') {
                    url += `&category=${activeCategory}`;
                }
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                
                const data = await response.json();
                
                if (data.success) {
                    setBlogPosts(data.posts);
                    setTotalPages(data.pagination.pages);
                } else {
                    throw new Error(data.message || 'Failed to load posts');
                }
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setError(err.message || 'Error loading blog posts');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchPosts();
    }, [activeCategory, page]);
    
    // 필터링된 게시물
    const filteredPosts = blogPosts;
    
    // 배너 게시물 (featured)
    const featuredPost = blogPosts.find(post => post.featured);
    
    // 일반 게시물 (non-featured)
    const regularPosts = activeCategory === 'all' 
        ? blogPosts.filter(post => !post.featured) 
        : blogPosts;

    // 카테고리 변경 핸들러
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setPage(1); // 카테고리가 바뀌면 페이지를 1로 리셋
    };
    
    // 게시물 클릭 핸들러
    const handleArticleClick = (e, slug) => {
        e.preventDefault();
        router.push(`/blog/${slug}`);
    };

    // 구독 폼 제출 처리
    const handleSubscribe = (e) => {
        e.preventDefault();
        alert('The subscription feature is under development. It will be available soon.');
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className={styles.blogContainer}>
            <div className={styles.heroSection}>
                <h1 className={styles.mainTitle}>Tarot Insights & Guides</h1>
                <p className={styles.heroText}>
                    Explore our collection of articles, guides, and insights about tarot reading, 
                    spirituality, and personal growth. Deepen your understanding and enhance your practice.
                </p>
                
                {user && (
                    <button 
                        className={styles.writeButton}
                        onClick={() => router.push('/blog/write')}
                    >
                        Write New Post
                    </button>
                )}
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
                
                {/* 로딩 및 에러 상태 처리 */}
                {isLoading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                        <p>Loading posts...</p>
                    </div>
                ) : error ? (
                    <div className={styles.errorContainer}>
                        <p>Error: {error}</p>
                        <button onClick={() => window.location.reload()} className={styles.retryButton}>
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {/* 특집 게시물 (all 카테고리이고 featured 게시물이 있을 때) */}
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
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/images/symbolBG.png';
                                            }}
                                        />
                                    </div>
                                    <div className={styles.featuredContent}>
                                        <div className={styles.featuredMeta}>
                                            <span className={`${styles.tag} ${styles[featuredPost.category]}`}>{featuredPost.category}</span>
                                            <div className={styles.metaDetails}>
                                                <span className={styles.date}>{new Date(featuredPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                <span className={styles.readTime}>{featuredPost.readTime || 5} min read</span>
                                            </div>
                                        </div>
                                        <h2 className={styles.featuredTitle}>
                                            <a 
                                                href={`/blog/${featuredPost.slug}`} 
                                                onClick={(e) => handleArticleClick(e, featuredPost.slug)}
                                            >
                                                {featuredPost.title}
                                            </a>
                                        </h2>
                                        <p className={styles.excerpt}>
                                            {featuredPost.excerpt}
                                        </p>
                                        <a 
                                            href={`/blog/${featuredPost.slug}`} 
                                            className={styles.readMoreLink}
                                            onClick={(e) => handleArticleClick(e, featuredPost.slug)}
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
                                        <div key={post._id} className={styles.blogCard}>
                                            <div className={styles.cardImage}>
                                                <img 
                                                    src={post.image || '/images/symbolBG.png'} 
                                                    alt={post.title} 
                                                    className={styles.postImage}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/images/symbolBG.png';
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.cardContent}>
                                                <div className={styles.postMeta}>
                                                    <span className={`${styles.tag} ${styles[post.category]}`}>{post.category}</span>
                                                    <div className={styles.metaInfo}>
                                                        <span className={styles.date}>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                        <span className={styles.readTime}>{post.readTime || 5} min read</span>
                                                    </div>
                                                </div>
                                                <h3 className={styles.postTitle}>
                                                    <a 
                                                        href={`/blog/${post.slug}`} 
                                                        onClick={(e) => handleArticleClick(e, post.slug)}
                                                    >
                                                        {post.title}
                                                    </a>
                                                </h3>
                                                <p className={styles.excerpt}>
                                                    {post.excerpt}
                                                </p>
                                                <a 
                                                    href={`/blog/${post.slug}`} 
                                                    className={styles.cardLink}
                                                    onClick={(e) => handleArticleClick(e, post.slug)}
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
                            
                            {/* 페이지네이션 */}
                            {totalPages > 1 && (
                                <div className={styles.pagination}>
                                    <button 
                                        onClick={() => handlePageChange(page - 1)} 
                                        disabled={page === 1}
                                        className={styles.pageButton}
                                    >
                                        &lt; Previous
                                    </button>
                                    
                                    <span className={styles.currentPage}>
                                        Page {page} of {totalPages}
                                    </span>
                                    
                                    <button 
                                        onClick={() => handlePageChange(page + 1)} 
                                        disabled={page === totalPages}
                                        className={styles.pageButton}
                                    >
                                        Next &gt;
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
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