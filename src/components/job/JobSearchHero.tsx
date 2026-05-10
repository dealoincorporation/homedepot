'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const JobSearchHero: FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  const locations = [
    'Select A Location',
    'AB - Calgary',
    'AB - Edmonton',
    'BC - Vancouver',
    'ON - Toronto',
    'ON - Mississauga',
    'ON - Ottawa',
    'QC - Montreal',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="relative min-h-[380px] md:min-h-[460px] flex items-center overflow-hidden -mt-16 md:-mt-[89px]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/hero-image.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#EE7125]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Orange left bar */}
      <div
        className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-transparent via-[#EE7125] to-transparent opacity-0"
        style={{ animation: animated ? 'fadeIn 0.8s ease 0.5s forwards' : 'none' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 pt-24 md:pt-32">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-5 opacity-0"
          style={{ animation: animated ? 'fadeUp 0.6s ease 0.1s forwards' : 'none' }}
        >
          <span className="h-px w-8 bg-[#EE7125]" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Open Positions</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-none drop-shadow-[0_3px_16px_rgba(0,0,0,0.6)] mb-3 opacity-0"
          style={{ animation: animated ? 'fadeUp 0.7s ease 0.2s forwards' : 'none' }}
        >
          FIND YOUR
          <span className="block text-[#EE7125]">NEXT ROLE</span>
        </h1>

        <p
          className="text-white/85 text-base md:text-lg mb-8 max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] opacity-0"
          style={{ animation: animated ? 'fadeUp 0.7s ease 0.3s forwards' : 'none' }}
        >
          Search hundreds of open positions across Canada&apos;s leading home improvement retailer.
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-0 max-w-2xl rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)] opacity-0"
          style={{ animation: animated ? 'fadeUp 0.7s ease 0.4s forwards' : 'none' }}
        >
          <input
            type="text"
            placeholder="Job title, keyword, or skill"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="flex-1 px-5 py-4 text-sm text-text-primary placeholder-text-muted bg-secondary focus:outline-none min-w-0"
          />

          <div className="relative flex-1 sm:border-l border-border-primary bg-secondary">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-full px-5 py-4 text-sm text-text-primary bg-secondary focus:outline-none appearance-none cursor-pointer pr-10"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc === 'Select A Location' ? '' : loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold text-sm uppercase tracking-wide transition-colors duration-200 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>

        <p
          className="mt-4 text-xs text-text-muted opacity-0"
          style={{ animation: animated ? 'fadeIn 0.7s ease 0.6s forwards' : 'none' }}
        >
          Press ENTER to search · TAB to skip
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE7125] via-[#FF8A40] to-transparent opacity-60" />
    </section>
  );
};

export default JobSearchHero;
