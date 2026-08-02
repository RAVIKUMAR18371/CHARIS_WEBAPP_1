"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chat_service_1 = require("../services/chat.service");
class ChatController {
    static async start(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            const result = await chat_service_1.ChatService.startConversation(userId);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async sendMessage(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { conversationId, message } = req.body;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            if (!conversationId || !message) {
                return res.status(400).json({ error: 'conversationId and message are required.' });
            }
            const result = await chat_service_1.ChatService.sendMessage(userId, conversationId, message);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async getHistory(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            const conversations = await chat_service_1.ChatService.getHistory(userId);
            res.status(200).json(conversations);
        }
        catch (err) {
            next(err);
        }
    }
    static async getById(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { id } = req.params;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            const conversation = await chat_service_1.ChatService.getConversationById(userId, id);
            res.status(200).json(conversation);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ChatController = ChatController;
