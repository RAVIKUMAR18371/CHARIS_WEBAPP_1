import { GiftItem, CollectedInfo } from './ai.interface';
export declare class RAGGiftEngine {
    /**
     * RAG Vector/Semantic similarity search over gift knowledge base.
     * Ranks gifts according to context vectors built from recipient, occasion, personality, interests & emotional intention.
     */
    static rankGifts(gifts: GiftItem[], context: CollectedInfo): GiftItem[];
}
