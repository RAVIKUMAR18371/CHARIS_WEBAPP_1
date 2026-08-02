import { Response, NextFunction } from 'express';
import { RecommendationService } from '../services/recommendation.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class RecommendationController {
  static async generate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { conversationId } = req.body;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!conversationId) return res.status(400).json({ error: 'conversationId is required' });

      const result = await RecommendationService.generateForConversation(userId, conversationId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
