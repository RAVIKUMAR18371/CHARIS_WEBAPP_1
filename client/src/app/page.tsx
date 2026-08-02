'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Award, Compass, ArrowRight, MessageSquare, BookOpen, Layers } from 'lucide-react';
import { LuxuryButton } from '../components/LuxuryButton';
import { useAuthStore } from '../store/authStore';

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="relative overflow-hidden bg-[#0B090A] text-[#F9F6F0]">
      {/* Subtle Glowing Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#4A0E22]/30 via-[#2D0814]/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#4A0E22]/30 text-xs font-serif tracking-[0.2em] text-[#F3E5AB] backdrop-blur-md shadow-gold-glow"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            HAUTE AI CONCIERGE EXPERIENCE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F9F6F0] leading-[1.1]"
          >
            CHARIS
            <span className="block text-3xl sm:text-5xl lg:text-6xl font-normal italic text-gold-gradient mt-3 font-serif">
              "Where every gift tells a story"
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-[#C5BFB6]/90 font-light leading-relaxed"
          >
            Step away from generic e-commerce catalogs. Converse with your private AI Gifting Concierge to uncover deep emotional intentions, personal nuances, and bespoke luxury tokens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link href={isAuthenticated ? "/consultation" : "/register"}>
              <LuxuryButton variant="gold" size="lg" className="w-full sm:w-auto">
                Consult The AI Concierge <ArrowRight className="w-4 h-4 ml-2" />
              </LuxuryButton>
            </Link>

            <Link href="#how-it-works">
              <LuxuryButton variant="outline" size="lg" className="w-full sm:w-auto">
                Explore The Experience
              </LuxuryButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY & ABOUT SECTION */}
      <section id="about" className="py-24 border-t border-[#D4AF37]/15 bg-[#141012]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                The Charis Distinction
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F9F6F0] leading-tight">
                Gifting is an act of profound emotional storytelling.
              </h2>
              <p className="text-sm text-[#C5BFB6] leading-relaxed font-light">
                Traditional platforms reduce luxury to price tags and search filters. CHARIS elevates the process by listening to your memories, understanding the soul of your relationship, and articulating the exact emotional resonance you wish to convey.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-[#1C1518] border border-[#D4AF37]/20">
                  <h4 className="font-serif text-sm font-semibold text-[#F3E5AB] mb-1">Empathetic LLM Intelligence</h4>
                  <p className="text-xs text-[#C5BFB6]/70">Understands relationship dynamics, sentiment, and emotional goals.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#1C1518] border border-[#D4AF37]/20">
                  <h4 className="font-serif text-sm font-semibold text-[#F3E5AB] mb-1">RAG Knowledge Base</h4>
                  <p className="text-xs text-[#C5BFB6]/70">Matches handcrafted artifacts from high horology to fine art.</p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Showcase Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel-gold p-8 rounded-2xl border border-[#D4AF37]/30 shadow-2xl relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                <span className="font-serif text-xs tracking-widest text-[#F9F6F0] uppercase">
                  Concierge Dialogue Snippet
                </span>
              </div>
              <div className="space-y-4 text-xs font-serif leading-relaxed">
                <div className="p-4 rounded-lg bg-[#4A0E22]/40 border border-[#D4AF37]/30 text-[#F3E5AB]">
                  "Tell me more about your anniversary. What feeling do you wish to evoke when she opens this velvet casing?"
                </div>
                <div className="p-4 rounded-lg bg-[#0B090A] border border-[#D4AF37]/20 text-[#F9F6F0] text-right font-sans">
                  "I want her to feel that every moment of our decade together has been treasured."
                </div>
                <div className="p-4 rounded-lg bg-[#4A0E22]/40 border border-[#D4AF37]/30 text-[#F3E5AB]">
                  "Then we shall seek horological art that measures eternity—a timepiece forged in gold with a heart that never stops."
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">The Journey</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F9F6F0]">Four Steps to Bespoke Elegance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {[
              {
                step: "01",
                title: "Initiate Consultation",
                desc: "Begin an intimate dialogue with CHARIS. Share details about recipient, milestone, and interests.",
                icon: MessageSquare,
              },
              {
                step: "02",
                title: "Emotional Intent",
                desc: "CHARIS uncovers the sentiment—whether it's timeless devotion, gratitude, or quiet awe.",
                icon: Heart,
              },
              {
                step: "03",
                title: "RAG Curation",
                desc: "Our vector intelligence searches handcrafted luxury items matching your specific narrative.",
                icon: Sparkles,
              },
              {
                step: "04",
                title: "Story & Gift Note",
                desc: "Receive curated options with handwritten-style AI gift notes to accompany your token.",
                icon: BookOpen,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel p-6 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-[#D4AF37]">{item.step}</span>
                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#F9F6F0]">{item.title}</h3>
                  <p className="text-xs text-[#C5BFB6] font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY CTA */}
      <section className="py-24 bg-gradient-to-r from-[#4A0E22] via-[#2D0814] to-[#4A0E22] border-t border-b border-[#D4AF37]/30 text-center relative">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto animate-bounce" />
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#F9F6F0]">
            Experience Private AI Luxury Curation
          </h2>
          <p className="text-base text-[#F3E5AB]/90 font-light max-w-xl mx-auto">
            Allow CHARIS to compose your next unforgettable gesture of appreciation today.
          </p>
          <Link href={isAuthenticated ? "/consultation" : "/register"} className="inline-block">
            <LuxuryButton variant="gold" size="lg">
              Start Gift Consultation Now
            </LuxuryButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
