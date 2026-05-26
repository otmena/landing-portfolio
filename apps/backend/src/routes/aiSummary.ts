import { Router } from 'express';
import { createAiSummary } from '../services/aiSummary.js';

export const aiSummaryRouter = Router();

aiSummaryRouter.post('/ai-summary', async (_req, res) => {
  const summary = await createAiSummary();

  res.json({
    ok: true,
    summary,
  });
});
