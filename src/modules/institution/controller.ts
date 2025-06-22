import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../db/prisma';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../shared/config/jwt';
import { sendEvent } from '../events/rabbitmq';

export const registerInstitution = async (req: Request, res: Response) => {
  const { institution_name, owner_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const institution = await prisma.institution.create({
      data: {
        name: institution_name,
        ownerName: owner_name,
        email,
        password: hashedPassword,
        users: {
          create: {
            name: owner_name,
            email,
            password: hashedPassword,
            roleId: 1, // Admin
          },
        },
      },
    });

    //event emit to rabbitmq service
    await sendEvent('institution.created', {
      institutionName: institution.name,
      ownerName: institution.ownerName,
    });

    return res.status(201).json({ success: true, message: 'Institution created', institution });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Registration failed', error: err });
  }
};
