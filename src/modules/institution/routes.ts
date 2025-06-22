import { Router } from 'express';
import { registerInstitution } from './controller';

const router = Router();

router.post('/register', registerInstitution);

export default router;
