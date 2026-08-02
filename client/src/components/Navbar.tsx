'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { Sparkles, User as UserIcon, LogOut, Compass, Heart, History } from 'lucide-react';
import { LuxuryButton } from './LuxuryButton';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-[#0B090A]/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-gradient-to-br from-[#4A0E22] to-[#0B090A] group-hover:border-[#D4AF37] transition-all shadow-gold-glow">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.25em] font-bold text-gold-gradient">
              CHARIS
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5BFB6]/70 -mt-1 font-light">
              Haute Concierge
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#about"
            className="text-xs uppercase tracking-[0.2em] text-[#F9F6F0]/80 hover:text-[#D4AF37] transition-colors"
          >
            Philosophy
          </Link>
          <Link
            href="/#how-it-works"
            className="text-xs uppercase tracking-[0.2em] text-[#F9F6F0]/80 hover:text-[#D4AF37] transition-colors"
          >
            How It Works
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/dashboard"
                className={`text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5 ${
                  pathname === '/dashboard' ? 'text-[#D4AF37] font-semibold' : 'text-[#F9F6F0]/80 hover:text-[#D4AF37]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" /> Dashboard
              </Link>
              <Link
                href="/consultation"
                className={`text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5 ${
                  pathname === '/consultation' ? 'text-[#D4AF37] font-semibold' : 'text-[#F9F6F0]/80 hover:text-[#D4AF37]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Concierge
              </Link>
            </>
          )}
        </nav>

        {/* Right Auth / CTA */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-serif italic text-[#D4AF37]">
                Welcome, {user?.name || 'V.I.P.'}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#4A0E22]/40 text-[#F9F6F0] transition-all"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <span className="text-xs uppercase tracking-[0.2em] text-[#F9F6F0] hover:text-[#D4AF37] px-3 py-2 transition-colors">
                  Sign In
                </span>
              </Link>
              <Link href="/register">
                <LuxuryButton variant="gold" size="sm">
                  Begin Experience
                </LuxuryButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
