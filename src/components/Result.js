'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/ResultPage.module.css';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import KakaoShareButton from './KakaoShareButton';
const Result = () => {
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
    useEffect(() => {
        setTheme(pathnameArray[1]);
        setCard1(formatCardNumber(cardNumbers[0]));
        setCard2(formatCardNumber(cardNumbers[1]));
        setCard3(formatCardNumber(cardNumbers[2]));
        setDesign(pathnameArray[2]);
        setSelectedCards(cardNumbers.length > 0 && cardNumbers.map((card) => card.replace(/\D/g, '')));
        // const fetchData = async () => {
        //     if (theme && card1 && card2 && card3) {
        //         try {
        //             const res = await axios.post('/api/tarot', { theme, card1, card2, card3 });
        //             setResponse(res.data.message);
        //         } catch (err) {
        //             console.error(err);
        //         }
        //     }
        // };

        // fetchData();
    }, [pathname, theme, card1, card2, card3]);

    const formatCardNumber = (cardNumber) => {
        if (!cardNumber) return '';
        const number = cardNumber.replace(/\D/g, '');
        const direction = cardNumber.endsWith('r') ? 'reverse direction' : 'forward direction';
        return `${number} ${direction}`;
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
                                    src={`/images/${design}/${card}.png`}
                                    alt={`Card ${parseInt(card)}`}
                                    className={styles['reversed']}
                                />
                            </div>
                        ))}
                </div>
                <div>
                    <h2>Reading by AI</h2>
                    <p>
                        For the customer's question about money, the Major Arcana cards drawn provide insight into their
                        current financial situation and the steps they can take to improve it. Areas for improvement: -
                        The Tower (XVI reversed) indicates that the customer may be experiencing financial upheaval or
                        unexpected changes that have disrupted their stability. This card reversed suggests that they
                        may be avoiding necessary changes or resisting letting go of old financial patterns that no
                        longer serve them. It's a sign that they need to confront their fears and embrace change in
                        order to move forward towards financial stability. Strengths: - The Wheel of Fortune (X) in the
                        upright position indicates that the customer has good luck and positive opportunities
                        surrounding their finances. This card suggests that they have the ability to adapt to changes
                        and make the most of unexpected events. They are encouraged to take advantage of these favorable
                        circumstances and remain open to new possibilities that may come their way. Steps towards a
                        better direction: - The Hermit (IX) in the upright position advises the customer to take some
                        time for introspection and self-reflection when it comes to their finances. This card suggests
                        that they may benefit from seeking guidance or advice from a financial advisor or mentor to gain
                        clarity and perspective on their current situation. By taking a step back and evaluating their
                        financial goals and priorities, they can make informed decisions that will lead them towards a
                        better financial future. Overall, the cards indicate that the customer needs to embrace change,
                        be open to new opportunities, and seek guidance in order to improve their financial situation.
                        By facing their fears, making the most of their strengths, and taking the necessary steps
                        towards financial clarity, they can work towards a more stable and prosperous financial future.
                    </p>
                    {/* <p>{response}</p> */}
                    <div className={styles['share_buttons']}>
                        <FacebookShareButton url={shareUrl} quote={shareDescription}>
                            Share on Facebook
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={shareTitle}>
                            Share on Twitter
                        </TwitterShareButton>
                        <KakaoShareButton url={shareUrl} title={shareTitle} description={shareDescription}>
                            Share on Kakao
                        </KakaoShareButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Result;
