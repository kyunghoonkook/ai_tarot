import CardSelector from '@/components/CardSelector';

export default function DesignPage({ params }) {
    const { theme, design } = params;

    return (
        <div>
            <h1>
                {theme} Tarot - {design} Design
            </h1>
            <CardSelector theme={theme} design={design} />
        </div>
    );
}
