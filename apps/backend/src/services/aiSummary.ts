import OpenAI from 'openai';
import { env } from '../config/env.js';

export const createFallbackSummary = () =>
  'Руслан делает frontend-страницы и подключает их к серверу. В этом проекте есть адаптивная верстка, рабочая форма, проверка данных, отправка писем и пример использования ИИ.';

export const createAiSummary = async () => {
  if (!env.openAiApiKey) {
    return createFallbackSummary();
  }

  try {
    const client = new OpenAI({ apiKey: env.openAiApiKey });
    const completion = await client.chat.completions.create({
      model: env.openAiModel,
      temperature: 0.35,
      max_tokens: 140,
      messages: [
        {
          role: 'system',
          content:
            'Напиши короткое описание разработчика для рекрутера. По-русски, спокойно, без рекламных фраз и канцелярита.',
        },
        {
          role: 'user',
          content:
            'Руслан: frontend-разработчик. Стек: TypeScript, HTML, SCSS, Vite, Node.js, Express. В проекте сделал страницу, форму, серверную проверку, отправку писем и пример с OpenAI API.',
        },
      ],
    });

    return completion.choices[0]?.message.content?.trim() || createFallbackSummary();
  } catch (error) {
    console.error('AI description failed:', error);
    return createFallbackSummary();
  }
};
