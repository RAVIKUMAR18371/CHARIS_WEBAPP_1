import { Router } from 'express';
import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';
import giftRoutes from './gift.routes';
import recommendationRoutes from './recommendation.routes';
import messageRoutes from './message.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/gifts', giftRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/message', messageRoutes);

export default router;
