import Link from 'next/link';
import styles from './blogPost.module.css';
import { notFound } from 'next/navigation';

// 실제 구현에서는 데이터베이스나 CMS에서 블로그 포스트를 가져와야 합니다
// 이 예제에서는 하드코딩된 데이터를 사용합니다
const blogPosts = {
  'tarot-reading-beginners-guide': {
    title: 'The Complete Tarot Reading Guide for Beginners',
    date: 'June 15, 2023',
    author: 'Maya Wilson',
    authorImage: '/images/blog/authors/maya-wilson.jpg',
    featuredImage: '/images/blog/tarot-beginners-guide.jpg',
    content: `
      <p>Stepping into the world of tarot can feel both exciting and overwhelming. With 78 cards filled with rich symbolism and centuries of interpretive tradition, it's easy to feel lost when you're just starting out. This comprehensive guide will walk you through everything you need to know to begin your journey with tarot, from understanding the basic structure of a deck to conducting your first reading.</p>
      
      <h2>Understanding the Tarot Deck</h2>
      
      <p>A standard tarot deck consists of 78 cards divided into two main sections:</p>
      
      <ul>
        <li><strong>The Major Arcana:</strong> 22 cards representing significant life events, spiritual lessons, and archetypal forces. These cards (like The Fool, The Lovers, or Death) often indicate important life transitions or spiritual growth.</li>
        <li><strong>The Minor Arcana:</strong> 56 cards divided into four suits (Cups, Pentacles, Swords, and Wands), each containing cards numbered Ace through 10, plus four court cards (Page, Knight, Queen, and King). These cards typically represent everyday situations, challenges, and energies.</li>
      </ul>
      
      <p>Each card has its own unique imagery, symbolism, and traditional meanings that have evolved over centuries. However, it's important to remember that intuition plays a significant role in tarot reading—sometimes what you personally see in a card is just as important as its traditional meaning.</p>
      
      <h2>Choosing Your First Deck</h2>
      
      <p>There's an old tarot superstition that says your first deck should be gifted to you, but don't let this hold you back. The most important thing is finding a deck whose imagery speaks to you. Some popular beginner-friendly options include:</p>
      
      <ul>
        <li><strong>Rider-Waite-Smith:</strong> The most iconic and widely recognized deck, with clear symbolism that forms the basis for many modern decks.</li>
        <li><strong>The Modern Witch Tarot:</strong> A diverse, inclusive update of the Rider-Waite-Smith imagery with contemporary characters.</li>
        <li><strong>The Light Seer's Tarot:</strong> A beautiful deck with gentle, intuitive imagery that many beginners find approachable.</li>
      </ul>
      
      <p>Visit a metaphysical shop if possible, so you can see and feel the cards before purchasing. If buying online, look for decks with "card galleries" so you can view several images before deciding.</p>
      
      <h2>Connecting With Your Deck</h2>
      
      <p>Once you have your deck, take time to build a relationship with it:</p>
      
      <ol>
        <li><strong>The Deck Interview:</strong> Many readers begin by asking their deck questions about their working relationship, such as "What can you help me with?" or "What are your strengths as a deck?"</li>
        <li><strong>Daily Card Pulls:</strong> Drawing a single card each morning helps you learn the cards while gaining insight for your day.</li>
        <li><strong>Physical Connection:</strong> Shuffle your cards often, carry them with you, or sleep with them under your pillow—physical connection is believed to align the deck's energy with yours.</li>
      </ol>
      
      <h2>Basic Tarot Spreads for Beginners</h2>
      
      <p>Start with simple spreads before advancing to more complex ones:</p>
      
      <h3>One-Card Draw</h3>
      <p>Perfect for daily guidance or answering straightforward questions. Simply shuffle your deck while focusing on your question, and draw one card. This is an excellent way to build your understanding of individual cards.</p>
      
      <h3>Three-Card Spread</h3>
      <p>Versatile and powerful, this spread can represent:</p>
      <ul>
        <li>Past, Present, Future</li>
        <li>Mind, Body, Spirit</li>
        <li>Situation, Action, Outcome</li>
      </ul>
      <p>Choose an interpretation that fits your question, then read the cards in that context.</p>
      
      <h3>Celtic Cross</h3>
      <p>Once you're comfortable with smaller spreads, the 10-card Celtic Cross offers a comprehensive overview of a situation, covering influences, hopes, fears, and potential outcomes.</p>
      
      <h2>Tips for Meaningful Readings</h2>
      
      <ul>
        <li><strong>Set the mood:</strong> Create a calm, focused environment with minimal distractions. Some readers like to use candles, incense, or crystals to enhance the atmosphere.</li>
        <li><strong>Frame questions carefully:</strong> Avoid yes/no questions in favor of open-ended ones that invite deeper insights. Instead of "Will I get the job?" try "What do I need to know about this job opportunity?"</li>
        <li><strong>Trust your intuition:</strong> While learning traditional meanings is valuable, never ignore your intuitive reactions to a card's imagery. If something jumps out at you, it's significant.</li>
        <li><strong>Keep a journal:</strong> Record your readings, including the date, question, cards drawn, and your interpretations. This allows you to track your progress and notice patterns over time.</li>
      </ul>
      
      <h2>Common Beginner Challenges</h2>
      
      <p><strong>Feeling overwhelmed by card meanings:</strong> Focus on learning a few cards deeply rather than trying to memorize all 78 at once. The Major Arcana or the court cards are good starting points.</p>
      
      <p><strong>Encountering difficult cards:</strong> Cards like Death or The Tower can seem frightening, but remember that challenging cards often contain the most valuable lessons. Death typically represents transformation, not literal death, while The Tower can indicate necessary breakdowns that lead to breakthroughs.</p>
      
      <p><strong>Reading for yourself:</strong> It can be harder to maintain objectivity when reading for yourself. Try to approach personal readings with openness rather than looking for specific answers you want to hear.</p>
      
      <h2>Ethical Considerations</h2>
      
      <p>As you develop your skills, keep these ethical principles in mind:</p>
      
      <ul>
        <li>Respect others' free will and avoid making absolute predictions that could influence major life decisions</li>
        <li>Maintain confidentiality when reading for others</li>
        <li>Recognize the limitations of tarot—it's a tool for insight, not a replacement for professional medical, legal, or financial advice</li>
      </ul>
      
      <h2>Growing Your Practice</h2>
      
      <p>As you become more comfortable with tarot, explore these avenues for deepening your practice:</p>
      
      <ul>
        <li>Study the historical and cultural contexts of tarot</li>
        <li>Explore connections between tarot and other spiritual systems like astrology or numerology</li>
        <li>Join tarot communities online or in person to share experiences and interpretations</li>
        <li>Consider complementary practices like meditation or journaling to enhance your intuitive abilities</li>
      </ul>
      
      <p>Remember that becoming a skilled tarot reader is a journey, not a destination. The cards have been revealing their wisdom for centuries, and each reader develops a unique relationship with them over time. Be patient with yourself, maintain a sense of curiosity and wonder, and trust that the right messages will come through when you need them.</p>
      
      <p>Whether you're drawn to tarot for personal growth, spiritual connection, or helping others, these ancient cards offer a mirror to the soul and a window into possibilities that might otherwise remain hidden. Your journey has just begun—enjoy the magic of discovery that awaits you.</p>
    `,
    tags: ['Beginners', 'Guide', 'Tarot Basics'],
    relatedPosts: [
      'daily-tarot-practice-tips',
      '5-powerful-love-tarot-spreads',
      'tarot-career-guidance'
    ]
  },
  
  '5-powerful-love-tarot-spreads': {
    title: '5 Powerful Love Tarot Spreads for Relationship Insights',
    date: 'June 10, 2023',
    author: 'Emma Rodgers',
    authorImage: '/images/blog/authors/emma-rodgers.jpg',
    featuredImage: '/images/blog/love-tarot-spreads.jpg',
    content: `
      <p>When it comes to matters of the heart, tarot can offer profound clarity and insight. Whether you're single, starting a new relationship, or navigating challenges with a long-term partner, these five specialized love tarot spreads can help illuminate your romantic journey.</p>
      
      <h2>1. The Relationship Potential Spread</h2>
      
      <p>Perfect for new relationships or when you're curious about someone's romantic potential, this five-card spread reveals the energy, challenges, and possibilities of a connection.</p>
      
      <div class="spread-diagram">
        <div class="card-position">1</div>
        <div class="card-position">2</div>
        <div class="card-position">3</div>
        <div class="card-position">4</div>
        <div class="card-position">5</div>
      </div>
      
      <ol>
        <li><strong>Current energy between you:</strong> This card represents the present dynamic and overall vibration of your connection.</li>
        <li><strong>What brings you together:</strong> The foundations or attractions that created this bond.</li>
        <li><strong>Potential challenges:</strong> Possible obstacles or growth areas you may encounter together.</li>
        <li><strong>Greatest strength:</strong> The most powerful positive aspect of this relationship.</li>
        <li><strong>Potential outcome:</strong> The likely direction if the relationship continues on its current path.</li>
      </ol>
      
      <p>This spread helps you assess compatibility while acknowledging both the strengths and challenges of a potential relationship. Remember that the "outcome" card reflects current energies and is not set in stone—your choices and actions can always influence the future.</p>
      
      <h2>2. The Love Compass Spread</h2>
      
      <p>When you're feeling lost in your love life or unsure which direction to take, this four-card spread provides guidance by examining different aspects of your romantic situation.</p>
      
      <div class="spread-diagram compass">
        <div class="card-position north">1</div>
        <div class="card-position east">2</div>
        <div class="card-position south">3</div>
        <div class="card-position west">4</div>
      </div>
      
      <ol>
        <li><strong>North - Your higher purpose:</strong> What your soul is seeking to learn through your romantic experiences right now.</li>
        <li><strong>East - New beginnings:</strong> Opportunities for growth or fresh starts in your love life.</li>
        <li><strong>South - Foundations:</strong> Past experiences or patterns that are influencing your current romantic situation.</li>
        <li><strong>West - Release:</strong> What you need to let go of to move forward in love.</li>
      </ol>
      
      <p>This spread is especially helpful during times of transition or when you're feeling uncertain about your next steps. It balances practical guidance with spiritual insights, helping you align your love life with your higher purpose.</p>
      
      <h2>3. The Relationship Healing Spread</h2>
      
      <p>For those experiencing conflict or disconnection in a relationship, this spread focuses on understanding the issues and finding pathways to healing and reconciliation.</p>
      
      <div class="spread-diagram">
        <div class="card-position">1</div>
        <div class="card-position">2</div>
        <div class="card-position">3</div>
        <div class="card-position">4</div>
        <div class="card-position">5</div>
        <div class="card-position">6</div>
      </div>
      
      <ol>
        <li><strong>The core issue:</strong> What is truly at the heart of the current conflict or distance.</li>
        <li><strong>Your contribution:</strong> How you may be contributing to the problem.</li>
        <li><strong>Their contribution:</strong> How your partner may be contributing to the problem.</li>
        <li><strong>Unmet needs:</strong> What needs aren't being fulfilled in the relationship.</li>
        <li><strong>Healing action:</strong> A step you can take to begin the healing process.</li>
        <li><strong>Potential outcome:</strong> Where this relationship could go if healing occurs.</li>
      </ol>
      
      <p>This spread requires honesty and a willingness to look at both sides of a situation. It works best when approached with an open heart and a desire for mutual growth rather than assigning blame.</p>
      
      <h2>4. The Self-Love Spread</h2>
      
      <p>Sometimes the most important relationship we need to nurture is the one with ourselves. This spread helps you explore your relationship with yourself, which forms the foundation for all other connections.</p>
      
      <div class="spread-diagram heart">
        <div class="card-position">1</div>
        <div class="card-position">2</div>
        <div class="card-position">3</div>
        <div class="card-position">4</div>
        <div class="card-position">5</div>
      </div>
      
      <ol>
        <li><strong>How I see myself:</strong> Your current self-perception and relationship with yourself.</li>
        <li><strong>My strengths in love:</strong> What you bring to relationships that deserves recognition and appreciation.</li>
        <li><strong>My blind spots:</strong> Aspects of yourself you may not be fully acknowledging or honoring.</li>
        <li><strong>How I can nurture myself:</strong> Ways to deepen your self-love and self-care practices.</li>
        <li><strong>How self-love will transform my relationships:</strong> How developing greater self-love will affect your connections with others.</li>
      </ol>
      
      <p>This spread reminds us that all relationships reflect our relationship with ourselves. By nurturing self-love, we create the foundation for healthier, more fulfilling partnerships with others.</p>
      
      <h2>5. The Soul Connection Spread</h2>
      
      <p>For spiritually-minded individuals seeking to understand the deeper purpose of a significant relationship, this spread explores the soul-level connections and lessons involved.</p>
      
      <div class="spread-diagram">
        <div class="card-position">1</div>
        <div class="card-position">2</div>
        <div class="card-position">3</div>
        <div class="card-position">4</div>
        <div class="card-position">5</div>
        <div class="card-position">6</div>
        <div class="card-position">7</div>
      </div>
      
      <ol>
        <li><strong>The nature of your soul connection:</strong> The spiritual quality or type of connection you share.</li>
        <li><strong>Past life influences:</strong> Energies or patterns from past incarnations affecting this relationship.</li>
        <li><strong>What your soul is learning:</strong> The primary soul lesson you're working on through this connection.</li>
        <li><strong>What their soul is learning:</strong> What your partner's soul may be learning through this connection.</li>
        <li><strong>Shared purpose:</strong> The higher purpose or mission of your relationship.</li>
        <li><strong>Spiritual challenges:</strong> Soul-level obstacles that need to be overcome together.</li>
        <li><strong>Spiritual growth potential:</strong> The highest possibility for evolution through this relationship.</li>
      </ol>
      
      <p>This spread approaches love from a spiritual perspective, recognizing that significant relationships often serve as catalysts for soul growth and awakening. It can bring deeper meaning to challenging relationships and help you honor the spiritual dimensions of your connections.</p>
      
      <h2>Tips for Effective Love Readings</h2>
      
      <p>When performing any love-focused tarot reading, keep these guidelines in mind:</p>
      
      <ul>
        <li><strong>Center yourself before reading:</strong> Love readings can stir up strong emotions. Take a few moments to ground and center yourself before beginning.</li>
        <li><strong>Set clear intentions:</strong> Be specific about what you hope to learn from the reading. Clarity in your questions leads to clarity in your answers.</li>
        <li><strong>Stay open to unexpected insights:</strong> Sometimes the most valuable guidance comes from cards that initially seem unrelated to your question.</li>
        <li><strong>Focus on yourself:</strong> The most empowering love readings focus on your own feelings, choices, and growth rather than trying to control or predict another person's actions.</li>
        <li><strong>Remember free will:</strong> Tarot shows energies and possibilities, not fixed outcomes. Everyone has free will to make choices that can alter the course of relationships.</li>
      </ul>
      
      <p>Tarot can be a powerful tool for gaining clarity and insight into romantic situations, but ultimately, it's your discernment and choices that create your love story. Use these spreads as mirrors for reflection and tools for growth, always trusting your own inner wisdom above all.</p>
      
      <p>Whether you're seeking new love, deepening an existing connection, or healing from heartbreak, these spreads can illuminate your path forward, helping you create relationships that honor both your human desire for connection and your soul's journey toward wholeness.</p>
    `,
    tags: ['Love', 'Relationships', 'Tarot Spreads'],
    relatedPosts: [
      'tarot-reading-beginners-guide',
      'daily-tarot-practice-tips',
      'moon-phases-tarot-reading'
    ]
  },
  // 다른 게시물들도 위의 형식으로 추가할 수 있습니다
};

