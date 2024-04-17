'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/ResultPage.module.css';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import KakaoShareButton from './KakaoShareButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaSpinner } from 'react-icons/fa';

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
    const [displayText, setDisplayText] = useState('');
    const shareButtonsRef = useRef(null);
    const [index, setIndex] = useState(0);
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

    useEffect(() => {
        if (index < response.length) {
            setTimeout(() => {
                setDisplayText(displayText + response[index]);
                setIndex(index + 1);
            }, 50); // 100ms 간격으로 문자 출력
        }
    }, [displayText, response, index]);

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

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = 'Tarot Reading Result';
    const shareDescription = response;

    return (
        <>
            <div className={styles['result_wrap']}>
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
                    <h2 className={styles['title_ai']}>Reading by AI</h2>
                    {loading ? (
                        <div className={styles['loading-spinner']}>
                            <FaSpinner className={`${styles['spinner']} ${styles['spin']}`} />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <div className={styles['result-text-box']} dangerouslySetInnerHTML={{ __html: response }}></div>
                    )}
                    <div ref={shareButtonsRef} className={styles['share_wrap']}>
                        <div className={styles['share_button_wrap']}>
                            <button>
                                <img src="/images/Icons/share-btn.png" alt="share-btn" />
                            </button>
                            <button onClick={toggleShareButtons}>
                                <img src="/images/Icons/url-logo-white.png" alt="url-logo-white" />
                            </button>
                        </div>
                        {showShareButtons && (
                            <div className={styles['share_buttons']}>
                                <FacebookShareButton url={shareUrl} quote={shareDescription}>
                                    <img src="/images/Icons/facebook-logo-black.png" alt="Facebook" />
                                    <span>Facebook</span>
                                </FacebookShareButton>
                                <TwitterShareButton url={shareUrl} title={shareTitle}>
                                    <img src="/images/Icons/twitter-x-logo.png" alt="Twitter" />
                                    <span>Twitter</span>
                                </TwitterShareButton>
                                <KakaoShareButton
                                    url={shareUrl}
                                    title={shareTitle}
                                    description={shareDescription}
                                ></KakaoShareButton>
                                <CopyToClipboard text={shareUrl}>
                                    <button>
                                        <img src="/images/Icons/url-logo.png" alt="URL" />
                                        <span>URL</span>
                                    </button>
                                </CopyToClipboard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Result;
