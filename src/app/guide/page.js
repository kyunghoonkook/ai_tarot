"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/GuidePage.module.css';

// 아코디언 컴포넌트
const AccordionItem = ({ title, children, isOpen, toggleAccordion }) => {
    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <div className={styles.accordionHeader} onClick={toggleAccordion}>
                <h3>{title}</h3>
                <span className={styles.accordionIcon}>{isOpen ? '−' : '+'}</span>
            </div>
            <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default function Guide() {
    // 아코디언 상태 관리
    const [openItem, setOpenItem] = useState(null);
    
    const toggleAccordion = (index) => {
        setOpenItem(openItem === index ? null : index);
    };
    
    // 타로 스프레드 정보
    const tarotSpreads = [
        {
            name: "Three-Card Spread",
            description: "Perfect for beginners, this spread gives insight into past, present, and future.",
            positions: ["Past", "Present", "Future"]
        },
        {
            name: "Celtic Cross",
            description: "A comprehensive 10-card spread that offers deep insights into complex situations.",
            positions: ["Present", "Challenge", "Foundation", "Recent Past", "Potential", "Near Future", "Self", "Environment", "Hopes/Fears", "Outcome"]
        },
        {
            name: "Relationship Spread",
            description: "A 5-card spread designed to explore the dynamics of any relationship.",
            positions: ["You", "The Other Person", "The Relationship", "Challenges", "Outcome"]
        }
    ];

    return (
        <div className={styles.layout}>
            <div className={styles.heroSection}>
                <h1 className={styles.mainTitle}>Tarot Reading Guide</h1>
                <p className={styles.heroText}>
                    Discover the ancient wisdom of tarot and learn how to unlock its guidance for your life journey.
                </p>
            </div>

            <div className={styles.contentSection}>
                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.title}>What is Tarot?</h2>
                        <div className={styles.decorativeLine}></div>
                    </div>
                    <div className={styles.sectionContent}>
                        <div className={styles.textContent}>
                            <p>
                                Tarot is a deck of 78 cards, each with its own unique symbolism and meaning. It is divided into two main
                                sections: the Major Arcana and the Minor Arcana. Tarot is used for self-reflection, personal growth, and
                                gaining insights into various aspects of life.
                            </p>
                            <p>
                                Dating back to the 15th century, tarot cards have evolved from playing cards to powerful tools for spiritual guidance and self-discovery.
                                Today, people around the world use tarot as a way to connect with their intuition and gain clarity about their path.
                            </p>
                        </div>
                        <div className={styles.imageContent}>
                            <img 
                                src="/images/cardBG.png" 
                                alt="Tarot cards spread out"
                                className={styles.sectionImage}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.title}>The Structure of Tarot</h2>
                        <div className={styles.decorativeLine}></div>
                    </div>
                    <div className={styles.sectionContent}>
                        <div className={styles.column}>
                            <div className={styles.cardBox}>
                                <h3 className={styles.cardTitle}>The Major Arcana</h3>
                                <p>
                                    The Major Arcana consists of 22 cards, numbered from 0 to 21. These cards represent significant life
                                    events, lessons, and archetypal energies. Some of the most well-known Major Arcana cards include The
                                    Fool, The Lovers, The Wheel of Fortune, and The World.
                                </p>
                                <Link href="/major" className={styles.cardLink}>
                                    Explore Major Arcana →
                                </Link>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.cardBox}>
                                <h3 className={styles.cardTitle}>The Minor Arcana</h3>
                                <p>
                                    The Minor Arcana is made up of 56 cards, divided into four suits: Wands, Cups, Swords, and Pentacles.
                                    Each suit represents a different area of life:
                                </p>
                                <ul className={styles.suitList}>
                                    <li><span className={styles.suitWands}>Wands:</span> Creativity, passion, and action</li>
                                    <li><span className={styles.suitCups}>Cups:</span> Emotions, relationships, and intuition</li>
                                    <li><span className={styles.suitSwords}>Swords:</span> Thoughts, challenges, and truth</li>
                                    <li><span className={styles.suitPentacles}>Pentacles:</span> Material world, finances, and practicality</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.title}>Popular Tarot Spreads</h2>
                        <div className={styles.decorativeLine}></div>
                    </div>
                    <div className={styles.spreadsContainer}>
                        {tarotSpreads.map((spread, index) => (
                            <div key={index} className={styles.spreadCard}>
                                <h3 className={styles.spreadTitle}>{spread.name}</h3>
                                <p className={styles.spreadDescription}>{spread.description}</p>
                                <div className={styles.spreadPositions}>
                                    {spread.positions.map((position, posIndex) => (
                                        <div key={posIndex} className={styles.positionBadge}>
                                            {position}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.title}>Tarot Reading Tips</h2>
                        <div className={styles.decorativeLine}></div>
                    </div>
                    <div className={styles.accordionContainer}>
                        <AccordionItem 
                            title="Setting the Right Environment" 
                            isOpen={openItem === 0} 
                            toggleAccordion={() => toggleAccordion(0)}
                        >
                            <p>Create a calm, peaceful space for your readings. Some readers like to light candles, burn incense, or play soft music to enhance the atmosphere. The most important thing is that you feel comfortable and focused.</p>
                        </AccordionItem>
                        
                        <AccordionItem 
                            title="Shuffling and Drawing Cards" 
                            isOpen={openItem === 1} 
                            toggleAccordion={() => toggleAccordion(1)}
                        >
                            <p>There's no single "right" way to shuffle tarot cards. Some people prefer traditional shuffling methods, while others like to spread the cards out and move them around. As you shuffle, focus on your question or intention.</p>
                            <p>When you feel ready, draw your cards. You can cut the deck with your non-dominant hand and select from the top, or fan the cards out and choose the ones that call to you intuitively.</p>
                        </AccordionItem>
                        
                        <AccordionItem 
                            title="Interpreting the Cards" 
                            isOpen={openItem === 2} 
                            toggleAccordion={() => toggleAccordion(2)}
                        >
                            <p>Consider both the traditional meanings of the cards and your intuitive responses to them. Pay attention to imagery, colors, and symbols that stand out to you. Also look at the relationships between cards in your spread.</p>
                            <p>Reversed cards (cards that appear upside down) often represent blocked or internalized energy related to the card's meaning, but some readers interpret them differently or choose not to read reversals at all.</p>
                        </AccordionItem>
                        
                        <AccordionItem 
                            title="Developing Your Intuition" 
                            isOpen={openItem === 3} 
                            toggleAccordion={() => toggleAccordion(3)}
                        >
                            <p>Tarot reading is not just about memorizing card meanings; it's also about developing your intuition. Trust your instincts and the impressions you receive when looking at the cards. With practice, you'll create a deep, personal connection with your deck.</p>
                            <p>Keep a tarot journal to record your readings and reflect on how the cards' messages manifest in your life over time.</p>
                        </AccordionItem>
                        
                        <AccordionItem 
                            title="Tarot Ethics" 
                            isOpen={openItem === 4} 
                            toggleAccordion={() => toggleAccordion(4)}
                        >
                            <p>Always remember that Tarot is a tool for guidance and self-reflection, not a way to predict the future or make decisions for others. Use Tarot responsibly and ethically, focusing on empowering yourself and others to make informed choices.</p>
                            <p>Respect others' privacy and autonomy when reading for them. Avoid making definitive predictions about health, death, or major life decisions.</p>
                        </AccordionItem>
                    </div>
                </div>
            </div>

            <div className={styles.ctaSection}>
                <h2>Ready to Start Your Tarot Journey?</h2>
                <p>Try your first AI-powered tarot reading and gain insights into your path.</p>
                <Link href="/cards" className={styles.ctaButton}>
                    Get Your Free Reading
                </Link>
            </div>
        </div>
    );
}
