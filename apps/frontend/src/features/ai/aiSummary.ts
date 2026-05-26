import { postJson } from '../../api/http';
import { profile } from '../../data/profile';
import type { ApiResult } from '../../types/api';

const setResult = (element: HTMLElement, state: string, text: string) => {
  element.dataset.state = state;
  element.textContent = text;
};

export const initAiSummary = () => {
  const button = document.querySelector<HTMLButtonElement>('#ai-generate');
  const result = document.querySelector<HTMLElement>('#ai-result');

  if (!button || !result) return;

  button.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = 'Готовим...';
    setResult(result, 'loading', 'Сервер готовит короткое описание...');

    try {
      const response = await postJson<ApiResult>('/api/ai-summary', { body: { profile } });

      if (!response.summary) {
        throw new Error('Описание сейчас недоступно.');
      }

      setResult(result, 'success', response.summary);
    } catch (error) {
      setResult(result, 'error', error instanceof Error ? error.message : 'Не удалось получить описание.');
    } finally {
      button.disabled = false;
      button.textContent = 'Получить описание';
    }
  });
};
