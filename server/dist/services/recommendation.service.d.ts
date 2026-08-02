import { CollectedInfo } from '../ai/ai.interface';
export declare class RecommendationService {
    static generateForConversation(userId: string, conversationId: string): Promise<{
        conversationId: string;
        collectedInformation: CollectedInfo;
        recommendations: {
            id: string;
            gift: {
                galleryImages: any;
                tags: any;
                id: string;
                name: string;
                createdAt: Date;
                category: string;
                price: number;
                description: string;
                story: string;
                symbolicMeaning: string;
                imageUrl: string;
            };
            whyChosen: string;
            emotionalReasoning: string;
        }[];
    }>;
}
