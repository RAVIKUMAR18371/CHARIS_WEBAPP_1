import { prisma } from '../database/prisma';

export class GiftService {
  static async getAllGifts(category?: string) {
    const where = category ? { category } : {};
    const gifts = await prisma.gift.findMany({
      where,
      orderBy: { price: 'desc' },
    });

    return gifts.map((g) => ({
      ...g,
      galleryImages: JSON.parse(g.galleryImages || '[]'),
      tags: JSON.parse(g.tags || '[]'),
    }));
  }

  static async getGiftById(id: string) {
    const gift = await prisma.gift.findUnique({
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

  static async saveGift(userId: string, giftId: string) {
    const existing = await prisma.savedGift.findUnique({
      where: {
        userId_giftId: { userId, giftId },
      },
    });

    if (existing) {
      await prisma.savedGift.delete({
        where: { id: existing.id },
      });
      return { saved: false };
    }

    await prisma.savedGift.create({
      data: { userId, giftId },
    });

    return { saved: true };
  }

  static async getSavedGifts(userId: string) {
    const saved = await prisma.savedGift.findMany({
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
