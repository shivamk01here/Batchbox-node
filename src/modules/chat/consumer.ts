import amqp from 'amqplib';

const QUEUE_NAME = 'chat-messages';

export const startChatConsumer = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: false });

  channel.consume(QUEUE_NAME, (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      console.log('📨 New Chat Message Received:', content);
      channel.ack(msg);
    }
  });
};