import DesignSelector from '@/components/DesignSelector';

export default function ThemePage({ params }) {
    const { theme } = params;

    return (
        <div>
            <h1>{theme} Tarot</h1>
            <DesignSelector theme={theme} />
        </div>
    );
}
