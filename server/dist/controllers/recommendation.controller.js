"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationController = void 0;
const recommendation_service_1 = require("../services/recommendation.service");
class RecommendationController {
    static async generate(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { conversationId } = req.body;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            if (!conversationId)
                return res.status(400).json({ error: 'conversationId is required' });
            const result = await recommendation_service_1.RecommendationService.generateForConversation(userId, conversationId);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.RecommendationController = RecommendationController;
