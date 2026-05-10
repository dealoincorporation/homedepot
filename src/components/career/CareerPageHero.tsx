'use client';

import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface CareerPageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  bgImage: string;
  learnMoreHref: string;
  jobsHref: string;
  jobsLabel: string;
}

export const CareerPageHero: FC<CareerPageHeroProps> = ({
  eyebrow, title, titleAccent, subtitle, bgImage, learnMoreHref, jobsHref, jobsLabel,
}) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[320px] md:min-h-[420px] flex items-end overflow-hidden -mt-16 md:-mt-[89px]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#EE7125]/10 blur-[80px] rounded-full pointer-events-none" />
      <div
        className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-transparent via-[#EE7125] to-transparent opacity-0"
        style={{ animation: animated ? 'fadeIn 0.8s ease 0.4s forwards' : 'none' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-10 md:pb-16 pt-24 md:pt-32">
        <div className="flex items-center gap-3 mb-4 opacity-0" style={{ animation: animated ? 'fadeUp 0.6s ease 0.1s forwards' : 'none' }}>
          <span className="h-px w-8 bg-[#EE7125]" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">{eyebrow}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-none drop-shadow-[0_3px_14px_rgba(0,0,0,0.6)] mb-4 opacity-0" style={{ animation: animated ? 'fadeUp 0.7s ease 0.2s forwards' : 'none' }}>
          {title}<br /><span className="text-[#EE7125]">{titleAccent}</span>
        </h1>
        <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] opacity-0" style={{ animation: animated ? 'fadeUp 0.7s ease 0.3s forwards' : 'none' }}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 opacity-0" style={{ animation: animated ? 'fadeUp 0.7s ease 0.45s forwards' : 'none' }}>
          <Link href={learnMoreHref} className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(238,113,37,0.4)] hover:shadow-[0_8px_30px_rgba(238,113,37,0.5)]">
            Learn More
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href={jobsHref} className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wide rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            {jobsLabel}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE7125] via-[#FF8A40] to-transparent opacity-60" />
    </section>
  );
};

export default CareerPageHero;
