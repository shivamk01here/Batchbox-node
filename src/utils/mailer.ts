export const sendEmailWithAttachment = async ({ to, subject, html, attachmentPath }) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  
    await transporter.sendMail({
      from: `"BatchBox" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
      attachments: [
        {
          filename: 'Welcome.pdf',
          path: attachmentPath
        }
      ]
    });
  };
  