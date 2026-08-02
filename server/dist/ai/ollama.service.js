"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaService = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
class OllamaService {
    baseUrl;
    model;
    constructor() {
        this.baseUrl = env_1.config.ollamaBaseUrl;
        this.model = env_1.config.ollamaModel;
    }
    getSystemPrompt() {
        return `You are CHARIS, an elite AI Luxury Gifting Concierge.
Your purpose is to guide users through an intimate, poetic, and elevated gift consultation experience. You never sound like a traditional e-commerce search engine or simple chatbot. You speak with high-end luxury sophistication, warmth, and deep emotional intelligence.

Your Objectives:
1. Speak elegantly, warmly, and authentically. Use evocative, refined language.
2. Ask one clear, thoughtful follow-up question at a time to uncover:
   - Who the recipient is
   - The specific relationship/milestone
   - The recipient's personality & distinctive interests
   - The emotional intention/feeling the gift should evoke
   - The intended budget or tier
3. Never overwhelm the user. Maintain conversational flow and store details seamlessly.
4. When you have gathered enough context (at least recipient, occasion/relationship, and personality/emotional goal), politely summarize what you have discovered and invite them to view their bespoke recommendations.`;
    }
    async generateResponse(messages, collectedInfo) {
        try {
            const fullMessages = [
                { role: 'system', content: this.getSystemPrompt() },
                ...messages.map((m) => ({ role: m.role, content: m.content })),
            ];
            const response = await axios_1.default.post(`${this.baseUrl}/api/chat`, {
                model: this.model,
                messages: fullMessages,
                stream: false,
            }, { timeout: 5000 });
            const reply = response.data?.message?.content || "Allow me to assist you in discovering the ideal token of appreciation.";
            const updatedInfo = await this.analyzeConversation(messages);
            const isComplete = Boolean(updatedInfo.recipient &&
                updatedInfo.occasion &&
                (updatedInfo.personality || updatedInfo.interests || updatedInfo.emotionalGoal));
            return { reply, updatedInfo, isComplete };
        }
        catch (error) {
            console.warn(`[OllamaService] Connection/Model issue: ${error?.response?.data?.error || error?.message || error}. Handing over to Fallback Engine.`);
            throw new Error('OLLAMA_UNAVAILABLE');
        }
    }
    async analyzeConversation(messages) {
        try {
            const text = messages.map((m) => `${m.role}: ${m.content}`).join('\n');
            const prompt = `Analyze this conversation between a user and CHARIS Luxury Concierge. Extract the following details into a JSON object:
- recipient
- relationship
- occasion
- personality
- interests
- budget
- emotionalGoal

Return ONLY valid JSON.
Conversation:
${text}`;
            const response = await axios_1.default.post(`${this.baseUrl}/api/generate`, {
                model: this.model,
                prompt,
                stream: false,
                format: 'json',
            }, { timeout: 5000 });
            const jsonString = response.data?.response;
            return JSON.parse(jsonString);
        }
        catch {
            return {};
        }
    }
    async generateGiftRecommendations(collectedInfo, availableGifts) {
        try {
            const prompt = `As CHARIS Luxury Concierge, select the top 3 gifts from this luxury inventory for the client based on their profile:
Profile: ${JSON.stringify(collectedInfo)}
Inventory: ${JSON.stringify(availableGifts.map((g) => ({ id: g.id, name: g.name, category: g.category, story: g.story })))}

For each selected gift, provide:
1. whyChosen: Refined explanation why it matches.
2. emotionalReasoning: Poetic description of the emotional impact.

Return a JSON array of objects with keys: giftId, whyChosen, emotionalReasoning.`;
            const response = await axios_1.default.post(`${this.baseUrl}/api/generate`, {
                model: this.model,
                prompt,
                stream: false,
                format: 'json',
            }, { timeout: 5000 });
            const items = JSON.parse(response.data?.response);
            return items.slice(0, 5).map((item) => {
                const gift = availableGifts.find((g) => g.id === item.giftId) || availableGifts[0];
                return {
                    gift,
                    whyChosen: item.whyChosen || "Curated specifically for timeless resonance.",
                    emotionalReasoning: item.emotionalReasoning || "Embodies everlasting devotion and reverence.",
                };
            });
        }
        catch (error) {
            console.warn(`[OllamaService] Recommendations error. Handing over to Fallback Engine.`);
            throw new Error('OLLAMA_UNAVAILABLE');
        }
    }
    async generateGiftMessage(recipient, occasion, giftName, emotionalGoal, userPrompt, mode = 'generate') {
        try {
            const prompt = `As CHARIS Luxury Concierge, draft a deeply moving, elegant, handwritten-style gift note.
Recipient: ${recipient}
Occasion: ${occasion}
Gift Token: ${giftName}
Emotional Tone: ${emotionalGoal || 'profound affection and gratitude'}
User Input: ${userPrompt || ''}
Mode: ${mode}

Write only the final beautiful note text.`;
            const response = await axios_1.default.post(`${this.baseUrl}/api/generate`, {
                model: this.model,
                prompt,
                stream: false,
            }, { timeout: 5000 });
            return response.data?.response?.trim() || "With all my heart, today and always.";
        }
        catch (error) {
            console.warn(`[OllamaService] Gift message error. Handing over to Fallback Engine.`);
            throw new Error('OLLAMA_UNAVAILABLE');
        }
    }
}
exports.OllamaService = OllamaService;
