// routes.ts
import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import { createStripeSession } from './controller';
import { handleStripeWebhook } from './webhook';
const router = Router();

router.post('/create-checkout', authMiddleware, createStripeSession);
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
