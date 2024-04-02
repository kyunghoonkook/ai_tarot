import CardSelector from '@/components/CardSelector';

export default function DesignPage({ params }) {
    const { theme, design } = params;

    return (
        <div>
            <CardSelector theme={theme} design={design} />
        </div>
    );
}
