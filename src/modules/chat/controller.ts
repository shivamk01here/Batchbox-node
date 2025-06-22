import prisma from '../../db/prisma';
import { AuthRequest } from '../../shared/middlewares/authMiddleware';
import { Response } from 'express';
import { publishChatMessage } from './publisher';

export const sendMessage = async (req: AuthRequest, res: Response) => {
  const { receiverId, message } = req.body;
  const senderId = req.user.id;
  const institutionId = req.user.institution_id;

  const chat = await prisma.chatMessage.create({
    data: {
      senderId,
      receiverId,
      message,
      institutionId
    },
  });

  await publishChatMessage(chat);
  res.status(201).json({ success: true, message: chat });
};

export const listMessages = async (req: AuthRequest, res: Response) => {
  const institutionId = req.user.institution_id;
  const messages = await prisma.chatMessage.findMany({
    where: { institutionId },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, messages });
};