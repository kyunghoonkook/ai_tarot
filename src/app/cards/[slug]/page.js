import React from 'react';
import Link from 'next/link';
import styles from './cardDetail.module.css';
import SocialShareButtons from '@/components/SocialShareButtons';
import OptimizedImage from '@/components/OptimizedImage';
import { notFound } from 'next/navigation';

// 타로 카드 데이터 (실제 구현에서는 데이터베이스나 API에서 가져와야 함)
const tarotCards = {
  'the-fool': {
    id: 0,
    name: '바보',
    nameEn: 'The Fool',
    image: '/images/cardBG.png',
    keywords: '시작, 모험, 순수함, 자유, 무한한 가능성',
    description: `바보 카드는 메이저 아르카나의 첫 번째 카드로, 새로운 시작과 무한한 가능성을 상징합니다. 
    이 카드는 미지의 세계로 뛰어드는 용기와 순수함을 나타내며, 때로는 무모함과 경솔함을 경고하기도 합니다. 
    바보는 아무런 두려움 없이 절벽 끝에 서 있지만, 그것이 위험인지 기회인지는 바보의 선택에 달려 있습니다.`,
    upright: {
      meaning: '새로운 시작, 모험, 순수함, 자유, 자발성, 무한한 가능성',
      description: `정방향 바보 카드는 새로운 모험의 시작과 두려움 없는 도약을 나타냅니다. 
      이것은 당신이 기존의 틀에서 벗어나 새로운 가능성을 향해 나아갈 때라는 것을 의미합니다. 
      순수한 마음과 개방적인 태도로 세상을 바라보면, 놀라운 기회가 당신을 기다리고 있을 것입니다. 
      때로는 계획 없이 직관을 따르는 것이 더 나은 결과를 가져올 수 있습니다.`
    },
    reversed: {
      meaning: '무모함, 위험 감수, 어리석음, 비현실적, 경솔함',
      description: `역방향 바보 카드는 위험한 무모함과 경솔한 결정에 대해 경고합니다. 
      중요한 결정을 내리기 전에 충분히 생각하지 않거나, 잠재적 위험을 무시하고 있을 수 있습니다. 
      자유와 모험을 추구하는 것은 좋지만, 현실적인 계획과 준비 없이는 어려움에 처할 수 있습니다. 
      지금은 한 걸음 물러서서 상황을 더 신중하게 평가해야 할 때일 수 있습니다.`
    },
    element: '공기',
    astrology: '천왕성',
    yes_no_meaning: '중립적이지만 대체로 긍정적',
    history: `바보 카드는 중세 시대의 법정 광대나 어릿광대에서 유래했다고 여겨집니다. 
    역사적으로 어릿광대는 위험한 진실을 유머로 포장하여 왕에게 전달할 수 있는 유일한 사람이었습니다. 
    바보 카드는 처음에는 번호가 없었으며, 때로는 0번, 때로는 22번으로 표시되었습니다. 
    이는 바보가 타로의 여정 시작과 끝 모두에 존재할 수 있음을 상징합니다.`,
    symbolism: {
      mountain: '앞에 놓인 도전과 모험',
      cliff: '알 수 없는 위험과 도약의 순간',
      dog: '충성과 본능, 때로는 경고의 상징',
      bag: '경험과 지식, 가능성의 집합',
      white_rose: '순수함과 무결함',
      sun: '밝은 미래와 긍정적 에너지'
    },
    related_cards: ['the-magician', 'the-star', 'the-sun', 'death']
  },
  'the-magician': {
    id: 1,
    name: '마법사',
    nameEn: 'The Magician',
    image: '/images/cardBG.png',
    keywords: '창조, 의지력, 기술, 집중, 행동, 자원 활용',
    description: `마법사는 메이저 아르카나의 두 번째 카드로, 창조적 에너지와 의지력을 상징합니다. 
    이 카드는 모든 요소와 도구를 자신의 뜻대로 다룰 수 있는 능력을 나타내며, 
    당신의 내면에 있는 힘과 재능을 활용하여 현실을 변화시킬 수 있는 잠재력을 보여줍니다.`,
    upright: {
      meaning: '창조, 의지력, 자원 활용, 기술, 잠재력 실현, 집중',
      description: `정방향 마법사 카드는 당신이 목표를 이루기 위한 모든 자원과 능력을 갖추고 있음을 의미합니다. 
      지금은 당신의 재능과 기술을 활용하여 생각을 행동으로 옮길 때입니다. 
      집중력과 의도를 가지고 행동한다면, 당신은 놀라운 결과를 창조할 수 있습니다. 
      명확한 비전과 의지력으로 당신의 꿈을 현실로 만들 수 있는 시기입니다.`
    },
    reversed: {
      meaning: '조작, 불완전한 계획, 미숙한 기술, 창의력 부족, 기회 상실',
      description: `역방향 마법사 카드는 당신의 잠재력이 충분히 활용되지 않고 있거나, 
      재능을 낭비하고 있을 수 있음을 나타냅니다. 때로는 조작이나 속임수에 의존하거나, 
      행동으로 옮기지 않고 생각에만 머무르는 경향이 있을 수 있습니다. 
      지금은 진정한 노력 없이 지름길을 찾으려 하기보다, 기술을 발전시키고 
      진실된 의도로 행동하는 것이 중요합니다.`
    },
    element: '불',
    astrology: '수성',
    yes_no_meaning: '강한 긍정',
    history: `마법사 카드는 초기 타로에서 '마술사' 또는 '골동품 상인'으로 묘사되었습니다. 
    15-16세기 타로에서는 테이블 위에서 속임수나 마술을 행하는 인물로 표현되었으며, 
    현대적 해석에서는 더 신비롭고 초자연적인 능력을 가진 존재로 진화했습니다. 
    라이더-웨이트 타로에서 마법사는 무한대 기호(∞)를 상징하는 모자를 쓰고, 
    네 가지 원소를 대표하는 도구들을 다루는 모습으로 묘사됩니다.`,
    symbolism: {
      infinity_symbol: '무한한 가능성과 영원한 지식',
      red_white_robes: '순수함과 열정의 조화',
      table: '물질 세계와 행동의 영역',
      wand: '의지와 창조적 에너지',
      cup: '감정과 직관',
      sword: '사고와 결정',
      pentacle: '물질과 현실화',
      raised_hand: '하늘에서 지상으로 에너지를 끌어내림'
    },
    related_cards: ['the-high-priestess', 'the-emperor', 'the-chariot', 'the-fool']
  },
  'the-high-priestess': {
    id: 2,
    name: '여사제',
    nameEn: 'The High Priestess',
    image: '/images/cardBG.png',
    keywords: '직관, 무의식, 신비, 내면의 지혜, 비밀, 잠재의식',
    description: `여사제는 메이저 아르카나의 세 번째 카드로, 직관과 무의식의 영역을 상징합니다. 
    이 카드는 표면 아래 감춰진 지식과 내면의 목소리를 대표하며, 명확한 이성보다는 
    직관적 지혜와 내적 통찰력의 중요성을 강조합니다.`,
    upright: {
      meaning: '직관, 무의식, 내면의 지혜, 신비함, 비밀, 내적 성찰',
      description: `정방향 여사제 카드는 내면의 목소리와 직관을 신뢰해야 할 때임을 나타냅니다. 
      지금은 조용히 앉아 내면의 지혜에 귀 기울이고, 깊은 내적 지식에 접근하기에 
      적합한 시기입니다. 표면적인 현실 너머를 바라보고, 감춰진 진실을 발견하세요. 
      명상과 자기 성찰을 통해 알 수 없었던 통찰력을 얻을 수 있습니다.`
    },
    reversed: {
      meaning: '억압된 직관, 표면적 지식, 비밀의 폭로, 혼란, 내면의 불일치',
      description: `역방향 여사제 카드는 당신이 직관을 무시하거나 내면의 목소리를 억압하고 
      있을 수 있음을 경고합니다. 지나치게 논리와 이성에만 의존하여 더 깊은 지혜를 
      놓치고 있을 수 있습니다. 또한, 중요한 정보가 당신에게서 숨겨져 있거나, 
      반대로 아직 준비되지 않은 비밀이 폭로될 수 있음을 암시합니다. 
      이제는 내면과 재연결하고 진정한 자아의 목소리를 듣는 것이 중요합니다.`
    },
    element: '물',
    astrology: '달',
    yes_no_meaning: '불확실, 더 많은 정보 필요',
    history: `여사제 카드는 초기 타로에서 '교황'(여성 교황)이라 불렸으며, 
    중세 전설 속 여성 교황 요한나에 관한 이야기에서 영감을 받았습니다. 
    시간이 지나면서 이 카드는 더 신비적이고 신성한 여성성을 대표하는 인물로 해석되었으며, 
    라이더-웨이트 타로에서는 이시스, 페르세포네, 헤카테와 같은 고대 여신들의 
    상징성이 결합되어 표현되었습니다.`,
    symbolism: {
      moon_crown: '직관과 달의 주기, 여성성',
      scroll: '감춰진 지식과 비밀',
      pillars: '야킨과 보아즈, 대극의 조화와 이원성',
      veil: '표면과 심층 사이의 장벽, 드러난 것과 감춰진 것',
      blue_robe: '깊은 지혜와 평온함',
      crescent_moon: '변화와 직관의 주기',
      pomegranates: '풍요로움, 페르세포네의 상징'
    },
    related_cards: ['the-moon', 'the-empress', 'the-hermit', 'the-magician']
  }
};

