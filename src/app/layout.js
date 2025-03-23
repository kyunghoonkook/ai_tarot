import Link from 'next/link';
import Script from 'next/script';
import KakaoScript from '@/components/KakaoScript';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
export const metadata = {
    title: 'AI Tarot - Unlock the Secrets of Your Future with AI-Powered Tarot Readings',
    description:
        'Discover the power of AI-generated tarot readings. Get personalized insights and guidance for love, career, health, and more. Our cutting-edge AI Tarot app offers accurate and insightful readings 24/7.',
    keywords:
        'AI tarot, tarot reading, online tarot, tarot cards, fortune telling, divination, spiritual guidance, personal growth, self-discovery, love tarot, career tarot, health tarot, tarot predictions, tarot insights',
    author: 'AIFreeTarot',
    applicationName: 'AI Tarot',
    generator: 'Next.js',
    formatDetection: {
        telephone: false,
    },
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'AI Tarot - Unlock the Secrets of Your Future with AI-Powered Tarot Readings',
        description:
            'Discover the power of AI-generated tarot readings. Get personalized insights and guidance for love, career, health, and more. Our cutting-edge AI Tarot app offers accurate and insightful readings 24/7.',
        url: 'https://www.aifree-tarot.com/',
        type: 'website',
        images: [
            {
                url: 'https://www.aifree-tarot.com/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AI Tarot Open Graph Image',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@AIFreeTarot',
        creator: '@AIFreeTarot',
        title: 'AI Tarot - Unlock the Secrets of Your Future with AI-Powered Tarot Readings',
        description:
            'Discover the power of AI-generated tarot readings. Get personalized insights and guidance for love, career, health, and more. Our cutting-edge AI Tarot app offers accurate and insightful readings 24/7.',
        images: ['https://www.aifree-tarot.com/images/twitter-image.jpg'],
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
    verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        me: 'your-me-verification-code',
    },
};
export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* 중복된 애드센스 스크립트 제거 */}
            </head>
            <body>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6444523705828999"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                
                <div className="ad-container">
                    <ins className="adsbygoogle"
                        style={{display: 'block'}}
                        data-ad-client="ca-pub-6444523705828999"
                        data-ad-slot="6447010341"
                        data-ad-format="auto"
                        data-full-width-responsive="true" />
                    <Script id="adsense-init">
                        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                    </Script>
                </div>

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
