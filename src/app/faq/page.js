'use client';
import { useState } from 'react';
import styles from './faq.module.css';
import Link from 'next/link';

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState('basics');
    const [openItemId, setOpenItemId] = useState(null);

    const categories = [
        {
            id: 'basics',
            name: 'Tarot Card Basics',
            description: 'Learn the fundamentals of tarot cards, their history, and how readings work.',
        },
        {
            id: 'ai',
            name: 'AI Tarot Readings',
            description: 'Understand how AI-powered tarot readings function and compare to traditional readings.',
        },
        {
            id: 'meanings',
            name: 'Tarot Card Meanings',
            description: 'Explore the symbolism and interpretations behind different tarot cards.',
        },
        {
            id: 'practice',
            name: 'Tarot Practice',
            description: 'Get practical tips for conducting meaningful tarot readings and practices.',
        },
    ];

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setOpenItemId(null); // Close any open item when changing category
    };

    const toggleItem = (itemId) => {
        if (openItemId === itemId) {
            setOpenItemId(null); // Close if already open
        } else {
            setOpenItemId(itemId); // Open the clicked item
        }
    };

    const faqData = {
        basics: [
            {
                question: 'What are tarot cards?',
                answer: "Tarot cards are a deck of 78 cards, divided into the Major Arcana (22 cards) and Minor Arcana (56 cards). Each card contains symbolic imagery and meanings used to provide insights into life's journey, love, career, and personal growth.",
            },
            {
                question: 'How does tarot card reading work?',
                answer: "Tarot card reading involves shuffling the cards according to the querent's energy and intention, then arranging them in specific patterns (spreads). The position and meaning of each card is interpreted to provide insights into the querent's current situation, influencing factors, and potential outcomes.",
            },
            {
                question: 'Can tarot cards predict the future?',
                answer: 'Tarot cards are tools that show current energies and possible outcomes rather than precise future predictions. Tarot acknowledges that our free will and choices shape our future, while providing insights into what outcomes might come from different paths chosen in the present situation.',
            },
            {
                question: 'How should I start with tarot cards?',
                answer: "For those new to tarot cards, it's recommended to start with a traditional deck like the Rider-Waite deck along with a basic tarot guidebook. Learn the basic meanings of each card and practice with simple one-card or three-card spreads. It's important to spend time getting familiar with the cards and developing your intuition.",
            },
        ],
        ai: [
            {
                question: 'How does AI tarot reading work?',
                answer: 'AI tarot reading uses advanced artificial intelligence algorithms to analyze the traditional meanings and interpretations of tarot cards. When a user enters a question, the AI generates personalized interpretations for randomly selected cards to provide a customized reading experience.',
            },
            {
                question: 'Are AI tarot readings as accurate as traditional readings?',
                answer: 'AI tarot readings are based on the traditional meanings and interpretations of tarot cards but lack the element of human intuition. However, AI can learn from thousands of interpretations to provide consistent and personalized readings. Many users find AI tarot readings to be insightful and accurate.',
            },
            {
                question: 'Is AI tarot reading free?',
                answer: 'Yes, all AI tarot readings provided on our website are completely free. You can receive tarot readings on various topics as many times as you want without any daily reading limits.',
            },
            {
                question: 'What types of questions work best with AI tarot?',
                answer: "AI tarot is particularly useful for questions about self-reflection, relationships, career decisions, and personal growth. Open-ended questions like 'How might this relationship develop?', 'Should I consider a career change?', or 'How can I progress with my creative project?' generate the most insightful responses.",
            },
        ],
        meanings: [
            {
                question: 'Are reversed cards always negative?',
                answer: 'No, reversed cards are not necessarily negative. Reversed cards can indicate that the energy of the card is internalized, delayed, or expressed in a diminished state. Sometimes, reversed cards may suggest the need for self-reflection and inner work.',
            },
            {
                question: "Does the 'Death' card signify actual death?",
                answer: "No, in tarot, the 'Death' card almost always symbolizes transformation, endings, and new beginnings. It represents the end of a relationship, job, or phase of life and the beginning of something new, rather than predicting physical death.",
            },
            {
                question: 'Are Minor Arcana cards as important as Major Arcana?',
                answer: 'Yes, Minor Arcana cards are just as important as Major Arcana. While Major Arcana represents bigger life lessons and significant transitions, Minor Arcana reflects everyday situations, challenges, and energies. A complete tarot reading integrates the wisdom and insights from both Arcanas.',
            },
            {
                question: 'Does the Lovers card always signify romance?',
                answer: "The Lovers card can indicate romance, but that's not its primary meaning. This card primarily represents choice, value alignment, and harmonious relationships (romantic or otherwise). It often symbolizes a crossroads in life related to significant decisions or value-based choices.",
            },
        ],
        practice: [
            {
                question: "What's the best format for tarot reading questions?",
                answer: "Open-ended questions provide the most insightful tarot readings. Rather than questions that can be answered with 'yes' or 'no,' formats like 'What do I need to know about this situation?' or 'What energies await me if I pursue this path?' offer deeper insights.",
            },
            {
                question: "What's the best tarot spread for beginners?",
                answer: 'The best spreads for beginners are single card draws and 3-card spreads. A single card can provide insight for a daily message or simple question, while a 3-card spread can tell a more complete story with patterns like past-present-future or situation-action-outcome.',
            },
            {
                question: 'Should I cleanse my tarot deck regularly?',
                answer: 'Many tarot practitioners believe that energy cleansing is important for maintaining the clarity and accuracy of the deck. Cleansing methods include passing the deck through sage smoke, placing it on crystals, exposing it to moonlight, or simply shuffling the deck while setting an intention.',
            },
            {
                question: 'Is drawing a daily tarot card helpful?',
                answer: "Yes, drawing a daily card is a useful method for self-reflection and intuition development. Start your day by drawing a single card with a simple question like 'What message do I need to know today?' and reflect on its message. This practice forms a deeper connection with tarot and shows how it applies to daily life.",
            },
        ],
    };

    return (
        <div className={styles.layout}>
            <h1 className={styles.title}>Frequently Asked Questions (FAQ)</h1>
            <p className={styles.intro}>
                Find answers to common questions about tarot cards and AI tarot readings. Select a category below to
                explore information on your topic of interest.
            </p>

            <div className={styles.categorySelector}>
                <h2 className={styles.categoryTitle}>Select FAQ Category</h2>
                <div className={styles.categoryButtons}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${
                                activeCategory === category.id ? styles.activeCategory : ''
                            }`}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <p className={styles.categoryDescription}>
                    {categories.find((cat) => cat.id === activeCategory).description}
                </p>
            </div>

            <div className={styles.faqList}>
                {faqData[activeCategory].map((item, index) => {
                    const itemId = `${activeCategory}-${index}`;
                    const isOpen = openItemId === itemId;

                    return (
                        <div key={itemId} className={styles.faqItem}>
                            <div className={styles.faqItemHeader} onClick={() => toggleItem(itemId)}>
                                <h3 className={styles.faqQuestion}>
                                    {item.question}
                                    <span className={styles.faqToggle}>{isOpen ? '−' : '+'}</span>
                                </h3>
                            </div>

                            {isOpen && (
                                <div className={styles.faqAnswer}>
                                    <p>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={styles.faqMoreHelp}>
                <h3>Need More Information?</h3>
                <p>For a deeper understanding of tarot, check out the links below.</p>
                <div>
                    <Link href="/guide" className={styles.ctaButton}>
                        View Tarot Guide
                    </Link>
                    <Link href="/major" className={styles.ctaButton}>
                        Explore Major Arcana Cards
                    </Link>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are tarot cards?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Tarot cards are a deck of 78 cards, divided into the Major Arcana (22 cards) and Minor Arcana (56 cards). Each card contains symbolic imagery and meanings used to provide insights into life's journey, love, career, and personal growth."
              }
            },
            {
              "@type": "Question",
              "name": "How does tarot card reading work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Tarot card reading involves shuffling the cards according to the querent's energy and intention, then arranging them in specific patterns (spreads). The position and meaning of each card is interpreted to provide insights into the querent's current situation, influencing factors, and potential outcomes."
              }
            },
            {
              "@type": "Question",
              "name": "How does AI tarot reading work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI tarot reading uses advanced artificial intelligence algorithms to analyze the traditional meanings and interpretations of tarot cards. When a user enters a question, the AI generates personalized interpretations for randomly selected cards to provide a customized reading experience."
              }
            },
            {
              "@type": "Question",
              "name": "Is AI tarot reading free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all AI tarot readings provided on our website are completely free. You can receive tarot readings on various topics as many times as you want without any daily reading limits."
              }
            }
          ]
        }
      `,
                }}
            />
        </div>
    );
}
