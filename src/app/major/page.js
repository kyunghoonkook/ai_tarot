"use client"
import { useState, useEffect } from 'react';
import styles from '../../styles/MajorPage.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Major() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState('Beauty'); // Default theme
    
    const themes = [
        { id: 'Beauty', name: 'Beauty Theme', description: 'Elegant and artistic interpretations of the classic tarot cards.' },
        { id: 'Cute', name: 'Cute Theme', description: 'Playful and charming designs with a light-hearted aesthetic.' },
        { id: 'Dark', name: 'Dark Theme', description: 'Mysterious and atmospheric cards with rich, shadowy imagery.' }
    ];
    
    const majorArcanaCards = [
        {
            id: 0,
            name: "The Fool",
            description: "Represents new beginnings, infinite possibilities, adventure, and innocence. The Fool symbolizes the courage to step into the unknown and the free-spirited soul.",
            keywords: "Beginnings, innocence, spontaneity, free spirit",
            interpretation: "When The Fool appears in a reading, it often signifies a new beginning or adventure. It may indicate that you're about to embark on a journey of self-discovery or take a leap of faith into the unknown. The Fool encourages you to trust your instincts and embrace new opportunities with an open heart and mind."
        },
        {
            id: 1,
            name: "The Magician",
            description: "Signifies creativity, talent, skill, and willpower. The Magician represents the potential to manifest one's goals using their own abilities.",
            keywords: "Manifestation, resourcefulness, power, inspired action",
            interpretation: "The Magician reminds you that you have all the tools necessary to succeed. This card appears when you need to tap into your skills and resources to manifest your desires. It's a sign that with focus and determination, you can transform your ideas into reality."
        },
        {
            id: 2,
            name: "The High Priestess",
            description: "Symbolizes intuition, inner wisdom, secrets, and the unconscious. The High Priestess encourages listening to one's inner voice and having patience.",
            keywords: "Intuition, unconscious, divine feminine, inner voice",
            interpretation: "The High Priestess represents your connection to your intuition and the subconscious mind. When this card appears, it suggests that the answers you seek are within you. Take time for introspection and trust your inner knowing rather than always seeking external validation or information."
        },
        {
            id: 3,
            name: "The Empress",
            description: "Represents abundance, motherhood, growth, and nature. The Empress symbolizes the divine feminine energy of creation and nurturing.",
            keywords: "Abundance, fertility, nurturing, beauty, nature",
            interpretation: "The Empress embodies the fertile, life-giving aspect of the feminine. She represents abundance in all forms—material, emotional, and creative. When this card appears, it may signal a time of growth and prosperity, or suggest that you nurture yourself and others more fully."
        },
        {
            id: 4,
            name: "The Emperor",
            description: "Signifies authority, leadership, control, and stability. The Emperor represents order and structure in the material world.",
            keywords: "Authority, structure, control, leadership, stability",
            interpretation: "The Emperor brings order to chaos through rules, systems, and structures. This card often appears when you need to take charge of a situation or establish better boundaries. It suggests that logic and discipline will help you achieve your goals."
        },
        {
            id: 5,
            name: "The Hierophant",
            description: "Represents tradition, belief systems, social norms, and teachings. The Hierophant symbolizes a spiritual guide and a wise teacher.",
            keywords: "Tradition, conformity, morality, ethics, spiritual wisdom",
            interpretation: "The Hierophant represents conventional wisdom and established social structures. When this card appears, it may indicate that following traditional approaches or seeking guidance from a mentor or institution would be beneficial. It can also suggest a deeper exploration of your spiritual or moral values."
        },
        {
            id: 6,
            name: "The Lovers",
            description: "Symbolizes love, harmony, choice, and temptation. The Lovers represent moments of important decisions and harmony in relationships.",
            keywords: "Choice, alignment, love, harmony, relationships",
            interpretation: "While The Lovers often relates to romantic relationships, it's primarily about choice and alignment of values. This card appears at crossroads moments when you must make an important decision. It suggests that your choices should align with your authentic self and higher values."
        },
        {
            id: 7,
            name: "The Chariot",
            description: "Represents victory, willpower, self-control, and forward movement. The Chariot signifies the strength to overcome challenges and move towards one's goals.",
            keywords: "Control, willpower, victory, assertion, determination",
            interpretation: "The Chariot represents the triumphant overcoming of obstacles through focus, determination, and willpower. When this card appears, it suggests that with confidence and self-control, you can harness opposing forces in your life and drive toward success."
        },
        {
            id: 8,
            name: "Strength",
            description: "Signifies inner strength, courage, patience, and compassion. Strength represents the gentle power that tames the wild energy within.",
            keywords: "Courage, compassion, patience, influence, soft control",
            interpretation: "Strength reminds us that true power comes not from force but from patience, compassion, and inner resolve. This card suggests that you have the inner resources to handle difficult situations with grace. It encourages gentle persuasion rather than brute force."
        },
        {
            id: 9,
            name: "The Hermit",
            description: "Symbolizes introspection, wisdom, seeking truth, and solitude. The Hermit represents the journey within to gain enlightenment.",
            keywords: "Soul-searching, introspection, solitude, inner guidance",
            interpretation: "The Hermit signifies a period of withdrawal and looking inward for answers. When this card appears, it may be time to step back from external distractions to focus on self-discovery and spiritual growth. It suggests that wisdom comes from quiet contemplation."
        },
        {
            id: 10,
            name: "Wheel of Fortune",
            description: "Represents change, the cycle of fate, opportunity, and new phases. The Wheel symbolizes the ups and downs of life and turning points.",
            keywords: "Change, cycles, inevitable fate, turning point, luck",
            interpretation: "The Wheel of Fortune reminds us that life is constantly in flux. This card often appears during major life transitions or when circumstances are changing rapidly. It suggests accepting the natural cycles of life and being ready to adapt to new situations as they arise."
        },
        {
            id: 11,
            name: "Justice",
            description: "Signifies fairness, balance, cause and effect, and truth. Justice represents discerning right from wrong and making impartial judgments.",
            keywords: "Fairness, truth, cause and effect, law, consequences",
            interpretation: "Justice represents the universal law of cause and effect. When this card appears, it often signals a time when you're facing the consequences of past actions or need to make an important, balanced decision. It encourages fairness, objectivity, and ethical choices."
        },
        {
            id: 12,
            name: "The Hanged Man",
            description: "Symbolizes sacrifice, surrender, new perspectives, and acceptance. The Hanged Man represents letting go of the ego and gaining paradoxical insights.",
            keywords: "Surrender, new perspective, letting go, sacrifice",
            interpretation: "The Hanged Man represents willing suspension and sacrifice for greater wisdom or the greater good. This card suggests that by surrendering control or changing your perspective, you may find unexpected solutions. It often appears when a period of productive waiting or letting go is necessary."
        },
        {
            id: 13,
            name: "Death",
            description: "Represents transformation, transition, the end of the old, and new beginnings. Death symbolizes leaving the past behind and embracing change.",
            keywords: "Endings, change, transformation, transition",
            interpretation: "The Death card rarely predicts physical death—instead, it represents profound transformation and the natural ending of cycles. When this card appears, something in your life may be ending to make way for new growth. It encourages releasing what no longer serves you."
        },
        {
            id: 14,
            name: "Temperance",
            description: "Signifies harmony, balance, moderation, and healing. Temperance represents the integration of opposing elements to achieve stability.",
            keywords: "Balance, moderation, patience, purpose, integration",
            interpretation: "Temperance is about finding harmony through moderation and balance. This card suggests that combining seemingly opposing forces can create something greater than the sum of its parts. It encourages patience and taking the middle path rather than extremes."
        },
        {
            id: 15,
            name: "The Devil",
            description: "Symbolizes bondage, addiction, materialism, and dark forces. The Devil encourages confronting one's shadow self and overcoming inner fears.",
            keywords: "Shadow self, attachment, addiction, restriction, materialism",
            interpretation: "The Devil represents the bondage that comes from materialism and unhealthy attachments. When this card appears, it may be highlighting situations where you feel trapped or controlled by external forces. It invites you to recognize self-imposed limitations and find the courage to break free."
        },
        {
            id: 16,
            name: "The Tower",
            description: "Represents upheaval, destruction, revelation, and the collapse of existing structures. The Tower symbolizes the painful process of old beliefs and illusions crumbling down.",
            keywords: "Sudden change, upheaval, revelation, awakening, truth",
            interpretation: "The Tower represents sudden, sometimes destructive change that breaks down false structures. While often feared, this card actually clears away what's built on false premises to make way for truth. Though Tower moments can be challenging, they lead to necessary breakthroughs."
        },
        {
            id: 17,
            name: "The Star",
            description: "Signifies hope, inspiration, renewal, and inner peace. The Star provides the strength to maintain hope and move forward despite difficulties.",
            keywords: "Hope, faith, purpose, renewal, spirituality",
            interpretation: "The Star brings a message of hope and faith after difficult times. This card often appears after periods of upheaval (like The Tower) to remind you that divine inspiration and healing energy are available. It encourages optimism and trust in the universe."
        },
        {
            id: 18,
            name: "The Moon",
            description: "Represents uncertainty, illusion, intuition, and the unconscious. The Moon symbolizes the process of facing one's inner shadows and exploring emotions.",
            keywords: "Illusion, fear, anxiety, subconscious, intuition",
            interpretation: "The Moon illuminates the path through the subconscious and unknown territories. When this card appears, it may indicate confusion or deception, but also heightened intuition. It suggests navigating carefully through unclear situations and trusting your inner guidance."
        },
        {
            id: 19,
            name: "The Sun",
            description: "Symbolizes joy, success, vitality, and positive energy. The Sun represents radiating one's inner light and realizing one's potential.",
            keywords: "Success, radiance, joy, energy, vitality",
            interpretation: "The Sun represents clarity, joy, and success after moving through challenges. This card brings the assurance that difficult times are passing, and you can now enjoy the warmth of achievement and vitality. It encourages expressing yourself authentically and embracing positivity."
        },
        {
            id: 20,
            name: "Judgement",
            description: "Signifies rebirth, awakening, higher calling, and self-realization. Judgement represents the spiritual awakening that comes from reflecting on the past and starting a new life.",
            keywords: "Rebirth, inner calling, absolution, awakening",
            interpretation: "Judgement heralds a spiritual awakening or calling. This card often appears when you're evaluating your life choices and preparing for rebirth or transformation. It suggests rising above past mistakes through self-forgiveness and embracing your higher purpose."
        },
        {
            id: 21,
            name: "The World",
            description: "Symbolizes completion, accomplishment, integration, and a new dimension. The World represents the end of a cycle and the ascension to a higher level of consciousness.",
            keywords: "Completion, integration, accomplishment, travel",
            interpretation: "The World signifies the successful completion of a cycle and wholeness. When this card appears, it often indicates a major achievement or the final stage of a project or phase of life. It brings a sense of fulfillment and harmony, while also hinting at new beginnings on the horizon."
        }
    ];
    
    const handleCardClick = (card, event) => {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY;
        
        // 선택된 카드 설정
        setSelectedCard({
            ...card,
            scrollPosition: scrollY
        });
        
        // 스크롤 방지
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        // 모달이 열렸을 때의 스크롤 위치로 복원
        if (selectedCard && selectedCard.scrollPosition !== undefined) {
            window.scrollTo({
                top: selectedCard.scrollPosition,
                behavior: 'auto'
            });
        }
        
        // 스크롤 다시 활성화
        document.body.style.overflow = '';
        
        setSelectedCard(null);
    };
    
    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
    };

    return (
        <div className={styles.layout}>
            <h1 className={styles.title}>The Major Arcana Tarot Cards</h1>
            <p className={styles.intro}>
                The Major Arcana represents powerful archetypal energies and the major spiritual lessons we encounter in life. 
                These 22 cards form the foundation of the tarot deck and offer profound insights into our journey.
                Click on each card to explore its detailed meaning and interpretation.
            </p>
            
            <div className={styles.themeSelector}>
                <h2 className={styles.themeTitle}>Select Card Theme</h2>
                <div className={styles.themeButtons}>
                    {themes.map(theme => (
                        <button 
                            key={theme.id}
                            className={`${styles.themeButton} ${selectedTheme === theme.id ? styles.activeTheme : ''}`}
                            onClick={() => handleThemeChange(theme.id)}
                        >
                            {theme.name}
                        </button>
                    ))}
                </div>
                <p className={styles.themeDescription}>
                    {themes.find(theme => theme.id === selectedTheme).description}
                </p>
            </div>
            
            <div className={styles.cardGrid}>
                {majorArcanaCards.map((card) => (
                    <div 
                        key={card.id} 
                        className={styles.cardItem}
                        onClick={(e) => handleCardClick(card, e)}
                    >
                        <div className={styles.cardImageContainer}>
                            <img 
                                src={`/images/${selectedTheme}/${card.id.toString().padStart(2, '0')}.png`} 
                                alt={card.name}
                                className={styles.cardImage}
                            />
                        </div>
                        <h3 className={styles.cardName}>{card.name}</h3>
                    </div>
                ))}
            </div>
            
            {selectedCard && (
                <div 
                    className={styles.modal} 
                    onClick={closeModal}
                >
                    <div 
                        className={styles.modalContent} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={closeModal}>×</button>
                        <div className={styles.modalFlex}>
                            <div className={styles.modalImageContainer}>
                                <img 
                                    src={`/images/${selectedTheme}/${selectedCard.id.toString().padStart(2, '0')}.png`} 
                                    alt={selectedCard.name}
                                    className={styles.modalImage}
                                />
                            </div>
                            <div className={styles.modalInfo}>
                                <h2 className={styles.modalTitle}>{selectedCard.name}</h2>
                                <div className={styles.keywordsBox}>
                                    <h4>Keywords:</h4>
                                    <p>{selectedCard.keywords}</p>
                                </div>
                                <div className={styles.descriptionBox}>
                                    <h4>Description:</h4>
                                    <p>{selectedCard.description}</p>
                                </div>
                                <div className={styles.interpretationBox}>
                                    <h4>Interpretation:</h4>
                                    <p>{selectedCard.interpretation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className={styles.callToAction}>
                <h3>Ready to discover what the cards reveal about your future?</h3>
                <Link href="/cards" className={styles.ctaButton}>
                    Get Your Free Tarot Reading
                </Link>
            </div>
        </div>
    );
}
