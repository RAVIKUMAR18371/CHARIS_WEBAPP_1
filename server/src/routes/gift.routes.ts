import { Router } from 'express';
import { GiftController } from '../controllers/gift.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/', GiftController.getAll);
router.get('/saved', authenticateJWT, GiftController.getSaved);
router.post('/save', authenticateJWT, GiftController.toggleSave);
router.get('/:id', GiftController.getById);

export default router;
