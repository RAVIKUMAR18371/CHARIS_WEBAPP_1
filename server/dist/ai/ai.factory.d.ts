import { AIService } from './ai.interface';
export declare class AIFactory {
    private static instance;
    static getService(): AIService;
}
