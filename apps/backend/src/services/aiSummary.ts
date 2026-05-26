import OpenAI from 'openai';
import { env } from '../config/env.js';

export const createFallbackSummary = () =>
  'Руслан делает frontend-страницы и подключает их к серверу. В этом проекте есть адаптивная верстка, рабочая форма, проверка данных, отправка писем и пример использования ИИ.';

const prompt =
  'Напиши 2 коротких предложения по-русски, спокойно и без рекламных фраз. ' +
  'Руслан: frontend-разработчик. Стек: TypeScript, HTML, SCSS, Vite, Node.js, Express. ' +
  'В проекте сделал страницу, форму, серверную проверку, отправку писем и пример с AI API.';

const createGeminiSummary = async () => {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent`;
  const response = await fetch(`${endpoint}?key=${env.geminiApiKey}`, {
    method: 'POST',
    signal: AbortSignal.timeout(15_000),
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 140,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini failed: ${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || createFallbackSummary();
};

const createOpenAiSummary = async () => {
  const client = new OpenAI({ apiKey: env.openAiApiKey });
  const completion = await client.chat.completions.create({
    model: env.openAiModel,
    temperature: 0.35,
    max_tokens: 140,
    messages: [
      { role: 'system', content: 'Ответь по-русски, спокойно, 2 коротких предложения.' },
      { role: 'user', content: prompt },
    ],
  });

  return completion.choices[0]?.message.content?.trim() || createFallbackSummary();
};

export const createAiSummary = async () => {
  try {
    if (env.geminiApiKey) {
      return await createGeminiSummary();
    }

    if (env.openAiApiKey) {
      return await createOpenAiSummary();
    }

    return createFallbackSummary();
  } catch (error) {
    console.error('AI description failed:', error);
    return createFallbackSummary();
  }
};
