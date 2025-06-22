import { Request, Response } from 'express';
import prisma from '../../db/prisma';
import { AuthRequest } from '../../shared/middlewares/authMiddleware';

export const createInvoice = async (req: AuthRequest, res: Response) => {
  const institutionId = req.user.institution_id;
  const { student_id, total_amount, due_date, items } = req.body;

  const invoice = await prisma.invoice.create({
    data: {
      studentId: student_id,
      institutionId,
      totalAmount: total_amount,
      dueDate: new Date(due_date),
      items: {
        create: items.map((item: any) => ({
          itemType: item.item_type,
          itemId: item.item_id,
          label: item.label,
          amount: item.amount,
        })),
      },
    },
    include: { items: true },
  });

  return res.status(201).json({ success: true, invoice });
};
