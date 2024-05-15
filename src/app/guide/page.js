import styles from '../../styles/GuidePage.module.css';
export default function Guide() {
    return (
        <div className={styles['layout']}>
            <h2 className={styles['title']}>What is Tarot?</h2>
            <p>
                Tarot is a deck of 78 cards, each with its own unique symbolism and meaning. It is divided into two main
                sections: the Major Arcana and the Minor Arcana. Tarot is used for self-reflection, personal growth, and
                gaining insights into various aspects of life.
            </p>

            <h2 className={styles['title']}>The Major Arcana</h2>
            <p>
                The Major Arcana consists of 22 cards, numbered from 0 to 21. These cards represent significant life
                events, lessons, and archetypal energies. Some of the most well-known Major Arcana cards include The
                Fool, The Lovers, The Wheel of Fortune, and The World.
            </p>

            <h2 className={styles['title']}>The Minor Arcana</h2>
            <p>
                The Minor Arcana is made up of 56 cards, divided into four suits: Wands, Cups, Swords, and Pentacles.
                Each suit represents a different area of life:
            </p>
            <ul className={styles['listWrap']}>
                <li>Wands: Creativity, passion, and action</li>
                <li>Cups: Emotions, relationships, and intuition</li>
                <li>Swords: Thoughts, challenges, and truth</li>
                <li>Pentacles: Material world, finances, and practicality</li>
            </ul>

            <h2 className={styles['title']}>Reading Tarot Cards</h2>
            <p>
                When reading Tarot cards, it's essential to consider both the individual meaning of each card and how
                they interact with one another in a spread. A spread is a specific layout of cards, each position
                representing a different aspect of the question or situation being addressed.
            </p>

            <h3 className={styles['title']}>A Simple Three-Card Spread</h3>
            <p>One of the easiest spreads for beginners is the three-card spread. Here's how to do it:</p>
            <ol className={styles['listWrap']}>
                <li>Shuffle the deck while focusing on your question or intention.</li>
                <li>Draw three cards and lay them out in front of you, from left to right.</li>
                <li>
                    The first card represents the past, the second represents the present, and the third represents the
                    future or the outcome.
                </li>
                <li>
                    Interpret each card individually and then look at how they relate to one another to gain a
                    comprehensive understanding of the situation.
                </li>
            </ol>

            <h2 className={styles['title']}>Developing Your Intuition</h2>
            <p>
                Tarot reading is not just about memorizing card meanings; it's also about developing your intuition.
                Trust your instincts and the impressions you receive when looking at the cards. With practice, you'll
                create a deep, personal connection with your deck.
            </p>

            <h2 className={styles['title']}>Tarot Ethics</h2>
            <p>
                Always remember that Tarot is a tool for guidance and self-reflection, not a way to predict the future
                or make decisions for others. Use Tarot responsibly and ethically, focusing on empowering yourself and
                others to make informed choices.
            </p>

            <p>
                As you continue to explore the world of Tarot, remember to approach it with an open mind, curiosity, and
                respect. Happy reading!
            </p>
        </div>
    );
}
