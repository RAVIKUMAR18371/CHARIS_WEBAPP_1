'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface LuxuryButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
  > {
  variant?: 'gold' | 'outline' | 'burgundy';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  variant = 'gold',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-serif tracking-widest uppercase transition-all duration-300 rounded-sm focus:outline-none overflow-hidden group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2',
    md: 'text-xs px-6 py-3 tracking-wider',
    lg: 'text-sm px-8 py-4 tracking-widest',
  };

  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#0B090A] font-semibold shadow-gold-glow hover:shadow-gold-glow-lg border border-[#F3E5AB]',
    burgundy: 'bg-gradient-to-r from-[#4A0E22] via-[#6B1432] to-[#2D0814] text-[#F9F6F0] border border-[#D4AF37]/40 shadow-wine-glow hover:border-[#D4AF37]',
    outline: 'bg-transparent text-[#F3E5AB] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#4A0E22]/20',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...(props as any)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'gold' && (
        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
      )}
    </motion.button>
  );
};
