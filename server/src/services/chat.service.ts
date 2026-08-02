import { prisma } from '../database/prisma';
import { AIFactory } from '../ai/ai.factory';
import { ChatMessage, CollectedInfo } from '../ai/ai.interface';

export class ChatService {
  static async startConversation(userId: string) {
    const initialMessage: ChatMessage = {
      role: 'assistant',
      content: 'Welcome to CHARIS. I would love to help you find something meaningful. Who are we celebrating today?',
    };

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        messages: JSON.stringify([initialMessage]),
        collectedInformation: JSON.stringify({}),
        status: 'ACTIVE',
      },
    });

    return {
      id: conversation.id,
      messages: [initialMessage],
      collectedInformation: {},
      status: conversation.status,
      createdAt: conversation.createdAt,
    };
  }

  static async sendMessage(userId: string, conversationId: string, messageContent: string) {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.userId !== userId) {
      throw { status: 404, message: 'Conversation not found.' };
    }

    const messages: ChatMessage[] = JSON.parse(conversation.messages || '[]');
    const existingInfo: CollectedInfo = JSON.parse(conversation.collectedInformation || '{}');

    // Add user message
    messages.push({ role: 'user', content: messageContent });

    // Generate AI response
    const aiService = AIFactory.getService();
    const { reply, updatedInfo, isComplete } = await aiService.generateResponse(messages, existingInfo);

    // Add assistant reply
    messages.push({ role: 'assistant', content: reply });

    const newStatus = isComplete ? 'COMPLETED' : 'ACTIVE';

    const updated = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        messages: JSON.stringify(messages),
        collectedInformation: JSON.stringify(updatedInfo),
        status: newStatus,
      },
    });

    return {
      id: updated.id,
      messages,
      collectedInformation: updatedInfo,
      status: updated.status,
      isComplete,
    };
  }

  static async getHistory(userId: string) {
    const conversations = await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        recommendations: {
          include: { gift: true },
        },
      },
    });

    return conversations.map((c) => ({
      id: c.id,
      status: c.status,
      messages: JSON.parse(c.messages || '[]'),
      collectedInformation: JSON.parse(c.collectedInformation || '{}'),
      recommendations: c.recommendations,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }

  static async getConversationById(userId: string, conversationId: string) {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        recommendations: {
          include: { gift: true },
        },
      },
    });

    if (!conversation || conversation.userId !== userId) {
      throw { status: 404, message: 'Conversation not found.' };
    }

    return {
      id: conversation.id,
      status: conversation.status,
      messages: JSON.parse(conversation.messages || '[]'),
      collectedInformation: JSON.parse(conversation.collectedInformation || '{}'),
      recommendations: conversation.recommendations,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  }
}
