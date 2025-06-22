import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

interface OrgData {
  name: string;
  email: string;
}

export const generateWelcomePDF = (orgData: OrgData): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileName = `welcome-${orgData.name}.pdf`;
    const dirPath = path.join(__dirname, '../tmp');
    const filePath = path.join(dirPath, fileName);

    // 👇 Make sure the folder exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text(`Welcome to BatchBox, ${orgData.name}!`, {
      align: 'center',
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
