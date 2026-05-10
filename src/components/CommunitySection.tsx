'use client';

import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Bell, Target, Globe, Rocket, ArrowRight } from 'lucide-react';

const CommunitySection: FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: <Bell className="w-5 h-5" />, title: 'Be First to Know', desc: 'Get notified about new opportunities before anyone else.' },
    { icon: <Target className="w-5 h-5" />, title: 'Role Matching', desc: "We'll connect you with roles that match your skills and interests." },
    { icon: <Globe className="w-5 h-5" />, title: 'Canada-Wide', desc: 'Opportunities across 182+ stores in every province.' },
    { icon: <Rocket className="w-5 h-5" />, title: 'Instant Impact', desc: 'Join a team where your work makes a real difference from day one.' },
  ];

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-primary py-24 md:py-32">
      {/* Background elements */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-[#EE7125] to-[#C85E1A] hidden lg:block"
        style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      />
      
      {/* Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EE7125]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Content */}
          <div
            className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#EE7125]" />
              <span className="text-[11px] font-bold tracking-[0.3em] text-[#EE7125] uppercase">Talent Community</span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl xl:text-8xl text-text-primary leading-[0.9] mb-8 uppercase tracking-tight">
              JOIN OUR<br />
              <span className="relative inline-block text-[#EE7125]">
                COMMUNITY
                <div 
                  className="absolute -bottom-2 left-0 h-[4px] bg-white/10 rounded-full transition-all duration-1000 delay-500"
                  style={{ width: visible ? '100%' : '0%' }}
                />
              </span>
            </h2>

            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Stay connected with us. Sign up to be considered for future opportunities at The Home Depot Canada—even before a position opens.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-2xl bg-secondary border-2 border-primary flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                Join <span className="text-text-primary font-black">10,000+</span> Professionals
              </span>
            </div>

            <Link
              href="https://homedepot.wd5.myworkdayjobs-impl.com/en-US/CareerDepotCanada/introduceYourself"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-4 bg-[#EE7125] hover:bg-[#FF8A40] text-white font-black text-sm uppercase tracking-[0.2em] px-10 py-5 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(238,113,37,0.4)] hover:shadow-[0_20px_50px_rgba(238,113,37,0.6)] hover:-translate-y-1"
            >
              Introduce Yourself
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Features */}
          <div
            className={`grid grid-cols-1 gap-4 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {features.map((item, i) => (
              <div
                key={item.title}
                className="group relative p-8 rounded-[32px] bg-secondary/40 backdrop-blur-md border border-border-primary hover:border-[#EE7125]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-tertiary border border-border-primary flex items-center justify-center text-[#EE7125] transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-text-primary mb-1 uppercase tracking-wider">{item.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;