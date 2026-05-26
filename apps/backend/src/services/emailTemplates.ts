import type { ContactPayload } from '../schemas/contactSchema.js';
import { escapeHtml } from '../utils/html.js';

const withBreaks = (value: string) => escapeHtml(value).replaceAll('\n', '<br />');

export const buildOwnerEmail = ({ name, phone, email, comment }: ContactPayload) => `
  <h1>Новая заявка с сайта</h1>
  <p><b>Имя:</b> ${escapeHtml(name)}</p>
  <p><b>Телефон:</b> ${escapeHtml(phone)}</p>
  <p><b>Email:</b> ${escapeHtml(email)}</p>
  <p><b>Комментарий:</b><br />${withBreaks(comment)}</p>
`;

export const buildUserCopyEmail = ({ name, comment }: ContactPayload) => `
  <h1>${escapeHtml(name)}, спасибо за сообщение</h1>
  <p>Я получил вашу заявку и отвечу на нее в ближайшее время.</p>
  <p><b>Ваш комментарий:</b><br />${withBreaks(comment)}</p>
`;

export const buildOwnerText = ({ name, phone, email, comment }: ContactPayload) =>
  `Новая заявка\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nКомментарий: ${comment}`;
