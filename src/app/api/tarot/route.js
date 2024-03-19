import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTarotReading(theme, card1, card2, card3) {
  let promptTemplate;

  switch (theme) {
    case "사랑":
      promptTemplate = `사랑에 관한 타로를 봐주세요. 고객이 뽑은 카드는 다음과 같습니다. 과거: {${card1}} 현재: {${card2}} 미래: {${card3}} 입니다.`;
      break;
    case "돈":
      promptTemplate = `돈에 관한 타로를 봐주세요. 고객이 뽑은 카드는 다음과 같습니다. 잘못하고 있는 점: {${card1}} 잘하고 있는 점: {${card2}} 더 나은 방향으로 해야 하는 점: {${card3}} 입니다.`;
      break;
    case "건강":
      promptTemplate = `건강에 관한 타로를 봐주세요. 고객이 뽑은 카드는 다음과 같습니다. 정신: {${card1}} 신체: {${card2}} 영혼: {${card3}} 입니다.`;
      break;
    default:
      throw new Error("Invalid theme");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "You are an AI Tarot reader. Provide a tarot reading for the following question.",
        },
        { role: "user", content: promptTemplate },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating tarot reading:", error);
    throw error;
  }
}

export async function POST(request) {
  const { theme, card1, card2, card3 } = await request.json();

  try {
    const reading = await generateTarotReading(theme, card1, card2, card3);

    return new Response(JSON.stringify({ message: reading }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
