// pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const messages = req.body.messages;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!messages) {
    return res.status(400).json({ error: 'No messages in the request body' });
  }

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: 'OpenAI API key not found in environment variables' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API response:', response);
      const openAIData = await response.json();
      console.error('OpenAI API data:', openAIData);
      return res
        .status(500)
        .json({ error: 'Error calling OpenAI API', openAIData });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    const err = error as Error;
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
