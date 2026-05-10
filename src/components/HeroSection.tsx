'use client';

import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

const stats = [
  { value: 182, label: 'Stores Across Canada', suffix: '+' },
  { value: 30000, label: 'Associates Nationwide', suffix: '+' },
  { value: 50, label: 'Years of Excellence', suffix: '+' },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const StatItem: FC<{ stat: typeof stats[0]; delay: number; start: boolean }> = ({ stat, delay, start }) => {
  const count = useCountUp(stat.value, 1800, start);
  return (
    <div
      className="flex flex-col items-center md:items-start opacity-0"
      style={{ animation: start ? `fadeUp 0.7s ease ${delay}ms forwards` : 'none' }}
    >
      <span className="font-display text-4xl md:text-5xl text-primary leading-none">
        {count.toLocaleString()}{stat.suffix}
      </span>
      <span className="text-xs md:text-sm text-white/80 font-semibold tracking-wider uppercase mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
        {stat.label}
      </span>
    </div>
  );
};

const HeroSection: FC = () => {
  const [animated, setAnimated] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden -mt-16 md:-mt-[89px]"
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/hero-image.png')" }}
      />

      {/* Theme-aware gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />

      {/* Orange warm glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#EE7125]/10 blur-[120px] rounded-full" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Orange accent line left */}
      <div
        className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-transparent via-[#EE7125] to-transparent opacity-0"
        style={{ animation: animated ? 'fadeIn 1s ease 0.4s forwards' : 'none' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-6 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.6s ease 0.1s forwards' : 'none' }}
          >
            <span className="h-px w-10 bg-[#EE7125]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">
              The Home Depot Canada
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-display text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.65)] mb-6 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.8s ease 0.2s forwards' : 'none' }}
          >
            BUILD YOUR
            <span className="block text-[#EE7125]">GREATEST</span>
            CAREER HERE
          </h1>

          {/* Sub-headline */}
          <p
            className="text-base md:text-lg lg:text-xl text-white/85 leading-relaxed max-w-xl mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] opacity-0"
            style={{ animation: animated ? 'fadeUp 0.8s ease 0.35s forwards' : 'none' }}
          >
            Where you&apos;re empowered to make a real impact, foster growth, and shape
            the future of home improvement across Canada.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.8s ease 0.5s forwards' : 'none' }}
          >
            <Link
              href="/job-search"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#EE7125] text-white font-bold text-sm tracking-wide uppercase rounded-xl hover:bg-[#FF8A40] transition-all duration-300 shadow-[0_4px_20px_rgba(238,113,37,0.4)] hover:shadow-[0_8px_40px_rgba(238,113,37,0.6)] hover:-translate-y-0.5"
            >
              Search All Jobs
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/career-areas/corporate-opportunities"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-secondary backdrop-blur-sm text-text-primary font-bold text-sm tracking-wide uppercase rounded-xl border border-border-primary hover:bg-tertiary transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Career Areas
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="flex flex-col sm:flex-row gap-8 sm:gap-12 pt-8 border-t border-border-primary opacity-0"
            style={{ animation: animated ? 'fadeUp 0.8s ease 0.65s forwards' : 'none' }}
          >
            {stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} delay={700 + i * 150} start={animated} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: animated ? 'fadeIn 1s ease 1.2s forwards' : 'none' }}
      >
        <span className="text-[10px] tracking-widest text-white/30 uppercase font-semibold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* Bottom orange border */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#EE7125] to-transparent opacity-60" />
    </div>
  );
};

export default HeroSection;