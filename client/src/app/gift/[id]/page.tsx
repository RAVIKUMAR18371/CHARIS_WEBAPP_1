'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Truck, Award, ArrowLeft, BookOpen, Wand2 } from 'lucide-react';
import { LuxuryButton } from '../../../components/LuxuryButton';
import { GiftMessageModal } from '../../../components/GiftMessageModal';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import { Gift } from '../../../types';
import api from '../../../services/api';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [gift, setGift] = useState<Gift | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchGiftDetails();
    }
  }, [id]);

  const fetchGiftDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/gifts/${id}`);
      setGift(res.data);
      setActiveImage(res.data.imageUrl);
    } catch (err) {
      console.error('Failed to load gift details', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = async () => {
    if (!gift) return;
    try {
      const res = await api.post('/gifts/save', { giftId: gift.id });
      setIsSaved(res.data.saved);
    } catch (err) {
      console.error('Failed to save gift', err);
    }
  };

  if (loading || !gift) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#0B090A]">
      {/* Back button */}
      <Link href="/recommendations" className="inline-flex items-center gap-2 text-xs text-[#D4AF37] font-serif hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Recommendations
      </Link>

      {/* Main Grid: Gallery & Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: High-Res Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-[480px] w-full rounded-2xl overflow-hidden glass-panel-gold border border-[#D4AF37]/30 shadow-2xl">
            <Image
              src={activeImage || gift.imageUrl}
              alt={gift.name}
              fill
              className="object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B090A]/60 via-transparent to-transparent pointer-events-none" />
            <button
              onClick={handleToggleSave}
              className="absolute top-4 right-4 p-3 rounded-full bg-[#0B090A]/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#4A0E22] transition-colors"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#D4AF37]' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {gift.galleryImages && gift.galleryImages.length > 0 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {[gift.imageUrl, ...gift.galleryImages].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === img ? 'border-[#D4AF37] scale-105 shadow-gold-glow' : 'border-[#D4AF37]/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Gallery thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Emotional Meaning */}
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full bg-[#4A0E22]/40">
              {gift.category}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F9F6F0] mt-4 mb-2">
              {gift.name}
            </h1>
            <p className="font-serif text-2xl font-bold text-gold-gradient mb-6">
              ${gift.price.toLocaleString()} USD
            </p>
            <p className="text-sm text-[#C5BFB6] font-light leading-relaxed">
              {gift.description}
            </p>
          </div>

          {/* Story & Symbolic Meaning */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[#161214] border border-[#D4AF37]/20 space-y-2">
              <h3 className="font-serif text-sm font-semibold text-[#D4AF37] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Heritage & Craftsmanship Story
              </h3>
              <p className="text-xs text-[#C5BFB6]/90 leading-relaxed font-light">
                {gift.story}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#4A0E22]/30 border border-[#D4AF37]/30 space-y-2">
              <h3 className="font-serif text-sm font-semibold text-[#F3E5AB] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Symbolic Emotional Meaning
              </h3>
              <p className="text-xs font-serif italic text-[#F3E5AB] leading-relaxed">
                "{gift.symbolicMeaning}"
              </p>
            </div>
          </div>

          {/* Logistics & Delivery Estimate */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#141012] border border-[#D4AF37]/15 text-xs">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="block text-[#F9F6F0] font-serif">Delivery Estimate</span>
                <span className="text-[11px] text-[#C5BFB6]/60">2-4 Business Days (Complimentary White Glove)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="block text-[#F9F6F0] font-serif">Authenticity Guarantee</span>
                <span className="text-[11px] text-[#C5BFB6]/60">Hand-certified with luxury serial registration</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <LuxuryButton
              variant="gold"
              size="lg"
              className="w-full sm:flex-1"
              onClick={() => setIsMessageModalOpen(true)}
            >
              <Wand2 className="w-4 h-4 mr-2" /> Draft AI Gift Card Note
            </LuxuryButton>

            <LuxuryButton
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleToggleSave}
            >
              <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-[#D4AF37]' : ''}`} />
              {isSaved ? 'Saved to Suite' : 'Save Artifact'}
            </LuxuryButton>
          </div>
        </div>
      </div>

      {/* AI Gift Note Modal */}
      <GiftMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        giftName={gift.name}
      />
    </div>
  );
}
