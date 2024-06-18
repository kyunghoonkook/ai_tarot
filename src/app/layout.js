import Link from 'next/link';
import KakaoScript from '@/components/KakaoScript';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
export const metadata = {
    //  google-adsense-account:'ca-pub-6444523705828999' ,
    title: 'AI Tarot - Unlock the Secrets of Your Future',
    description:
        "Discover the power of AI-generated tarot readings. Get personalized insights and guidance for your life's journey with our cutting-edge AI Tarot app.",
    keywords:
        'AI tarot, tarot reading, online tarot, tarot cards, fortune telling, divination, spiritual guidance, personal growth, self-discovery',
    author: 'make-money',
    applicationName: 'AI Tarot',
    generator: 'Next.js',
    // themeColor: '#ffffff',
    // colorScheme: 'light',
    // viewport: 'width=device-width, initial-scale=1.0',
    formatDetection: {
        telephone: false,
    },
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'AI Tarot - Unlock the Secrets of Your Future',
        description:
            "Discover the power of AI-generated tarot readings. Get personalized insights and guidance for your life's journey with our cutting-edge AI Tarot app.",
        url: 'https://ai-tarot-five.vercel.app/',
        type: 'website',
        images: [
            {
                url: 'https://ai-tarot-five.vercel.app/images/bg.png',
                // width: 1200,
                // height: 630,
                alt: 'AI Tarot Open Graph Image',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@your_twitter_handle',
        creator: '@your_twitter_handle',
        title: 'AI Tarot - Unlock the Secrets of Your Future',
        description:
            "Discover the power of AI-generated tarot readings. Get personalized insights and guidance for your life's journey with our cutting-edge AI Tarot app. !",
        // images: ['https://your-ai-tarot-url.com/images/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // verification: {
    //     google: 'your-google-verification-code',
    //     yandex: 'your-yandex-verification-code',
    //     'me.js': 'your-me.js-verification-code',
    // },
};
export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6444523705828999"
                    crossorigin="anonymous"
                ></script>
            </head>
            <body>
                <header className="header">
                    <Link href="/">
                        <img src="/images/logo1.svg" className="logo" />
                    </Link>
                    <ul>
                        <li>
                            <Link href="major">Major Arcana</Link>
                        </li>
                        <li>
                            <Link href="guide">Guide</Link>
                        </li>
                        <li>
                            <Link href="history">History</Link>
                        </li>
                        <li>
                            <Link href="quiz">Quiz</Link>
                        </li>
                    </ul>
                </header>

                <div className="layout">{children}</div>
                <footer className="footer">
                    <p>COPYRIGHT (C) www.aifree-tarot.com ALL RIGHTS RESERVED. </p>
                </footer>
                <KakaoScript />
                <Analytics />
            </body>
        </html>
    );
}
