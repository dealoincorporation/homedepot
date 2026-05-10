'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, Plus, ArrowRight, BookOpen, Settings, Monitor, GraduationCap } from 'lucide-react';

const AboutUs: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const coreValues = [
    {
      title: "Entrepreneurial Spirit",
      description: "Our associates are encouraged to initiative creative and innovative ways to serve our customers and improve the business as well as spread best practices throughout the company."
    },
    {
      title: "Taking Care of Our People",
      description: "The key to our success is treating people well. We do this by encouraging associates to speak up and take risks, by recognizing and rewarding good performance and by leading and developing people so they may grow."
    },
    {
      title: "Respect For All People",
      description: "In order to remain successful, our associates must work in an environment of mutual respect, free of discrimination and harassment where each associate is regarded as a part of The Home Depot Canada team."
    },
    {
      title: "Doing The Right Thing",
      description: "We exercise good judgement by 'doing the right thing' instead of just 'doing things right.' We strive to understand the impact of our decisions and we accept responsibility for our actions."
    },
    {
      title: "Building Strong Relationships",
      description: "Strong relationships are built on trust, honesty and integrity. We listen and respond to the needs of customers, associates, communities and vendors, treating them as partners."
    },
    {
      title: "Giving Back",
      description: "An important part of the fabric of The Home Depot Canada is giving our time, talents, energy and resources to help strengthen the communities we live and work in."
    },
    {
      title: "Excellent Customer Service",
      description: "Along with our quality products, service, price and selection, we must go the extra mile to give customers knowledgeable advice about merchandise and to help them use those products to their maximum benefit."
    }
  ];

  const toggleAccordion = (accordionId: string) => {
    setOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  const nextValue = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevValue = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentValueIndex((prev) => (prev - 1 + coreValues.length) % coreValues.length);
      setIsTransitioning(false);
    }, 300);
  };

  const orientationPrograms = [
    {
      id: 'sales',
      title: 'SALES AND SERVICES CLASSES',
      description: 'All the information you need to help customers access and use The Home Depot services.',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'processes',
      title: 'OPERATIONAL PROCESS CLASSES',
      description: 'Step-by-step instruction on how to operate the equipment, powered tools, or machines to meet the special needs of our customers.',
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 'systems',
      title: 'SYSTEM CLASSES',
      description: 'Lessons on how to operate the computer systems within the store and process customer transactions at the cash as efficiently as possible.',
      icon: <Monitor className="w-5 h-5" />
    },
    {
      id: 'products',
      title: 'CORE PRODUCT KNOWLEDGE',
      description: 'Essentials about the features and benefits of The Home Depot products so you can assist customers with their purchases.',
      icon: <GraduationCap className="w-5 h-5" />
    }
  ];

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto">
        
        {/* ── MAIN CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-center">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#EE7125]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Your Journey</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-10 leading-[0.95] tracking-tight uppercase text-text-primary">
                LEARN.<br />
                <span className="text-[#EE7125]">GROW.</span><br />
                SUCCEED.
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                At <span className="text-text-primary font-bold">The Home Depot Canada</span>, your journey starts with curiosity and a warm smile. If you love learning and find satisfaction in helping others, you&apos;ll discover a <span className="text-[#EE7125] font-bold">rewarding career</span> here, where every day brings new opportunities to build your skills and make a real difference.
              </p>

              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                As <span className="text-text-primary font-bold">Canada&apos;s leading home improvement retailer</span>, we thrive on the energy, expertise, and enthusiasm of our associates. That means you&apos;ll get the <span className="text-[#EE7125] font-bold">training and support</span> you need to learn, grow, and succeed, no matter where you start or where you want to go.
              </p>

              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                We&apos;re committed to your development. In fact, we deliver more than <span className="text-[#EE7125] font-black uppercase">1,000,000 hours</span> of training each year, supporting over <span className="text-text-primary font-black uppercase">28,000 associates</span> nationwide.
              </p>
            </div>

            <div className="pt-4">
              <Link 
                href="/job-search" 
                className="group inline-flex items-center gap-3 bg-[#EE7125] hover:bg-[#FF8A40] text-white px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(238,113,37,0.3)] hover:shadow-[0_8px_40px_rgba(238,113,37,0.5)] hover:-translate-y-0.5"
              >
                Search open roles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-[#EE7125]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-border-primary shadow-2xl">
              <img
                src="/cg-01.d1d65574.webp"
                alt="Career Growth"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <div className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-1 opacity-60">Success Metric</div>
                  <div className="text-white text-3xl font-black leading-tight uppercase">1M+ Training Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ORIENTATION PROGRAM ── */}
        <div className="py-24 border-t border-border-primary">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#EE7125]" />
              <span className="text-[11px] font-bold tracking-[0.3em] text-[#EE7125] uppercase">Training Roadmap</span>
              <span className="h-px w-6 bg-[#EE7125]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-text-primary uppercase tracking-tight">ORIENTATION PROGRAM</h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {orientationPrograms.map((program) => (
              <div 
                key={program.id}
                className={`group border rounded-3xl transition-all duration-300 ${
                  openAccordion === program.id 
                    ? 'border-[#EE7125]/50 bg-secondary shadow-xl' 
                    : 'border-border-primary hover:border-[#EE7125]/30 bg-tertiary/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(program.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      openAccordion === program.id ? 'bg-[#EE7125] text-white' : 'bg-secondary border border-border-primary text-[#EE7125] group-hover:bg-[#EE7125]/10'
                    }`}>
                      {program.icon}
                    </div>
                    <span className={`text-sm md:text-base font-black uppercase tracking-wider transition-colors ${
                      openAccordion === program.id ? 'text-[#EE7125]' : 'text-text-primary'
                    }`}>
                      {program.title}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-border-primary flex items-center justify-center transition-all ${
                    openAccordion === program.id ? 'bg-[#EE7125] border-[#EE7125] text-white rotate-45' : 'text-text-muted'
                  }`}>
                    <Plus className="w-5 h-5" />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openAccordion === program.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-8 pl-[72px]">
                    <p className="text-text-secondary text-base leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CORE VALUES ── */}
        <div className="py-24 bg-secondary/40 backdrop-blur-sm border-y border-border-primary -mx-6 lg:-mx-8 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
              
              {/* Slider Content */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-8 bg-[#EE7125]" />
                  <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Our DNA</span>
                </div>
                
                <h3 className="text-4xl md:text-6xl font-black text-text-primary mb-12 uppercase leading-none">
                  OUR CORE<br />VALUES
                </h3>

                <div className={`min-h-[220px] transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  <h4 className="text-xl md:text-2xl font-black mb-4 text-[#EE7125] uppercase tracking-wide">
                    {coreValues[currentValueIndex].title}
                  </h4>
                  <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                    {coreValues[currentValueIndex].description}
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevValue}
                      className="w-14 h-14 rounded-full border border-border-primary flex items-center justify-center text-text-primary hover:border-[#EE7125] hover:text-[#EE7125] transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                      aria-label="Previous value"
                    >
                      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={nextValue}
                      className="w-14 h-14 rounded-full border border-border-primary flex items-center justify-center text-text-primary hover:border-[#EE7125] hover:text-[#EE7125] transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                      aria-label="Next value"
                    >
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-[#EE7125] uppercase tracking-[0.3em]">Progress</span>
                    <div className="flex gap-2">
                      {coreValues.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1 rounded-full transition-all duration-500 ${i === currentValueIndex ? 'w-8 bg-[#EE7125]' : 'w-2 bg-border-primary'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Image */}
              <div className="lg:col-span-2">
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-border-primary shadow-2xl">
                  <img
                    src="/01.webp"
                    alt="Core Values"
                    className={`w-full h-full object-cover transition-all duration-500 ${isTransitioning ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EE7125]/20 to-transparent mix-blend-overlay" />
                  <div className="absolute bottom-6 right-6 text-white/20 text-8xl font-black italic select-none">
                    0{currentValueIndex + 1}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;