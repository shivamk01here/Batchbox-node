import { Router } from 'express';
import { login, getProfile } from './controller';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/user', authMiddleware, getProfile);

export default router;
