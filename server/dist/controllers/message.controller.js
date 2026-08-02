"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const message_service_1 = require("../services/message.service");
class MessageController {
    static async generate(req, res, next) {
        try {
            const { recipient, occasion, giftName, emotionalGoal, userPrompt, mode } = req.body;
            const result = await message_service_1.MessageService.generateGiftMessage({
                recipient,
                occasion,
                giftName,
                emotionalGoal,
                userPrompt,
                mode,
            });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.MessageController = MessageController;
