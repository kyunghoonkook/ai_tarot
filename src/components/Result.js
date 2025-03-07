'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/ResultPage.module.css';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import KakaoShareButton from './KakaoShareButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaSpinner } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
const Result = () => {
    const cardNames = {
        '00': 'The Fool',
        '01': 'The Magician',
        '02': 'The High Priestess',
        '03': 'The Empress',
        '04': 'The Emperor',
        '05': 'The Hierophant',
        '06': 'The Lovers',
        '07': 'The Chariot',
        '08': 'Strength',
        '09': 'The Hermit',
        10: 'Wheel of Fortune',
        11: 'Justice',
        12: 'The Hanged Man',
        13: 'Death',
        14: 'Temperance',
        15: 'The Devil',
        16: 'The Tower',
        17: 'The Star',
        18: 'The Moon',
        19: 'The Sun',
        20: 'Judgement',
        21: 'The World',
    };
    const pathname = usePathname();
    const pathnameArray = pathname.split('/');
    const cardNumbers = pathnameArray[pathnameArray.length - 1]?.split(',') || [];
    const [theme, setTheme] = useState('');
    const [card1, setCard1] = useState('');
    const [card2, setCard2] = useState('');
    const [card3, setCard3] = useState('');
    const [design, setDesign] = useState('');
    const [response, setResponse] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);
    const [showShareButtons, setShowShareButtons] = useState(false);
    const [loading, setLoading] = useState(true);
    const [displayText, setDisplayText] = useState([]);
    const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const shareButtonsRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [showShareSuccessMessage, setShowShareSuccessMessage] = useState(false);
    const [unlockedSpecialCard, setUnlockedSpecialCard] = useState(false);
    const toggleShareButtons = () => {
        setShowShareButtons(!showShareButtons);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        setTheme(pathnameArray[1]);
        setCard1(formatCardNumber(cardNumbers[0]));
        setCard2(formatCardNumber(cardNumbers[1]));
        setCard3(formatCardNumber(cardNumbers[2]));
        setDesign(pathnameArray[2]);
        setSelectedCards(cardNumbers);
        // setSelectedCards(cardNumbers.length > 0 && cardNumbers.map((card) => card.replace(/\D/g, '')));

        const fetchData = async () => {
            if (theme && card1 && card2 && card3) {
                try {
                    const res = await axios.post('/api/tarot', { theme, card1, card2, card3 });
                    setResponse(res.data.message);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [pathname, theme, card1, card2, card3]);

    // useEffect(() => {
    //     if (index < response.length) {
    //         setTimeout(() => {
    //             setDisplayText(displayText + response[index]);
    //             setIndex(index + 1);
    //         }, 50); // 100ms 간격으로 문자 출력
    //     }
    // }, [displayText, response, index]);

    useEffect(() => {
        if (response) {
            const paragraphs = response.split('\n\n');
            setDisplayText(paragraphs.map(() => ''));
            setCurrentParagraphIndex(0);
            setCurrentCharIndex(0);
        }
    }, [response]);

    useEffect(() => {
        if (currentParagraphIndex < displayText.length) {
            const currentParagraph = response.split('\n\n')[currentParagraphIndex];
            if (currentCharIndex < currentParagraph.length) {
                setTimeout(() => {
                    setDisplayText((prevDisplayText) => {
                        const updatedDisplayText = [...prevDisplayText];
                        updatedDisplayText[currentParagraphIndex] += currentParagraph[currentCharIndex];
                        return updatedDisplayText;
                    });
                    setCurrentCharIndex((prevCharIndex) => prevCharIndex + 1);
                }, 5);
            } else {
                setCurrentParagraphIndex((prevParagraphIndex) => prevParagraphIndex + 1);
                setCurrentCharIndex(0);
            }
        }
    }, [currentParagraphIndex, currentCharIndex, displayText, response]);

    const handleOutsideClick = (event) => {
        if (shareButtonsRef.current && !shareButtonsRef.current.contains(event.target)) {
            setShowShareButtons(false);
        }
    };

    const formatCardNumber = (cardNumber) => {
        if (!cardNumber) return '';
        const number = cardNumber.replace(/\D/g, '').padStart(2, '0');
        const direction = cardNumber.endsWith('r') ? 'reverse direction' : 'forward direction';
        const name = cardNames[number] || '';
        return `${number} ${name} ${direction}`;
    };

    const generatePDF = () => {
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

        Promise.all(imagePromises)
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

    // Function to call when sharing is successful
    const handleShareSuccess = () => {
        setShowShareSuccessMessage(true);
        setUnlockedSpecialCard(true);
        setTimeout(() => {
            setShowShareSuccessMessage(false);
        }, 5000);
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = 'My AI Tarot Reading Result';
    const shareDescription = response;

    return (
        <>
            <div className={styles['result_wrap']} style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '1480px',
                margin: '0 auto'
            }}>
                <div className={styles['card_box']}>
                    {selectedCards.length > 0 &&
                        design !== '' &&
                        selectedCards.map((card, index) => (
                            <div key={index} className={styles['card_wrap']}>
                                {theme === 'Love' && (
                                    <>
                                        {index === 0 && <h3>Past</h3>}
                                        {index === 1 && <h3>Present</h3>}
                                        {index === 2 && <h3>Future</h3>}
                                    </>
                                )}
                                {theme === 'Money' && (
                                    <>
                                        {index === 0 && <h3>What am i doing wrong</h3>}
                                        {index === 1 && <h3>What am i doing right</h3>}
                                        {index === 2 && <h3>What to do next</h3>}
                                    </>
                                )}
                                {theme === 'Health' && (
                                    <>
                                        {index === 0 && <h3>Mind</h3>}
                                        {index === 1 && <h3>Body</h3>}
                                        {index === 2 && <h3>Spirit</h3>}
                                    </>
                                )}
                                <img
                                    src={`/images/${design}/${card.replace('r', '')}.png`}
                                    alt={`Card ${parseInt(card)}`}
                                    className={`${styles['card-image']} ${
                                        card.includes('r') ? styles['reversed'] : ''
                                    }`}
                                />
                            </div>
                        ))}
                </div>
                <div>
                    <h2 className={styles['title_ai']}>AI Tarot Interpretation</h2>
                    {loading ? (
                        <div className={styles['loading-container']}>
                            <FaSpinner className={styles['loading-spinner']} />
                            <p>Our AI is interpreting your tarot cards...</p>
                        </div>
                    ) : (
                        <>
                            <div
                                className={styles['result-text-box']}
                                dangerouslySetInnerHTML={{ __html: response }}
                            ></div>

                            <div className={styles['action-buttons']}>
                                <button onClick={generatePDF} className={styles['action-button']}>
                                    <img src="/images/Icons/pdf-icon.png" alt="PDF" className={styles['button-icon']} />
                                    <span>Save as PDF</span>
                                </button>
                                <button onClick={toggleShareButtons} className={styles['action-button']}>
                                    <img src="/images/Icons/share-icon.png" alt="Share" className={styles['button-icon']} />
                                    <span>Share with Friends</span>
                                </button>
                            </div>

                            <div className={styles['incentive-message']}>
                                <p>Share with friends to unlock a special tarot card insight!</p>
                                <span>Daily readings across different themes provide more accurate future predictions.</span>
                            </div>

                            {showShareSuccessMessage && (
                                <div className={styles['share-success']}>
                                    <p>Thank you for sharing! You've unlocked a special insight for your next tarot session.</p>
                                </div>
                            )}

                            {unlockedSpecialCard && (
                                <div className={styles['special-card']}>
                                    <h3>🎴 Your Special Card: The Star ✨</h3>
                                    <div className={styles['special-card-content']}>
                                        <img src="/images/special-card.png" alt="Special Card" className={styles['special-card-image']} />
                                        <p>This special card represents hope, inspiration, and spiritual guidance. Its appearance suggests that you should maintain faith in yourself during challenging times.</p>
                                    </div>
                                </div>
                            )}

                            <div className={styles['next-action']}>
                                <a href="/" className={styles['home-button']}>
                                    Start a New Tarot Reading
                                </a>
                            </div>

                            <div className={styles['daily-tip']}>
                                <h3>🔮 Tarot Tip of the Day</h3>
                                <p>Tarot cards don't predict a fixed future but help you understand your current situation and make better choices that align with your true path.</p>
                            </div>

                            <div ref={shareButtonsRef} className={styles['share-buttons-container']}>
                                {showShareButtons && (
                                    <div className={styles['share-buttons']}>
                                        <FacebookShareButton url={shareUrl} quote={shareTitle} onShareWindowClose={handleShareSuccess}>
                                            <img src="/images/Icons/facebook-logo.png" alt="Facebook" />
                                            <span>Facebook</span>
                                        </FacebookShareButton>
                                        <TwitterShareButton url={shareUrl} title={shareTitle} onShareWindowClose={handleShareSuccess}>
                                            <img src="/images/Icons/twitter-logo.png" alt="Twitter" />
                                            <span>Twitter</span>
                                        </TwitterShareButton>
                                        <KakaoShareButton
                                            url={shareUrl}
                                            title={shareTitle}
                                            description={shareDescription}
                                            onSuccess={handleShareSuccess}
                                        ></KakaoShareButton>
                                        <CopyToClipboard text={shareUrl} onCopy={handleShareSuccess}>
                                            <button>
                                                <img src="/images/Icons/url-logo.png" alt="URL" />
                                                <span>Copy Link</span>
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Result;
