import { AuthRequest } from '../../shared/middlewares/authMiddleware';
import prisma from '../../db/prisma';
import { Request, Response } from 'express';

export const createPackage = async (req: AuthRequest, res: Response) => {
  const { name, price, duration } = req.body;
  const institutionId = req.user.institution_id;

  const pkg = await prisma.package.create({
    data: { name, price, duration, institutionId },
  });

  return res.status(201).json({ success: true, package: pkg });
};

export const listPackages = async (req: AuthRequest, res: Response) => {
  const institutionId = req.user.institution_id;
  const packages = await prisma.package.findMany({ where: { institutionId } });
  res.json({ success: true, packages });
};