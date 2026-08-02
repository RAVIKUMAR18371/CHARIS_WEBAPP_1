'use client';

import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse p-4">
      <div className="h-8 bg-[#261D22] rounded-md w-1/3 border border-[#D4AF37]/20" />
      <div className="h-4 bg-[#1C1518] rounded-md w-2/3" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-[#161214] rounded-xl border border-[#D4AF37]/20 flex flex-col p-4 space-y-4">
            <div className="h-48 bg-[#261D22] rounded-lg" />
            <div className="h-6 bg-[#261D22] rounded w-3/4" />
            <div className="h-4 bg-[#1C1518] rounded w-1/2" />
            <div className="h-16 bg-[#4A0E22]/20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
