import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import { sendMessage, listMessages } from './controller';
const router = Router();
router.use(authMiddleware);
router.post('/', sendMessage);
router.get('/', listMessages);
export default router;