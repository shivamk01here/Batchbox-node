import { AuthRequest } from '../../shared/middlewares/authMiddleware';
import prisma from '../../db/prisma';
import { Request, Response } from 'express';

export const getInstitutionSettings = async (req: AuthRequest, res: Response) => {
  const id = req.user.institution_id;
  const institution = await prisma.institution.findUnique({ where: { id } });
  res.json({ success: true, institution });
};

export const updateInstitutionSettings = async (req: AuthRequest, res: Response) => {
  const id = req.user.institution_id;
  const { name, phone, address, logo } = req.body;

  const updated = await prisma.institution.update({
    where: { id },
    data: { name, phone, address, logo },
  });

  res.json({ success: true, institution: updated });
};