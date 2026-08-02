"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const chat_routes_1 = __importDefault(require("./chat.routes"));
const gift_routes_1 = __importDefault(require("./gift.routes"));
const recommendation_routes_1 = __importDefault(require("./recommendation.routes"));
const message_routes_1 = __importDefault(require("./message.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/chat', chat_routes_1.default);
router.use('/gifts', gift_routes_1.default);
router.use('/recommendations', recommendation_routes_1.default);
router.use('/message', message_routes_1.default);
exports.default = router;
