const Result = () => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    테마:
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="">선택하세요</option>
                        <option value="사랑">사랑</option>
                        <option value="돈">돈</option>
                        <option value="건강">건강</option>
                    </select>
                </label>
                <br />
                <label>
                    카드 1:
                    <input type="text" value={card1} onChange={(e) => setCard1(e.target.value)} />
                </label>
                <br />
                <label>
                    카드 2:
                    <input type="text" value={card2} onChange={(e) => setCard2(e.target.value)} />
                </label>
                <br />
                <label>
                    카드 3:
                    <input type="text" value={card3} onChange={(e) => setCard3(e.target.value)} />
                </label>
                <br />
                <button type="submit">타로 보기</button>
            </form>
            <p>{response}</p>
        </>
    );
};

export default Result;
