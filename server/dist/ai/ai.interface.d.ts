export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
export interface CollectedInfo {
    recipient?: string;
    relationship?: string;
    occasion?: string;
    personality?: string;
    interests?: string;
    budget?: string;
    emotionalGoal?: string;
}
export interface GiftItem {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    story: string;
    symbolicMeaning: string;
    imageUrl: string;
    tags: string[];
}
export interface RecommendedGift {
    gift: GiftItem;
    whyChosen: string;
    emotionalReasoning: string;
}
export interface AIService {
    generateResponse(messages: ChatMessage[], collectedInfo: CollectedInfo): Promise<{
        reply: string;
        updatedInfo: CollectedInfo;
        isComplete: boolean;
    }>;
    analyzeConversation(messages: ChatMessage[]): Promise<CollectedInfo>;
    generateGiftRecommendations(collectedInfo: CollectedInfo, availableGifts: GiftItem[]): Promise<RecommendedGift[]>;
    generateGiftMessage(recipient: string, occasion: string, giftName: string, emotionalGoal: string, userPrompt?: string, mode?: 'write' | 'improve' | 'generate'): Promise<string>;
}
