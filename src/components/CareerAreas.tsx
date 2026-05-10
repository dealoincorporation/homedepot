'use client';

import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const CAREER_AREAS = [
  {
    title: 'Corporate',
    href: '/career-areas/corporate-opportunities',
    image: '/corporate-career-area-v1.e73fe68e.webp',
    tag: 'Office & Strategy',
  },
  {
    title: 'Early Talent',
    href: '/career-areas/early-talent',
    image: '/early-talent-v01.a98847b9.webp',
    tag: 'Internships & Grads',
  },
  {
    title: 'Retail Store',
    href: '/career-areas/retail-store-opportunities',
    image: '/rs-01.4b1ed1bc.webp',
    tag: 'In-Store Roles',
  },
  {
    title: 'Retail Management',
    href: '/career-areas/retail-management',
    image: '/rm-01.e064b050.webp',
    tag: 'Leadership',
  },
];

const CAREER_OPTIONS = [
  { value: '', text: 'Browse All Career Areas' },
  { value: '/career-areas/corporate-opportunities', text: 'Corporate Opportunities' },
  { value: '/career-areas/early-talent', text: 'Early Talent' },
  { value: '/career-areas/field', text: 'Field' },
  { value: '/career-areas/retail-management', text: 'Retail Management' },
  { value: '/career-areas/retail-store-opportunities', text: 'Retail Store' },
];

const CareerAreas: FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectValue(val);
    if (val) window.location.href = val;
  };

  return (
    <div ref={sectionRef} className="bg-primary py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Text content */}
          <div
            className="opacity-0"
            style={{ animation: visible ? 'fadeLeft 0.8s ease 0.1s forwards' : 'none' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#EE7125]" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Join Us Today</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-none mb-6">
              DISCOVER YOUR<br />
              <span className="text-[#EE7125]">OPPORTUNITY</span><br />
              AT HOME DEPOT
            </h2>

            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Whether you&apos;re looking for part-time work, a long-term career, in-store or beyond —
              we&apos;re always searching for talented individuals to join our team. Once you&apos;re here,
              you&apos;ll discover endless possibilities to grow.
            </p>

            {/* Custom select */}
            <div className="relative max-w-sm group">
              <select
                value={selectValue}
                onChange={handleSelectChange}
                aria-label="Browse All Our Career Areas"
                className="w-full appearance-none bg-tertiary border border-border-primary text-text-secondary text-sm font-semibold px-5 py-4 pr-12 rounded-xl cursor-pointer outline-none focus:border-[#EE7125] hover:border-white/30 transition-all duration-200"
              >
                {CAREER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-secondary">
                    {opt.text}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#EE7125]">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/job-search"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#EE7125] hover:text-[#FF8A40] transition-colors group"
              >
                View all open positions
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Career area cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {CAREER_AREAS.map((area, i) => (
              <Link
                key={area.href}
                href={area.href}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-tertiary block opacity-0"
                style={{ animation: visible ? `scaleIn 0.5s ease ${0.2 + i * 0.1}s forwards` : 'none' }}
              >
                {/* Image */}
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Orange glow on hover */}
                <div className="absolute inset-0 bg-[#EE7125]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                  <span className="text-[10px] font-bold tracking-wider text-[#EE7125] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                    {area.tag}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide leading-tight">
                    {area.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs text-white/70 font-medium">Explore</span>
                    <ArrowRight className="w-3 h-3 text-[#EE7125]" />
                  </div>
                </div>

                {/* Orange bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE7125] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAreas;