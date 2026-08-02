'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';
import { RecommendationCard } from '../../components/RecommendationCard';
import { LuxuryButton } from '../../components/LuxuryButton';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';

export default function RecommendationsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const { recommendations, collectedInfo, startNewConsultation } = useChatStore();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleStartNew = async () => {
    await startNewConsultation();
    router.push('/consultation');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-[#0B090A]">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#D4AF37]/20">
        <div>
          <Link href="/consultation" className="inline-flex items-center gap-2 text-xs text-[#D4AF37] font-serif mb-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Concierge Dialogue
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F9F6F0]">
            Curated Recommendations
          </h1>
          <p className="text-xs text-[#C5BFB6]/80 font-light mt-1">
            Bespoke luxury tokens matching your story for{' '}
            <span className="text-[#F3E5AB] font-semibold">{collectedInfo.recipient || 'your loved one'}</span>.
          </p>
        </div>

        <LuxuryButton variant="outline" size="sm" onClick={handleStartNew}>
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> New Consultation
        </LuxuryButton>
      </div>

      {/* Recommendations Feed */}
      {recommendations.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center space-y-4 border border-[#D4AF37]/30">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto animate-pulse" />
          <h2 className="font-serif text-xl font-bold text-[#F3E5AB]">No Recommendations Generated Yet</h2>
          <p className="text-xs text-[#C5BFB6]/80 max-w-md mx-auto">
            Please initiate or continue your dialogue with CHARIS AI Concierge to generate story-driven gift matches.
          </p>
          <LuxuryButton variant="gold" size="md" onClick={handleStartNew}>
            Start Consultation Dialogue
          </LuxuryButton>
        </div>
      ) : (
        <div className="space-y-8">
          {recommendations.map((rec, index) => (
            <RecommendationCard key={rec.id} recommendation={rec} rank={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
