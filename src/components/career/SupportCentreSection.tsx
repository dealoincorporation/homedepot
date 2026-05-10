'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';

const SupportCentreSection: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const slides = [
    {
      image: '/corporate-career-area-v1.e73fe68e.webp',
      alt: 'Home Depot Canada corporate team',
    },
    {
      image: '/corporate-career-area-v2.29009516.webp',
      alt: 'Home Depot Canada corporate office',
    },
  ];

  const teams = [
    'Human Resources',
    'Information Technology',
    'Merchandising',
    'Stores / Operations',
    'HD Direct',
    'HD Equipment Services',
  ];

  return (
    <section id="support-centre" ref={ref} className="py-16 md:py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div
            className="opacity-0"
            style={{ animation: visible ? 'fadeLeft 0.8s ease 0.1s forwards' : 'none' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EE7125]" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Corporate</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-none mb-6">
              JOIN OUR STORE<br />
              <span className="text-[#EE7125]">SUPPORT CENTRE</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
              Behind every great store is a team of corporate associates driving innovation, strategy, and support.
              Our Support Centre (SSC) is based in Toronto (North York), Ontario — empowering stores and customers to thrive.
            </p>

            {/* Teams grid */}
            <div className="mb-8">
              <p className="text-xs font-bold tracking-widest text-[#EE7125] uppercase mb-4">Our Corporate Teams</p>
              <div className="grid grid-cols-2 gap-2">
                {teams.map((team) => (
                  <div
                    key={team}
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#EE7125]/30 hover:bg-white/10 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EE7125] flex-shrink-0" />
                    <span className="text-sm text-white/70 font-medium">{team}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="#jobs"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(238,113,37,0.4)] hover:shadow-[0_8px_30px_rgba(238,113,37,0.5)] hover:-translate-y-0.5"
            >
              Search Open Roles
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right: Image slider */}
          <div
            className="opacity-0"
            style={{ animation: visible ? 'fadeUp 0.8s ease 0.2s forwards' : 'none' }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#2C2C2E] border border-white/5">
              <div
                className="flex transition-transform duration-600 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="min-w-full aspect-[4/3]">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent pointer-events-none" />
            </div>

            {/* Slide dots */}
            <div className="flex items-center gap-2 mt-4 justify-end">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'w-8 h-2 bg-[#EE7125]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportCentreSection;
