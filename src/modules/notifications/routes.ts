import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import { logNotification } from './controller';
const router = Router();
router.use(authMiddleware);
router.post('/', logNotification);
export default router;


// USAGE EXAMPLE (in controller):
// await publishNotification({ userId: 1, type: "email", message: "Your invoice is ready." });