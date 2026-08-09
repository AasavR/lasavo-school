const OpenAI = require('openai');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

if (!process.env.KIMI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'KIMI_API_KEY is missing in Netlify Environment Variables.' })
    };
  }

  try {
    const { teacherName, subject, prompt } = JSON.parse(event.body || '{}');

    const client = new OpenAI({
      apiKey: process.env.KIMI_API_KEY,
      baseURL: 'https://api.moonshot.ai/v1',
    });

    const completion = await client.chat.completions.create({
      model: 'kimi-k3',
      messages: [
        {
          role: 'system',
          content: `You are ${teacherName}, an elite Indian AI professor teaching ${subject} at School.lasavo.org. Keep explanations clear, engaging, educational, and under 4 sentences.`
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.6,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: completion.choices[0].message.content })
    };
  } catch (error) {
    console.error('Kimi API Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch Kimi response' })
    };
  }
};