import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import { createPackage, listPackages } from './controller';
const router = Router();
router.use(authMiddleware);
router.get('/', listPackages);
router.post('/', createPackage);
export default router;

