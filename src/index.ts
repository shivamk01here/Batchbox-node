import express from 'express';
import { connectRabbit } from './events/rabbitmq';
import { listenToOrgCreated } from './events/orgCreatedListener';

const app = express();
app.use(express.json());

connectRabbit().then(() => {
  console.log('RabbitMQ connected.');
});

listenToOrgCreated().then(() => {
    console.log("🔔 Listening for org.created events");
  });

app.listen(3001, () => console.log("Org service running on 3001"));

app.listen(3002, () => console.log("Notifications service running on 3002"));
