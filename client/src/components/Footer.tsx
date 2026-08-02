'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#0B090A] py-16 text-[#C5BFB6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#4A0E22]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="font-serif text-xl tracking-[0.25em] font-bold text-gold-gradient">
                CHARIS
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#C5BFB6]/80 font-light">
              Where luxury meets intelligence. Transforming gifting into unforgettable story-driven gestures of appreciation.
            </p>
          </div>

          {/* Pillars */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] uppercase">The Pillars</h4>
            <ul className="space-y-2 text-xs font-light">
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Curated Heritage Goods
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" /> Private AI Inference
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#D4AF37]" /> Emotional Storytelling
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] uppercase">Navigation</h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home Experience</Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-[#D4AF37] transition-colors">AI Concierge</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#D4AF37] transition-colors">Client Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Concierge Guarantee */}
          <div className="space-y-3 p-4 rounded-sm border border-[#D4AF37]/20 bg-[#161214]">
            <h4 className="font-serif text-xs tracking-widest text-[#F9F6F0] uppercase">Private Service</h4>
            <p className="text-[11px] text-[#C5BFB6]/70 leading-relaxed font-light">
              Our open-source AI operates strictly with client confidentiality. Every recommendation is uniquely tailored to your specific story.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#C5BFB6]/60">
          <p>© {new Date().getFullYear()} CHARIS Luxury AI Concierge. All Rights Reserved.</p>
          <p className="font-serif italic text-[#D4AF37]/80">"Where every gift tells a story"</p>
        </div>
      </div>
    </footer>
  );
};
