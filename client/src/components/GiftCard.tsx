'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Gift } from '../types';
import { LuxuryButton } from './LuxuryButton';
import api from '../services/api';

interface GiftCardProps {
  gift: Gift;
  isSavedInitial?: boolean;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, isSavedInitial = false }) => {
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaving(true);
    try {
      const res = await api.post('/gifts/save', { giftId: gift.id });
      setIsSaved(res.data.saved);
    } catch (err) {
      console.error('Failed to save gift', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative glass-panel rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all flex flex-col h-full shadow-lg"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-[#141012]">
        <Image
          src={gift.imageUrl}
          alt={gift.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B090A] via-transparent to-transparent opacity-80" />

        {/* Category Tag */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-[#4A0E22]/80 backdrop-blur-md text-[#F3E5AB] border border-[#D4AF37]/30">
          {gift.category}
        </span>

        {/* Save Heart Button */}
        <button
          onClick={handleToggleSave}
          disabled={isSaving}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#0B090A]/60 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#4A0E22] transition-all"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D4AF37]' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-[#161214]/60">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-lg font-bold text-[#F9F6F0] group-hover:text-gold-gradient transition-colors">
              {gift.name}
            </h3>
            <span className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider shrink-0 ml-2">
              ${gift.price.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-[#C5BFB6]/80 leading-relaxed line-clamp-2 mb-4 font-light">
            {gift.description}
          </p>

          <div className="p-3 rounded-md bg-[#4A0E22]/20 border border-[#D4AF37]/15 mb-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
              <Sparkles className="w-3 h-3" /> Emotional Meaning
            </div>
            <p className="text-xs font-serif italic text-[#F3E5AB]/90 line-clamp-2">
              "{gift.symbolicMeaning}"
            </p>
          </div>
        </div>

        <Link href={`/gift/${gift.id}`}>
          <LuxuryButton variant="outline" size="sm" className="w-full">
            Discover Story <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </LuxuryButton>
        </Link>
      </div>
    </motion.div>
  );
};
