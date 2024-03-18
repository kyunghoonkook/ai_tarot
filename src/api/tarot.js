// pages/api/chat.js
import OpenAI from "openai";
import cors from "cors";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const corsMiddleware = cors(); // CORS 미들웨어 생성
console.log(process.env.OPENAI_API_KEY);
export default async function handler(req, res) {
  // CORS 설정 처리
  corsMiddleware(req, res, async () => {
    if (req.method === "POST") {
      const { message } = req.body;

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-0125",
          messages: [
            {
              role: "system",
              content: "You are a successful developer.",
            },
            { role: "user", content: message },
          ],
        });

        res.status(200).json({
          message: response.choices[0].message.content,
        });
        console.log(response.choices[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" }); // 에러 메시지도 포함
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
