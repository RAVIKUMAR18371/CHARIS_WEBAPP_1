"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const prisma_1 = require("../database/prisma");
const ai_factory_1 = require("../ai/ai.factory");
const rag_service_1 = require("../ai/rag.service");
class RecommendationService {
    static async generateForConversation(userId, conversationId) {
        const conversation = await prisma_1.prisma.conversation.findUnique({
            where: { id: conversationId },
        });
        if (!conversation || conversation.userId !== userId) {
            throw { status: 404, message: 'Conversation not found.' };
        }
        const collectedInfo = JSON.parse(conversation.collectedInformation || '{}');
        // Fetch all available luxury gifts from inventory
        const rawGifts = await prisma_1.prisma.gift.findMany();
        const gifts = rawGifts.map((g) => ({
            id: g.id,
            name: g.name,
            category: g.category,
            price: g.price,
            description: g.description,
            story: g.story,
            symbolicMeaning: g.symbolicMeaning,
            imageUrl: g.imageUrl,
            tags: JSON.parse(g.tags || '[]'),
        }));
        // Step 1: RAG semantic filtering and ranking
        const rankedGifts = rag_service_1.RAGGiftEngine.rankGifts(gifts, collectedInfo);
        // Step 2: AI Concierge reasoning & explanation generation
        const aiService = ai_factory_1.AIFactory.getService();
        const recommendations = await aiService.generateGiftRecommendations(collectedInfo, rankedGifts);
        // Clean old recommendations for this conversation
        await prisma_1.prisma.recommendation.deleteMany({
            where: { conversationId },
        });
        // Save recommendations to database
        const savedRecs = [];
        for (const rec of recommendations) {
            const created = await prisma_1.prisma.recommendation.create({
                data: {
                    conversationId,
                    giftId: rec.gift.id,
                    whyChosen: rec.whyChosen,
                    emotionalReasoning: rec.emotionalReasoning,
                },
                include: { gift: true },
            });
            savedRecs.push({
                id: created.id,
                gift: {
                    ...created.gift,
                    galleryImages: JSON.parse(created.gift.galleryImages || '[]'),
                    tags: JSON.parse(created.gift.tags || '[]'),
                },
                whyChosen: created.whyChosen,
                emotionalReasoning: created.emotionalReasoning,
            });
        }
        // Mark conversation completed
        await prisma_1.prisma.conversation.update({
            where: { id: conversationId },
            data: { status: 'COMPLETED' },
        });
        return {
            conversationId,
            collectedInformation: collectedInfo,
            recommendations: savedRecs,
        };
    }
}
exports.RecommendationService = RecommendationService;
