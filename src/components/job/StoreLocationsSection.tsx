'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import { 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Map, 
  ArrowRight,
  Heart,
  Briefcase,
  ExternalLink
} from 'lucide-react';

const stores = [
  { name: "ST JOHN'S STORE", address: '70 Kelsey Drive St. Johns, NL A1B 5C7' },
  { name: 'ST CATHARINES STORE', address: '20 YMCA Drive St. Catharines, ON L2N 7R6' },
  { name: 'HAMILTON STORE', address: '350 Centennial Parkway Hamilton, ON L8E 2X4' },
  { name: 'ANCASTER STORE', address: '122 Martindale Crescent Ancaster, ON L9K 1J9' },
  { name: 'BURLINGTON STORE', address: '3050 Davidson Court Burlington, ON L7M 4M9' },
  { name: 'OAKVILLE BURLOAK STORE', address: '3300 South Service Road West Oakville, ON L6L 0B1' },
  { name: 'TRAFALGAR VILLAGE STORE', address: '99 Cross Avenue Oakville, ON L6J 2W7' },
  { name: 'OAKVILLE STORE', address: '2555 Bristol Circle Oakville, ON L6H 5W9' },
];

const StoreLocationsSection: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex(i => (i + 1) % stores.length);
  const prev = () => setCurrentIndex(i => (i - 1 + stores.length) % stores.length);

  return (
    <div className="space-y-4 p-5">
      {/* Store Locations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-[#EE7125]" />
          <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase">
            Nearby Stores
          </h2>
        </div>

        {/* Store card */}
        <div className="relative bg-tertiary border border-border-primary rounded-xl p-4 mb-3">
          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-[#EE7125] rounded-full" />
          <h3 className="text-sm font-bold text-text-primary mb-1 pl-1">{stores[currentIndex].name}</h3>
          <p className="text-xs text-text-secondary leading-relaxed pl-1">{stores[currentIndex].address}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {stores.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-5 h-1.5 bg-[#EE7125]' : 'w-1.5 h-1.5 bg-text-muted/20 hover:bg-text-muted/40'
                }`}
                aria-label={`Store ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button onClick={prev} className="w-6 h-6 flex items-center justify-center rounded-full border border-border-primary text-text-muted hover:border-[#EE7125] hover:text-[#EE7125] transition-all">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button onClick={next} className="w-6 h-6 flex items-center justify-center rounded-full border border-border-primary text-text-muted hover:border-[#EE7125] hover:text-[#EE7125] transition-all">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <Link
          href="/location"
          className="mt-4 flex items-center gap-2 text-xs font-bold text-[#EE7125] hover:text-[#FF8A40] transition-colors"
        >
          View all 182+ locations
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="border-t border-border-primary/50" />

      {/* Map */}
      <div>
        <h3 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase mb-3">
          View Jobs on Map
        </h3>
        <Link
          href="/jobs-on-a-map"
          className="block bg-tertiary border border-border-primary rounded-xl overflow-hidden hover:border-[#EE7125]/30 transition-colors group"
        >
          <div className="h-36 relative flex items-center justify-center bg-gradient-to-br from-tertiary to-secondary">
            {/* Simple map dots */}
            <div className="relative w-full h-full p-4">
              {[[20, 30], [50, 20], [70, 50], [30, 60], [60, 70], [80, 25]].map(([x, y], i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#EE7125] shadow-[0_0_6px_rgba(238,113,37,0.6)]"
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary/70 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 group-hover:bg-[#EE7125]/20 group-hover:border-[#EE7125]/30 border border-transparent transition-all">
                  <Map className="w-3.5 h-3.5 text-[#EE7125]" />
                  <span className="text-xs text-text-primary font-semibold">Open Map</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="border-t border-border-primary/50" />

      {/* Saved jobs */}
      <div>
        <h3 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase mb-3 flex items-center gap-2">
           <Heart className="w-3 h-3" />
           Saved Jobs
        </h3>
        <div className="bg-tertiary border border-border-primary rounded-xl p-4">
          <p className="text-xs text-text-muted leading-relaxed">You haven&apos;t saved any active jobs.</p>
          <Link href="/applicant-login" className="mt-2 text-xs font-bold text-[#EE7125] hover:text-[#FF8A40] transition-colors block">
            Sign in to save jobs →
          </Link>
        </div>
      </div>

      <div className="border-t border-border-primary/50" />

      {/* Benefits */}
      <div>
        <h3 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase mb-3 flex items-center gap-2">
           <Briefcase className="w-3 h-3" />
           Our Benefits
        </h3>
        <div className="bg-tertiary border border-border-primary rounded-xl p-4">
          <p className="text-xs text-text-secondary leading-relaxed mb-3">
            Comprehensive benefits for all full-time associates — from health coverage to stock purchase plans.
          </p>
          <Link href="/about/our-benefits" className="text-xs font-bold text-[#EE7125] hover:text-[#FF8A40] transition-colors flex items-center gap-1">
            Explore benefits
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreLocationsSection;
