// FIX: Import the entire library as 'amqp' to avoid name collisions.
import * as amqp from 'amqplib';

// Use the correct types - connect() now returns ChannelModel, not Connection
let channel: amqp.Channel;

export const connectRabbit = async () => {
  try {
    // connect() returns ChannelModel (which includes connection functionality)
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('🐰 Connected to RabbitMQ');
  } catch (err) {
    console.error('❌ RabbitMQ connection failed:', err);
    process.exit(1);
  }
};

export const getChannel = (): amqp.Channel => {
  if (!channel) {
    throw new Error("Channel has not been initialized. Call connectRabbit() first.");
  }
  return channel;
};

export const sendEvent = async (queue: string, payload: any) => {
  const ch = getChannel();
  await ch.assertQueue(queue, { durable: false });
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
};