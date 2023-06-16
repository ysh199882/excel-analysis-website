// pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prompt = req.body.prompt;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!prompt) {
    return res.status(400).json({ error: 'No prompt in the request body' });
  }

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: 'OpenAI API key not found in environment variables' });
  }

  const response = await fetch(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 100,
      }),
    }
  );

  if (!response.ok) {
    return res.status(500).json({ error: 'Error calling OpenAI API' });
  }

  const data = await response.json();
  return res.status(200).json(data);
};
