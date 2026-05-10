'use client';

import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, List, Map } from 'lucide-react';

const StoreLocations: FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stores = [
    {
      name: 'SYDNEY STORE',
      address: '1234 Main Street, Sydney, NY 13160, USA',
      applyUrl: '/apply/1',
      city: 'New York',
    },
    {
      name: 'HALIFAX STORE',
      address: '368 Lacewood Drive, Halifax, NS B3M 0A1, Canada',
      applyUrl: '/apply/2',
      city: 'Nova Scotia',
    },
    {
      name: 'NEW MINAS STORE',
      address: '21 Silver Fox Ave. New Minas, NS, Canada',
      applyUrl: null,
      city: 'Nova Scotia',
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-secondary py-16 md:py-24">
      {/* Background orange glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EE7125]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 opacity-0"
          style={{ animation: visible ? 'fadeUp 0.7s ease forwards' : 'none' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#EE7125]" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Store Locations</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-none">
              JOIN OUR STORE TEAM<br />
              <span className="text-[#EE7125]">NEAR YOU</span>
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base max-w-sm leading-relaxed">
            Interested in{' '}
            <Link href="/career-areas/corporate-opportunities" className="text-[#EE7125] hover:underline">Corporate</Link>
            {' '}or{' '}
            <Link href="/career-areas/field" className="text-[#EE7125] hover:underline">Field</Link>
            {' '}opportunities? We have positions across Canada.
          </p>
        </div>

        {/* Main bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Store cards */}
          {stores.map((store, i) => (
            <div
              key={i}
              className="group relative bg-tertiary rounded-2xl p-6 md:p-8 border border-border-primary hover:border-[#EE7125]/30 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(238,113,37,0.15)] opacity-0 cursor-default"
              style={{ animation: visible ? `fadeUp 0.7s ease ${i * 120}ms forwards` : 'none' }}
            >
              {/* Orange left accent */}
              <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-transparent via-[#EE7125] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Location pin */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#EE7125]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#EE7125]" />
                </div>
                <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">{store.city}</span>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2 tracking-wide">{store.name}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">{store.address}</p>

              {store.applyUrl ? (
                <Link
                  href={store.applyUrl}
                  className="group/btn inline-flex items-center gap-2 text-sm font-bold text-white bg-[#EE7125] hover:bg-[#FF8A40] px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_4px_16px_rgba(238,113,37,0.4)]"
                >
                  Apply Here
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted border border-border-primary px-5 py-2.5 rounded-lg">
                  View Details
                </span>
              )}
            </div>
          ))}

          {/* CTA card — full-width on mobile, full height right column on desktop */}
          <div
            className="lg:row-span-1 relative rounded-2xl overflow-hidden opacity-0"
            style={{ animation: visible ? 'fadeUp 0.7s ease 400ms forwards' : 'none' }}
          >
            {/* Orange gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#EE7125] to-[#C85E1A]" />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full p-8 min-h-[220px] lg:min-h-0">
              <div>
                <h3 className="font-display text-3xl md:text-4xl text-white mb-2 leading-tight">
                  EXPLORE ALL<br />LOCATIONS
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Find your perfect role at one of our 182+ locations across Canada.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <Link
                  href="/location"
                  className="flex items-center gap-3 bg-white text-[#EE7125] font-bold text-sm px-5 py-3 rounded-lg hover:bg-white/90 transition-all duration-200 hover:shadow-lg"
                >
                  <List className="w-4 h-4" />
                  View All Locations
                </Link>
                <Link
                  href="/jobs-on-a-map"
                  className="flex items-center gap-3 bg-white/15 text-white font-bold text-sm px-5 py-3 rounded-lg border border-white/20 hover:bg-white/25 transition-all duration-200"
                >
                  <Map className="w-4 h-4" />
                  View Jobs on Map
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocations;