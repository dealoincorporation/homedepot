'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Search, MapPin, Map, ArrowRight, X, ChevronRight } from 'lucide-react';

const provinces = [
  {
    name: 'British Columbia',
    abbr: 'BC',
    stores: [
      { name: 'ABBOTSFORD STORE', address: '1635 Sumas Way Abbotsford, BC V2S 8H7', jobs: 12 },
      { name: 'BURNABY EDMONDS STORE', address: '7350 Edmonds Street Burnaby, BC V3N 1A8', jobs: 8 },
      { name: 'COQUITLAM STORE', address: '1190 Lougheed Hwy Coquitlam, BC V3B 0C5', jobs: 15 },
      { name: 'KAMLOOPS STORE', address: '700 Notre Dame Drive Kamloops, BC V2C 6T4', jobs: 6 },
      { name: 'KELOWNA STORE', address: '1890 Cooper Road Kelowna, BC V1Y 8B7', jobs: 9 },
      { name: 'LANGLEY STORE', address: '20151 91A Avenue Langley, BC V1M 3A6', jobs: 11 },
      { name: 'NORTH VANCOUVER STORE', address: '1100 Marine Drive North Vancouver, BC V7P 1S7', jobs: 7 },
      { name: 'RICHMOND STORE', address: '5300 No. 3 Road Richmond, BC V6X 2X9', jobs: 14 },
      { name: 'SURREY STORE', address: '15775 Croydon Drive Surrey, BC V3Z 2L4', jobs: 10 },
      { name: 'VICTORIA STORE', address: '855 McCallum Road Victoria, BC V9B 6G3', jobs: 8 },
    ],
  },
  {
    name: 'Alberta',
    abbr: 'AB',
    stores: [
      { name: 'CALGARY NORTH STORE', address: '5200 Country Hills Blvd NW Calgary, AB T3A 5H6', jobs: 13 },
      { name: 'CALGARY SOUTH STORE', address: '11102 Bonaventure Drive SE Calgary, AB T2J 6R4', jobs: 9 },
      { name: 'EDMONTON NORTH STORE', address: '10450 170 Street NW Edmonton, AB T5P 4P8', jobs: 16 },
      { name: 'EDMONTON SOUTH STORE', address: '3803 99 Street NW Edmonton, AB T6E 6L5', jobs: 11 },
      { name: 'LETHBRIDGE STORE', address: '315 Mayor Magrath Drive N Lethbridge, AB T1H 0P7', jobs: 5 },
      { name: 'RED DEER STORE', address: '2 Craftsman Way Red Deer, AB T4R 0A1', jobs: 7 },
    ],
  },
  {
    name: 'Ontario',
    abbr: 'ON',
    stores: [
      { name: 'TORONTO DOWNTOWN STORE', address: '650 Dupont Street Toronto, ON M6G 1Z5', jobs: 20 },
      { name: 'NORTH YORK STORE', address: '3900 Victoria Park Ave Toronto, ON M2H 3H7', jobs: 15 },
      { name: 'SCARBOROUGH STORE', address: '1040 Kennedy Road Toronto, ON M1P 2K6', jobs: 12 },
      { name: 'MISSISSAUGA STORE', address: '1975 Dundas Street East Mississauga, ON L4X 2T8', jobs: 18 },
      { name: 'BRAMPTON STORE', address: '10255 Goreway Drive Brampton, ON L6P 0M7', jobs: 14 },
      { name: 'HAMILTON STORE', address: '350 Centennial Parkway Hamilton, ON L8E 2X4', jobs: 10 },
      { name: 'BURLINGTON STORE', address: '3050 Davidson Court Burlington, ON L7M 4M9', jobs: 8 },
      { name: 'OAKVILLE STORE', address: '2555 Bristol Circle Oakville, ON L6H 5W9', jobs: 9 },
      { name: 'OTTAWA STORE', address: '2525 Carling Avenue Ottawa, ON K2B 7Z2', jobs: 13 },
      { name: 'LONDON STORE', address: '1670 Richmond Street London, ON N6G 3Y9', jobs: 11 },
      { name: 'ST. CATHARINES STORE', address: '20 YMCA Drive St. Catharines, ON L2N 7R6', jobs: 6 },
      { name: 'KITCHENER STORE', address: '860 Victoria Street N Kitchener, ON N2B 3C3', jobs: 9 },
    ],
  },
  {
    name: 'Quebec',
    abbr: 'QC',
    stores: [
      { name: 'MONTREAL STORE', address: '9400 Boul. Lacordaire Saint-Léonard, QC H1R 2A3', jobs: 16 },
      { name: 'LAVAL STORE', address: '3451 Boul. de la Concorde Laval, QC H7E 2B5', jobs: 12 },
      { name: 'LONGUEUIL STORE', address: '2151 Chemin de Chambly Longueuil, QC J4J 3X1', jobs: 8 },
      { name: 'QUEBEC CITY STORE', address: '4380 Boul. Wilfrid-Hamel Quebec, QC G1P 2J7', jobs: 10 },
    ],
  },
  {
    name: 'Nova Scotia',
    abbr: 'NS',
    stores: [
      { name: 'SYDNEY STORE', address: '1234 Main Street Sydney, NS B1S 1R1', jobs: 7 },
      { name: 'HALIFAX STORE', address: '368 Lacewood Drive Halifax, NS B3M 0A1', jobs: 11 },
      { name: 'NEW MINAS STORE', address: '21 Silver Fox Ave. New Minas, NS B4N 4N3', jobs: 5 },
    ],
  },
  {
    name: 'Manitoba',
    abbr: 'MB',
    stores: [
      { name: 'WINNIPEG NORTH STORE', address: '1360 McPhillips Street Winnipeg, MB R2X 2M4', jobs: 9 },
      { name: 'WINNIPEG SOUTH STORE', address: '1740 Kenaston Blvd Winnipeg, MB R3Y 1V4', jobs: 7 },
    ],
  },
  {
    name: 'Saskatchewan',
    abbr: 'SK',
    stores: [
      { name: 'REGINA STORE', address: '2888 Quance Street E Regina, SK S4V 3B6', jobs: 8 },
      { name: 'SASKATOON STORE', address: '2530 Faithfull Avenue Saskatoon, SK S7K 8H2', jobs: 6 },
    ],
  },
  {
    name: 'New Brunswick',
    abbr: 'NB',
    stores: [
      { name: 'MONCTON STORE', address: '100 Champlain Street Dieppe, NB E1A 1N2', jobs: 7 },
      { name: 'SAINT JOHN STORE', address: '519 Westmorland Road Saint John, NB E2J 2G5', jobs: 5 },
    ],
  },
];

