"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./prisma");
const seedData_1 = require("../utils/seedData");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function main() {
    console.log('🌱 Seeding CHARIS database...');
    // Clean existing gifts
    await prisma_1.prisma.recommendation.deleteMany();
    await prisma_1.prisma.savedGift.deleteMany();
    await prisma_1.prisma.gift.deleteMany();
    for (const item of seedData_1.luxuryGiftsSeed) {
        await prisma_1.prisma.gift.create({
            data: item,
        });
    }
    // Create demo user
    const demoEmail = 'client@charis.com';
    const existingUser = await prisma_1.prisma.user.findUnique({ where: { email: demoEmail } });
    if (!existingUser) {
        const hashedPassword = await bcryptjs_1.default.hash('password123', 10);
        await prisma_1.prisma.user.create({
            data: {
                email: demoEmail,
                password: hashedPassword,
                name: 'Lord Alexander',
            },
        });
        console.log('✅ Demo user created: client@charis.com / password123');
    }
    console.log(`✅ ${seedData_1.luxuryGiftsSeed.length} Luxury Gifts successfully seeded!`);
}
main()
    .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.prisma.$disconnect();
});
