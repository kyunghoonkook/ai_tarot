'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/ResultPage.module.css';
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
                        For this health reading, the cards drawn are: 1. Mind - The High Priestess (Reversed): This card
                        suggests a lack of intuition and disconnect with your inner wisdom. It may indicate confusion or
                        unexplored emotions that are affecting your mental health. It's important to listen to your
                        inner voice and pay attention to your thoughts and emotions to bring balance to your mind. 2.
                        Body - The Lovers (Reversed): This card signifies disharmony and imbalance in your physical
                        well-being. It may represent neglecting self-care or struggling with relationships that impact
                        your health negatively. It's essential to address any physical issues and prioritize self-love
                        and care for your body. 3. Soul - Death (Upright): Despite its ominous name, Death in the tarot
                        represents transformation, change, and new beginnings. In the context of the soul, this card
                        could indicate a period of deep inner growth and spiritual renewal. Embrace this change and
                        allow yourself to let go of old patterns or beliefs that no longer serve your highest good.
                        Overall, this reading suggests that you may be facing challenges in different aspects of your
                        health - mental, physical, and spiritual. It's a time for reflection, healing, and embracing
                        transformation. Take time to care for all aspects of yourself, seek inner clarity, nurture your
                        body, and embrace the changes coming your way for holistic well-being.
                    </p>
                    {/* <p>{response}</p> */}
                </div>
            </div>
        </>
    );
};

export default Result;
