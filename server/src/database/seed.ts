import { prisma } from './prisma';
import { luxuryGiftsSeed } from '../utils/seedData';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Seeding CHARIS database...');

  // Clean existing gifts
  await prisma.recommendation.deleteMany();
  await prisma.savedGift.deleteMany();
  await prisma.gift.deleteMany();

  for (const item of luxuryGiftsSeed) {
    await prisma.gift.create({
      data: item,
    });
  }

  // Create demo user
  const demoEmail = 'client@charis.com';
  const existingUser = await prisma.user.findUnique({ where: { email: demoEmail } });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        email: demoEmail,
        password: hashedPassword,
        name: 'Lord Alexander',
      },
    });
    console.log('✅ Demo user created: client@charis.com / password123');
  }

  console.log(`✅ ${luxuryGiftsSeed.length} Luxury Gifts successfully seeded!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
