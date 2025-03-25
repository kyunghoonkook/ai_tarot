'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './OptimizedImage.module.css';

// Next.js의 Image 컴포넌트를 활용한 최적화된 이미지 컴포넌트
const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority = false,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError(true);
    console.error(`이미지 로딩 실패: ${src}`);
  };
  
  return (
    <div 
      className={`${styles.imageContainer} ${className || ''}`}
      style={{ 
        position: 'relative',
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        ...style
      }}
    >
      {error ? (
        <div className={styles.errorPlaceholder}>
          <span>이미지를 불러올 수 없습니다</span>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className={styles.placeholder} />
          )}
          <Image
            src={src}
            alt={alt || ''}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            quality={quality}
            priority={priority}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className={`${styles.image} ${isLoading ? '' : styles.loaded}`}
            fill={fill}
            {...props}
          />
        </>
      )}
    </div>
  );
};

export default OptimizedImage; 