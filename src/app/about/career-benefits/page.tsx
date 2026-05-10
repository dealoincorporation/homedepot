'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import AboutUs from '@/components/AboutUs';
import { ArrowRight, Trophy, Sparkles, Star, Users, ChevronDown } from 'lucide-react';

const awards = [
  { src: '/2025_greater_toronto_best_employers_en (1).webp', alt: "2025 Greater Toronto's Best Employers" },
  { src: '/2024_career_directory_award_en.webp', alt: '2024 Career Directory Award' },
  { src: '/2025_best_diversity_employers_en.webp', alt: '2025 Best Diversity Employers' },
  { src: '/2025_canada_greenest_employers_en.webp', alt: "2025 Canada's Greenest Employers" },
];

export default function CareerBenefitsPage() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      
      {/* ── PAGE HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden -mt-16 md:-mt-[89px]">
        {/* Background image layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/career-growth.png')" }}
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
                About Our Culture
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="font-display text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] leading-[0.9] text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.65)] mb-6 opacity-0 uppercase"
              style={{ animation: animated ? 'fadeUp 0.8s ease 0.2s forwards' : 'none' }}
            >
              CAREER
              <span className="block text-[#EE7125]">GROWTH</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="text-base md:text-lg lg:text-xl text-white/85 leading-relaxed max-w-xl mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] opacity-0"
              style={{ animation: animated ? 'fadeUp 0.8s ease 0.35s forwards' : 'none' }}
            >
              Explore how we invest in our people — through cutting-edge training, dedicated mentorship, and transparent paths to advancement across Canada.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20 opacity-0"
              style={{ animation: animated ? 'fadeUp 0.8s ease 0.5s forwards' : 'none' }}
            >
              <Link
                href="/job-search"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#EE7125] text-white font-bold text-sm tracking-wide uppercase rounded-xl hover:bg-[#FF8A40] transition-all duration-300 shadow-[0_40px_80px_-20px_rgba(238,113,37,0.4)] hover:shadow-[0_8px_40px_rgba(238,113,37,0.6)] hover:-translate-y-0.5"
              >
                Join the Team
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#benefits"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-secondary backdrop-blur-sm text-text-primary font-bold text-sm tracking-wide uppercase rounded-xl border border-border-primary hover:bg-tertiary transition-all duration-300 hover:-translate-y-0.5"
              >
                Learn More
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
              </Link>
            </div>

            {/* Highlights Bar */}
            <div
              className="flex flex-col sm:flex-row gap-8 sm:gap-16 pt-8 border-t border-white/10 opacity-0"
              style={{ animation: animated ? 'fadeUp 0.8s ease 0.65s forwards' : 'none' }}
            >
              <div className="flex flex-col">
                <span className="font-display text-4xl text-[#EE7125]">85%</span>
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Internal Promotions</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-4xl text-[#EE7125]">100+</span>
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Learning Paths</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-4xl text-[#EE7125]">1M+</span>
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Training Hours</span>
              </div>
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

        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#EE7125] to-transparent opacity-60" />
      </section>

      {/* ── CORE CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32">
        <AboutUs />
      </div>

      {/* ── RECOGNITION ── */}
      <section className="bg-secondary/40 border-y border-border-primary py-24 md:py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EE7125]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Text side */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-[#EE7125]" />
                  <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Recognition</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-text-primary leading-[0.95] uppercase mb-8">
                  AWARDS &<br />
                  <span className="text-[#EE7125]">EXCELLENCE</span>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Our commitment to associate development, diversity, and sustainability has earned us recognition as one of Canada&apos;s premier employers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-tertiary border border-border-primary hover:border-[#EE7125]/30 transition-all group">
                  <Trophy className="w-8 h-8 text-[#EE7125] mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-black text-[#EE7125] uppercase tracking-widest mb-1">Top Tier</div>
                  <div className="text-sm font-black text-text-primary uppercase">Greater Toronto Best Employer</div>
                </div>
                <div className="p-6 rounded-3xl bg-tertiary border border-border-primary hover:border-[#EE7125]/30 transition-all group">
                  <Sparkles className="w-8 h-8 text-[#EE7125] mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-black text-[#EE7125] uppercase tracking-widest mb-1">Diversity</div>
                  <div className="text-sm font-black text-text-primary uppercase">Best Diversity Employer</div>
                </div>
              </div>
            </div>

            {/* Grid side */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-8">
              {awards.map((award, i) => (
                <div
                  key={award.alt}
                  className={`relative group bg-white/5 rounded-[32px] p-6 md:p-10 flex items-center justify-center border border-white/5 hover:border-[#EE7125]/30 hover:bg-white/10 transition-all duration-500 overflow-hidden ${
                    i % 2 === 1 ? 'lg:translate-y-12' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EE7125]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Image
                    src={award.src}
                    alt={award.alt}
                    width={220}
                    height={160}
                    className="relative w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="relative rounded-[40px] bg-[#1C1C1E] border border-white/10 overflow-hidden p-10 md:p-20 text-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#EE7125]/20 via-transparent to-[#EE7125]/5" />
            
            {/* Patterns */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EE7125]/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EE7125]/5 blur-[100px] rounded-full" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#EE7125]/10 border border-[#EE7125]/20 mb-8 text-[#EE7125]">
                <Users className="w-10 h-10" />
              </div>
              
              <h2 className="font-display text-4xl md:text-6xl text-white leading-none mb-6 uppercase tracking-tight">
                JOIN OUR TALENT<br />
                <span className="text-[#EE7125]">COMMUNITY</span>
              </h2>
              
              <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed">
                Stay connected with us. Sign up to receive job alerts and be the first to know about future opportunities at The Home Depot Canada.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="https://homedepot.wd5.myworkdayjobs-impl.com/en-US/CareerDepotCanada/introduceYourself"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold text-sm uppercase tracking-[0.2em] px-10 py-5 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(238,113,37,0.4)] hover:shadow-[0_20px_50px_rgba(238,113,37,0.6)] hover:-translate-y-1"
                >
                  Introduce Yourself
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/job-search"
                  className="group inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md"
                >
                  Browse All Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}