export function generateMetadata({ params }) {
  const card = tarotCards[params.slug];
  
  if (!card) {
    return {
      title: '카드를 찾을 수 없음',
      description: '요청하신 타로 카드를 찾을 수 없습니다.'
    };
  }
  
  return {
    title: `${card.name} (${card.nameEn}) | 타로 카드 의미와 해석`,
    description: `${card.name} (${card.nameEn}) 타로 카드의 의미, 정방향 및 역방향 해석, 상징성에 대한 완벽한 가이드. ${card.keywords}에 관한 통찰력을 얻으세요.`,
    keywords: `${card.nameEn}, ${card.name}, 타로 카드, 타로 의미, ${card.nameEn} 의미, ${card.name} 해석, 정방향 ${card.name}, 역방향 ${card.name}, 타로 상징, 타로 읽기`,
    openGraph: {
      title: `${card.name} (${card.nameEn}) | 타로 카드 의미와 해석`,
      description: card.description.substring(0, 160) + '...',
      images: [
        {
          url: card.image,
          width: 800,
          height: 1200,
          alt: `${card.name} 타로 카드`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${card.name} (${card.nameEn}) | 타로 카드 의미와 해석`,
      description: card.description.substring(0, 160) + '...',
      images: [card.image]
    }
  };
}

export default function TarotCardDetail({ params }) {
  const card = tarotCards[params.slug];
  
  if (!card) {
    notFound();
  }
  
  // 관련 카드 데이터 가져오기
  const relatedCards = card.related_cards
    .map(slug => tarotCards[slug])
    .filter(Boolean);
  
  // 구조화된 데이터 준비
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${card.name} (${card.nameEn}) | 타로 카드 의미와 해석`,
    "image": card.image,
    "author": {
      "@type": "Organization",
      "name": "AI Tarot Reading"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Tarot Reading",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aifree-tarot.com/images/logo1.svg"
      }
    },
    "datePublished": "2023-05-20T12:00:00+00:00",
    "dateModified": "2023-06-15T08:30:00+00:00",
    "description": card.description.substring(0, 160) + '...',
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.aifree-tarot.com/cards/${params.slug}`
    }
  };
  
  return (
    <div className={styles.cardDetailContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.breadcrumbs}>
          <Link href="/">홈</Link> &gt; <Link href="/major">메이저 아르카나</Link> &gt; <span>{card.name}</span>
        </div>
        <h1 className={styles.cardTitle}>
          {card.name} <span className={styles.cardTitleEn}>({card.nameEn})</span>
        </h1>
        <div className={styles.cardKeywords}>{card.keywords}</div>
      </div>
      
      <div className={styles.cardMainContent}>
        <div className={styles.cardImageContainer}>
          <img 
            src={card.image} 
            alt={`${card.name} 타로 카드`} 
            width="280"
            height="420"
            className={styles.cardImage}
            loading="eager"
          />
          <div className={styles.cardQuickInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>번호:</span>
              <span className={styles.infoValue}>{card.id}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>원소:</span>
              <span className={styles.infoValue}>{card.element}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>점성술:</span>
              <span className={styles.infoValue}>{card.astrology}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>예/아니오 의미:</span>
              <span className={styles.infoValue}>{card.yes_no_meaning}</span>
            </div>
          </div>
          
          <SocialShareButtons 
            title={`${card.name} (${card.nameEn}) | 타로 카드 의미와 해석`} 
            url={`https://www.aifree-tarot.com/cards/${params.slug}`}
            description={card.description.substring(0, 160) + '...'}
            image={card.image}
          />
        </div>
        
        <div className={styles.cardDescription}>
          <h2 className={styles.sectionTitle}>카드 설명</h2>
          <p>{card.description}</p>
          
          <div className={styles.meaningContainer}>
            <div className={styles.meaningSection}>
              <h3 className={styles.meaningTitle}>
                <span className={styles.uprightIcon}>⬆️</span> 정방향 의미
              </h3>
              <div className={styles.meaningKeywords}>{card.upright.meaning}</div>
              <p>{card.upright.description}</p>
            </div>
            
            <div className={styles.meaningSection}>
              <h3 className={styles.meaningTitle}>
                <span className={styles.reversedIcon}>⬇️</span> 역방향 의미
              </h3>
              <div className={styles.meaningKeywords}>{card.reversed.meaning}</div>
              <p>{card.reversed.description}</p>
            </div>
          </div>
          
          <div className={styles.historySection}>
            <h2 className={styles.sectionTitle}>역사적 배경</h2>
            <p>{card.history}</p>
          </div>
          
          <div className={styles.symbolismContainer}>
            <h2 className={styles.sectionTitle}>상징 해석</h2>
            {Object.entries(card.symbolism).map(([key, value]) => (
              <div key={key} className={styles.symbolItem}>
                <div className={styles.symbolName}>{key.replace('_', ' ')}</div>
                <p>{value}</p>
              </div>
            ))}
          </div>
          
          <div className={styles.readingExample}>
            <h2 className={styles.readingExampleTitle}>읽기 예시</h2>
            <p className={styles.readingQuestion}>
              <strong>질문:</strong> "현재 내 진로에 대해 어떤 통찰을 얻을 수 있을까요?"
            </p>
            <p>
              {card.name} 카드가 나타났다면, 
              {card.nameEn === 'The Fool' && '새로운 시작과 모험을 암시합니다. 지금은 기존의 틀에서 벗어나 새로운 길을 모색하기 좋은 시기입니다. 두려움 없이 도전하되, 너무 무모한 결정은 피하세요.'}
              {card.nameEn === 'The Magician' && '지금 당신은 필요한 모든 기술과 재능을 이미 가지고 있습니다. 자신의 능력을 믿고 집중하여 목표를 향해 나아가세요. 지금은 생각을 행동으로 옮길 적기입니다.'}
              {card.nameEn === 'The High Priestess' && '직관과 내면의 지혜를 따르는 것이 중요합니다. 논리만으로는 해결할 수 없는 상황에서 내면의 목소리에 귀 기울이세요. 숨겨진 인사이트가 진로 결정에 도움이 될 것입니다.'}
            </p>
          </div>
        </div>
      </div>
      
      {relatedCards.length > 0 && (
        <div className={styles.relatedCardsSection}>
          <h2 className={styles.relatedCardsTitle}>관련 타로 카드</h2>
          <div className={styles.relatedCardsGrid}>
            {relatedCards.map((relatedCard) => (
              <Link 
                href={`/cards/${card.related_cards.find(slug => tarotCards[slug]?.nameEn === relatedCard.nameEn)}`}
                key={relatedCard.nameEn}
                className={styles.relatedCard}
              >
                <img 
                  src={relatedCard.image} 
                  alt={`${relatedCard.name} 타로 카드`} 
                  className={styles.relatedCardImage}
                  width="150"
                  height="225"
                  loading="lazy"
                />
                <div className={styles.relatedCardName}>{relatedCard.name}</div>
                <div className={styles.relatedCardNameEn}>{relatedCard.nameEn}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 구조화된 데이터 추가 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        className={styles.schema}
      />
    </div>
  );
} 