import app from './app';
import { config } from './config/env';

app.listen(config.port, () => {
  console.log(`✨ CHARIS Luxury AI Concierge Server running on http://localhost:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
