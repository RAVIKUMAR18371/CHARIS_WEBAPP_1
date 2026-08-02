import { create } from 'zustand';
import { ChatMessage, CollectedInfo, Recommendation } from '../types';
import api from '../services/api';

interface ChatState {
  currentConversationId: string | null;
  messages: ChatMessage[];
  collectedInfo: CollectedInfo;
  isTyping: boolean;
  isComplete: boolean;
  recommendations: Recommendation[];
  setConversationId: (id: string) => void;
  startNewConsultation: () => Promise<string>;
  sendMessage: (message: string) => Promise<void>;
  generateRecommendations: () => Promise<Recommendation[]>;
  loadConversation: (id: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentConversationId: null,
  messages: [],
  collectedInfo: {},
  isTyping: false,
  isComplete: false,
  recommendations: [],

  setConversationId: (id) => set({ currentConversationId: id }),

  startNewConsultation: async () => {
    set({ isTyping: true });
    try {
      const res = await api.post('/chat/start');
      const { id, messages, collectedInformation } = res.data;
      set({
        currentConversationId: id,
        messages,
        collectedInfo: collectedInformation,
        isComplete: false,
        recommendations: [],
        isTyping: false,
      });
      return id;
    } catch (error) {
      set({ isTyping: false });
      throw error;
    }
  },

  sendMessage: async (content) => {
    const { currentConversationId, messages } = get();
    if (!currentConversationId) return;

    // Optimistic user update
    const updatedMessages: ChatMessage[] = [...messages, { role: 'user', content }];
    set({ messages: updatedMessages, isTyping: true });

    try {
      const res = await api.post('/chat/message', {
        conversationId: currentConversationId,
        message: content,
      });

      set({
        messages: res.data.messages,
        collectedInfo: res.data.collectedInformation,
        isComplete: res.data.isComplete,
        isTyping: false,
      });
    } catch (error) {
      set({ isTyping: false });
      throw error;
    }
  },

  generateRecommendations: async () => {
    const { currentConversationId } = get();
    if (!currentConversationId) return [];

    set({ isTyping: true });
    try {
      const res = await api.post('/recommendations/generate', {
        conversationId: currentConversationId,
      });

      set({
        recommendations: res.data.recommendations,
        collectedInfo: res.data.collectedInformation,
        isComplete: true,
        isTyping: false,
      });
      return res.data.recommendations;
    } catch (error) {
      set({ isTyping: false });
      throw error;
    }
  },

  loadConversation: async (id) => {
    set({ isTyping: true });
    try {
      const res = await api.get(`/chat/${id}`);
      set({
        currentConversationId: res.data.id,
        messages: res.data.messages,
        collectedInfo: res.data.collectedInformation,
        recommendations: res.data.recommendations || [],
        isComplete: res.data.status === 'COMPLETED',
        isTyping: false,
      });
    } catch (error) {
      set({ isTyping: false });
      throw error;
    }
  },
}));
