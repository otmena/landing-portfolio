import { Router } from 'express';
import { env, mailDevMode } from '../config/env.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.json({
    ok: true,
    mailMode: mailDevMode ? 'dev' : 'smtp',
    ai: Boolean(env.openAiApiKey),
  });
});
