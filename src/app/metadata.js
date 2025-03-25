// Next.js 13+의 메타데이터 설정
export function generateMetadata({ params, searchParams }, parent) {
  return {
    metadataBase: new URL('https://www.aifree-tarot.com'),
    title: 'AI Tarot - Free Personalized Tarot Card Readings | Discover Your Future',
    description: 'Get accurate AI-powered tarot readings for love, career, health, and more. Free personalized insights and guidance available 24/7. Start your spiritual journey today!',
    keywords: 'free tarot reading, AI tarot, online tarot cards, love tarot, career guidance, fortune telling, daily tarot, accurate readings, spiritual guidance, tarot cards, divination, psychic',
    alternates: {
      canonical: 'https://www.aifree-tarot.com',
      languages: {
        'en-US': 'https://www.aifree-tarot.com',
        'ko': 'https://www.aifree-tarot.com/ko'
      },
    },
    authors: [{ name: 'AIFreeTarot', url: 'https://www.aifree-tarot.com' }],
    creator: 'AIFreeTarot',
    publisher: 'AIFreeTarot',
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'AI Tarot Reading',
      title: 'AI Tarot - Free Personalized Tarot Card Readings | Discover Your Future',
      description: 'Gain insights into your love, finances, and health with our accurate AI-powered tarot readings. Start your free reading now!',
      url: 'https://www.aifree-tarot.com/',
      images: [
        {
          url: 'https://www.aifree-tarot.com/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AI Tarot Reading Experience',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AIFreeTarot',
      creator: '@AIFreeTarot',
      title: 'Free AI Tarot Readings - Discover Your Future Today',
      description: 'Get personalized insights for love, career and more. Start your free reading now!',
      images: ['https://www.aifree-tarot.com/images/twitter-image.jpg'],
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      bing: 'your-bing-verification-code',
      other: {
        me: ['your-me-verification-code'],
      }
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
} 