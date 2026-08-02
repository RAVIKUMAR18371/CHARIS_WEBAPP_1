import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { config } from './config/env';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [config.corsOrigin, 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);

app.use(express.json());

// Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', service: 'CHARIS Luxury Concierge API', timestamp: new Date() });
});

// API Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

export default app;
