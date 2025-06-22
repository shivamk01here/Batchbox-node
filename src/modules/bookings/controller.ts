import { AuthRequest } from '../../shared/middlewares/authMiddleware';
import prisma from '../../db/prisma';
import { Request, Response } from 'express';

export const createBooking = async (req: AuthRequest, res: Response) => {
  const { name, email, phone, package_id, class_id } = req.body;
  const institutionId = req.user.institution_id;

  const booking = await prisma.booking.create({
    data: {
      name,
      email,
      phone,
      classId: class_id,
      packageId: package_id,
      institutionId,
    },
  });

  res.status(201).json({ success: true, data: booking });
};

export const listBookings = async (req: AuthRequest, res: Response) => {
  const institutionId = req.user.institution_id;

  const bookings = await prisma.booking.findMany({
    where: { institutionId },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, data: bookings });
};
