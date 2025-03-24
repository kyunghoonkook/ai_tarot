'use client';
import React, { useState, useEffect } from 'react';
import styles from './OptimizedImage.module.css';

// 이미지 로딩을 지연시키는 레이지 로딩 컴포넌트
const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  loading = 'lazy',
  sizes = '100vw',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // 이미지 URL에서 확장자 추출
  const getExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };
  
  // WebP 지원 여부 확인
  const [supportsWebP, setSupportsWebP] = useState(false);
  
  useEffect(() => {
    const checkWebPSupport = async () => {
      if (!self.createImageBitmap) return false;
      
      const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
      const blob = await fetch(webpData).then(r => r.blob());
      
      return createImageBitmap(blob).then(() => true, () => false);
    };
    
    checkWebPSupport().then(setSupportsWebP);
  }, []);
  
  // WebP 변환 URL (실제 구현에서는 서버 측 변환 사용)
  const getWebPUrl = (url) => {
    const ext = getExtension(url);
    if (['jpg', 'jpeg', 'png'].includes(ext)) {
      return url.replace(new RegExp(`\\.${ext}$`), '.webp');
    }
    return url;
  };
  
  // 이미지 로딩 상태 처리
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };
  
  // 최적화된 이미지 URL
  const optimizedSrc = supportsWebP ? getWebPUrl(src) : src;
  
  return (
    <div 
      className={`${styles.imageContainer} ${className || ''}`}
      style={{ width, height, position: 'relative' }}
    >
      {!isLoaded && !error && (
        <div className={styles.placeholder} />
      )}
      
      {error ? (
        <div className={styles.errorPlaceholder}>
          <span>이미지를 불러올 수 없습니다</span>
        </div>
      ) : (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
          sizes={sizes}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 