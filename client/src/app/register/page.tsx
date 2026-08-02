'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, User as UserIcon, Lock, Mail, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '../../components/LuxuryButton';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/register', { name, email, password });
      loginStore(res.data.user, res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#0B090A]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel-gold rounded-2xl p-8 border border-[#D4AF37]/40 shadow-2xl space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37] bg-[#4A0E22] mx-auto flex items-center justify-center shadow-gold-glow mb-4">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#F9F6F0]">Private Access</h2>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37]">Create Your Concierge Profile</p>
        </div>

        {error && (
          <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-sans text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block uppercase tracking-widest text-[#D4AF37] mb-1.5 font-semibold">Full Name</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-[#D4AF37]/60 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lord / Lady Vance"
                className="w-full bg-[#161214] border border-[#D4AF37]/30 rounded-md pl-10 pr-4 py-3 text-[#F9F6F0] focus:border-[#D4AF37] focus:outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-widest text-[#D4AF37] mb-1.5 font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#D4AF37]/60 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alexander@domain.com"
                className="w-full bg-[#161214] border border-[#D4AF37]/30 rounded-md pl-10 pr-4 py-3 text-[#F9F6F0] focus:border-[#D4AF37] focus:outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-widest text-[#D4AF37] mb-1.5 font-semibold">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#D4AF37]/60 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#161214] border border-[#D4AF37]/30 rounded-md pl-10 pr-4 py-3 text-[#F9F6F0] focus:border-[#D4AF37] focus:outline-none font-sans"
              />
            </div>
          </div>

          <LuxuryButton type="submit" variant="gold" size="lg" disabled={loading} className="w-full">
            {loading ? 'Registering...' : 'Complete Registration'} <ArrowRight className="w-4 h-4 ml-1" />
          </LuxuryButton>
        </form>

        <div className="text-center pt-4 border-t border-[#D4AF37]/15 text-xs text-[#C5BFB6]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#D4AF37] font-serif italic hover:underline">
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
