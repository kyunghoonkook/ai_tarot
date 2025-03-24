import styles from './faq.module.css';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>Frequently Asked Questions (FAQ)</h1>
      <p className={styles.faqDescription}>
        Find answers to common questions about tarot cards and AI tarot readings.
      </p>
      
      <div className={styles.faqGrid}>
        <div className={styles.faqCategory}>
          <h2>Tarot Card Basics</h2>
          <div className={styles.faqItem}>
            <details>
              <summary>What are tarot cards?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  Tarot cards are a deck of 78 cards, divided into the Major Arcana (22 cards) and Minor Arcana (56 cards). 
                  Each card contains symbolic imagery and meanings used to provide insights into life's journey, love, career, 
                  and personal growth.
                </p>
              </div>
            </details>
          </div>
          
          <div className={styles.faqItem}>
            <details>
              <summary>How does tarot card reading work?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  Tarot card reading involves shuffling the cards according to the querent's energy and intention, 
                  then arranging them in specific patterns (spreads). The position and meaning of each card is interpreted 
                  to provide insights into the querent's current situation, influencing factors, and potential outcomes.
                </p>
              </div>
            </details>
          </div>
          
          <div className={styles.faqItem}>
            <details>
              <summary>Can tarot cards predict the future?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  Tarot cards are tools that show current energies and possible outcomes rather than precise future predictions. 
                  Tarot acknowledges that our free will and choices shape our future, while providing insights into what 
                  outcomes might come from different paths chosen in the present situation.
                </p>
              </div>
            </details>
          </div>
        </div>
        
        <div className={styles.faqCategory}>
          <h2>AI Tarot Readings</h2>
          <div className={styles.faqItem}>
            <details>
              <summary>How does AI tarot reading work?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  AI tarot reading uses advanced artificial intelligence algorithms to analyze the traditional meanings and 
                  interpretations of tarot cards. When a user enters a question, the AI generates personalized interpretations 
                  for randomly selected cards to provide a customized reading experience.
                </p>
              </div>
            </details>
          </div>
          
          <div className={styles.faqItem}>
            <details>
              <summary>Are AI tarot readings as accurate as traditional readings?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  AI tarot readings are based on the traditional meanings and interpretations of tarot cards but lack the 
                  element of human intuition. However, AI can learn from thousands of interpretations to provide consistent 
                  and personalized readings. Many users find AI tarot readings to be insightful and accurate.
                </p>
              </div>
            </details>
          </div>
          
          <div className={styles.faqItem}>
            <details>
              <summary>Is AI tarot reading free?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  Yes, all AI tarot readings provided on our website are completely free. You can receive tarot readings 
                  on various topics as many times as you want without any daily reading limits.
                </p>
              </div>
            </details>
          </div>
        </div>
        
        <div className={styles.faqCategory}>
          <h2>Tarot Card Meanings</h2>
          <div className={styles.faqItem}>
            <details>
              <summary>Are reversed cards always negative?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  No, reversed cards are not necessarily negative. Reversed cards can indicate that the energy of the card 
                  is internalized, delayed, or expressed in a diminished state. Sometimes, reversed cards may suggest the 
                  need for self-reflection and inner work.
                </p>
              </div>
            </details>
          </div>
          
          <div className={styles.faqItem}>
            <details>
              <summary>Does the 'Death' card signify actual death?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  No, in tarot, the 'Death' card almost always symbolizes transformation, endings, and new beginnings. 
                  It represents the end of a relationship, job, or phase of life and the beginning of something new, 
                  rather than predicting physical death.
                </p>
              </div>
            </details>
          </div>
          
          <div className={styles.faqItem}>
            <details>
              <summary>Are Minor Arcana cards as important as Major Arcana?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  Yes, Minor Arcana cards are just as important as Major Arcana. While Major Arcana represents bigger life 
                  lessons and significant transitions, Minor Arcana reflects everyday situations, challenges, and energies. 
                  A complete tarot reading integrates the wisdom and insights from both Arcanas.
                </p>
              </div>
            </details>
          </div>
        </div>
        
        <div className={styles.faqCategory}>
          <h2>Tarot Practice</h2>
          <div className={styles.faqItem}>
            <details>
              <summary>What's the best format for tarot reading questions?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  Open-ended questions provide the most insightful tarot readings. Rather than questions that can be answered 
                  with "yes" or "no," formats like "What do I need to know about this situation?" or "What energies await me if 
                  I pursue this path?" offer deeper insights.
                </p>
              </div>
            </details>
          </div>
          
          <div className={styles.faqItem}>
            <details>
              <summary>What's the best tarot spread for beginners?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  The best spreads for beginners are single card draws and 3-card spreads. A single card can provide insight 
                  for a daily message or simple question, while a 3-card spread can tell a more complete story with patterns like 
                  past-present-future or situation-action-outcome.
                </p>
              </div>
            </details>
          </div>
          
          <div className={styles.faqItem}>
            <details>
              <summary>Should I cleanse my tarot deck regularly?</summary>
              <div className={styles.faqAnswer}>
                <p>
                  Many tarot practitioners believe that energy cleansing is important for maintaining the clarity and accuracy of the deck. 
                  Cleansing methods include passing the deck through sage smoke, placing it on crystals, exposing it to moonlight, 
                  or simply shuffling the deck while setting an intention.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
      
      <div className={styles.faqMoreHelp}>
        <h2>Need More Help?</h2>
        <p>For more detailed information, check out our <Link href="/guide">Tarot Guide</Link> or read in-depth articles about tarot in our <Link href="/blog">Blog</Link>.</p>
      </div>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
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
              "name": "Can tarot cards predict the future?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Tarot cards are tools that show current energies and possible outcomes rather than precise future predictions. Tarot acknowledges that our free will and choices shape our future, while providing insights into what outcomes might come from different paths chosen in the present situation."
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
              "name": "Are AI tarot readings as accurate as traditional readings?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI tarot readings are based on the traditional meanings and interpretations of tarot cards but lack the element of human intuition. However, AI can learn from thousands of interpretations to provide consistent and personalized readings. Many users find AI tarot readings to be insightful and accurate."
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
      `}} />
    </div>
  );
} 