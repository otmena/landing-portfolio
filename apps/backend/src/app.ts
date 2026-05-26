import express from 'express';
import path from 'node:path';
import { env } from './config/env.js';
import { aiSummaryRouter } from './routes/aiSummary.js';
import { contactRouter } from './routes/contact.js';
import { healthRouter } from './routes/health.js';

export const createApp = () => {
  const app = express();

  app.set('trust proxy', 1);
  app.use(express.json({ limit: '32kb' }));
  app.use('/api', healthRouter);
  app.use('/api', contactRouter);
  app.use('/api', aiSummaryRouter);
  app.use(express.static(env.staticDir));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(env.staticDir, 'index.html'));
  });

  return app;
};
