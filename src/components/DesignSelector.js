import Link from 'next/link';

export default function DesignSelector({ theme }) {
    const designs = ['beauty', 'cute', 'dark'];

    return (
        <div>
            <h2>Select a deck design:</h2>
            {designs.map((design) => (
                <Link key={design} href={`/${theme}/${design}`}>
                    {design}
                </Link>
            ))}
        </div>
    );
}
