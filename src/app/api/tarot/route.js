import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateTarotReading(theme, card1, card2, card3) {
    let promptTemplate;
    switch (theme) {
        case 'love':
            promptTemplate = `Please perform a tarot reading about love. The customer has drawn the following cards from the Major Arcana:     Past: {${card1}}     Present: {${card2}}     Future: {${card3}}`;
            break;
        case 'money':
            promptTemplate = `Please perform a tarot reading about money. The customer has drawn the following cards from the Major Arcana:     Areas for improvement: {${card1}}     Strengths: {${card2}}     Steps towards a better direction: {${card3}}`;
            break;
        case 'health':
            promptTemplate = `Please perform a tarot reading about health. The customer has drawn the following cards from the Major Arcana:     Mind: {${card1}}     Body: {${card2}}     Soul: {${card3}}`;
            break;
        default:
            throw new Error('Invalid theme');
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an AI Tarot reader. Provide a tarot reading using the Major Arcana for the following question.',
                },
                {
                    role: 'user',
                    content: promptTemplate,
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating tarot reading:', error);
        throw error;
    }
}

export async function POST(request) {
    const { theme, card1, card2, card3 } = await request.json();
    try {
        const reading = await generateTarotReading(theme, card1, card2, card3);
        return new Response(JSON.stringify({ message: reading }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'An error occurred' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