const stats = [
  { value: '182+', label: 'Store Locations' },
  { value: '10', label: 'Provinces' },
  { value: '30,000+', label: 'Associates' },
  { value: '500+', label: 'Open Positions' },
];

export default function LocationPage() {
  const [activeProvince, setActiveProvince] = useState('ON');
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeProvinceData = provinces.find(p => p.abbr === activeProvince);
  const filteredStores = activeProvinceData?.stores.filter(s =>
    searchQuery === '' ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.address.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  const totalJobs = provinces.flatMap(p => p.stores).reduce((acc, s) => acc + s.jobs, 0);

  return (
    <div className="min-h-screen bg-primary">

      {/* ── HERO ─────────────────────────── */}
      <section className="relative min-h-[380px] md:min-h-[460px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero/hero-image.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#EE7125]/10 blur-[100px] rounded-full pointer-events-none" />
        <div
          className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-transparent via-[#EE7125] to-transparent opacity-0"
          style={{ animation: animated ? 'fadeIn 0.8s ease 0.5s forwards' : 'none' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-10 md:pb-16 pt-8">
          <div className="flex items-center gap-3 mb-5 opacity-0" style={{ animation: animated ? 'fadeUp 0.6s ease 0.1s forwards' : 'none' }}>
            <span className="h-px w-8 bg-[#EE7125]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Jobs By Location</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-8xl text-text-primary leading-[0.9] mb-6 opacity-0" style={{ animation: animated ? 'fadeUp 0.7s ease 0.2s forwards' : 'none' }}>
            FIND STORES<br /><span className="text-[#EE7125]">NEAR YOU</span>
          </h1>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mb-8 opacity-0" style={{ animation: animated ? 'fadeUp 0.7s ease 0.3s forwards' : 'none' }}>
            With 182+ locations across Canada, your next opportunity is right around the corner.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-12 pt-10 border-t border-border-primary/20 opacity-0" style={{ animation: animated ? 'fadeUp 0.7s ease 0.45s forwards' : 'none' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl md:text-5xl text-text-primary mb-1">{s.value}</div>
                <div className="text-[10px] text-[#EE7125] font-black tracking-[0.2em] uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE7125] via-[#FF8A40] to-transparent opacity-60" />
      </section>

      {/* ── MAIN CONTENT ─────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16" ref={sectionRef}>

        {/* Search bar */}
        <div
          className="mb-8 opacity-0"
          style={{ animation: visible ? 'fadeUp 0.6s ease forwards' : 'none' }}
        >
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-[#EE7125] transition-colors" />
              <input
                type="text"
                placeholder="Search by city or address..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-secondary border border-border-primary text-text-primary placeholder-text-muted text-sm rounded-2xl focus:outline-none focus:border-[#EE7125] focus:ring-4 focus:ring-[#EE7125]/10 transition-all shadow-sm"
              />
            </div>
            <Link
              href="/job-search"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#EE7125] hover:bg-[#FF8A40] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 whitespace-nowrap shadow-[0_8px_24px_rgba(238,113,37,0.3)]"
            >
              Search All Jobs
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Province sidebar */}
          <aside
            className="opacity-0"
            style={{ animation: visible ? 'fadeLeft 0.7s ease 0.1s forwards' : 'none' }}
          >
            <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase mb-4">Browse by Province</h2>
            <div className="space-y-2">
              {provinces.map((province) => (
                <button
                  key={province.abbr}
                  onClick={() => { setActiveProvince(province.abbr); setSearchQuery(''); }}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeProvince === province.abbr
                      ? 'bg-[#EE7125] text-white border-[#EE7125] shadow-[0_8px_20px_rgba(238,113,37,0.35)] translate-x-2'
                      : 'bg-secondary border-border-primary text-text-secondary hover:border-[#EE7125]/30 hover:text-text-primary'
                  }`}
                >
                  <span>{province.name}</span>
                  <span className={`text-[10px] font-black rounded-lg px-2 py-1 ${
                    activeProvince === province.abbr ? 'bg-white/20 text-white' : 'bg-tertiary text-text-muted border border-border-primary/50'
                  }`}>
                    {province.abbr}
                  </span>
                </button>
              ))}
            </div>

            {/* Link to map view */}
            <div className="mt-8 p-6 bg-tertiary border border-border-primary rounded-[24px] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#EE7125] to-transparent opacity-30" />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#EE7125] mb-3">Map Explorer</p>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">Visualize your future workspace with our interactive map view.</p>
              <Link
                href="/jobs-on-a-map"
                className="flex items-center justify-between gap-2 text-xs font-black uppercase tracking-widest text-text-primary hover:text-[#EE7125] transition-all group-hover:translate-x-1"
              >
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-[#EE7125]" />
                  View Jobs on Map
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>

          {/* Store cards grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 opacity-0" style={{ animation: visible ? 'fadeUp 0.6s ease 0.15s forwards' : 'none' }}>
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-none tracking-tight">
                  {activeProvinceData?.name.toUpperCase()}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-[#EE7125]" />
                  <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">
                    {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''} available
                    {searchQuery && ` in "${searchQuery}"`}
                  </p>
                </div>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-text-muted hover:text-text-primary transition-colors border border-border-primary px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <X className="w-3 h-3" />
                  Clear filter
                </button>
              )}
            </div>

            {filteredStores.length === 0 ? (
              <div className="bg-secondary/40 border border-border-primary rounded-[32px] p-16 text-center backdrop-blur-sm">
                <div className="w-20 h-20 bg-tertiary border border-border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-text-muted opacity-30" />
                </div>
                <h3 className="text-text-primary text-xl font-black uppercase tracking-widest mb-3">No Results Found</h3>
                <p className="text-text-muted text-sm max-w-xs mx-auto leading-relaxed">We couldn&apos;t find any stores matching your criteria. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStores.map((store, i) => (
                  <div
                    key={store.name}
                    className="group bg-secondary border border-border-primary rounded-2xl p-5 hover:border-[#EE7125]/30 hover:shadow-[0_8px_30px_rgba(238,113,37,0.1)] transition-all duration-300 opacity-0 flex flex-col justify-between"
                    style={{ animation: visible ? `fadeUp 0.5s ease ${0.2 + i * 0.04}s forwards` : 'none' }}
                  >
                    {/* Orange left accent */}
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-[#EE7125] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-tertiary border border-border-primary flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE7125] group-hover:text-white transition-all">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-[#EE7125] uppercase tracking-widest">{activeProvince}</span>
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em]">Store ID: {1000 + i}</span>
                        </div>
                      </div>
                      <h3 className="text-base md:text-xl font-black text-text-primary mb-2 group-hover:text-[#EE7125] transition-colors leading-tight">{store.name}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed opacity-80">{store.address}</p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border-primary/50">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[#EE7125] animate-pulse" />
                         <span className="text-[10px] font-black text-text-primary uppercase tracking-widest">
                          {store.jobs} OPEN ROLES
                        </span>
                      </div>
                      <Link
                        href="/job-search"
                        className="group/btn inline-flex items-center gap-2 text-[10px] font-black text-text-muted hover:text-[#EE7125] transition-all uppercase tracking-widest"
                      >
                        Explore
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom CTA */}
            <div
              className="mt-10 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EE7125] to-[#C85E1A] p-8 opacity-0"
              style={{ animation: visible ? 'fadeUp 0.7s ease 0.5s forwards' : 'none' }}
            >
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-white leading-none mb-2">
                    CAN&apos;T FIND YOUR CITY?
                  </h3>
                  <p className="text-white/75 text-sm">
                    Introduce yourself and we&apos;ll match you with the right opportunity.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <Link
                    href="https://homedepot.wd5.myworkdayjobs-impl.com/en-US/CareerDepotCanada/introduceYourself"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-[#EE7125] font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-xl hover:bg-white/90 transition-all whitespace-nowrap"
                  >
                    Introduce Yourself
                  </Link>
                  <Link
                    href="/job-search"
                    className="inline-flex items-center gap-2 bg-white/15 text-white font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-xl border border-white/20 hover:bg-white/25 transition-all whitespace-nowrap"
                  >
                    Search All Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
