import { prisma } from '../database/prisma';
import { AIFactory } from '../ai/ai.factory';
import { RAGGiftEngine } from '../ai/rag.service';
import { CollectedInfo, GiftItem } from '../ai/ai.interface';

export class RecommendationService {
  static async generateForConversation(userId: string, conversationId: string) {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.userId !== userId) {
      throw { status: 404, message: 'Conversation not found.' };
    }

    const collectedInfo: CollectedInfo = JSON.parse(conversation.collectedInformation || '{}');

    // Fetch all available luxury gifts from inventory
    const rawGifts = await prisma.gift.findMany();
    const gifts: GiftItem[] = rawGifts.map((g) => ({
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
    const rankedGifts = RAGGiftEngine.rankGifts(gifts, collectedInfo);

    // Step 2: AI Concierge reasoning & explanation generation
    const aiService = AIFactory.getService();
    const recommendations = await aiService.generateGiftRecommendations(collectedInfo, rankedGifts);

    // Clean old recommendations for this conversation
    await prisma.recommendation.deleteMany({
      where: { conversationId },
    });

    // Save recommendations to database
    const savedRecs = [];
    for (const rec of recommendations) {
      const created = await prisma.recommendation.create({
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
    await prisma.conversation.update({
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
