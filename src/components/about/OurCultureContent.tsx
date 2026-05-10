'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Users, Globe2, Heart } from 'lucide-react';

const OurCultureContent: FC = () => {
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sliderImages = [
    '/slider/01 (1).webp',
    '/slider/02.webp',
    '/slider/03.webp',
    '/slider/04.webp',
    '/slider/05.webp',
    '/slider/06.webp',
    '/slider/07.webp',
    '/slider/08.webp',
  ];

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
    },
    {
      title: "Developing Our People",
      description: "We invest in our associates' growth and development, providing training and opportunities to help them reach their full potential."
    }
  ];

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

  return (
    <section className="py-20 md:py-32 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Side - Main Content */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Living Our Values Section */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#EE7125]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Our Foundation</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-text-primary mb-8 leading-[0.95] uppercase">
                LIVING OUR<br />
                <span className="text-[#EE7125]">VALUES</span>
              </h3>
              <div className="space-y-6 max-w-2xl">
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                  We live by our values. We think of them as instructions that guide our actions each day. Our values keep us all working toward the same goals, allowing us to build strong teams and deliver the exceptional service our customers count on from us.
                </p>
                <div className="p-8 rounded-[32px] bg-secondary/40 border border-border-primary relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#EE7125] opacity-60" />
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed relative z-10 italic">
                    &quot;At The Home Depot Canada, we&apos;re more than just a workplace, we&apos;re a community built on genuine connections and spirited collaboration.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* WeAreTHD Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#EE7125]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Inclusion</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-text-primary mb-8 uppercase">
                #WEARETHD
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary flex items-center justify-center text-[#EE7125]">
                    <Users className="w-6 h-6" />
                  </div>
                  <p className="text-text-secondary text-base leading-relaxed">
                    We strive to maintain a culture that welcomes everyone. We believe it helps us achieve our business goals by driving excellent customer service and innovation.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary flex items-center justify-center text-[#EE7125]">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <p className="text-text-secondary text-base leading-relaxed">
                    Empowering our associates to thrive and excel, and enriching the communities in which we operate with equal opportunity for all.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Core Values Slider */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative group p-1 bg-gradient-to-br from-border-primary to-transparent rounded-[40px]">
              <div className="bg-secondary rounded-[39px] p-8 md:p-10 shadow-2xl overflow-hidden relative">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black text-text-primary uppercase tracking-wider">
                    Core Values
                  </h3>
                  <div className="text-[10px] font-black text-[#EE7125] uppercase tracking-widest bg-[#EE7125]/10 px-3 py-1 rounded-full border border-[#EE7125]/20">
                    {currentValueIndex + 1} / {coreValues.length}
                  </div>
                </div>

                {/* Current Value Content */}
                <div className={`min-h-[160px] transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  <h4 className="text-2xl font-black text-[#EE7125] mb-4 uppercase leading-tight">
                    {coreValues[currentValueIndex].title}
                  </h4>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {coreValues[currentValueIndex].description}
                  </p>
                </div>

                {/* Image Slider */}
                <div className="relative mt-10 rounded-3xl overflow-hidden aspect-video border border-border-primary bg-tertiary">
                  <img
                    src={sliderImages[currentValueIndex % sliderImages.length]}
                    alt={`Culture image ${currentValueIndex + 1}`}
                    className={`w-full h-full object-cover transition-all duration-500 ${isTransitioning ? 'scale-110 blur-md grayscale' : 'scale-100 blur-0 grayscale-0'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>

                {/* Navigation Arrows */}
                <div className="mt-10 flex items-center justify-between">
                  <div className="flex gap-2">
                    {coreValues.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-500 ${i === currentValueIndex ? 'w-6 bg-[#EE7125]' : 'w-2 bg-border-primary'}`} 
                      />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={prevValue}
                      className="w-12 h-12 rounded-2xl bg-tertiary border border-border-primary flex items-center justify-center text-text-primary hover:border-[#EE7125] hover:text-[#EE7125] transition-all group"
                      aria-label="Previous value"
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={nextValue}
                      className="w-12 h-12 rounded-2xl bg-tertiary border border-border-primary flex items-center justify-center text-text-primary hover:border-[#EE7125] hover:text-[#EE7125] transition-all group"
                      aria-label="Next value"
                    >
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
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

export default OurCultureContent;
