import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateWelcomePDF = (orgData) => {
  return new Promise((resolve, reject) => {
    const fileName = `welcome-${orgData.orgId}.pdf`;
    const filePath = path.join(__dirname, `../tmp/${fileName}`);
    
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text(`Welcome to BatchBox, ${orgData.name}!`, {
      align: 'center'
    });

    doc.moveDown();
    doc.fontSize(14).text(`
Thanks for joining us. 🎉

Here are your organization details:
- Name: ${orgData.name}
- Email: ${orgData.email}
- Registered At: ${new Date().toLocaleDateString()}

We're excited to have you on board.
`);

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};
