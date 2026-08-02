'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, History, Heart, Plus, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { LuxuryButton } from '../../components/LuxuryButton';
import { GiftCard } from '../../components/GiftCard';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';
import { Conversation, SavedGift } from '../../types';
import api from '../../services/api';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const { startNewConsultation, loadConversation } = useChatStore();

  const [history, setHistory] = useState<Conversation[]>([]);
  const [savedGifts, setSavedGifts] = useState<SavedGift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [histRes, savedRes] = await Promise.all([
        api.get('/chat/history'),
        api.get('/gifts/saved'),
      ]);
      setHistory(histRes.data);
      setSavedGifts(savedRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNew = async () => {
    try {
      const newId = await startNewConsultation();
      router.push('/consultation');
    } catch (err) {
      console.error('Failed to start consultation', err);
    }
  };

  const handleOpenConversation = async (id: string) => {
    await loadConversation(id);
    router.push('/consultation');
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#0B090A]">
      {/* Header Banner */}
      <div className="glass-panel-gold rounded-2xl p-8 border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Client Suite & Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F9F6F0]">
            Welcome, {user?.name || 'V.I.P. Client'}
          </h1>
          <p className="text-xs text-[#C5BFB6]/80 font-light max-w-xl">
            Access your active luxury gift consultations, review past recommendations, and manage your saved heirlooms.
          </p>
        </div>

        <LuxuryButton variant="gold" size="lg" onClick={handleStartNew}>
          <Plus className="w-4 h-4 mr-1" /> Start New Consultation
        </LuxuryButton>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Left 2 Cols: Previous Consultations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#F9F6F0] flex items-center gap-2">
              <History className="w-5 h-5 text-[#D4AF37]" /> Previous Consultations
            </h2>
            <span className="text-xs text-[#D4AF37] font-serif italic">
              {history.length} Saved Sessions
            </span>
          </div>

          {history.length === 0 ? (
            <div className="glass-panel p-8 rounded-xl text-center space-y-4 border border-[#D4AF37]/20">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <p className="font-serif text-sm text-[#F3E5AB]">No active consultations found.</p>
              <p className="text-xs text-[#C5BFB6]/60">Begin your first dialogue with CHARIS AI Concierge today.</p>
              <LuxuryButton variant="outline" size="sm" onClick={handleStartNew}>
                Initiate First Dialogue
              </LuxuryButton>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((conv) => (
                <motion.div
                  key={conv.id}
                  whileHover={{ x: 4 }}
                  onClick={() => handleOpenConversation(conv.id)}
                  className="glass-panel p-5 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-[#F9F6F0] group-hover:text-gold-gradient transition-colors">
                        Recipient: {conv.collectedInformation?.recipient || 'Loved One'}
                      </span>
                      <span
                        className={`text-[9px] uppercase px-2 py-0.5 rounded-full ${
                          conv.status === 'COMPLETED'
                            ? 'bg-[#4A0E22] text-[#F3E5AB] border border-[#D4AF37]/40'
                            : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {conv.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#C5BFB6]/70 line-clamp-1 font-light">
                      Occasion: {conv.collectedInformation?.occasion || 'Special Milestone'} • Emotional Goal: {conv.collectedInformation?.emotionalGoal || 'Resonance'}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-[#D4AF37]/70">
                      <Clock className="w-3 h-3" /> {new Date(conv.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-serif group-hover:translate-x-1 transition-transform">
                    Open Session <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Actions & Concierge Notes */}
        <div className="space-y-6">
          <div className="glass-panel-gold p-6 rounded-xl border border-[#D4AF37]/30 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F3E5AB] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Concierge Directives
            </h3>
            <p className="text-xs text-[#C5BFB6] leading-relaxed font-light">
              CHARIS remembers your previous recipient preferences and emotional intent across consultations, ensuring consistent personal storytelling.
            </p>
            <div className="pt-2">
              <LuxuryButton variant="gold" size="sm" onClick={handleStartNew} className="w-full">
                New Consultation
              </LuxuryButton>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Luxury Gifts Section */}
      <div className="space-y-6 pt-6">
        <h2 className="font-serif text-2xl font-bold text-[#F9F6F0] flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#D4AF37]" /> Saved Luxury Artifacts
        </h2>

        {savedGifts.length === 0 ? (
          <div className="glass-panel p-8 rounded-xl text-center space-y-2 border border-[#D4AF37]/20 text-xs text-[#C5BFB6]/70">
            No saved gifts yet. Explore concierge recommendations or product details to save items here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedGifts.map((item) => (
              <GiftCard key={item.id} gift={item.gift} isSavedInitial={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
