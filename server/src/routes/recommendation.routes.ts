import { Router } from 'express';
import { RecommendationController } from '../controllers/recommendation.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateJWT);
router.post('/generate', RecommendationController.generate);

export default router;
