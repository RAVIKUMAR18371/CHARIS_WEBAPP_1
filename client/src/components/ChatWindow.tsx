'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { LuxuryButton } from './LuxuryButton';
import { useChatStore } from '../store/chatStore';
import { useRouter } from 'next/navigation';

export const ChatWindow: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    messages,
    collectedInfo,
    isTyping,
    isComplete,
    sendMessage,
    generateRecommendations,
  } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const msg = inputMessage;
    setInputMessage('');
    try {
      await sendMessage(msg);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const handleChipClick = (chipText: string) => {
    setInputMessage(chipText);
  };

  const handleRevealRecommendations = async () => {
    try {
      await generateRecommendations();
      router.push('/recommendations');
    } catch (error) {
      console.error('Failed to generate recommendations', error);
    }
  };

  const promptChips = [
    "Celebrating an upcoming anniversary",
    "Looking for timeless horology & watches",
    "Bespoke niche perfume & fragrance",
    "A spontaneous gesture of everlasting love",
  ];

  return (
    <div className="flex flex-col h-[750px] w-full max-w-4xl mx-auto glass-panel-gold rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/30">
      {/* Header Bar */}
      <div className="p-4 bg-[#0B090A]/80 border-b border-[#D4AF37]/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse" />
          <div>
            <h3 className="font-serif text-sm tracking-widest text-[#F9F6F0] uppercase">
              CHARIS Private Consultation
            </h3>
            <p className="text-[10px] text-[#C5BFB6]/60">AI Luxury Gifting Advisor</p>
          </div>
        </div>

        {/* Collected info pill tags */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          {collectedInfo.recipient && (
            <span className="px-2.5 py-1 rounded-full border border-[#D4AF37]/40 bg-[#4A0E22]/40 text-[#F3E5AB]">
              {collectedInfo.recipient}
            </span>
          )}
          {collectedInfo.occasion && (
            <span className="px-2.5 py-1 rounded-full border border-[#D4AF37]/40 bg-[#4A0E22]/40 text-[#F3E5AB]">
              {collectedInfo.occasion}
            </span>
          )}
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {/* AI Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 glass-panel rounded-lg max-w-xs border border-[#D4AF37]/30"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
              <span className="text-xs font-serif italic text-[#D4AF37]">
                CHARIS is contemplating your story...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Completion Banner CTA */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-[#4A0E22] via-[#2D0814] to-[#4A0E22] border-t border-b border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs font-serif text-[#F9F6F0]">
              Essential details collected. Ready to reveal curated luxury recommendations.
            </span>
          </div>
          <LuxuryButton variant="gold" size="sm" onClick={handleRevealRecommendations}>
            View Recommendations
          </LuxuryButton>
        </motion.div>
      )}

      {/* Dynamic Prompt Suggestion Chips */}
      {!isComplete && (
        <div className="px-4 py-2 bg-[#0B090A]/60 flex items-center gap-2 overflow-x-auto border-t border-[#D4AF37]/10 text-xs">
          <span className="text-[10px] uppercase text-[#D4AF37] tracking-widest shrink-0">Prompts:</span>
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="px-3 py-1 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37] bg-[#1C1518] hover:bg-[#4A0E22]/50 text-[#C5BFB6] hover:text-[#F3E5AB] text-[11px] whitespace-nowrap transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-[#0B090A] border-t border-[#D4AF37]/20 flex items-center gap-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Share your thoughts with the Concierge..."
          disabled={isTyping}
          className="flex-1 bg-[#161214] border border-[#D4AF37]/30 rounded-md px-4 py-3 text-sm text-[#F9F6F0] placeholder-[#C5BFB6]/40 focus:outline-none focus:border-[#D4AF37] transition-all font-sans"
        />
        <LuxuryButton type="submit" variant="gold" size="md" disabled={isTyping || !inputMessage.trim()}>
          <Send className="w-4 h-4" />
        </LuxuryButton>
      </form>
    </div>
  );
};
