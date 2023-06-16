import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream';

// if (process.env.NEXT_PUBLIC_USE_USER_KEY !== 'true') {
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error('Missing env var from OpenAI');
//   }
// }

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    console.log('req.method ', req.method);
    return new Response('ok', { headers: corsHeaders });
  }

  var { prompt, api_key } = (await req.json()) as {
    prompt?: string;
    api_key?: string;
  };

  var p = '请帮我分析账单支出，并给出消费建议:';
  prompt = p + prompt;
  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  // if (!process.env.OPENAI_MODEL) {
  //   throw new Error("Missing env var from OpenAI")
  // }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
    api_key,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
