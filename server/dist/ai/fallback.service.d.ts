import { AIService, ChatMessage, CollectedInfo, GiftItem, RecommendedGift } from './ai.interface';
export declare class FallbackService implements AIService {
    generateResponse(messages: ChatMessage[], existingInfo: CollectedInfo): Promise<{
        reply: string;
        updatedInfo: CollectedInfo;
        isComplete: boolean;
    }>;
    analyzeConversation(messages: ChatMessage[]): Promise<CollectedInfo>;
    generateGiftRecommendations(collectedInfo: CollectedInfo, availableGifts: GiftItem[]): Promise<RecommendedGift[]>;
    generateGiftMessage(recipient: string, occasion: string, giftName: string, emotionalGoal: string, userPrompt?: string, mode?: 'write' | 'improve' | 'generate'): Promise<string>;
}
