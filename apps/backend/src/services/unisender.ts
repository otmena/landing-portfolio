import { env } from '../config/env.js';

type UnisenderMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export const sendUnisenderEmail = async (message: UnisenderMessage) => {
  const response = await fetch(`${env.unisender.apiUrl}/email/send.json`, {
    method: 'POST',
    signal: AbortSignal.timeout(15_000),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': env.unisender.apiKey,
    },
    body: JSON.stringify({
      message: {
        recipients: [{ email: message.to }],
        body: {
          html: message.html,
          plaintext: message.text,
        },
        subject: message.subject,
        from_email: env.unisender.fromEmail,
        from_name: env.unisender.fromName,
        reply_to: message.replyTo,
        reply_to_name: message.replyTo ? message.replyTo : undefined,
        track_links: 0,
        track_read: 0,
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Unisender email failed: ${response.status} ${details}`);
  }
};
