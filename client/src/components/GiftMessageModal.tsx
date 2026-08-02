'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Copy, Check, Wand2, Edit3, Send } from 'lucide-react';
import { LuxuryButton } from './LuxuryButton';
import api from '../services/api';

interface GiftMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftName: string;
}

export const GiftMessageModal: React.FC<GiftMessageModalProps> = ({
  isOpen,
  onClose,
  giftName,
}) => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [emotionalGoal, setEmotionalGoal] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [mode, setMode] = useState<'generate' | 'improve' | 'write'>('generate');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (selectedMode?: 'generate' | 'improve' | 'write') => {
    const activeMode = selectedMode || mode;
    setIsGenerating(true);
    try {
      const res = await api.post('/message/generate', {
        recipient: recipient || 'Beloved',
        occasion: occasion || 'Special Milestone',
        giftName,
        emotionalGoal: emotionalGoal || 'everlasting devotion',
        userPrompt,
        mode: activeMode,
      });
      setGeneratedMessage(res.data.message);
    } catch (err) {
      console.error('Failed to generate message', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B090A]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl glass-panel-gold rounded-2xl border border-[#D4AF37]/40 p-8 shadow-2xl space-y-6 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#4A0E22] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#4A0E22] flex items-center justify-center shadow-gold-glow">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-gold-gradient">
              AI Gift Note Generator
            </h3>
            <p className="text-xs text-[#C5BFB6]/70">
              Crafting poetic card notes for <span className="text-[#F3E5AB] font-serif">{giftName}</span>
            </p>
          </div>
        </div>

        {/* Mode Selectors */}
        <div className="grid grid-cols-3 gap-3 p-1 rounded-lg bg-[#141012] border border-[#D4AF37]/20 text-xs font-serif">
          <button
            onClick={() => { setMode('generate'); handleGenerate('generate'); }}
            className={`py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              mode === 'generate' ? 'bg-[#4A0E22] text-[#F3E5AB] border border-[#D4AF37]/40 shadow-sm' : 'text-[#C5BFB6] hover:text-[#F9F6F0]'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" /> Full AI Compose
          </button>
          <button
            onClick={() => setMode('improve')}
            className={`py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              mode === 'improve' ? 'bg-[#4A0E22] text-[#F3E5AB] border border-[#D4AF37]/40 shadow-sm' : 'text-[#C5BFB6] hover:text-[#F9F6F0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Polish My Draft
          </button>
          <button
            onClick={() => setMode('write')}
            className={`py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              mode === 'write' ? 'bg-[#4A0E22] text-[#F3E5AB] border border-[#D4AF37]/40 shadow-sm' : 'text-[#C5BFB6] hover:text-[#F9F6F0]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Write Manually
          </button>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#D4AF37] mb-1">Recipient Name</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Eleanor, Mom, Alexander"
              className="w-full bg-[#161214] border border-[#D4AF37]/30 rounded-md px-3 py-2 text-[#F9F6F0] focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#D4AF37] mb-1">Occasion</label>
            <input
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="e.g. 10th Anniversary, Birthday"
              className="w-full bg-[#161214] border border-[#D4AF37]/30 rounded-md px-3 py-2 text-[#F9F6F0] focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
        </div>

        {(mode === 'improve' || mode === 'write') && (
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#D4AF37] mb-1">Your Words / Initial Draft</label>
            <textarea
              rows={3}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Enter your rough thoughts or message..."
              className="w-full bg-[#161214] border border-[#D4AF37]/30 rounded-md p-3 text-[#F9F6F0] focus:border-[#D4AF37] focus:outline-none font-sans"
            />
          </div>
        )}

        {/* Generate Trigger Button */}
        {mode !== 'write' && (
          <LuxuryButton
            variant="gold"
            size="sm"
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? 'Infusing Eloquence...' : 'Generate Gift Message'}
          </LuxuryButton>
        )}

        {/* Message Card Result */}
        <div className="p-6 rounded-xl bg-[#141012] border border-[#D4AF37]/30 relative font-serif text-sm leading-relaxed text-[#F3E5AB] shadow-inner">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-2 font-sans">
            Handwritten Gift Card Preview
          </div>
          {mode === 'write' ? (
            <textarea
              rows={4}
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value);
                setGeneratedMessage(e.target.value);
              }}
              placeholder="Type your personal message here..."
              className="w-full bg-transparent border-none text-[#F3E5AB] focus:outline-none font-serif italic"
            />
          ) : (
            <p className="whitespace-pre-wrap italic">
              {generatedMessage || "Click 'Generate Gift Message' to see your bespoke card note."}
            </p>
          )}

          {generatedMessage && (
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-[#4A0E22] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#6B1432] transition-colors"
            >
              {isCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              {isCopied ? 'Copied' : 'Copy Note'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
