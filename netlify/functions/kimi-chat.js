const OpenAI = require('openai');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const apiKey = process.env.KIMI_API_KEY || process.env.VITE_KIMI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'AI API Key is missing in Netlify Environment Variables.' })
    };
  }

  try {
    const { teacherName, subject, prompt, systemPrompt } = JSON.parse(event.body || '{}');

    // Try Moonshot AI / Kimi base URL first
    let client = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.moonshot.cn/v1',
    });

    let modelName = 'moonshot-v1-8k';
    let sysRole = systemPrompt || `You are an elite Structural & Civil Engineering AI Agent. Extract exact structural parameters, column grids, concrete/steel material grades, ETABS/STAAD scripts, and FEA calculations. Keep explanations clear and code-compliant.`;

    try {
      const completion = await client.chat.completions.create({
        model: modelName,
        messages: [
          { role: 'system', content: sysRole },
          { role: 'user', content: prompt || 'Analyze structural specifications for building' }
        ],
        temperature: 0.3,
      });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: completion.choices[0].message.content })
      };
    } catch (moonshotError) {
      console.warn('Moonshot Base URL failed, trying standard OpenAI endpoint...', moonshotError.message);
      
      // Fallback to standard OpenAI API endpoint
      const openAiClient = new OpenAI({ apiKey: apiKey });
      const completion = await openAiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: sysRole },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: completion.choices[0].message.content })
      };
    }
  } catch (error) {
    console.error('AI API Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch AI response: ' + error.message })
    };
  }
};