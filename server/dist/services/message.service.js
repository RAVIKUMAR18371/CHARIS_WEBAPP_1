"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const ai_factory_1 = require("../ai/ai.factory");
class MessageService {
    static async generateGiftMessage(params) {
        const aiService = ai_factory_1.AIFactory.getService();
        const message = await aiService.generateGiftMessage(params.recipient, params.occasion, params.giftName, params.emotionalGoal, params.userPrompt, params.mode || 'generate');
        return { message };
    }
}
exports.MessageService = MessageService;
