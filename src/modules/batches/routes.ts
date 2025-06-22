import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import {
  getAllBatches,
  createBatch,
  updateBatch,
  deleteBatch,
} from './controller';

const router = Router();
router.use(authMiddleware);

router.get('/', getAllBatches);
router.post('/', createBatch);
router.put('/:id', updateBatch);
router.delete('/:id', deleteBatch);

export default router;
