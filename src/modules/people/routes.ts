import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import {
  listPeople,
  createPerson,
  updatePerson,
  deletePerson,
} from './controller';

const router = Router();

router.use(authMiddleware);

router.get('/', listPeople); // ?role_id=3
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router;
