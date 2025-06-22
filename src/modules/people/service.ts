import bcrypt from 'bcrypt';
import prisma from '../../db/prisma';

export const getPeopleByRole = async (roleId: number, institutionId: number) => {
  return prisma.user.findMany({
    where: {
      roleId,
      institutionId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      roleId: true,
    },
  });
};

export const createNewPerson = async (
  name: string,
  email: string,
  phone: string,
  password: string,
  roleId: number,
  institutionId: number
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      roleId,
      institutionId,
    },
  });
};

export const updatePersonById = async (
  id: number,
  updates: any,
  institutionId: number
) => {
  return prisma.user.updateMany({
    where: { id, institutionId },
    data: updates,
  });
};

export const deletePersonById = async (id: number, institutionId: number) => {
  return prisma.user.deleteMany({
    where: { id, institutionId },
  });
};
