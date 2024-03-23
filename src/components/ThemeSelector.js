import Link from 'next/link';

export default function ThemeSelector() {
    const themes = ['love', 'money', 'health'];

    return (
        <div>
            <h2>Select a theme:</h2>
            {themes.map((theme) => (
                <Link key={theme} href={`/${theme}`}>
                    {theme}
                    {/* <a>{theme}</a> */}
                </Link>
            ))}
        </div>
    );
}
