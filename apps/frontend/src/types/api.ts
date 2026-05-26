export type ApiResult = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
  summary?: string;
};
