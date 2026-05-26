import type { ApiResult } from '../types/api';

type RequestOptions = {
  body?: unknown;
};

export const postJson = async <T extends ApiResult>(url: string, options: RequestOptions = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options.body ?? {}),
  });

  const result = (await response.json()) as T;

  if (!response.ok || !result.ok) {
    throw Object.assign(new Error(result.message || 'Ошибка запроса.'), { result });
  }

  return result;
};
