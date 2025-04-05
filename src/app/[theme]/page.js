import DesignSelector from '@/components/DesignSelector';
import styles from '../../styles/ThemePage.module.css';

export default function ThemePage({ params }) {
    const { theme } = params;

    return (
        <div>
            <h1 className={styles['title']}>{theme} Tarot</h1>
            <DesignSelector theme={theme} />
        </div>
    );
}
