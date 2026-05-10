'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Rocket, 
  Users, 
  Globe, 
  ShieldCheck, 
  Lightbulb, 
  Heart, 
  Star, 
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const coreValues = [
  { title: 'Entrepreneurial Spirit', description: "Our associates are encouraged to initiate creative and innovative ways to serve our customers and improve the business as well as spread best practices throughout the company.", icon: <Rocket className="w-5 h-5" /> },
  { title: 'Taking Care of Our People', description: "The key to our success is treating people well. We do this by encouraging associates to speak up and take risks, by recognizing and rewarding good performance and by leading and developing people so they may grow.", icon: <Users className="w-5 h-5" /> },
  { title: 'Respect For All People', description: "In order to remain successful, our associates must work in an environment of mutual respect, free of discrimination and harassment where each associate is regarded as a part of The Home Depot Canada team.", icon: <Globe className="w-5 h-5" /> },
  { title: 'Doing The Right Thing', description: "We exercise good judgement by 'doing the right thing' instead of just 'doing things right.' We strive to understand the impact of our decisions and we accept responsibility for our actions.", icon: <ShieldCheck className="w-5 h-5" /> },
  { title: 'Building Strong Relationships', description: "Strong relationships are built on trust, honesty and integrity. We listen and respond to the needs of customers, associates, communities and vendors, treating them as partners.", icon: <Lightbulb className="w-5 h-5" /> },
  { title: 'Giving Back', description: "An important part of the fabric of The Home Depot Canada is giving our time, talents, energy and resources to help strengthen the communities we live and work in.", icon: <Heart className="w-5 h-5" /> },
  { title: 'Excellent Customer Service', description: "Along with our quality products, service, price and selection, we must go the extra mile to give customers knowledgeable advice about merchandise and to help them use those products to their maximum benefit.", icon: <Star className="w-5 h-5" /> },
  { title: 'Creating Shareholder Value', description: "The investors who provide the capital necessary to allow our company to grow need and expect a return on their investment. We are committed to providing it.", icon: <TrendingUp className="w-5 h-5" /> },
];

const awards = [
  { src: '/2025_greater_toronto_best_employers_en (1).webp', alt: "2025 Greater Toronto's Best Employers" },
  { src: '/2024_career_directory_award_en.webp', alt: '2024 Career Directory Award' },
  { src: '/2025_best_diversity_employers_en.webp', alt: '2025 Best Diversity Employers' },
  { src: '/2025_canada_greenest_employers_en.webp', alt: "2025 Canada's Greenest Employers" },
];

const CoreValuesAndAwards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const next = () => goTo((currentIndex + 1) % coreValues.length);
  const prev = () => goTo((currentIndex - 1 + coreValues.length) % coreValues.length);

  const current = coreValues[currentIndex];

  return (
    <section ref={sectionRef} className="bg-primary py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: Core Values */}
          <div
            className={`relative rounded-[40px] bg-secondary p-8 md:p-12 border border-border-primary shadow-2xl transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-[#EE7125]" />
                <span className="text-[11px] font-bold tracking-[0.3em] text-[#EE7125] uppercase">Our DNA</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-[0.95] uppercase">
                CORE<br />VALUES
              </h2>
            </div>

            {/* Value content */}
            <div className={`min-h-[160px] transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-tertiary flex items-center justify-center text-[#EE7125] shadow-lg">
                  {current.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-text-primary uppercase tracking-wide">{current.title}</h3>
              </div>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">{current.description}</p>
            </div>

            {/* Progress & Navigation */}
            <div className="mt-12 pt-12 border-t border-border-primary flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-2xl bg-tertiary border border-border-primary flex items-center justify-center text-text-primary hover:border-[#EE7125] hover:text-[#EE7125] transition-all group"
                  aria-label="Previous value"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-2xl bg-tertiary border border-border-primary flex items-center justify-center text-text-primary hover:border-[#EE7125] hover:text-[#EE7125] transition-all group"
                  aria-label="Next value"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex gap-2">
                {coreValues.map((v, i) => (
                  <button
                    key={v.title}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-[#EE7125]' : 'w-2 bg-border-primary hover:bg-text-muted'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Awards & Recognition */}
          <div
            className={`relative rounded-[40px] bg-secondary p-8 md:p-12 border border-border-primary shadow-2xl transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-[#EE7125]" />
                <span className="text-[11px] font-bold tracking-[0.3em] text-[#EE7125] uppercase">Excellence</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-[0.95] uppercase">
                AWARDS &<br />RECOGNITION
              </h2>
            </div>

            <p className="text-text-secondary text-base md:text-lg mb-10 leading-relaxed max-w-md">
              Recognized as one of Canada&apos;s leading employers for our commitment to our people, diversity, and the environment.
            </p>

            {/* Awards grid */}
            <div className="grid grid-cols-2 gap-4">
              {awards.map((award, i) => (
                <div
                  key={award.alt}
                  className={`group relative bg-white/5 rounded-3xl p-6 flex items-center justify-center border border-white/5 hover:border-[#EE7125]/30 hover:bg-white/10 transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <Image
                    src={award.src}
                    alt={award.alt}
                    width={180}
                    height={130}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreValuesAndAwards;
