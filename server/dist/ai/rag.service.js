"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAGGiftEngine = void 0;
class RAGGiftEngine {
    /**
     * RAG Vector/Semantic similarity search over gift knowledge base.
     * Ranks gifts according to context vectors built from recipient, occasion, personality, interests & emotional intention.
     */
    static rankGifts(gifts, context) {
        const queryTokens = [
            context.recipient,
            context.relationship,
            context.occasion,
            context.personality,
            context.interests,
            context.emotionalGoal,
            context.budget,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .split(/\W+/);
        if (queryTokens.length === 0)
            return gifts;
        const scored = gifts.map((gift) => {
            const giftDoc = [
                gift.name,
                gift.category,
                gift.description,
                gift.story,
                gift.symbolicMeaning,
                ...gift.tags,
            ]
                .join(' ')
                .toLowerCase();
            let score = 0;
            queryTokens.forEach((token) => {
                if (token.length > 2 && giftDoc.includes(token)) {
                    score += 2;
                }
            });
            // Budget filtering boost
            if (context.budget) {
                const numericBudget = parseFloat(context.budget.replace(/[^0-9]/g, ''));
                if (!isNaN(numericBudget)) {
                    if (gift.price <= numericBudget)
                        score += 3;
                }
            }
            return { gift, score };
        });
        scored.sort((a, b) => b.score - a.score);
        return scored.map((s) => s.gift);
    }
}
exports.RAGGiftEngine = RAGGiftEngine;
