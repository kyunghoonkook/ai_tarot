'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './blogPost.module.css';

export default function BlogPost({ params }) {
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                // 슬러그로 블로그 게시물 가져오기
                const response = await fetch(`/api/blog/posts/${params.slug}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Blog post not found');
                    }
                    throw new Error('Failed to fetch blog post');
                }
                
                const data = await response.json();
                if (data.success) {
                    setPost(data.post);
                } else {
                    throw new Error(data.message || 'Failed to load blog post');
                }
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (params.slug) {
            fetchBlogPost();
        }
    }, [params.slug]);
    
    // 로딩 상태 표시
    if (loading) {
        return (
            <div className={styles.blogPostContainer}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Loading post...</p>
                </div>
            </div>
        );
    }
    
    // 오류 상태 표시
    if (error || !post) {
        return (
            <div className={styles.blogPostContainer}>
                <div className={styles.errorContainer}>
                    <h2>Error</h2>
                    <p>{error || 'Blog post not found'}</p>
                    <button 
                        className={styles.button} 
                        onClick={() => router.push('/blog')}
                    >
                        Return to Blog
                    </button>
                </div>
            </div>
        );
    }
    
    // 날짜 형식 지정
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // HTML 콘텐츠 안전하게 렌더링
    const renderHTML = (htmlString) => {
        return { __html: htmlString };
    };
    
    return (
        <div className={styles.blogPostContainer}>
            <article className={styles.blogPost}>
                {/* 글 헤더 */}
                <header className={styles.postHeader}>
                    <h1 className={styles.postTitle}>{post.title}</h1>
                    <div className={styles.postMeta}>
                        <div className={styles.author}>
                            <span className={styles.authorName}>By {post.authorName}</span>
                        </div>
                        <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                        <div className={styles.tags}>
                            {post.tags.map((tag, index) => (
                                <Link key={index} href={`/blog?tag=${tag}`}>
                                    <span className={styles.tag}>{tag}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </header>
                
                {/* 대표 이미지 */}
                {post.image && (
                    <div className={styles.featuredImageContainer}>
                        <img
                            src={post.image}
                            alt={post.title}
                            className={styles.featuredImage}
                            loading="lazy"
                        />
                    </div>
                )}
                
                {/* 글 내용 */}
                <div 
                    className={styles.postContent}
                    dangerouslySetInnerHTML={renderHTML(post.content)}
                />
                
                {/* 블로그 목록으로 돌아가기 */}
                <div className={styles.backLink}>
                    <Link href="/blog">← Back to Blog</Link>
                </div>
            </article>
        </div>
    );
}