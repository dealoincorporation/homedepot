'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  bgImage?: string;
}

const PageHero: FC<PageHeroProps> = ({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  bgImage,
}) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="relative min-h-[280px] md:min-h-[340px] flex items-end overflow-hidden -mt-16 md:-mt-[89px]">
      {/* Background */}
      {bgImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-primary/80" />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/50" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#EE7125]/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Orange left bar */}
      <div
        className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-transparent via-[#EE7125] to-transparent opacity-0"
        style={{ animation: animated ? 'fadeIn 0.8s ease 0.3s forwards' : 'none' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-10 md:pb-14 pt-24 md:pt-32">
        {eyebrow && (
          <div
            className="flex items-center gap-3 mb-4 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.6s ease 0.1s forwards' : 'none' }}
          >
            <span className="h-px w-8 bg-[#EE7125]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">
              {eyebrow}
            </span>
          </div>
        )}

        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] opacity-0"
          style={{ animation: animated ? 'fadeUp 0.7s ease 0.2s forwards' : 'none' }}
        >
          {title}
          {titleAccent && (
            <span className="block text-[#EE7125]">{titleAccent}</span>
          )}
        </h1>

        {subtitle && (
          <p
            className="mt-4 text-white/85 text-base md:text-lg leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] opacity-0"
            style={{ animation: animated ? 'fadeUp 0.7s ease 0.35s forwards' : 'none' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE7125] via-[#FF8A40] to-transparent opacity-60" />
    </div>
  );
};

export default PageHero;
