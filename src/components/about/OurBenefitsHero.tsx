'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

const OurBenefitsHero: FC = () => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-[380px] md:min-h-[480px] flex items-end overflow-hidden border-b border-border-primary bg-primary -mt-16 md:-mt-[89px]">
      {/* BG image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000" 
        style={{ 
          backgroundImage: "url('/images/Screenshot 2026-01-21 at 19.07.13.png')",
          transform: animated ? 'scale(1.05)' : 'scale(1.1)'
        }} 
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#EE7125]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-16 md:pb-24 pt-24 md:pt-32">
        <div 
          className="flex items-center gap-3 mb-6 opacity-0 translate-y-4 transition-all duration-700" 
          style={{ 
            opacity: animated ? 1 : 0, 
            transform: animated ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '100ms'
          }}
        >
          <span className="h-px w-8 bg-[#EE7125]" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Total Rewards</span>
        </div>

        <h1 
          className="font-display text-5xl sm:text-6xl md:text-8xl text-white leading-[0.9] drop-shadow-[0_3px_16px_rgba(0,0,0,0.65)] mb-6 uppercase opacity-0 translate-y-4 transition-all duration-700"
          style={{ 
            opacity: animated ? 1 : 0, 
            transform: animated ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '200ms'
          }}
        >
          OUR<br />
          <span className="text-[#EE7125]">BENEFITS</span>
        </h1>

        <p 
          className="text-white/85 text-base md:text-xl leading-relaxed max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] opacity-0 translate-y-4 transition-all duration-700"
          style={{ 
            opacity: animated ? 1 : 0, 
            transform: animated ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '300ms'
          }}
        >
          Explore a comprehensive suite of rewards designed to support your health, your growth, and your financial future.
        </p>
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE7125] via-[#FF8A40] to-transparent opacity-60" />
    </section>
  );
};

export default OurBenefitsHero;
