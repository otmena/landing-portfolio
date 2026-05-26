import nodemailer from 'nodemailer';
import { env, mailDevMode } from '../config/env.js';
import type { ContactPayload } from '../schemas/contactSchema.js';
import { cleanHeader } from '../utils/html.js';
import { buildOwnerEmail, buildOwnerText, buildUserCopyEmail } from './emailTemplates.js';

const createTransporter = () => {
  if (mailDevMode) {
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });
  }

  return nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });
};

const getPreviewMessage = (info: unknown) => {
  if (typeof info !== 'object' || info === null || !('message' in info)) {
    return '';
  }

  const message = (info as { message?: unknown }).message;
  return Buffer.isBuffer(message) ? message.toString() : String(message ?? '');
};

export const sendContactEmails = async (payload: ContactPayload) => {
  if (!mailDevMode && !env.ownerEmail) {
    throw new Error('OWNER_EMAIL is required for production email delivery');
  }

  const transporter = createTransporter();
  const ownerEmail = env.ownerEmail || 'owner@example.com';
  const subject = cleanHeader(`Заявка с лендинга от ${payload.name}`);

  const [ownerMessage, userCopyMessage] = await Promise.all([
    transporter.sendMail({
      from: env.mailFrom,
      to: ownerEmail,
      replyTo: payload.email,
      subject,
      html: buildOwnerEmail(payload),
      text: buildOwnerText(payload),
    }),
    transporter.sendMail({
      from: env.mailFrom,
      to: payload.email,
      subject: 'Копия вашего сообщения',
      html: buildUserCopyEmail(payload),
      text: `${payload.name}, спасибо за сообщение.\n\nВаш комментарий:\n${payload.comment}`,
    }),
  ]);

  if (mailDevMode) {
    console.info('Owner email preview:\n', getPreviewMessage(ownerMessage));
    console.info('User copy email preview:\n', getPreviewMessage(userCopyMessage));
  }
};
