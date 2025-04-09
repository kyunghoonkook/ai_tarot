import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import KakaoScript from '@/components/KakaoScript';
import AdSense from '@/components/AdSense';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import MobileStyleFixer from '@/components/MobileStyleFixer';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { headers } from 'next/headers';

// 개발 환경에서 Analytics 비활성화 처리를 위한 컴포넌트
function SafeAnalytics() {
  // 클라이언트 사이드에서만 실행
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return null; // 개발 환경에서는 비활성화
  }
  
  // 프로덕션 환경에서만 활성화
  return <Analytics />
}

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
        icon: [
            { url: '/images/logo1.svg' },
            { url: '/favicon.ico' }
        ],
        shortcut: '/images/logo1.svg',
        apple: '/images/logo1.svg',
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
    // const isHomePage = true; // 기존 코드 주석 처리 또는 삭제
    const isDevelopment = process.env.NODE_ENV === 'development';

    // headers 함수를 사용하여 현재 경로 확인
    const headersList = headers();
    // x-pathname 대신 next-url 사용 시도 (더 안정적일 수 있음)
    const pathnameHeader = headersList.get('next-url');
    let pathname = '';
    if (pathnameHeader) {
      try {
        const url = new URL(pathnameHeader);
        pathname = url.pathname;
      } catch (e) {
        console.error("Error parsing next-url header:", e);
        // fallback 또는 다른 헤더 시도 (예: x-invoke-path)
        pathname = headersList.get('x-invoke-path') || '';
      }
    }
    
    // 루트 경로('/') 또는 기본 테마 경로('/major')인지 확인하여 isHomePage 설정
    // 프로젝트 구조에 따라 /major 가 홈 경로일 수 있으므로 추가
    const isHomePageActual = pathname === '/' || pathname === '/major';

    return (
        <html lang="en">
            <head>
                {/* 개발 환경에서는 CSP 완화 */}
                {isDevelopment ? (
                    <meta httpEquiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';" />
                ) : (
                    <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel-scripts.com https://developers.kakao.com https://*.kakaocdn.net https://pagead2.googlesyndication.com https://adservice.google.com https://*.doubleclick.net https://www.googletagservices.com https://*.googleadservices.com https://tpc.googlesyndication.com https://*.google-analytics.com https://*.analytics.google.com https://*.googleapis.com https://*.doubleclick.net https://*.g.doubleclick.net https://www.google.com https://www.googletagmanager.com https://*.adtrafficquality.google; frame-src 'self' https://googleads.g.doubleclick.net https://*.googlesyndication.com https://*.doubleclick.net https://www.google.com https://tpc.googlesyndication.com https://*.adtrafficquality.google https://ep2.adtrafficquality.google; img-src 'self' data: blob: https://*; connect-src 'self' https://*; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;" />
                )}
                
                {/* 모바일 디바이스에서 초기 로딩 시 적용될 인라인 스타일 */}
                {/* <style dangerouslySetInnerHTML={{ __html: `
                    @media only screen and (max-width: 767px) {
                        body {
                            background: linear-gradient(to bottom, #042831, #253438, #122d34) !important;
                            min-height: 100vh !important;
                            color: #fff !important;
                        }
                        .header {
                            background: rgba(4, 40, 49, 0.8) !important;
                        }
                        .footer {
                            background: rgba(4, 40, 49, 0.8) !important;
                        }
                    }
                `}} />
                 */}
                <Script id="structured-data" type="application/ld+json">
                    {`
                    [
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
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "How does AI Tarot reading work?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Our AI Tarot reading uses advanced artificial intelligence to interpret tarot cards in the context of your question. The AI analyzes the traditional meanings of each card, their positions, and relationships to provide personalized insights."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Are AI Tarot readings accurate?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "AI Tarot readings provide insights based on the symbolic meanings of tarot cards. The accuracy depends on how you interpret and apply these insights to your situation. Many users find the readings surprisingly relevant and helpful for self-reflection."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Is the AI Tarot reading service completely free?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Yes, our basic AI Tarot reading service is completely free. We offer various reading types including daily, love, career, and general readings at no cost. Premium features may be available for enhanced readings."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How often should I get a tarot reading?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "This depends on your personal preference. Some people enjoy daily readings for guidance, while others prefer weekly or monthly readings for bigger life questions. We recommend not asking the same question repeatedly in a short timeframe."
                                    }
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "ItemList",
                            "name": "Major Arcana Tarot Cards",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "item": {
                                        "@type": "Thing",
                                        "name": "The Fool",
                                        "description": "The Fool represents new beginnings, innocence, and spontaneity. It suggests taking a leap of faith and embarking on a new journey.",
                                        "url": "https://www.aifree-tarot.com/cards/the-fool"
                                    }
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "item": {
                                        "@type": "Thing",
                                        "name": "The Magician",
                                        "description": "The Magician symbolizes manifestation, power, and action. It indicates having the tools, resources, and energy to make your dreams a reality.",
                                        "url": "https://www.aifree-tarot.com/cards/the-magician"
                                    }
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "item": {
                                        "@type": "Thing",
                                        "name": "The High Priestess",
                                        "description": "The High Priestess represents intuition, sacred knowledge, and the subconscious mind. She encourages you to listen to your inner voice and trust your instincts.",
                                        "url": "https://www.aifree-tarot.com/cards/the-high-priestess"
                                    }
                                }
                            ]
                        }
                    ]
                    `}
                </Script>
                <link rel="icon" href="/images/logo1.svg" />
                <link rel="shortcut icon" href="/images/logo1.svg" />
                <link rel="apple-touch-icon" href="/images/logo1.svg" />
            </head>
            <body className={isHomePageActual ? 'home-page' : ''}>
                <AuthProvider>
                    <div className="app-container">
                        <Header />
                        <main className="main-content">
                            {children}
                        </main>
                        <footer className="footer">
                            {/* <div className="footer-content">
                                <div className="footer-section">
                                    <h3>AI Tarot</h3>
                                    <p>AI-powered Tarot Card Reading Service</p>
                                </div>
                                <div className="footer-section">
                                    <h3>Quick Links</h3>
                                    <ul>
                                        <li><Link href="/major">Major Tarot</Link></li>
                                        <li><Link href="/love">Love Tarot</Link></li>
                                        <li><Link href="/career">Career Tarot</Link></li>
                                        <li><Link href="/guide">Tarot Guide</Link></li>
                                    </ul>
                                </div>
                                <div className="footer-section">
                                    <h3>Information</h3>
                                    <ul>
                                        <li><Link href="/about">About Us</Link></li>
                                        <li><Link href="/terms">Terms of Service</Link></li>
                                        <li><Link href="/privacy">Privacy Policy</Link></li>
                                        <li><Link href="/contact">Contact Us</Link></li>
                                    </ul>
                                </div>
                                <div className="footer-section">
                                    <h3>Follow Us</h3>
                                    <div className="social-links">
                                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                                    </div>
                                </div>
                            </div> */}
                            <div className="copyright">
                                &copy; {new Date().getFullYear()} AI Tarot. All rights reserved.
                            </div>
                        </footer>
                    </div>
                    
                    <KakaoScript />
                    <AdSense />
                    <PerformanceOptimizer />
                    <MobileStyleFixer />
                    <SafeAnalytics />
                </AuthProvider>
            </body>
        </html>
    );
}
