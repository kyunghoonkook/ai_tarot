export function generateMetadata() {
    return {
        title: 'Major Arcana Tarot Cards | Complete Guide with Meanings & Interpretations',
        description: 'Explore the 22 Major Arcana tarot cards with detailed descriptions, meanings, and interpretations. Learn about The Fool, The Magician, The High Priestess, and more in our comprehensive guide.',
        keywords: 'major arcana, tarot cards meaning, fool card, magician tarot, high priestess, tarot interpretations, death card meaning, the tower, the sun card, spiritual guidance, tarot symbolism, arcana meanings',
        alternates: {
            canonical: 'https://www.aifree-tarot.com/major',
            languages: {
                'en-US': 'https://www.aifree-tarot.com/major',
                'ko': 'https://www.aifree-tarot.com/ko/major'
            },
        },
        openGraph: {
            title: 'Major Arcana Tarot Cards | Complete Guide & Meanings',
            description: 'Discover the symbolism and meaning behind all 22 Major Arcana tarot cards. Perfect for beginners and experienced readers alike.',
            url: 'https://www.aifree-tarot.com/major',
            type: 'article',
            images: [
                {
                    url: 'https://www.aifree-tarot.com/images/major-arcana-cards.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Major Arcana Tarot Card Collection',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Major Arcana Tarot Cards - Complete Meanings Guide',
            description: 'Explore all 22 Major Arcana cards with detailed interpretations and symbolism.',
            images: ['https://www.aifree-tarot.com/images/twitter-major-arcana.jpg'],
        },
        other: {
            'structured-data': [
                {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    'headline': 'Major Arcana Tarot Cards - Complete Guide',
                    'image': [
                        'https://www.aifree-tarot.com/images/major-arcana-cards.jpg'
                    ],
                    'author': {
                        '@type': 'Organization',
                        'name': 'AIFreeTarot',
                        'url': 'https://www.aifree-tarot.com'
                    },
                    'publisher': {
                        '@type': 'Organization',
                        'name': 'AIFreeTarot',
                        'logo': {
                            '@type': 'ImageObject',
                            'url': 'https://www.aifree-tarot.com/images/logo1.svg'
                        }
                    },
                    'description': 'A comprehensive guide to all 22 Major Arcana tarot cards with meanings and interpretations.',
                    'mainEntityOfPage': 'https://www.aifree-tarot.com/major'
                }
            ]
        }
    };
} 