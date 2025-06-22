import { stripe } from './stripe';
import prisma from '../../db/prisma';
import { AuthRequest } from '../../shared/middlewares/authMiddleware';
import { Response } from 'express';

export const createStripeSession = async (req: AuthRequest, res: Response) => {
  const { student_id, amount } = req.body;
  const institutionId = req.user.institution_id;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Course Fee',
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
  });

  await prisma.payment.create({
    data: {
      studentId: student_id,
      amount,
      method: 'stripe',
      status: 'pending',
      stripeId: session.id,
      institutionId
    }
  });

  res.json({ success: true, url: session.url });
};