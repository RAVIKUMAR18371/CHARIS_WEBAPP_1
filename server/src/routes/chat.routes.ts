import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateJWT);

router.post('/start', ChatController.start);
router.post('/message', ChatController.sendMessage);
router.get('/history', ChatController.getHistory);
router.get('/:id', ChatController.getById);

export default router;
