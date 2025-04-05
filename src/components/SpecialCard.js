'use client';
import { useEffect, useRef } from 'react';
import styles from '../styles/SpecialCard.module.css';

// 스타 카드 컴포넌트 - 실제 이미지 대신 CSS와 SVG로 구현
const SpecialCard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 카드 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0d0d2b');
    gradient.addColorStop(1, '#131347');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 별 그리기 함수
    const drawStar = (centerX, centerY, points, outerRadius, innerRadius, color) => {
      ctx.beginPath();
      ctx.fillStyle = color;
      
      let rot = Math.PI / 2 * 3;
      const step = Math.PI / points;
      
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = centerX + Math.cos(rot) * radius;
        const y = centerY + Math.sin(rot) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        rot += step;
      }
      
      ctx.closePath();
      ctx.fill();
    };

    // 작은 반짝이는 별들
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
      });
    }

    // 작은 별 그리기
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    });

    // 물 표현
    const drawWater = () => {
      ctx.fillStyle = '#1e3a59';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.7);
      
      // 물결 표현
      for (let i = 0; i < width; i += 20) {
        const heightVar = Math.sin(i * 0.05) * 5;
        ctx.lineTo(i, height * 0.7 + heightVar);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    };
    
    drawWater();

    // 중앙 큰 별
    drawStar(width / 2, height * 0.4, 8, 60, 25, '#ffd700');
    
    // 작은 별들
    drawStar(width * 0.3, height * 0.3, 5, 20, 10, '#fff');
    drawStar(width * 0.7, height * 0.3, 5, 20, 10, '#fff');
    drawStar(width * 0.2, height * 0.5, 5, 15, 7, '#fff');
    drawStar(width * 0.8, height * 0.5, 5, 15, 7, '#fff');
    
    // 여인 실루엣 (간략화)
    ctx.fillStyle = '#6a4a7a';
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.6, 30, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 텍스트 추가
    ctx.font = 'bold 20px serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('★ THE STAR ★', width / 2, height * 0.9);

    // 카드 테두리
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, width - 8, height - 8);
  }, []);

  return (
    <div className={styles.specialCardWrapper}>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={450} 
        className={styles.specialCardCanvas}
      />
    </div>
  );
};

export default SpecialCard; 