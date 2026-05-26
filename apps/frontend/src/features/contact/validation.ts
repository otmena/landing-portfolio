export type ContactValues = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

export const contactMessages: Record<keyof ContactValues, string> = {
  name: 'Введите имя, минимум 2 символа.',
  phone: 'Введите телефон: цифры, пробелы, +, скобки или дефис.',
  email: 'Введите корректный email.',
  comment: 'Добавьте комментарий, минимум 10 символов.',
};

export const readContactValues = (form: HTMLFormElement): ContactValues => {
  const data = new FormData(form);

  return {
    name: String(data.get('name') ?? ''),
    phone: String(data.get('phone') ?? ''),
    email: String(data.get('email') ?? ''),
    comment: String(data.get('comment') ?? ''),
  };
};

export const validateContactValues = (values: ContactValues) => {
  const errors: Partial<Record<keyof ContactValues, string>> = {};

  if (values.name.trim().length < 2) errors.name = contactMessages.name;
  if (!/^[+\d\s()-]{7,24}$/.test(values.phone)) errors.phone = contactMessages.phone;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = contactMessages.email;
  if (values.comment.trim().length < 10) errors.comment = contactMessages.comment;

  return errors;
};
