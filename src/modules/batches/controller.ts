import { Request, Response } from 'express';
import prisma from '../../db/prisma';
import { AuthRequest } from '../../shared/middlewares/authMiddleware';

export const getAllBatches = async (req: AuthRequest, res: Response) => {
  const institutionId = req.user.institution_id;

  const batches = await prisma.batch.findMany({
    where: { institutionId },
    orderBy: { createdAt: 'desc' },
  });

  return res.json({ success: true, batches });
};

export const createBatch = async (req: AuthRequest, res: Response) => {
  const institutionId = req.user.institution_id;
  const { name, description, start_date, end_date } = req.body;

  const batch = await prisma.batch.create({
    data: {
      name,
      description,
      startDate: new Date(start_date),
      endDate: new Date(end_date),
      institutionId,
    },
  });

  return res.status(201).json({ success: true, message: 'Batch created successfully', batch });
};

export const updateBatch = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const institutionId = req.user.institution_id;

  const batch = await prisma.batch.updateMany({
    where: { id: Number(id), institutionId },
    data: { name, description },
  });

  return res.json({ success: true, message: 'Batch updated successfully', batch });
};

export const deleteBatch = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const institutionId = req.user.institution_id;

  await prisma.batch.deleteMany({
    where: { id: Number(id), institutionId },
  });

  return res.json({ success: true, message: 'Batch deleted successfully' });
};
