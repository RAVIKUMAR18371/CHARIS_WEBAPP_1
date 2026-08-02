"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackService = void 0;
class FallbackService {
    async generateResponse(messages, existingInfo) {
        const updatedInfo = await this.analyzeConversation(messages);
        const mergedInfo = { ...existingInfo, ...updatedInfo };
        const turn = messages.filter((m) => m.role === 'user').length;
        const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content.toLowerCase() || '';
        let reply = "";
        if (!mergedInfo.recipient) {
            reply = "Welcome to CHARIS. I am delighted to be your personal gifting concierge today. To begin our journey, whom are we celebrating?";
        }
        else if (!mergedInfo.relationship && !mergedInfo.occasion) {
            if (lastUserMsg.includes('wife') || lastUserMsg.includes('partner') || lastUserMsg.includes('husband')) {
                mergedInfo.relationship = 'Spouse / Partner';
            }
            else if (lastUserMsg.includes('mother') || lastUserMsg.includes('mom') || lastUserMsg.includes('father')) {
                mergedInfo.relationship = 'Parent';
            }
            reply = `Wonderful. Celebrating your ${mergedInfo.recipient} is a sacred endeavor. Is this for a romantic milestone, a birthday, an anniversary, or perhaps a spontaneous gesture of devotion?`;
        }
        else if (!mergedInfo.personality && !mergedInfo.interests) {
            reply = `Understood. To help me curate something that truly speaks to their soul, tell me about their world. What brings them quiet joy, or what aesthetic and passions define their personality?`;
        }
        else if (!mergedInfo.emotionalGoal) {
            reply = `That provides exquisite context. When they unpack this gesture, what emotional feeling do you want them to experience? (e.g., sense of timeless commitment, awe, comforting luxury, or heartfelt gratitude?)`;
        }
        else {
            reply = `Thank you. I have woven together the essence of your vision. I am ready to unveil a bespoke collection of luxury tokens curated specifically for your ${mergedInfo.recipient}. Shall we view your recommendations?`;
        }
        const isComplete = Boolean(mergedInfo.recipient &&
            (mergedInfo.occasion || mergedInfo.relationship) &&
            (mergedInfo.personality || mergedInfo.interests || turn >= 3));
        return {
            reply,
            updatedInfo: mergedInfo,
            isComplete,
        };
    }
    async analyzeConversation(messages) {
        const info = {};
        const text = messages.map((m) => m.content).join(' ').toLowerCase();
        // Recipient extraction
        if (text.includes('wife') || text.includes('spouse') || text.includes('partner'))
            info.recipient = 'Wife';
        else if (text.includes('husband'))
            info.recipient = 'Husband';
        else if (text.includes('mother') || text.includes('mom'))
            info.recipient = 'Mother';
        else if (text.includes('father') || text.includes('dad'))
            info.recipient = 'Father';
        else if (text.includes('friend'))
            info.recipient = 'Dear Friend';
        else if (text.includes('client') || text.includes('executive'))
            info.recipient = 'Valued Associate';
        // Occasion extraction
        if (text.includes('anniversary'))
            info.occasion = 'Anniversary';
        else if (text.includes('birthday'))
            info.occasion = 'Birthday';
        else if (text.includes('holiday') || text.includes('christmas'))
            info.occasion = 'Holiday Celebration';
        else if (text.includes('milestone') || text.includes('promotion'))
            info.occasion = 'Milestone Achievement';
        else if (text.includes('just because') || text.includes('gesture'))
            info.occasion = 'Gesture of Devotion';
        // Interests & Personality
        if (text.includes('art') || text.includes('gallery') || text.includes('design'))
            info.interests = 'Fine Arts & Aesthetics';
        if (text.includes('watch') || text.includes('horology') || text.includes('timepiece'))
            info.interests = 'Haute Horlogerie';
        if (text.includes('fashion') || text.includes('leather') || text.includes('style'))
            info.interests = 'Haute Couture';
        if (text.includes('fragrance') || text.includes('perfume') || text.includes('scent'))
            info.interests = 'Niche Artisanal Perfumery';
        // Emotional Goal
        if (text.includes('timeless') || text.includes('commitment') || text.includes('forever'))
            info.emotionalGoal = 'Timeless Devotion & Commitment';
        else if (text.includes('gratitude') || text.includes('thank'))
            info.emotionalGoal = 'Profound Gratitude';
        else if (text.includes('awe') || text.includes('impress') || text.includes('wonder'))
            info.emotionalGoal = 'Breathtaking Delight';
        return info;
    }
    async generateGiftRecommendations(collectedInfo, availableGifts) {
        const recipient = collectedInfo.recipient || 'your distinguished recipient';
        const emotionalGoal = collectedInfo.emotionalGoal || 'everlasting elegance';
        return availableGifts.slice(0, 4).map((gift, idx) => {
            const whyMap = [
                `Curated specifically to match ${recipient}'s refined taste and desire for timeless heirloom craftsmanship.`,
                `Chosen to symbolize the warmth and enduring bond of your shared history.`,
                `Selected as a understated yet profound luxury statement that resonates with artistic elegance.`,
                `Hand-picked for its unmatched tactile beauty, evoking immediate joy and lasting reverence.`,
            ];
            const emotionalMap = [
                `Represents timeless commitment and shared journeys, evoking a quiet sense of awe.`,
                `Captures memories in olfactory notes, grounding your bond in enduring nostalgia.`,
                `An heirloom artifact meant to pass through generations as a symbol of your devotion.`,
                `Reflects light and intimacy, reminding them daily of your thoughtful intention.`,
            ];
            return {
                gift,
                whyChosen: whyMap[idx % whyMap.length],
                emotionalReasoning: emotionalMap[idx % emotionalMap.length],
            };
        });
    }
    async generateGiftMessage(recipient, occasion, giftName, emotionalGoal, userPrompt, mode = 'generate') {
        if (mode === 'improve' && userPrompt) {
            return `Dearest ${recipient || 'Beloved'},\n\n${userPrompt.trim()}\n\nWith every passing moment, my gratitude for your presence in my life grows deeper. May this ${giftName} bring you as much light as you continually bestow upon me.\n\nWith all my love and devotion.`;
        }
        if (mode === 'write' && userPrompt) {
            return userPrompt;
        }
        return `Happy ${occasion || 'Special Day'}, my dearest ${recipient || 'one'}.\n\nWords often fall short of expressing the depth of what you mean to me. This ${giftName} was chosen not merely for its beauty, but because it mirrors the timeless elegance and warmth you bring into my life every day.\n\nHere is to our story, today and for all the chapters yet to come.\n\nWith all my love, always.`;
    }
}
exports.FallbackService = FallbackService;
