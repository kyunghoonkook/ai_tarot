import Link from 'next/link';
import styles from '../styles/ThemePage.module.css';
export default function DesignSelector({ theme }) {
    const designs = ['beauty', 'cute', 'dark'];
    const cards = [
        { theme: 'Beauty', image: '/images/Beauty/뒷면 1.png' },
        { theme: 'Cute', image: '/images/Cute/뒷면 1.png' },
        { theme: 'Dark', image: '/images/Dark/뒷면 1.png' },
    ];
    return (
        <div>
            <h2 className={styles['sub_title']}>CHOOSE YOUR DECK</h2>
            <div className={styles['cards_wrap']}>
                {cards.map((design, idx) => (
                    <Link key={idx} href={`/${theme}/${design.theme}`} className={styles['link']}>
                        <img src={design.image} alt={`${design.theme}`} />
                        <p> {design.theme}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
