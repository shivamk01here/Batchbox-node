import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import { getInstitutionSettings, updateInstitutionSettings } from './controller';
const router = Router();
router.use(authMiddleware);
router.get('/institution', getInstitutionSettings);
router.post('/institution', updateInstitutionSettings);
export default router;