"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../database/prisma");
const jwt_1 = require("../utils/jwt");
class AuthService {
    static async register(data) {
        const existing = await prisma_1.prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
        if (existing) {
            throw { status: 400, message: 'An account with this email already exists.' };
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                email: data.email.toLowerCase(),
                password: hashedPassword,
                name: data.name,
            },
        });
        const token = (0, jwt_1.generateToken)({ userId: user.id, email: user.email });
        return {
            user: { id: user.id, email: user.email, name: user.name },
            token,
        };
    }
    static async login(data) {
        const user = await prisma_1.prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
        if (!user) {
            throw { status: 401, message: 'Invalid credentials.' };
        }
        const isMatch = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isMatch) {
            throw { status: 401, message: 'Invalid credentials.' };
        }
        const token = (0, jwt_1.generateToken)({ userId: user.id, email: user.email });
        return {
            user: { id: user.id, email: user.email, name: user.name },
            token,
        };
    }
    static async getProfile(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, createdAt: true },
        });
        if (!user) {
            throw { status: 444, message: 'User not found.' };
        }
        return user;
    }
}
exports.AuthService = AuthService;
