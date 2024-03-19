"use client";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [theme, setTheme] = useState("");
  const [card1, setCard1] = useState("");
  const [card2, setCard2] = useState("");
  const [card3, setCard3] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/tarot", {
        theme,
        card1,
        card2,
        card3,
      });
      setResponse(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
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
          <input
            type="text"
            value={card1}
            onChange={(e) => setCard1(e.target.value)}
          />
        </label>
        <br />
        <label>
          카드 2:
          <input
            type="text"
            value={card2}
            onChange={(e) => setCard2(e.target.value)}
          />
        </label>
        <br />
        <label>
          카드 3:
          <input
            type="text"
            value={card3}
            onChange={(e) => setCard3(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">타로 보기</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default App;
