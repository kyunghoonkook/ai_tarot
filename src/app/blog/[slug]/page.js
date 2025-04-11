'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './blogPost.module.css';
import { useAuth } from '@/context/AuthContext';

export default function BlogPost({ params }) {
    const router = useRouter();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 댓글 관련 상태
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentsPage, setCommentsPage] = useState(1);
    const [hasMoreComments, setHasMoreComments] = useState(true);
    
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
    
    // 댓글 불러오기
    useEffect(() => {
        if (post) {
            fetchComments();
        }
    }, [post, commentsPage]);
    
    const fetchComments = async () => {
        try {
            setCommentLoading(true);
            const response = await fetch(`/api/blog/comments?post=${post._id}&page=${commentsPage}&limit=10`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            
            const data = await response.json();
            
            if (data.success) {
                if (commentsPage === 1) {
                    setComments(data.comments);
                } else {
                    setComments(prev => [...prev, ...data.comments]);
                }
                
                // 더 불러올 댓글이 있는지 확인
                setHasMoreComments(data.comments.length === 10 && commentsPage < data.pagination.pages);
            } else {
                throw new Error(data.message || 'Failed to load comments');
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setCommentLoading(false);
        }
    };
    
    // 댓글 작성 처리
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        if (!commentContent.trim()) return;
        
        try {
            setCommentLoading(true);
            
            const response = await fetch('/api/blog/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    content: commentContent,
                    postId: post._id,
                }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                // 댓글 목록 새로고침
                setCommentsPage(1);
                setCommentContent('');
                fetchComments();
            } else {
                throw new Error(data.message || 'Failed to submit comment');
            }
        } catch (err) {
            console.error('Error submitting comment:', err);
            alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setCommentLoading(false);
        }
    };
    
    // 더 많은 댓글 불러오기
    const loadMoreComments = () => {
        setCommentsPage(prev => prev + 1);
    };
    
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
    
    // 댓글 날짜를 상대적으로 표시
    const formatCommentDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);
        
        if (diffSec < 60) {
            return '방금 전';
        } else if (diffMin < 60) {
            return `${diffMin}분 전`;
        } else if (diffHr < 24) {
            return `${diffHr}시간 전`;
        } else if (diffDay < 7) {
            return `${diffDay}일 전`;
        } else {
            return formatDate(dateString);
        }
    };
    
    // 댓글 작성자 이니셜 생성
    const getAuthorInitials = (name) => {
        if (!name) return '?';
        
        const nameParts = name.split(' ');
        if (nameParts.length === 1) {
            return name.charAt(0).toUpperCase();
        }
        
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
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
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/symbolBG.png';
                            }}
                        />
                    </div>
                )}
                
                {/* 이미지가 없는 경우에도 기본 이미지 표시 */}
                {!post.image && (
                    <div className={styles.featuredImageContainer}>
                        <img
                            src="/images/symbolBG.png"
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
                
                {/* 댓글 섹션 */}
                <section className={styles.commentsSection}>
                    <h2 className={styles.commentsTitle}>댓글</h2>
                    
                    {/* 댓글 작성 폼 */}
                    {user ? (
                        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
                            <textarea
                                className={styles.commentTextarea}
                                placeholder="댓글을 작성해주세요..."
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                required
                            />
                            <button 
                                className={styles.commentButton} 
                                type="submit"
                                disabled={commentLoading || !commentContent.trim()}
                            >
                                {commentLoading ? '제출 중...' : '댓글 작성'}
                            </button>
                        </form>
                    ) : (
                        <div className={styles.loginPrompt}>
                            <p>댓글을 작성하려면 <Link href="/auth/login" className={styles.loginLink}>로그인</Link>이 필요합니다.</p>
                        </div>
                    )}
                    
                    {/* 댓글 목록 */}
                    {comments.length > 0 ? (
                        <div className={styles.commentsList}>
                            {comments.map(comment => (
                                <div key={comment._id} className={styles.commentItem}>
                                    <div className={styles.commentHeader}>
                                        {comment.author.profileImage ? (
                                            <img 
                                                src={comment.author.profileImage} 
                                                alt={comment.author.name} 
                                                className={styles.commentAvatar}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/images/symbolBG.png';
                                                }}
                                            />
                                        ) : (
                                            <div className={styles.commentAvatar}>
                                                {getAuthorInitials(comment.author.name)}
                                            </div>
                                        )}
                                        <div className={styles.commentAuthorInfo}>
                                            <div className={styles.commentAuthor}>{comment.author.name}</div>
                                            <div className={styles.commentDate}>{formatCommentDate(comment.createdAt)}</div>
                                        </div>
                                    </div>
                                    <div className={styles.commentContent}>{comment.content}</div>
                                </div>
                            ))}
                            
                            {/* 더 불러오기 버튼 */}
                            {hasMoreComments && (
                                <button 
                                    className={styles.loadMoreButton}
                                    onClick={loadMoreComments}
                                    disabled={commentLoading}
                                >
                                    {commentLoading ? '불러오는 중...' : '더 보기'}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className={styles.noComments}>
                            <p>아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!</p>
                        </div>
                    )}
                </section>
                
                {/* 블로그 목록으로 돌아가기 */}
                <div className={styles.backLink}>
                    <Link href="/blog">← Back to Blog</Link>
                </div>
            </article>
        </div>
    );
}