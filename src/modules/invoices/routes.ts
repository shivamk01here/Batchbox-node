import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import { createInvoice } from './controller';

const router = Router();
router.use(authMiddleware);

router.post('/', createInvoice);

export default router;
