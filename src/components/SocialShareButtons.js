import React from 'react';
import styles from './SocialShareButtons.module.css';

const SocialShareButtons = ({ title, url, description, image }) => {
  // URL 인코딩
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');
  const encodedImage = image ? encodeURIComponent(image) : '';

  // 소셜 미디어 공유 URL 생성
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    kakaotalk: `https://story.kakao.com/share?url=${encodedUrl}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`
  };

  // 새 창에서 공유 링크 열기
  const handleShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className={styles.socialShareContainer}>
      <p className={styles.shareTitle}>공유하기</p>
      <div className={styles.shareButtons}>
        <button 
          className={`${styles.shareButton} ${styles.facebook}`}
          onClick={() => handleShare('facebook')}
          aria-label="페이스북에 공유하기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 0C5.38 0 0 5.38 0 12c0 5.98 4.37 10.93 10.08 11.85v-8.39H7.05V12h3.03V9.35c0-3.02 1.8-4.7 4.58-4.7 1.33 0 2.72.24 2.72.24v2.99h-1.53c-1.5 0-1.97.93-1.97 1.89V12h3.35l-.54 3.46h-2.81v8.39C19.63 22.93 24 17.98 24 12c0-6.62-5.38-12-12-12z"/>
          </svg>
        </button>
        <button 
          className={`${styles.shareButton} ${styles.twitter}`}
          onClick={() => handleShare('twitter')}
          aria-label="트위터에 공유하기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.457 0 1.714.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14.001l-.001-.659c.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
          </svg>
        </button>
        <button 
          className={`${styles.shareButton} ${styles.pinterest}`}
          onClick={() => handleShare('pinterest')}
          aria-label="핀터레스트에 공유하기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
        </button>
        <button 
          className={`${styles.shareButton} ${styles.linkedin}`}
          onClick={() => handleShare('linkedin')}
          aria-label="링크드인에 공유하기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>
        <button 
          className={`${styles.shareButton} ${styles.kakaotalk}`}
          onClick={() => handleShare('kakaotalk')}
          aria-label="카카오톡에 공유하기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 3c-5.5 0-10 3.5-10 7.8 0 2.7 1.9 5.1 4.7 6.5-.2.5-.8 1.8-.9 2.1-.1.4 0 .8.3 1 .2.1.4.2.7.2.2 0 .4-.1.6-.2 0 0 3-2 3.5-2.4.4 0 .8.1 1.2.1 5.5 0 10-3.5 10-7.8S17.5 3 12 3z"/>
          </svg>
        </button>
        <button 
          className={`${styles.shareButton} ${styles.line}`}
          onClick={() => handleShare('line')}
          aria-label="라인에 공유하기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.817 4.269 8.856 10.036 9.614.391.084.923.258 1.058.593.121.303.079.776.039 1.089l-.172 1.028c-.052.314-.253 1.231 1.077.671 1.33-.56 7.186-4.231 9.804-7.244 1.807-1.984 2.158-3.993 2.158-5.751zm-18.684 4.025h-1.229v-4.805c0-.11-.094-.204-.204-.204h-1.121c-.11 0-.204.094-.204.204v6.044c0 .11.094.204.204.204h2.554c.11 0 .204-.094.204-.204v-1.035c-.001-.11-.095-.204-.204-.204zm5.204-.723l-1.656-2.229v2.952c0 .11-.094.204-.204.204h-1.121c-.11 0-.204-.094-.204-.204v-6.044c0-.11.094-.204.204-.204h1.121c.11 0 .204.094.204.204v2.876l1.684-2.202c.094-.123.329-.251.436-.251h1.386c.188 0 .229.227.143.349l-1.864 2.298 1.891 2.554c.188.241-.054.485-.279.485h-1.469c-.111 0-.233-.094-.256-.141zm5.913-4.876h-2.961c-.11 0-.204.094-.204.204v6.044c0 .11.094.204.204.204h1.121c.11 0 .204-.094.204-.204v-1.906h1.636c.11 0 .204-.094.204-.204v-1.035c0-.11-.094-.204-.204-.204h-1.636v-1.604h1.636c.11 0 .204-.094.204-.204v-1.035c.001-.11-.093-.204-.204-.204zm6.105 3.344c.11 0 .204-.094.204-.204v-1.035c0-.11-.094-.204-.204-.204h-1.636v-.359c0-.273.219-.494.491-.494h.873c.11 0 .204-.094.204-.204v-1.035c0-.11-.094-.204-.204-.204h-.975c-1.133 0-2.055.923-2.055 2.057v.238h-.412c-.11 0-.204.094-.204.204v1.035c0 .11.094.204.204.204h.412v2.781c0 .11.094.204.204.204h1.121c.11 0 .204-.094.204-.204v-2.781h1.773z"/>
          </svg>
        </button>
      </div>
      <div className={styles.shareDirect}>
        <input 
          type="text" 
          value={url} 
          readOnly 
          className={styles.shareUrl}
          onClick={(e) => e.target.select()}
        />
        <button 
          className={styles.copyButton}
          onClick={() => {
            navigator.clipboard.writeText(url);
            alert('URL이 클립보드에 복사되었습니다.');
          }}
        >
          복사
        </button>
      </div>
    </div>
  );
};

export default SocialShareButtons; 