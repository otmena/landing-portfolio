import { Router } from 'express';
import { contactSchema, formatZodErrors } from '../schemas/contactSchema.js';
import { sendContactEmails } from '../services/mailer.js';
import { isRateLimited } from '../utils/rateLimit.js';

export const contactRouter = Router();

contactRouter.post('/contact', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(ip)) {
    res.status(429).json({
      ok: false,
      message: 'Слишком много отправок. Попробуйте позже.',
    });
    return;
  }

  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      message: 'Проверьте поля формы.',
      errors: formatZodErrors(parsed.error),
    });
    return;
  }

  try {
    await sendContactEmails(parsed.data);
    res.json({
      ok: true,
      message: 'Сообщение обработано. В режиме разработки письма выводятся в консоль сервера.',
    });
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    res.status(502).json({
      ok: false,
      message: 'Не удалось отправить письмо. Попробуйте позже или напишите напрямую на email.',
    });
  }
});
