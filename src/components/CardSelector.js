export default function CardSelector({ theme, design }) {
    const cards = Array.from({ length: 22 }, (_, i) => i + 1);

    return (
        <div>
            <h2>Select a card:</h2>
            <div className="card-grid">
                {cards.map((card) => (
                    <div key={card} className="card">
                        <img src={`/images/${theme}/${design}/${card}.jpg`} alt={`Card ${card}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
