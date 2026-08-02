import { AIFactory } from '../ai/ai.factory';

export class MessageService {
  static async generateGiftMessage(params: {
    recipient: string;
    occasion: string;
    giftName: string;
    emotionalGoal: string;
    userPrompt?: string;
    mode?: 'write' | 'improve' | 'generate';
  }) {
    const aiService = AIFactory.getService();
    const message = await aiService.generateGiftMessage(
      params.recipient,
      params.occasion,
      params.giftName,
      params.emotionalGoal,
      params.userPrompt,
      params.mode || 'generate'
    );

    return { message };
  }
}
