"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftController = void 0;
const gift_service_1 = require("../services/gift.service");
class GiftController {
    static async getAll(req, res, next) {
        try {
            const category = req.query.category;
            const gifts = await gift_service_1.GiftService.getAllGifts(category);
            res.status(200).json(gifts);
        }
        catch (err) {
            next(err);
        }
    }
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const gift = await gift_service_1.GiftService.getGiftById(id);
            res.status(200).json(gift);
        }
        catch (err) {
            next(err);
        }
    }
    static async toggleSave(req, res, next) {
        try {
            const userId = req.user?.userId;
            const { giftId } = req.body;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            if (!giftId)
                return res.status(400).json({ error: 'giftId is required' });
            const result = await gift_service_1.GiftService.saveGift(userId, giftId);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async getSaved(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            const saved = await gift_service_1.GiftService.getSavedGifts(userId);
            res.status(200).json(saved);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.GiftController = GiftController;
