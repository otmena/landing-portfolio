import 'dotenv/config';
import dns from 'node:dns';
import { createApp } from './app.js';
import { env } from './config/env.js';

dns.setDefaultResultOrder('ipv4first');

const app = createApp();

app.listen(env.port, () => {
  console.info(`API server started on http://localhost:${env.port}`);
});
