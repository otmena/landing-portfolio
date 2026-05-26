import { postJson } from '../../api/http';
import type { ApiResult } from '../../types/api';
import { contactMessages, readContactValues, validateContactValues } from './validation';

type FieldErrors = Partial<Record<keyof typeof contactMessages, string>>;

const getResult = (error: unknown) =>
  typeof error === 'object' && error !== null && 'result' in error ? (error as { result?: ApiResult }).result : undefined;

const setFieldError = (form: HTMLFormElement, name: string, message = '') => {
  const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;

  if (error) error.textContent = message;
  if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');
};

const renderErrors = (form: HTMLFormElement, errors: FieldErrors) => {
  Object.keys(contactMessages).forEach((name) => setFieldError(form, name, errors[name as keyof FieldErrors] ?? ''));
};

const setStatus = (status: HTMLElement, state: string, text: string) => {
  status.dataset.state = state;
  status.textContent = text;
};

export const initContactForm = () => {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  const status = document.querySelector<HTMLElement>('#form-status');
  const button = document.querySelector<HTMLButtonElement>('.contact-form__submit');

  if (!form || !status || !button) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const values = readContactValues(form);
    const errors = validateContactValues(values);
    renderErrors(form, errors);

    if (Object.keys(errors).length > 0) {
      setStatus(status, 'error', 'Проверьте поля формы.');
      return;
    }

    button.disabled = true;
    button.textContent = 'Отправляем...';
    setStatus(status, 'loading', 'Отправка сообщения...');

    try {
      const result = await postJson<ApiResult>('/api/contact', { body: values });
      form.reset();
      renderErrors(form, {});
      setStatus(status, 'success', result.message || 'Сообщение отправлено. Копия ушла на ваш email.');
    } catch (error) {
      const result = getResult(error);
      renderErrors(form, result?.errors ?? {});
      setStatus(status, 'error', error instanceof Error ? error.message : 'Неизвестная ошибка отправки.');
    } finally {
      button.disabled = false;
      button.textContent = 'Отправить';
    }
  });
};
