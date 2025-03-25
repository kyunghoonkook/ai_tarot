'use client';
import { useRef } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import KakaoShareButton from '../KakaoShareButton';
import styles from '../../styles/ResultPage.module.css';

const ShareButtons = ({ 
  showShareButtons, 
  shareUrl, 
  shareTitle, 
  shareDescription, 
  handleShareSuccess 
}) => {
  if (!showShareButtons) {
    return null;
  }
  
  return (
    <div className={styles['share-buttons']}>
      <FacebookShareButton 
        url={shareUrl} 
        quote={shareTitle} 
        onShareWindowClose={handleShareSuccess}
      >
        <img src="/images/Icons/facebook-logo-black.png" alt="Facebook" />
        <span>Facebook</span>
      </FacebookShareButton>
      
      <TwitterShareButton 
        url={shareUrl} 
        title={shareTitle} 
        onShareWindowClose={handleShareSuccess}
      >
        <img src="/images/Icons/twitter-x-logo.png" alt="Twitter" />
        <span>Twitter</span>
      </TwitterShareButton>
      
      <KakaoShareButton
        url={shareUrl}
        title={shareTitle}
        description={shareDescription}
        onSuccess={handleShareSuccess}
      />
      
      <CopyToClipboard 
        text={shareUrl} 
        onCopy={handleShareSuccess}
      >
        <button>
          <img src="/images/Icons/url-logo.png" alt="URL" />
          <span>Copy Link</span>
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default ShareButtons; 