'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Heart, Home, Users, ArrowRight } from 'lucide-react';

const SocialResponsibilityContent: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/social-responsibility-01.6f754c52.webp',
      alt: 'Team Depot volunteers'
    },
    {
      image: '/images/social-responsibility-02.5b840abe.webp',
      alt: 'Team Depot volunteers giving back'
    },
    {
      image: '/images/social-responsibility-03.769a836a.webp',
      alt: 'Team Depot community project'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Text Content */}
          <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#EE7125]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Our Purpose</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-text-primary mb-8 leading-[0.95] uppercase">
                SOCIAL CORPORATE<br />
                <span className="text-[#EE7125]">RESPONSIBILITY</span>
              </h3>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                At The Home Depot Canada, we&apos;re committed to making a positive impact in the communities where we live and work. Through The Home Depot Canada Foundation and Team Depot, we create lasting change.
              </p>
            </div>

            {/* Team Depot Section */}
            <div className="p-8 md:p-10 rounded-[32px] bg-secondary/40 border border-border-primary relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#EE7125]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EE7125]/10 flex items-center justify-center text-[#EE7125]">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-text-primary uppercase tracking-wider">
                  TEAM DEPOT
                </h4>
              </div>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                Our associate volunteer force is dedicated to improving neighborhoods. From natural disaster response to local charity support, Team Depot projects are driven by our values of giving back and doing the right thing.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-[#EE7125] uppercase tracking-[0.2em]">
                Active in 182+ communities
              </div>
            </div>

            {/* Foundation Section */}
            <div className="p-8 md:p-10 rounded-[32px] bg-secondary/40 border border-border-primary relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#EE7125]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EE7125]/10 flex items-center justify-center text-[#EE7125]">
                  <Home className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-text-primary uppercase tracking-wider">
                  ENDING YOUTH HOMELESSNESS
                </h4>
              </div>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                The Home Depot Canada Foundation is committed to preventing and ending youth homelessness. By 2030, we plan to invest $125 million to create new paths for youth at risk.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-[#EE7125] uppercase tracking-[0.2em]">
                Target: $125M Investment by 2030
              </div>
            </div>
          </div>

          {/* Right Column - Image Slider */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative group">
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-border-primary shadow-2xl">
                <div 
                  className="flex transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1) h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="min-w-full h-full relative">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Slider Navigation Overlay */}
                <div className="absolute bottom-10 left-8 right-8 flex items-center justify-between">
                  <div className="flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          currentSlide === index ? 'w-10 bg-[#EE7125]' : 'w-2 bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="text-white text-xs font-black uppercase tracking-widest opacity-60">
                    {currentSlide + 1} / {slides.length}
                  </div>
                </div>
              </div>

              {/* Float element */}
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl hidden md:block max-w-[200px]">
                <Heart className="w-6 h-6 text-[#EE7125] mb-2" />
                <div className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Our Mission</div>
                <div className="text-sm font-bold text-white leading-tight uppercase">Building Better Communities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialResponsibilityContent;
