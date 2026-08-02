export declare class MessageService {
    static generateGiftMessage(params: {
        recipient: string;
        occasion: string;
        giftName: string;
        emotionalGoal: string;
        userPrompt?: string;
        mode?: 'write' | 'improve' | 'generate';
    }): Promise<{
        message: string;
    }>;
}
