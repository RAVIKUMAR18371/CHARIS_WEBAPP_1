"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftService = void 0;
const prisma_1 = require("../database/prisma");
class GiftService {
    static async getAllGifts(category) {
        const where = category ? { category } : {};
        const gifts = await prisma_1.prisma.gift.findMany({
            where,
            orderBy: { price: 'desc' },
        });
        return gifts.map((g) => ({
            ...g,
            galleryImages: JSON.parse(g.galleryImages || '[]'),
            tags: JSON.parse(g.tags || '[]'),
        }));
    }
    static async getGiftById(id) {
        const gift = await prisma_1.prisma.gift.findUnique({
            where: { id },
        });
        if (!gift) {
            throw { status: 404, message: 'Gift item not found.' };
        }
        return {
            ...gift,
            galleryImages: JSON.parse(gift.galleryImages || '[]'),
            tags: JSON.parse(gift.tags || '[]'),
        };
    }
    static async saveGift(userId, giftId) {
        const existing = await prisma_1.prisma.savedGift.findUnique({
            where: {
                userId_giftId: { userId, giftId },
            },
        });
        if (existing) {
            await prisma_1.prisma.savedGift.delete({
                where: { id: existing.id },
            });
            return { saved: false };
        }
        await prisma_1.prisma.savedGift.create({
            data: { userId, giftId },
        });
        return { saved: true };
    }
    static async getSavedGifts(userId) {
        const saved = await prisma_1.prisma.savedGift.findMany({
            where: { userId },
            include: { gift: true },
            orderBy: { createdAt: 'desc' },
        });
        return saved.map((s) => ({
            id: s.id,
            gift: {
                ...s.gift,
                galleryImages: JSON.parse(s.gift.galleryImages || '[]'),
                tags: JSON.parse(s.gift.tags || '[]'),
            },
            savedAt: s.createdAt,
        }));
    }
}
exports.GiftService = GiftService;
