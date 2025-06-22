import amqp from 'amqplib';
const QUEUE_NAME = 'chat-messages';

export const publishChatMessage = async (payload: any) => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: false });
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)));
  setTimeout(() => conn.close(), 500);
};