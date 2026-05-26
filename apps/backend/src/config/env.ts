import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const projectRoot = path.resolve(dirname, '../../..');

export const env = {
  port: Number(process.env.PORT || 5174),
  ownerEmail: process.env.OWNER_EMAIL || '',
  mailFrom: process.env.MAIL_FROM || 'Ruslan Timergaliev <no-reply@example.com>',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  brevo: {
    apiKey: process.env.BREVO_API_KEY || '',
    senderEmail: process.env.BREVO_SENDER_EMAIL || '',
    senderName: process.env.BREVO_SENDER_NAME || 'Руслан Тимергалиев',
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  staticDir: path.join(projectRoot, 'dist/frontend'),
};

export const brevoReady = Boolean(env.brevo.apiKey && env.brevo.senderEmail);
export const smtpReady = Boolean(env.smtp.host && env.smtp.user && env.smtp.pass);
export const mailDevMode = process.env.MAIL_DEV_MODE === 'true' || (!brevoReady && !smtpReady);
