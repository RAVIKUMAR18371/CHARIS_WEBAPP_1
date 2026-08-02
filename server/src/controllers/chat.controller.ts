import { Response, NextFunction } from 'express';
import { ChatService } from '../services/chat.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class ChatController {
  static async start(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await ChatService.startConversation(userId);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async sendMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { conversationId, message } = req.body;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!conversationId || !message) {
        return res.status(400).json({ error: 'conversationId and message are required.' });
      }

      const result = await ChatService.sendMessage(userId, conversationId, message);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getHistory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const conversations = await ChatService.getHistory(userId);
      res.status(200).json(conversations);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { id } = req.params;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const conversation = await ChatService.getConversationById(userId, id);
      res.status(200).json(conversation);
    } catch (err) {
      next(err);
    }
  }
}