// Helper function to generate a short description from HTML content
function generateDescription(htmlContent, maxLength = 160) {
    if (!htmlContent) return '';
    // Remove HTML tags
    const textContent = htmlContent.replace(/<[^>]*>/g, ' ');
    // Remove extra whitespace and trim
    const cleanedText = textContent.replace(/\s+/g, ' ').trim();
    // Truncate and add ellipsis
    if (cleanedText.length <= maxLength) {
        return cleanedText;
    }
    return cleanedText.substring(0, maxLength - 3) + '...';
}

export function generateMetadata({ params }) {
    const post = blogPosts[params.slug];

    if (!post) {
        // 게시물이 없으면 기본 메타데이터 또는 404 처리 로직을 따름
        // 여기서는 간단히 기본값을 반환하거나 notFound()를 호출할 수 있습니다.
        // notFound()는 page 컴포넌트에서 호출해야 하므로 여기서는 기본값 반환
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const postUrl = `https://www.aifree-tarot.com/blog/${params.slug}`;
    const imageUrl = `https://www.aifree-tarot.com${post.featuredImage}`; // Assuming relative path starts with /
    const description = generateDescription(post.content); // Generate description from content

    // Article Schema JSON-LD
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl,
      },
      headline: post.title,
      description: description,
      image: {
          '@type': 'ImageObject',
          url: imageUrl,
          // Add width and height if known
      },
      author: {
        '@type': 'Person', // Or 'Organization' if appropriate
        name: post.author || 'AIFreeTarot', // Use post author or default
        // url: 'URL to author page if available'
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Tarot Reading', // Consistent publisher name
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.aifree-tarot.com/images/logo1.svg', // Path to your logo
        },
      },
      datePublished: post.date, // Assuming date is in ISO 8601 format or adaptable
      // dateModified: post.lastUpdatedDate, // Add if available
    };


    return {
        title: `${post.title} | AI Tarot Blog`,
        description: description, // Use generated description
        keywords: post.tags ? post.tags.join(', ') : 'tarot blog, ai tarot, spiritual guidance', // Use post tags or default keywords
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title: `${post.title} | AI Tarot Blog`,
            description: description,
            url: postUrl,
            type: 'article', // Set type to 'article' for blog posts
            publishedTime: post.date, // Add publish time
            // modifiedTime: post.lastUpdatedDate, // Add modify time if available
            authors: [post.author || 'AIFreeTarot'], // Add author
            section: 'Tarot Insights', // Optional: category
            tags: post.tags, // Optional: tags
            images: [
                {
                    url: imageUrl,
                    // Add width and height if known
                    alt: post.title,
                },
            ],
            siteName: 'AI Tarot Reading',
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} | AI Tarot Blog`,
            description: description,
            images: [imageUrl],
            // site: '@AIFreeTarot', // Assuming same as root layout
            // creator: '@AuthorTwitterHandle' // If available
        },
        // Include the Article schema JSON-LD script
        // Note: Next.js 13.3+ automatically handles JSON-LD scripts returned this way
        'script': {
          'application/ld+json': JSON.stringify(articleSchema),
        },
        // You might also want 'application/ld+json' outside the script key for older Next.js versions compatibility if needed
        // 'application/ld+json': JSON.stringify(articleSchema),

    };
}

export default function BlogPost({ params }) {
    const post = blogPosts[params.slug];

    if (!post) {
        notFound(); // Trigger 404 page if post doesn't exist
    }

    // Helper to safely render HTML content
    const renderHTML = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <article className={styles.blogPost}>
            {/* Featured Image */}
            {post.featuredImage && (
                <img
                    src={post.featuredImage}
                    alt={post.title}
                    className={styles.featuredImage}
                    width={800} // Provide appropriate dimensions
                    height={400}
                    loading="lazy" // Add lazy loading
                />
            )}

            {/* Post Header */}
            <header className={styles.postHeader}>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <div className={styles.postMeta}>
                    <span>By {post.author}</span> | <span>{post.date}</span>
                    {post.tags && post.tags.length > 0 && (
                        <span className={styles.tags}>
                            Tags: {post.tags.join(', ')}
                        </span>
                    )}
                </div>
            </header>

            {/* Post Content */}
            <div
                className={styles.postContent}
                dangerouslySetInnerHTML={renderHTML(post.content)}
            />

            {/* Related Posts (Optional) */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
                 <aside className={styles.relatedPosts}>
                    <h2>Related Posts</h2>
                    <ul>
                        {post.relatedPosts.map((slug) => {
                            const relatedPost = blogPosts[slug];
                            return relatedPost ? (
                                <li key={slug}>
                                    <Link href={`/blog/${slug}`}>{relatedPost.title}</Link>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </aside>
            )}

             {/* Navigation back to blog list */}
             <div className={styles.backLink}>
                <Link href="/blog">← Back to Blog</Link>
            </div>

        </article>
    );
} 