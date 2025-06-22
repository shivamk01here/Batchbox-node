import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // 👈 Make sure to load env vars

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachmentPath: string;
}

export const sendEmailWithAttachment = async ({
  to,
  subject,
  html,
  attachmentPath,
}: EmailOptions): Promise<void> => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error('❌ MAIL_USER or MAIL_PASS not set in environment variables');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"BatchBox" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
      attachments: [
        {
          filename: path.basename(attachmentPath), // 👈 Clean file name from full path
          path: attachmentPath,
        },
      ],
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
