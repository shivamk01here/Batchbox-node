import { getChannel } from './rabbitmq';
import { sendEmailWithAttachment } from '../utils/mailer';
import { generateWelcomePDF } from '../utils/pdfGenerator';
import { sendWhatsApp } from '../utils/whatsapp';
import { ConsumeMessage } from 'amqplib';

// Define an interface for the expected data structure
interface OrgCreatedData {
  email: string;
  name: string;
}

export const listenToOrgCreated = async () => {
  const channel = getChannel();

  await channel.assertQueue('org.created');

  channel.consume('org.created', async (msg: ConsumeMessage | null) => {
    if (msg) {
      // Use type assertion to specify the type of data
      const data = JSON.parse(msg.content.toString()) as OrgCreatedData;

      // 1. 📄 Generate Welcome PDF
      const pdfPath = await generateWelcomePDF(data);

      // 2. 📧 Send Email
      await sendEmailWithAttachment({
        to: data.email,
        subject: '🎉 Welcome to BatchBox!',
        html: `<h2>Hello ${data.name}!</h2><p>Welcome onboard. Your welcome kit is attached.</p>`,
        attachmentPath: await generateWelcomePDF(data) as string
      });

      // 3. 📱 Send WhatsApp
      await sendWhatsApp(data);

      // 4. ✅ Acknowledge the message
      channel.ack(msg);
    }
  });

  console.log('👂 Listening to org.created queue...');
};
