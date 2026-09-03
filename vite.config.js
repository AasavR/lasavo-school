import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handler as createOrderHandler } from './netlify/functions/create-order.js';
import { handler as verifyPaymentHandler } from './netlify/functions/verify-payment.js';

function apiDevPlugin() {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/create-order' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            const event = { httpMethod: 'POST', body };
            const result = await createOrderHandler(event, {});
            res.statusCode = result.statusCode;
            Object.entries(result.headers || {}).forEach(([k, v]) => res.setHeader(k, v));
            res.end(result.body);
          });
          return;
        }

        if (req.url === '/api/verify-payment' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            const event = { httpMethod: 'POST', body };
            const result = await verifyPaymentHandler(event, {});
            res.statusCode = result.statusCode;
            Object.entries(result.headers || {}).forEach(([k, v]) => res.setHeader(k, v));
            res.end(result.body);
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.RAZORPAY_KEY_ID) process.env.RAZORPAY_KEY_ID = env.RAZORPAY_KEY_ID;
  if (env.RAZORPAY_KEY_SECRET) process.env.RAZORPAY_KEY_SECRET = env.RAZORPAY_KEY_SECRET;

  return {
    plugins: [react(), apiDevPlugin()],
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});