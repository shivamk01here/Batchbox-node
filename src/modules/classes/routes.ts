import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import { createClass, listClasses } from './controller';

const router = Router();
router.use(authMiddleware);

router.post('/', createClass);
router.get('/', listClasses);

export default router;
