import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import { createBooking, listBookings } from './controller';

const router = Router();
router.use(authMiddleware);

router.post('/', createBooking);
router.get('/', listBookings);

export default router;