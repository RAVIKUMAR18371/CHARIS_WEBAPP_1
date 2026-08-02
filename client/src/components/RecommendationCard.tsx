'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, BookOpen } from 'lucide-react';
import { Recommendation } from '../types';
import { LuxuryButton } from './LuxuryButton';

interface RecommendationCardProps {
  recommendation: Recommendation;
  rank?: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, rank }) => {
  const { gift, whyChosen, emotionalReasoning } = recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (rank || 1) * 0.15 }}
      className="glass-panel-gold rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl flex flex-col lg:flex-row my-6 group"
    >
      {/* Image Gallery Showcase */}
      <div className="relative lg:w-2/5 h-80 lg:h-auto overflow-hidden bg-[#0B090A]">
        <Image
          src={gift.imageUrl}
          alt={gift.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B090A] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B090A]" />

        {rank && (
          <span className="absolute top-4 left-4 w-10 h-10 rounded-full border border-[#D4AF37] bg-[#4A0E22] text-[#D4AF37] font-serif text-lg font-bold flex items-center justify-center shadow-gold-glow">
            #{rank}
          </span>
        )}
      </div>

      {/* Story & Emotional Resonance Content */}
      <div className="p-8 lg:w-3/5 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full bg-[#4A0E22]/40">
              {gift.category}
            </span>
            <span className="font-serif text-xl font-bold text-gold-gradient">
              ${gift.price.toLocaleString()}
            </span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#F9F6F0] mb-3 group-hover:text-gold-gradient transition-colors">
            {gift.name}
          </h2>

          <p className="text-sm text-[#C5BFB6]/90 leading-relaxed font-light mb-6">
            {gift.description}
          </p>

          {/* AI Storytelling Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Why Chosen */}
            <div className="p-4 rounded-lg bg-[#141012] border border-[#D4AF37]/20">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Why Curated
              </div>
              <p className="text-xs text-[#EBE5DA]/80 leading-relaxed font-light">
                {whyChosen}
              </p>
            </div>

            {/* Emotional Meaning */}
            <div className="p-4 rounded-lg bg-[#4A0E22]/30 border border-[#D4AF37]/30">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3E5AB] font-semibold mb-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Emotional Resonance
              </div>
              <p className="text-xs font-serif italic text-[#F3E5AB] leading-relaxed">
                "{emotionalReasoning}"
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#D4AF37]/15">
          <Link href={`/gift/${gift.id}`} className="flex-1">
            <LuxuryButton variant="gold" size="md" className="w-full">
              Explore Product & Draft Message <ArrowRight className="w-4 h-4 ml-1" />
            </LuxuryButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
