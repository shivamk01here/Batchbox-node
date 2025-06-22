import amqp from 'amqplib';

const QUEUE_NAME = 'notifications';

export const publishNotification = async (payload: any) => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: false });
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)));
  setTimeout(() => conn.close(), 500);
};

// USAGE EXAMPLE (in controller):
// await publishNotification({ userId: 1, type: "email", message: "Your invoice is ready." });
