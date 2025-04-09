"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './write.module.css';
import { useAuth } from '@/context/AuthContext';

// Rich text editor component
const RichTextEditor = ({ value, onChange }) => {
  return (
    <textarea 
      className={styles.richTextEditor}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your content..."
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
    // Check login status
    if (!user) {
      router.push('/auth/login?redirect=/blog/write');
      return;
    }
  }, [user, router]);
  
  // Category list
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'love', name: 'Love & Relationships' },
    { id: 'career', name: 'Career & Finance' },
    { id: 'practice', name: 'Tarot Practice' },
    { id: 'health', name: 'Health & Wellness' }
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
    
    // Automatically generate excerpt (150 character limit)
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
      // 로그인 상태 재확인
      if (!user || !user._id) {
        throw new Error('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        // 3초 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          router.push('/auth/login?redirect=/blog/write');
        }, 3000);
        return;
      }

      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('제목을 입력해주세요.');
      }
      
      if (!formData.content.trim()) {
        throw new Error('내용을 입력해주세요.');
      }
      
      // Process tags (convert comma-separated string to array)
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];
      
      console.log('블로그 포스트 생성 요청 시작', { title: formData.title });
      
      // API request
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        }),
      });
      
      const data = await response.json();
      console.log('API 응답:', data);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
        } else {
          throw new Error(data.message || '포스트 생성 중 오류가 발생했습니다.');
        }
      }
      
      setSuccess(true);
      
      // Display success message and redirect to the post page
      setTimeout(() => {
        router.push(`/blog/${data.post.slug}`);
      }, 1500);
      
    } catch (err) {
      console.error('포스트 생성 오류:', err);
      setError(err.message || '포스트 생성 중 오류가 발생했습니다.');
      
      // 인증 오류인 경우 로그인 페이지로 리다이렉트
      if (err.message && err.message.includes('인증') || err.message.includes('로그인')) {
        setTimeout(() => {
          router.push('/auth/login?redirect=/blog/write');
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return <div className={styles.loadingContainer}>Login required...</div>;
  }
  
  return (
    <div className={styles.writeContainer}>
      <div className={styles.writeHeader}>
        <h1 className={styles.title}>Write New Blog Post</h1>
        <p className={styles.subtitle}>Share your thoughts and knowledge with the community</p>
      </div>
      
      {success ? (
        <div className={styles.successMessage}>
          <p>Post created successfully! Redirecting...</p>
        </div>
      ) : (
        <form className={styles.writeForm} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>Content *</label>
            <RichTextEditor 
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>Category</label>
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
              <label htmlFor="tags" className={styles.label}>Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="tarot, spiritual growth, self-improvement"
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="image" className={styles.label}>Featured Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg (leave empty for default image)"
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="excerpt" className={styles.label}>Excerpt (150 chars max, auto-generated if empty)</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of your post"
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
                Mark as featured post
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
                  Publish immediately
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
                  Save as draft
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
              Cancel
            </button>
            
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Creating post...' : 'Publish Post'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 