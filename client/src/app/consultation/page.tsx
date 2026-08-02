'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatWindow } from '../../components/ChatWindow';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';

export default function ConsultationPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const { currentConversationId, startNewConsultation } = useChatStore();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated && !currentConversationId) {
      startNewConsultation();
    }
  }, [isAuthenticated, authLoading, currentConversationId, startNewConsultation, router]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-[#0B090A] min-h-[85vh] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full mb-6 text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#F9F6F0]">
          Private AI Consultation
        </h1>
        <p className="text-xs text-[#C5BFB6]/80 font-light">
          Converse naturally. Share details about recipient, occasion, personality, and emotional goals.
        </p>
      </div>

      <ChatWindow />
    </div>
  );
}
