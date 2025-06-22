import express from 'express';
import { connectRabbit } from './events/rabbitmq';
import { listenToOrgCreated } from './events/orgCreatedListener';

const app = express();
app.use(express.json());

const PORT = 3001;

const startServer = async () => {
  try {
    // 1. Connect to RabbitMQ
    await connectRabbit();
    console.log('✅ RabbitMQ connected.');

    // 2. Listen to org.created events
    await listenToOrgCreated();
    console.log('🔔 Listening for org.created events');

    // 3. Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Failed to start app:', err);
    process.exit(1);
  }
};

startServer();
