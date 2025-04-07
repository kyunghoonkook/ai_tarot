'use client';
import { useEffect } from 'react';
import styles from './history.module.css';
import Link from 'next/link';

export default function HistoryPage() {
  useEffect(() => {
    const handleScroll = () => {
      const timelineItems = document.querySelectorAll(`.${styles.timelineItem}`);
      
      timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.75) {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Initial check for items in viewport
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const timelineData = [
    {
      date: '15th Century',
      title: 'Origins in Renaissance Italy',
      content: 'The earliest known tarot cards appeared in Northern Italy during the mid-15th century. These early decks were commissioned by wealthy families like the Visconti and Sforza dynasties as playing cards for games similar to bridge. These ornate hand-painted decks were luxury items for the nobility, featuring beautiful artwork that reflected Renaissance aesthetics and values.',
    },
    {
      date: '1440s',
      title: 'The Visconti-Sforza Tarot',
      content: 'One of the most famous early tarot decks, the Visconti-Sforza Tarot, was created in Milan. This deck is renowned for its exquisite artistry and is considered a masterpiece of Renaissance art. Only partial decks survive today, housed in museums around the world. These cards were not used for divination but were primarily for entertainment and gaming.',
    },
    {
      date: 'Late 18th Century',
      title: 'Introduction to Occultism',
      content: 'Tarot began its association with mysticism and divination through the work of Antoine Court de Gébelin, a French occultist. In his work "Le Monde Primitif" (1781), he claimed that tarot cards contained hidden wisdom from ancient Egypt. While his theories have been largely discredited by modern scholars, they sparked widespread interest in tarot as a tool for divination rather than merely a game.',
    },
    {
      date: '1785-1788',
      title: 'The French Occult Revival',
      content: 'Jean-Baptiste Alliette, under the pseudonym "Etteilla," became the first professional tarot occultist. He created the first tarot deck specifically designed for divination and published a series of books linking the tarot to astrology, the four elements, and the four humors. Etteilla work significantly influenced how tarot would be used for centuries to come.'
    },
    {
      date: '19th Century',
      title: 'Éliphas Lévi and Tarot Symbolism',
      content: 'French occultist Éliphas Lévi connected tarot to the Kabbalah and the Hebrew alphabet, further cementing tarot\'s place in Western esotericism. His 1856 work "Dogme et Rituel de la Haute Magie" (Dogma and Ritual of High Magic) linked the 22 cards of the Major Arcana with the 22 letters of the Hebrew alphabet and the paths of the Kabbalistic Tree of Life.',
    },
    {
      date: '1909',
      title: 'The Rider-Waite-Smith Tarot',
      content: 'Arthur Edward Waite and illustrator Pamela Colman Smith created what would become the most influential tarot deck in the modern era. Published by the Rider Company, this deck revolutionized tarot by including detailed symbolic imagery on all 78 cards, not just the 22 Major Arcana. The Rider-Waite-Smith Tarot remains the standard reference for most contemporary tarot decks and interpretations.',
    },
    {
      date: '1944',
      title: 'Aleister Crowley\'s Thoth Tarot',
      content: 'Notorious occultist Aleister Crowley, along with artist Lady Frieda Harris, created the Thoth Tarot. This deck incorporated complex esoteric symbolism from various traditions including astrology, alchemy, and Crowley\'s own magical system of Thelema. Though completed in 1944, the deck wasn\'t published until 1969, after both creators had died.',
    },
    {
      date: '1970s-1980s',
      title: 'New Age Movement and Tarot Resurgence',
      content: 'The New Age movement embraced tarot as a tool for personal growth and spiritual development. This period saw an explosion of new tarot decks with diverse artistic styles and interpretations. Tarot began to enter mainstream awareness, and books on tarot interpretation became widely available to the general public.',
    },
    {
      date: '21st Century',
      title: 'Digital Age and AI Tarot',
      content: 'The 21st century has seen tarot adapt to the digital age with online readings, mobile apps, and diverse inclusive decks that reflect various cultures, identities, and artistic styles. Most recently, artificial intelligence has entered the tarot space, offering innovative approaches to card interpretation and accessibility. AI tarot combines the ancient wisdom of traditional tarot with cutting-edge technology to provide personalized readings to users worldwide.',
    },
  ];
  
  const references = [
    {
      title: 'Place, R. M. (2009). The Tarot: History, Symbolism, and Divination. Penguin.',
      url: '#',
    },
    {
      title: 'Decker, R., Dummett, M., & Depaulis, T. (1996). A Wicked Pack of Cards: The Origins of the Occult Tarot. St. Martin\'s Press.',
      url: '#',
    },
    {
      title: 'Kaplan, S. R. (2018). The Encyclopedia of Tarot (Vols. 1-4). U.S. Games Systems.',
      url: '#',
    },
    {
      title: 'Farley, H. (2009). A Cultural History of Tarot: From Entertainment to Esotericism. I.B. Tauris.',
      url: '#',
    },
  ];
  
  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>The History of Tarot</h1>
      <p className={styles.intro}>
        Tarot cards have a rich and fascinating history spanning over 600 years, evolving from Italian playing cards 
        to powerful tools for divination and self-discovery. This timeline presents key moments in the development 
        of tarot from its Renaissance origins to today's digital innovations.
      </p>
      
      <div className={styles.timelineContainer}>
        <div className={styles.timelineCenterLine}></div>
        
        {timelineData.map((item, index) => (
          <div 
            key={index} 
            className={styles.timelineItem} 
            style={{
              opacity: 0, 
              transform: 'translateY(20px)', 
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            <div className={`${styles.timelineContent} ${index % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineDate}>{item.date}</div>
              <h3 className={styles.timelineTitle}>{item.title}</h3>
              <p className={styles.timelineText}>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.referenceSection}>
        <h2 className={styles.referenceTitle}>References & Further Reading</h2>
        <ul className={styles.referenceList}>
          {references.map((ref, index) => (
            <li key={index} className={styles.referenceItem}>
              {ref.url !== '#' ? (
                <a href={ref.url} className={styles.referenceLink} target="_blank" rel="noopener noreferrer">
                  {ref.title}
                </a>
              ) : (
                ref.title
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className={styles.referenceSection} style={{ marginTop: '30px' }}>
        <h2 className={styles.referenceTitle}>Explore More</h2>
        <p style={{ textAlign: 'center', color: '#f0f0f0', marginBottom: '20px' }}>
          Continue your journey into the world of tarot with these resources
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link href="/major" className={styles.referenceLink} style={{ 
            padding: '10px 20px', 
            background: 'rgba(224, 201, 145, 0.2)', 
            borderRadius: '30px',
            border: '1px solid #e0c991',
          }}>
            Explore Major Arcana
          </Link>
          <Link href="/guide" className={styles.referenceLink} style={{ 
            padding: '10px 20px', 
            background: 'rgba(224, 201, 145, 0.2)', 
            borderRadius: '30px',
            border: '1px solid #e0c991',
          }}>
            Tarot Reading Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
