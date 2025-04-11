import OpenAI from 'openai';

export const runtime = 'edge'; // Edge Runtime 사용

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateTarotReadingPrompt(theme, card1, card2, card3) {
    let promptTemplate;
    switch (theme) {
        case 'Love':
            promptTemplate = `Please perform a tarot reading about love. The customer has drawn the following cards from the Major Arcana:     Past: {${card1}}     Present: {${card2}}     Future: {${card3}}`;
            break;
        case 'Money':
            promptTemplate = `Please perform a tarot reading about money. The customer has drawn the following cards from the Major Arcana:     Areas for improvement: {${card1}}     Strengths: {${card2}}     Steps towards a better direction: {${card3}}`;
            break;
        case 'Health':
            promptTemplate = `Please perform a tarot reading about health. The customer has drawn the following cards from the Major Arcana:     Mind: {${card1}}     Body: {${card2}}     Soul: {${card3}}`;
            break;
        default:
            throw new Error('Invalid theme');
    }

    return {
        role: 'system',
        content: 'You are an AI Tarot reader. Provide a tarot reading using the Major Arcana for the following question.',
    }, {
        role: 'user',
        content: promptTemplate,
    };
}

function formatReadingResponse(reading) {
    // 빈 줄을 기준으로 문단 나누기
    const paragraphs = reading.split('\n\n');

    // 각 문단을 <p> 태그로 감싸기
    const formattedParagraphs = paragraphs.map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`);

    // 문단들을 하나의 문자열로 합치기
    const formattedReading = formattedParagraphs.join('');

    return formattedReading;
}

export async function POST(request) {
    const { theme, card1, card2, card3 } = await request.json();

    try {
        // 프롬프트 생성
        const systemMessage = {
            role: 'system',
            content: `You are an expert tarot reader with deep knowledge of tarot symbolism and interpretation. 
            Provide a detailed, insightful, and professional tarot reading based on the cards drawn.
            Your reading should be structured, thoughtful, and personally meaningful.
            Include specific insights for each card's position and how they relate to each other.
            Avoid generic, vague statements and focus on specific, actionable guidance.
            Format your response with proper paragraphs for readability.
            Remember to be supportive and empowering, avoiding overly negative interpretations.`
        };

        let promptTemplate;
        switch (theme) {
            case 'Love':
                promptTemplate = `Please perform a comprehensive tarot reading about love and relationships. 
                The querent has drawn these cards from the Major Arcana:
                
                Past: {${card1}}
                Present: {${card2}}
                Future: {${card3}}
                
                For each card:
                1. Describe the card's core meaning in the context of love
                2. Explain its significance in its specific position (past/present/future)
                3. Provide insights about relationships, emotions, and romantic connections
                
                Then provide a cohesive interpretation showing how all three cards connect and what story they tell about the querent's love life.
                Offer specific, actionable guidance for improving their romantic situation.`;
                break;
            case 'Money':
                promptTemplate = `Please perform a comprehensive tarot reading about financial matters and career. 
                The querent has drawn these cards from the Major Arcana:
                
                Areas for improvement: {${card1}}
                Strengths: {${card2}}
                Steps towards a better direction: {${card3}}
                
                For each card:
                1. Describe the card's core meaning in the context of finances and career
                2. Explain its significance in its specific position
                3. Provide insights about money management, career opportunities, and financial growth
                
                Then provide a cohesive interpretation showing how all three cards connect and what story they tell about the querent's financial situation.
                Offer specific, actionable guidance for improving their financial well-being.`;
                break;
            case 'Health':
                promptTemplate = `Please perform a comprehensive tarot reading about health and well-being. 
                The querent has drawn these cards from the Major Arcana:
                
                Mind: {${card1}}
                Body: {${card2}}
                Soul: {${card3}}
                
                For each card:
                1. Describe the card's core meaning in the context of health and wellness
                2. Explain its significance in its specific position (mind/body/soul)
                3. Provide insights about mental, physical, and spiritual well-being
                
                Then provide a cohesive interpretation showing how all three cards connect and what story they tell about the querent's holistic health.
                Offer specific, actionable guidance for improving their overall well-being.`;
                break;
            default:
                promptTemplate = `Please perform a comprehensive general tarot reading. 
                The querent has drawn these cards from the Major Arcana:
                
                Past influences: {${card1}}
                Present situation: {${card2}}
                Future possibilities: {${card3}}
                
                For each card:
                1. Describe the card's core meaning
                2. Explain its significance in its specific position
                3. Provide general life insights and wisdom
                
                Then provide a cohesive interpretation showing how all three cards connect and what story they tell about the querent's life journey.
                Offer specific, actionable guidance for their path forward.`;
        }

        const userMessage = {
            role: 'user',
            content: promptTemplate,
        };

        // 스트리밍 응답 설정
        const encoder = new TextEncoder();
        let reading = '';

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const response = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [systemMessage, userMessage],
                        temperature: 0.7,
                        max_tokens: 800,
                        top_p: 0.9,
                        frequency_penalty: 0.5,
                        presence_penalty: 0.3,
                        stream: true, // 스트리밍 모드 활성화
                    });

                    // 각 청크를 처리합니다
                    for await (const chunk of response) {
                        const content = chunk.choices[0]?.delta?.content || '';
                        if (content) {
                            reading += content;
                            
                            // 청크를 클라이언트에 전송합니다
                            const formatted = formatReadingResponse(reading);
                            controller.enqueue(encoder.encode(JSON.stringify({ message: formatted })));
                        }
                    }

                    // 응답이 모두 생성되면 완료 신호를 보냅니다
                    controller.enqueue(encoder.encode(JSON.stringify({ 
                        message: formatReadingResponse(reading)
                    })));

                    controller.close();
                } catch (error) {
                    console.error('Error in streaming response:', error);
                    controller.error(error);
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'application/json',
                'Transfer-Encoding': 'chunked',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (err) {
        console.error('Error in tarot route:', err);
        return new Response(JSON.stringify({ error: 'An error occurred during the reading' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
