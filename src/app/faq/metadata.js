export function generateMetadata() {
  return {
    title: "자주 묻는 질문 (FAQ) | AI Tarot",
    description: "타로 카드와 AI 타로 리딩에 관한 자주 묻는 질문들에 대한 답변을 확인하세요. 타로 카드의 기본, AI 타로의 작동 방식, 카드 의미, 타로 실천 방법 등에 대한 정보를 제공합니다.",
    keywords: "타로 FAQ, 타로 질문, AI 타로 리딩, 타로 카드 의미, 타로 실천, 무료 타로 리딩, 초보자 타로, 타로 해석, 타로 카드 종류, 운세 질문",
    alternates: {
      canonical: 'https://www.aifree-tarot.com/faq',
      languages: {
        'en-US': 'https://www.aifree-tarot.com/faq',
        'ko': 'https://www.aifree-tarot.com/ko/faq'
      },
    },
    openGraph: {
      title: "자주 묻는 질문 (FAQ) | AI Tarot",
      description: "타로 카드와 AI 타로 리딩에 관한 자주 묻는 질문들에 대한 답변을 확인하세요. 타로 카드의 기본, AI 타로의 작동 방식, 카드 의미, 타로 실천 방법 등에 대한 정보를 제공합니다.",
      url: 'https://www.aifree-tarot.com/faq',
      type: 'article',
      images: [
        {
          url: "/images/og/tarot-faq.jpg",
          width: 1200,
          height: 630,
          alt: "AI Tarot FAQ"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "자주 묻는 질문 (FAQ) | AI Tarot",
      description: "타로 카드와 AI 타로 리딩에 관한 자주 묻는 질문들을 카테고리별로 구분하여 확인해보세요. 초보자도 쉽게 이해할 수 있는 설명과 함께 제공됩니다.",
      images: ["/images/og/tarot-faq.jpg"]
    },
    other: {
      'structured-data': [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': '타로 카드란 무엇인가요?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': '타로 카드는 메이저 아르카나(22장)와 마이너 아르카나(56장)로 구성된 78장의 카드입니다. 각 카드는 인생의 여정, 사랑, 직업 및 개인적 성장에 관한 통찰력을 제공하는 상징적 이미지와 의미를 담고 있습니다.'
              }
            },
            {
              '@type': 'Question',
              'name': 'AI 타로 리딩은 어떻게 작동하나요?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'AI 타로 리딩은 고급 인공지능 알고리즘을 사용하여 전통적인 타로 카드의 의미와 해석을 분석합니다. 사용자가 질문을 입력하면 AI는 무작위로 선택된 카드에 대한 개인화된 해석을 생성하여 맞춤형 리딩 경험을 제공합니다.'
              }
            },
            {
              '@type': 'Question',
              'name': '타로 카드가 미래를 예측할 수 있나요?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': '타로 카드는 정확한 미래 예측보다는 현재의 에너지와 가능한 결과를 보여주는 도구입니다. 타로는 우리의 자유 의지와 선택이 미래를 형성한다는 것을 인정하면서, 현재 상황에서 다른 길을 선택했을 때 어떤 결과가 나올 수 있는지에 대한 통찰력을 제공합니다.'
              }
            }
          ],
          'publisher': {
            '@type': 'Organization',
            'name': 'AIFreeTarot',
            'url': 'https://www.aifree-tarot.com',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://www.aifree-tarot.com/images/logo1.svg'
            }
          }
        }
      ]
    }
  };
} 