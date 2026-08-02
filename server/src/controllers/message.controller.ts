import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../services/message.service';

export class MessageController {
  static async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipient, occasion, giftName, emotionalGoal, userPrompt, mode } = req.body;
      const result = await MessageService.generateGiftMessage({
        recipient,
        occasion,
        giftName,
        emotionalGoal,
        userPrompt,
        mode,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
