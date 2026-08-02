import { Request, Response, NextFunction } from 'express';
import { GiftService } from '../services/gift.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class GiftController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string | undefined;
      const gifts = await GiftService.getAllGifts(category);
      res.status(200).json(gifts);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const gift = await GiftService.getGiftById(id);
      res.status(200).json(gift);
    } catch (err) {
      next(err);
    }
  }

  static async toggleSave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { giftId } = req.body;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!giftId) return res.status(400).json({ error: 'giftId is required' });

      const result = await GiftService.saveGift(userId, giftId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getSaved(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const saved = await GiftService.getSavedGifts(userId);
      res.status(200).json(saved);
    } catch (err) {
      next(err);
    }
  }
}
