import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/routes';
import institutionRoutes from './modules/institution/routes';

import peopleRoutes from './modules/people/routes';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/institution', institutionRoutes);

// health check
app.get('/', (_: Request, res: Response) => {
  res.send('BatchBox API running ✅');
});

app.use('/api/v1/people', peopleRoutes);

import batchRoutes from './modules/batches/routes';
import invoiceRoutes from './modules/invoices/routes';

app.use('/api/v1/batches', batchRoutes);
app.use('/api/v1/invoices', invoiceRoutes);

import bookingRoutes from './modules/bookings/routes';
import classRoutes from './modules/classes/routes';
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/classes', classRoutes);



import packageRoutes from './modules/packages/routes';
import settingRoutes from './modules/settings/routes';
import notificationRoutes from './modules/notifications/routes';
import paymentRoutes from './modules/payments/routes';


app.use('/api/v1/payments', paymentRoutes);

app.use('/api/v1/packages', packageRoutes);
app.use('/api/v1/settings', settingRoutes);
app.use('/api/v1/notifications', notificationRoutes);


import packageRoutes from './modules/packages/routes';
import settingRoutes from './modules/settings/routes';
import notificationRoutes from './modules/notifications/routes';
import chatRoutes from './modules/chat/routes';

app.use('/api/v1/packages', packageRoutes);
app.use('/api/v1/settings', settingRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/chat', chatRoutes);
