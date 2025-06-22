import { Request, Response } from 'express';
import { AuthRequest } from '../../shared/middlewares/authMiddleware';
import {
  getPeopleByRole,
  createNewPerson,
  updatePersonById,
  deletePersonById,
} from './service';

export const listPeople = async (req: AuthRequest, res: Response) => {
  const { role_id } = req.query;
  const institutionId = req.user.institution_id;

  const people = await getPeopleByRole(Number(role_id), institutionId);
  return res.json({ success: true, data: people });
};

export const createPerson = async (req: AuthRequest, res: Response) => {
  const { name, email, phone, password, role_id } = req.body;
  const institutionId = req.user.institution_id;

  const person = await createNewPerson(name, email, phone, password, Number(role_id), institutionId);
  return res.status(201).json({ success: true, data: person });
};

export const updatePerson = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const institutionId = req.user.institution_id;

  const updated = await updatePersonById(Number(id), updates, institutionId);
  return res.json({ success: true, message: 'Updated', updated });
};

export const deletePerson = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const institutionId = req.user.institution_id;

  await deletePersonById(Number(id), institutionId);
