"use client"
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const editSlug = searchParams.get('edit');
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalPost, setOriginalPost] = useState(null);
  
  // Fetch existing post if in edit mode
  const fetchPostData = useCallback(async () => {
    if (!editSlug) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/posts/${editSlug}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      
      const data = await response.json();
      
      if (data.success) {
        const post = data.post;
        setOriginalPost(post);
        
        setFormData({
          title: post.title || '',
          content: post.content || '',
          excerpt: post.excerpt || '',
          category: post.category || 'general',
          tags: post.tags ? post.tags.join(', ') : '',
          image: post.image || '',
          featured: post.featured || false,
          status: post.status || 'published'
        });
        
        setIsEditMode(true);
      } else {
        throw new Error(data.message || 'Failed to load post');
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post for editing. ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [editSlug]);
  
  useEffect(() => {
    // Check login status
    if (!user) {
      router.push('/auth/login?redirect=/blog/write');
      return;
    }
    
    // Load post data if in edit mode
    if (editSlug) {
      fetchPostData();
    }
  }, [user, router, editSlug, fetchPostData]);
  
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
  
  // Calculate reading time based on content length
  const calculateReadTime = (content) => {
    if (!content) return 1;
    
    // Average reading speed: 200 words per minute
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    return readTime;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // 로그인 상태 재확인
      if (!user) {
        throw new Error('Login required. Redirecting to login page.');
        setTimeout(() => {
          router.push('/auth/login?redirect=/blog/write');
        }, 3000);
        return;
      }

      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required.');
      }
      
      if (!formData.content.trim()) {
        throw new Error('Content is required.');
      }
      
      // Process tags (convert comma-separated string to array)
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];
      
      // Calculate read time based on content length
      const readTime = calculateReadTime(formData.content);
      
      // Prepare the submission data
      const postData = {
        ...formData,
        tags: tagsArray,
        readTime: readTime
      };
      
      let response;
      
      if (isEditMode) {
        // Update existing post
        // console.log('Updating blog post:', originalPost.slug);
        response = await fetch(`/api/blog/posts/${originalPost.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(postData),
        });
      } else {
        // Create new post
        // console.log('Creating new blog post:', formData.title);
        // Add timestamp to ensure uniqueness for posts with same title
        postData.timestamp = new Date().getTime();
        
        response = await fetch('/api/blog/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(postData),
        });
      }
      
      // console.log('API response status code:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        // console.log('API error response:', errorData);
        
        if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        } else {
          throw new Error(errorData.message || `Error ${isEditMode ? 'updating' : 'creating'} post.`);
        }
      }
      
      const data = await response.json();
      // console.log('API success response:', data);
      
      setSuccess(true);
      
      // Display success message and redirect to the post page
      setTimeout(() => {
        router.push(`/blog/${data.post?.slug || originalPost.slug}`);
      }, 1500);
      
    } catch (err) {
      console.error('Post operation error:', err);
      setError(err.message || `Error ${isEditMode ? 'updating' : 'creating'} post. Please try again.`);
      
      // Authentication error redirect
      if (err.message && (err.message.includes('Authentication') || err.message.includes('login'))) {
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
        <h1 className={styles.title}>{isEditMode ? 'Edit Blog Post' : 'Write New Blog Post'}</h1>
        <p className={styles.subtitle}>{isEditMode ? 'Update your post' : 'Share your thoughts and knowledge with the community'}</p>
      </div>
      
      {loading && !formData.title ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading post data...</p>
        </div>
      ) : success ? (
        <div className={styles.successMessage}>
          <p>{isEditMode ? 'Post updated successfully!' : 'Post created successfully!'} Redirecting...</p>
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
              className={styles.input}
              placeholder="https://example.com/your-image.jpg"
            />
            <small className={styles.helpText}>
              Enter a URL to an image for your blog post. If left empty, a default symbol image will be used.
            </small>
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
              {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Post' : 'Publish Post')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 