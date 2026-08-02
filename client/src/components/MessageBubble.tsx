'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User as UserIcon } from 'lucide-react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex items-start gap-4 my-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      {isAssistant && (
        <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#4A0E22] to-[#0B090A] flex items-center justify-center shrink-0 shadow-gold-glow">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
        </div>
      )}

      <div
        className={`max-w-xl p-5 rounded-lg text-sm leading-relaxed ${
          isAssistant
            ? 'glass-panel-gold text-[#F9F6F0] font-serif border border-[#D4AF37]/30 shadow-lg'
            : 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B090A] font-sans font-medium rounded-tr-none shadow-md'
        }`}
      >
        {isAssistant && (
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-sans mb-1 font-semibold">
            CHARIS Concierge
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {!isAssistant && (
        <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#1C1518] flex items-center justify-center shrink-0 text-[#D4AF37]">
          <UserIcon className="w-5 h-5" />
        </div>
      )}
    </motion.div>
  );
};
