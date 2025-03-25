'use client';
import { jsPDF } from 'jspdf';
import styles from '../styles/ResultPage.module.css';

export const generatePDF = (selectedCards, response, theme, design) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  doc.setFontSize(24);
  doc.text('Tarot Result', 105, 20, { align: 'center' });

  const imagePromises = selectedCards.map((card, index) => {
    return new Promise((resolve, reject) => {
      const imgElement = document.querySelector(
        `.${styles['card_wrap']}:nth-child(${index + 1}) .${styles['card-image']}`
      );
      if (imgElement) {
        const imgSrc = imgElement.src;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = this.width;
          canvas.height = this.height;

          if (card.includes('r')) {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(Math.PI);
            ctx.drawImage(this, -canvas.width / 2, -canvas.height / 2);
          } else {
            ctx.drawImage(this, 0, 0);
          }

          const dataURL = canvas.toDataURL('image/png');
          const imgWidth = 50;
          const imgHeight = 70;
          const x = 95 - (imgWidth * selectedCards.length) / 2 + index * 60;
          const y = 40;
          doc.addImage(dataURL, 'PNG', x, y, imgWidth, imgHeight);

          doc.setFontSize(12);
          const textX = x + imgWidth / 2;
          const textY = y - 5;
          if (theme === 'Love') {
            if (index === 0) doc.text('Past', textX, textY, { align: 'center' });
            if (index === 1) doc.text('Present', textX, textY, { align: 'center' });
            if (index === 2) doc.text('Future', textX, textY, { align: 'center' });
          } else if (theme === 'Money') {
            if (index === 0) doc.text('What am I doing wrong', textX, textY, { align: 'center' });
            if (index === 1) doc.text('What am I doing right', textX, textY, { align: 'center' });
            if (index === 2) doc.text('What to do next', textX, textY, { align: 'center' });
          } else if (theme === 'Health') {
            if (index === 0) doc.text('Mind', textX, textY, { align: 'center' });
            if (index === 1) doc.text('Body', textX, textY, { align: 'center' });
            if (index === 2) doc.text('Spirit', textX, textY, { align: 'center' });
          }

          resolve();
        };
        img.onerror = function () {
          reject(new Error(`Failed to load image: ${imgSrc}`));
        };
        img.src = imgSrc;
      } else {
        resolve();
      }
    });
  });

  return Promise.all(imagePromises)
    .then(() => {
      const text = response;
      const paragraphs = text.split(/<\/p>/);
      let y = 120;
      doc.setFontSize(12);
      paragraphs.forEach((paragraph) => {
        const cleanedParagraph = paragraph.replace(/<p>/g, '').trim();
        if (cleanedParagraph !== '') {
          const lines = doc.splitTextToSize(cleanedParagraph, 180);
          lines.forEach((line) => {
            if (y > 280) {
              doc.addPage();
              y = 20;
            }
            const textWidth =
              (doc.getStringUnitWidth(line) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
            const x = (210 - textWidth) / 2;
            doc.text(line, x, y);
            y += 7;
          });
          y += 10;
        }
      });

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(10);
      doc.text('Visit https://www.aifree-tarot.com/ for more!', 105, y, { align: 'center' });

      // PDF 저장
      doc.save('tarot_reading_result.pdf');
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
}; 