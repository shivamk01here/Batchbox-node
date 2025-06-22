import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const fromNumber = 'whatsapp:+14155238886'; // Twilio sandbox number

const client = twilio(accountSid, authToken);

export const sendWhatsApp = async (data) => {
  const message = `🎉 Welcome to BatchBox, ${data.name}!\n\nWe're thrilled to have your organization on board.\n\nLogin and start managing your batches today.`;

  return await client.messages.create({
    body: message,
    from: fromNumber,
    to: `whatsapp:${data.phone || '+91xxxxxxxxxx'}`
  });
};
