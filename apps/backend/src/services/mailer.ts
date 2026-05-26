import nodemailer from 'nodemailer';
import { brevoReady, env, mailDevMode } from '../config/env.js';
import type { ContactPayload } from '../schemas/contactSchema.js';
import { cleanHeader } from '../utils/html.js';
import { buildOwnerEmail, buildOwnerText, buildUserCopyEmail, buildUserCopyText } from './emailTemplates.js';

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
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
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

const logMailConfig = () => {
  console.info('Mail config:', {
    mode: mailDevMode ? 'dev' : brevoReady ? 'brevo' : 'smtp',
    brevoKeySet: Boolean(env.brevo.apiKey),
    brevoSenderSet: Boolean(env.brevo.senderEmail),
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    userSet: Boolean(env.smtp.user),
    passSet: Boolean(env.smtp.pass),
    ownerSet: Boolean(env.ownerEmail),
    fromSet: Boolean(env.mailFrom),
  });
};

const sendBrevoEmail = async (message: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) => {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    signal: AbortSignal.timeout(15_000),
    headers: {
      accept: 'application/json',
      'api-key': env.brevo.apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: env.brevo.senderName,
        email: env.brevo.senderEmail,
      },
      to: [{ email: message.to }],
      replyTo: message.replyTo ? { email: message.replyTo } : undefined,
      subject: message.subject,
      htmlContent: message.html,
      textContent: message.text,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Brevo email failed: ${response.status} ${details}`);
  }
};

const sendViaSmtp = async (payload: ContactPayload, subject: string, ownerEmail: string) => {
  const transporter = createTransporter();
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
      text: buildUserCopyText(payload),
    }),
  ]);

  if (mailDevMode) {
    console.info('Owner email preview:\n', getPreviewMessage(ownerMessage));
    console.info('User copy email preview:\n', getPreviewMessage(userCopyMessage));
  }
};

const sendViaBrevo = async (payload: ContactPayload, subject: string, ownerEmail: string) => {
  await Promise.all([
    sendBrevoEmail({
      to: ownerEmail,
      replyTo: payload.email,
      subject,
      html: buildOwnerEmail(payload),
      text: buildOwnerText(payload),
    }),
    sendBrevoEmail({
      to: payload.email,
      subject: 'Копия вашего сообщения',
      html: buildUserCopyEmail(payload),
      text: buildUserCopyText(payload),
    }),
  ]);
};

export const sendContactEmails = async (payload: ContactPayload) => {
  logMailConfig();

  if (!mailDevMode && !env.ownerEmail) {
    throw new Error('OWNER_EMAIL is required for production email delivery');
  }

  const ownerEmail = env.ownerEmail || 'owner@example.com';
  const subject = cleanHeader(`Заявка с лендинга от ${payload.name}`);

  if (brevoReady) {
    await sendViaBrevo(payload, subject, ownerEmail);
    return;
  }

  await sendViaSmtp(payload, subject, ownerEmail);
};
