export declare class GiftService {
    static getAllGifts(category?: string): Promise<{
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
    }[]>;
    static getGiftById(id: string): Promise<{
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
    }>;
    static saveGift(userId: string, giftId: string): Promise<{
        saved: boolean;
    }>;
    static getSavedGifts(userId: string): Promise<{
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
        savedAt: Date;
    }[]>;
}
