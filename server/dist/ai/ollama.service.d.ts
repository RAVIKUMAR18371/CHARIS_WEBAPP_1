import { AIService, ChatMessage, CollectedInfo, GiftItem, RecommendedGift } from './ai.interface';
export declare class OllamaService implements AIService {
    private baseUrl;
    private model;
    constructor();
    private getSystemPrompt;
    generateResponse(messages: ChatMessage[], collectedInfo: CollectedInfo): Promise<{
        reply: string;
        updatedInfo: CollectedInfo;
        isComplete: boolean;
    }>;
    analyzeConversation(messages: ChatMessage[]): Promise<CollectedInfo>;
    generateGiftRecommendations(collectedInfo: CollectedInfo, availableGifts: GiftItem[]): Promise<RecommendedGift[]>;
    generateGiftMessage(recipient: string, occasion: string, giftName: string, emotionalGoal: string, userPrompt?: string, mode?: 'write' | 'improve' | 'generate'): Promise<string>;
}
