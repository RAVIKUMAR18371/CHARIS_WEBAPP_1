import { ChatMessage, CollectedInfo } from '../ai/ai.interface';
export declare class ChatService {
    static startConversation(userId: string): Promise<{
        id: string;
        messages: ChatMessage[];
        collectedInformation: {};
        status: string;
        createdAt: Date;
    }>;
    static sendMessage(userId: string, conversationId: string, messageContent: string): Promise<{
        id: string;
        messages: ChatMessage[];
        collectedInformation: CollectedInfo;
        status: string;
        isComplete: boolean;
    }>;
    static getHistory(userId: string): Promise<{
        id: string;
        status: string;
        messages: any;
        collectedInformation: any;
        recommendations: ({
            gift: {
                id: string;
                name: string;
                createdAt: Date;
                category: string;
                price: number;
                description: string;
                story: string;
                symbolicMeaning: string;
                imageUrl: string;
                galleryImages: string;
                tags: string;
            };
        } & {
            id: string;
            createdAt: Date;
            conversationId: string;
            giftId: string;
            whyChosen: string;
            emotionalReasoning: string;
        })[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    static getConversationById(userId: string, conversationId: string): Promise<{
        id: string;
        status: string;
        messages: any;
        collectedInformation: any;
        recommendations: ({
            gift: {
                id: string;
                name: string;
                createdAt: Date;
                category: string;
                price: number;
                description: string;
                story: string;
                symbolicMeaning: string;
                imageUrl: string;
                galleryImages: string;
                tags: string;
            };
        } & {
            id: string;
            createdAt: Date;
            conversationId: string;
            giftId: string;
            whyChosen: string;
            emotionalReasoning: string;
        })[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
