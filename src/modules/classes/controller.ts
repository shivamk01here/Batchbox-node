import { AuthRequest } from '../../shared/middlewares/authMiddleware';
import prisma from '../../db/prisma';
import { Request, Response } from 'express';

export const createClass = async (req: AuthRequest, res: Response) => {
  const { name, date, start_time, end_time, batch_id } = req.body;
  const institutionId = req.user.institution_id;

  const newClass = await prisma.classSession.create({
    data: {
      name,
      date: new Date(date),
      startTime: start_time,
      endTime: end_time,
      batchId: batch_id,
      institutionId,
    },
  });

  res.status(201).json({ success: true, data: newClass });
};


export const listClasses = async (req: AuthRequest, res: Response) => {
    const institutionId = req.user.institution_id;
  
    const classes = await prisma.classSession.findMany({
      where: { institutionId },
      orderBy: { date: 'asc' },
    });
  
    res.json({ success: true, data: classes });
  };