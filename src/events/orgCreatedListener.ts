import { sendEmailWithAttachment } from '../utils/mailer';
import { generateWelcomePDF } from '../utils/pdfGenerator';
import { sendWhatsApp } from '../utils/whatsapp';

export const listenToOrgCreated = async () => {
  // RabbitMQ setup...
  
  channel.consume('org.created', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());

      // Generate PDF
      const pdfPath = await generateWelcomePDF(data);

      // Send Email with Attachment
      await sendEmailWithAttachment({
        to: data.email,
        subject: '🎉 Welcome to BatchBox!',
        html: `<h2>Hello ${data.name}!</h2><p>Welcome onboard. Your welcome kit is attached.</p>`,
        attachmentPath: pdfPath
      });

      // Send WhatsApp
      await sendWhatsApp(data);

      channel.ack(msg);
    }
  });
};
