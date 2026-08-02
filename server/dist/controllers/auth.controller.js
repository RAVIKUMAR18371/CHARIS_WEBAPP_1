"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static async register(req, res, next) {
        try {
            const { email, password, name } = req.body;
            if (!email || !password || !name) {
                return res.status(400).json({ error: 'Name, email, and password are required.' });
            }
            const result = await auth_service_1.AuthService.register({ email, password, name });
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required.' });
            }
            const result = await auth_service_1.AuthService.login({ email, password });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async me(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            const user = await auth_service_1.AuthService.getProfile(userId);
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
