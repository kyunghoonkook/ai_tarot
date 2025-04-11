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
    
    // 수정 관련 상태
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    
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
                    // 디버깅: 포스트 데이터 확인
                    console.log('Post data:', data.post);
                    console.log('Post author ID:', data.post.author);
                    if (user) {
                        console.log('Current user ID:', user._id || user.id);
                        console.log('Is same author?', 
                            user._id === data.post.author,
                            user._id?.toString() === data.post.author?.toString(),
                            user.id === data.post.author
                        );
                    }
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
    }, [params.slug, user]);
    
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
                    
                    // 디버깅: 댓글 작성자 ID 확인
                    if (data.comments.length > 0 && user) {
                        console.log('First comment author ID:', data.comments[0].author._id);
                        console.log('Current user ID:', user._id || user.id);
                        console.log('Is same author?', 
                            user._id === data.comments[0].author._id,
                            user._id?.toString() === data.comments[0].author._id?.toString(),
                            user.id === data.comments[0].author._id
                        );
                    }
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
            alert('Failed to submit comment. Please try again.');
        } finally {
            setCommentLoading(false);
        }
    };
    
    // 댓글 수정 시작
    const handleEditComment = (comment) => {
        setEditingCommentId(comment._id);
        setEditCommentContent(comment.content);
    };
    
    // 댓글 수정 취소
    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditCommentContent('');
    };
    
    // 댓글 수정 저장
    const handleSaveComment = async (commentId) => {
        if (!editCommentContent.trim()) return;
        
        try {
            setCommentLoading(true);
            
            const response = await fetch(`/api/blog/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    content: editCommentContent,
                }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                // 댓글 목록에서 수정된 댓글 업데이트
                setComments(comments.map(comment => 
                    comment._id === commentId ? data.comment : comment
                ));
                setEditingCommentId(null);
                setEditCommentContent('');
            } else {
                throw new Error(data.message || 'Failed to update comment');
            }
        } catch (err) {
            console.error('Error updating comment:', err);
            alert('Failed to update comment. Please try again.');
        } finally {
            setCommentLoading(false);
        }
    };
    
    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        try {
            setCommentLoading(true);
            
            const response = await fetch(`/api/blog/comments/${commentId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            
            const data = await response.json();
            
            if (data.success) {
                // 댓글 목록에서 삭제된 댓글 제거
                setComments(comments.filter(comment => comment._id !== commentId));
            } else {
                throw new Error(data.message || 'Failed to delete comment');
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
            alert('Failed to delete comment. Please try again.');
        } finally {
            setCommentLoading(false);
        }
    };
    
    // 포스트 삭제
    const handleDeletePost = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        
        try {
            setIsDeleting(true);
            
            const response = await fetch(`/api/blog/posts/${post.slug}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            
            const data = await response.json();
            
            if (data.success) {
                router.push('/blog');
            } else {
                throw new Error(data.message || 'Failed to delete post');
            }
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('Failed to delete post. Please try again.');
        } finally {
            setIsDeleting(false);
            setConfirmDelete(false);
        }
    };
    
    // 더 많은 댓글 불러오기
    const loadMoreComments = () => {
        setCommentsPage(prev => prev + 1);
    };
    
    // 현재 사용자가 포스트 작성자인지 확인
    const isPostAuthor = () => {
        if (!user || !post) return false;
        
        // ID가 다양한 형태로 제공될 수 있으므로 문자열로 변환하여 비교
        const userId = (user._id || user.id || '').toString();
        
        let authorId;
        if (typeof post.author === 'object' && post.author !== null) {
            authorId = (post.author._id || post.author.id || '').toString();
        } else {
            authorId = (post.author || post.authorId || '').toString();
        }
        
        return userId === authorId;
    };
    
    // 현재 사용자가 댓글 작성자인지 확인
    const isCommentAuthor = (comment) => {
        if (!user || !comment || !comment.author) return false;
        
        // ID가 다양한 형태로 제공될 수 있으므로 문자열로 변환하여 비교
        const userId = (user._id || user.id || '').toString();
        
        let authorId;
        if (typeof comment.author === 'object' && comment.author !== null) {
            authorId = (comment.author._id || comment.author.id || '').toString();
        } else {
            authorId = (comment.author || comment.authorId || '').toString();
        }
        
        return userId === authorId;
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
            return 'just now';
        } else if (diffMin < 60) {
            return `${diffMin} minutes ago`;
        } else if (diffHr < 24) {
            return `${diffHr} hours ago`;
        } else if (diffDay < 7) {
            return `${diffDay} days ago`;
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
                    
                    {/* 글 작성자인 경우 수정/삭제 버튼 표시 */}
                    {isPostAuthor() && (
                        <div className={styles.postActions}>
                            <Link 
                                href={`/blog/write?edit=${post.slug}`} 
                                className={styles.editButton}
                            >
                                Edit Post
                            </Link>
                            {confirmDelete ? (
                                <div className={styles.deleteConfirmation}>
                                    <p>Are you sure you want to delete this post?</p>
                                    <div className={styles.confirmButtons}>
                                        <button 
                                            className={styles.cancelDeleteButton}
                                            onClick={() => setConfirmDelete(false)}
                                            disabled={isDeleting}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            className={styles.confirmDeleteButton}
                                            onClick={handleDeletePost}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    className={styles.deleteButton}
                                    onClick={handleDeletePost}
                                    disabled={isDeleting}
                                >
                                    Delete Post
                                </button>
                            )}
                        </div>
                    )}
                    
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
                    <h2 className={styles.commentsTitle}>Comments</h2>
                    
                    {/* 댓글 작성 폼 */}
                    {user ? (
                        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
                            <textarea
                                className={styles.commentTextarea}
                                placeholder="Write your comment..."
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                required
                            />
                            <button 
                                className={styles.commentButton} 
                                type="submit"
                                disabled={commentLoading || !commentContent.trim()}
                            >
                                {commentLoading ? 'Submitting...' : 'Submit Comment'}
                            </button>
                        </form>
                    ) : (
                        <div className={styles.loginPrompt}>
                            <p>Please <Link href="/auth/login" className={styles.loginLink}>login</Link> to write a comment.</p>
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
                                            <div className={styles.commentDate}>
                                                {formatCommentDate(comment.createdAt)}
                                                {comment.isEdited && <span className={styles.editedBadge}>(edited)</span>}
                                            </div>
                                        </div>
                                        
                                        {/* 댓글 작성자인 경우 수정/삭제 버튼 표시 */}
                                        {isCommentAuthor(comment) && (
                                            <div className={styles.commentActions}>
                                                {editingCommentId !== comment._id ? (
                                                    <>
                                                        <button
                                                            className={styles.commentEditButton}
                                                            onClick={() => handleEditComment(comment)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className={styles.commentDeleteButton}
                                                            onClick={() => handleDeleteComment(comment._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* 댓글 내용 (편집 중 또는 일반 표시) */}
                                    {editingCommentId === comment._id ? (
                                        <div className={styles.editCommentForm}>
                                            <textarea
                                                className={styles.commentTextarea}
                                                value={editCommentContent}
                                                onChange={(e) => setEditCommentContent(e.target.value)}
                                                required
                                            />
                                            <div className={styles.editButtonGroup}>
                                                <button
                                                    className={styles.cancelEditButton}
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className={styles.saveEditButton}
                                                    onClick={() => handleSaveComment(comment._id)}
                                                    disabled={!editCommentContent.trim()}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.commentContent}>{comment.content}</div>
                                    )}
                                </div>
                            ))}
                            
                            {/* 더 불러오기 버튼 */}
                            {hasMoreComments && (
                                <button 
                                    className={styles.loadMoreButton}
                                    onClick={loadMoreComments}
                                    disabled={commentLoading}
                                >
                                    {commentLoading ? 'Loading...' : 'Load More'}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className={styles.noComments}>
                            <p>No comments yet. Be the first to comment!</p>
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