import Link from 'next/link';
import Script from 'next/script';
import KakaoScript from '@/components/KakaoScript';
import AdSense from '@/components/AdSense';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
    metadataBase: new URL('https://www.aifree-tarot.com'),
    title: 'AI Tarot - Unlock the Secrets of Your Future with AI-Powered Readings',
    description:
        'Discover the power of AI-generated tarot readings. Get personalized insights and guidance for love, career, health, and more. Our cutting-edge AI Tarot app offers accurate and insightful readings 24/7.',
    alternates: {
        canonical: 'https://www.aifree-tarot.com',
        languages: {
            'en-US': 'https://www.aifree-tarot.com',
            'ko': 'https://www.aifree-tarot.com/ko'
        },
    },
    keywords:
        'AI tarot, free tarot reading, tarot cards, fortune telling, divination, spiritual guidance, personal growth, self-discovery, love tarot, career tarot, health tarot, tarot predictions, tarot insights, online tarot',
    authors: [{ name: 'AIFreeTarot', url: 'https://www.aifree-tarot.com' }],
    creator: 'AIFreeTarot',
    publisher: 'AIFreeTarot',
    applicationName: 'AI Tarot',
    generator: 'Next.js',
    category: 'Entertainment, Divination, Lifestyle',
    formatDetection: {
        telephone: false,
        email: false,
        address: false,
    },
    referrer: 'origin-when-cross-origin',
    colorScheme: 'dark',
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#121212' },
        { media: '(prefers-color-scheme: light)', color: '#ffffff' }
    ],
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/apple-touch-icon-precomposed.png',
        },
    },
    manifest: '/manifest.json',
    openGraph: {
        title: 'AI Tarot - Unlock the Secrets of Your Future with AI-Powered Readings',
        description:
            'Get personalized tarot insights for your future. Discover guidance for love, career, finances, health, and other important life questions through our free AI tarot reading service.',
        url: 'https://www.aifree-tarot.com/',
        siteName: 'AI Tarot Reading',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: 'https://www.aifree-tarot.com/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AI Tarot - Free Tarot Card Readings',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@AIFreeTarot',
        creator: '@AIFreeTarot',
        title: 'AI Tarot - Unlock the Secrets of Your Future with AI-Powered Readings',
        description:
            'Get personalized tarot insights for your future. Discover guidance for love, career, finances, health, and other important life questions through our free AI tarot reading service.',
        images: ['https://www.aifree-tarot.com/images/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        noimageindex: false,
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
        naver: 'your-naver-verification-code',
        me: 'your-me-verification-code',
    },
    itunes: {
        appId: 'myAppStoreID',
    },
    appLinks: {
        ios: {
            url: 'https://www.aifree-tarot.com/ios-app',
            app_store_id: 'app-store-id',
        },
        android: {
            package: 'com.example.android.app',
            app_name: 'AI Tarot',
        },
        web: {
            url: 'https://www.aifree-tarot.com/web-app',
            should_fallback: true,
        },
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#121212',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <Script id="structured-data" type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "AI Tarot - Free Tarot Card Readings",
                        "url": "https://www.aifree-tarot.com",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://www.aifree-tarot.com/search?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        },
                        "description": "Discover the power of AI-generated tarot readings. Get personalized insights and guidance for love, career, health, and more. Our cutting-edge AI Tarot app offers accurate and insightful readings 24/7.",
                        "sameAs": [
                            "https://www.facebook.com/AIFreeTarot",
                            "https://www.instagram.com/AIFreeTarot",
                            "https://twitter.com/AIFreeTarot"
                        ]
                    }
                    `}
                </Script>
            </head>
            <body>
                <AdSense />

                <header className="header">
                    <Link href="/">
                        <img src="/images/logo1.svg" className="logo" alt="AI Tarot Logo" />
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
