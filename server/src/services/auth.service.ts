import bcrypt from 'bcryptjs';
import { prisma } from '../database/prisma';
import { generateToken } from '../utils/jwt';

export class AuthService {
  static async register(data: { email: string; password: string; name: string }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (existing) {
      throw { status: 400, message: 'An account with this email already exists.' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: hashedPassword,
        name: data.name,
      },
    });

    const token = generateToken({ userId: user.id, email: user.email });
    return {
      user: { id: user.id, email: user.email, name: user.name },
      token,
    };
  }

  static async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (!user) {
      throw { status: 401, message: 'Invalid credentials.' };
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw { status: 401, message: 'Invalid credentials.' };
    }

    const token = generateToken({ userId: user.id, email: user.email });
    return {
      user: { id: user.id, email: user.email, name: user.name },
      token,
    };
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    if (!user) {
      throw { status: 444, message: 'User not found.' };
    }
    return user;
  }
}
