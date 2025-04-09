"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './write.module.css';
import { useAuth } from '@/context/AuthContext';

// 리치 텍스트 에디터 컴포넌트
const RichTextEditor = ({ value, onChange }) => {
  return (
    <textarea 
      className={styles.richTextEditor}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="내용을 입력하세요..."
    />
  );
};

export default function WriteBlogPost() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'general',
    tags: '',
    image: '',
    featured: false,
    status: 'published'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    // 로그인 상태 확인
    if (!user) {
      router.push('/auth/login?redirect=/blog/write');
      return;
    }
  }, [user, router]);
  
  // 카테고리 목록
  const categories = [
    { id: 'general', name: '일반' },
    { id: 'love', name: '사랑과 연애' },
    { id: 'career', name: '경력과 재정' },
    { id: 'practice', name: '타로 연습' },
    { id: 'health', name: '건강과 웰빙' }
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content: content
    });
    
    // 내용이 있다면 자동으로 발췌문 생성 (150자 제한)
    if (content) {
      const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const excerpt = plainText.length > 150 ? plainText.substring(0, 147) + '...' : plainText;
      setFormData(prev => ({
        ...prev,
        excerpt: excerpt
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // 필수 필드 검증
      if (!formData.title.trim()) {
        throw new Error('제목을 입력해주세요.');
      }
      
      if (!formData.content.trim()) {
        throw new Error('내용을 입력해주세요.');
      }
      
      // 태그 처리 (쉼표로 구분된 문자열을 배열로 변환)
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];
      
      // API 요청
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '게시물 생성 중 오류가 발생했습니다.');
      }
      
      setSuccess(true);
      
      // 성공 메시지 표시 후 게시물 페이지로 이동
      setTimeout(() => {
        router.push(`/blog/${data.post.slug}`);
      }, 1500);
      
    } catch (err) {
      console.error('게시물 생성 오류:', err);
      setError(err.message || '게시물을 생성하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return <div className={styles.loadingContainer}>로그인이 필요합니다...</div>;
  }
  
  return (
    <div className={styles.writeContainer}>
      <div className={styles.writeHeader}>
        <h1 className={styles.title}>새 블로그 글 작성</h1>
        <p className={styles.subtitle}>당신의 생각과 지식을 공유해보세요</p>
      </div>
      
      {success ? (
        <div className={styles.successMessage}>
          <p>게시물이 성공적으로 생성되었습니다! 리다이렉트 중...</p>
        </div>
      ) : (
        <form className={styles.writeForm} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="글 제목을 입력하세요"
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>내용 *</label>
            <RichTextEditor 
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>카테고리</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="tags" className={styles.label}>태그 (쉼표로 구분)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="타로, 영적 성장, 자기 계발"
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="image" className={styles.label}>대표 이미지 URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg (비워두면 기본 이미지가 사용됩니다)"
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="excerpt" className={styles.label}>요약 (150자 이내, 비워두면 내용에서 자동 생성)</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="글의 간략한 요약을 입력하세요"
              className={styles.textarea}
              maxLength={150}
            />
          </div>
          
          <div className={styles.formOptions}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="featured" className={styles.checkboxLabel}>
                특집 게시물로 표시
              </label>
            </div>
            
            <div className={styles.radioGroup}>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="published"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={handleChange}
                  className={styles.radio}
                />
                <label htmlFor="published" className={styles.radioLabel}>
                  바로 발행
                </label>
              </div>
              
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="draft"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={handleChange}
                  className={styles.radio}
                />
                <label htmlFor="draft" className={styles.radioLabel}>
                  임시 저장
                </label>
              </div>
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelButton}
              disabled={loading}
            >
              취소
            </button>
            
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? '게시물 생성 중...' : '게시물 발행'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 