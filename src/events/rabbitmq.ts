import amqp from 'amqplib';

let channel;

export const connectRabbit = async () => {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
};

export const sendEvent = async (queue: string, payload: any) => {
  if (!channel) throw new Error("Channel not initialized");
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
};
