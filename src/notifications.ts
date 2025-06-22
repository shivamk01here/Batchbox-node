import { AuthRequest } from '../../shared/middlewares/authMiddleware';
import prisma from '../../db/prisma';
import { Request, Response } from 'express';

export const logNotification = async (req: AuthRequest, res: Response) => {
  const { userId, message, type } = req.body;
  const log = await prisma.notificationLog.create({
    data: { userId, message, type },
  });
  res.status(201).json({ success: true, data: log });
};