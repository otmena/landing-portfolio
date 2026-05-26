import { Router } from 'express';
import { env, mailDevMode, mailProvider } from '../config/env.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.json({
    ok: true,
    mailMode: mailDevMode ? 'dev' : 'smtp',
    mailProvider,
    ai: Boolean(env.openAiApiKey),
  });
});
