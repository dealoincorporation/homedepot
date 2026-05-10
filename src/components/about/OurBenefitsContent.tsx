'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { 
  Heart, 
  Baby, 
  Banknote, 
  LineChart, 
  Umbrella, 
  GraduationCap, 
  Building2, 
  ShieldCheck,
  Plus
} from 'lucide-react';

const benefits = [
  { 
    id: 'health', 
    title: 'Health Benefits', 
    icon: <Heart className="w-5 h-5" />, 
    content: 'Comprehensive health coverage including medical, dental, and vision benefits for you and your eligible dependents.' 
  },
  { 
    id: 'maternity', 
    title: 'Maternity & Parental', 
    icon: <Baby className="w-5 h-5" />, 
    content: 'Enhanced maternity and parental leave benefits with top-up payments for salaried associates.' 
  },
  { 
    id: 'bonus', 
    title: 'Bonus Plan', 
    icon: <Banknote className="w-5 h-5" />, 
    content: 'Performance-based bonus opportunities that reward your hard work and contributions to our success.' 
  },
  { 
    id: 'stock', 
    title: 'Stock Purchase', 
    icon: <LineChart className="w-5 h-5" />, 
    content: 'Purchase company stock at a discounted rate and share in our long-term success.' 
  },
  { 
    id: 'timeoff', 
    title: 'Time Off', 
    icon: <Umbrella className="w-5 h-5" />, 
    content: 'Generous paid time off including vacation days, personal days, and holidays.' 
  },
  { 
    id: 'tuition', 
    title: 'Tuition Support', 
    icon: <GraduationCap className="w-5 h-5" />, 
    content: 'Financial support for continuing education and professional development.' 
  },
  { 
    id: 'retirement', 
    title: 'Retirement Plans', 
    icon: <Building2 className="w-5 h-5" />, 
    content: 'RRSP matching and comprehensive retirement savings plans for your financial future.' 
  },
  { 
    id: 'care', 
    title: 'CARE Program', 
    icon: <ShieldCheck className="w-5 h-5" />, 
    content: 'Employee assistance and wellness programs supporting physical, mental, and emotional well-being.' 
  },
];

const OurBenefitsContent: FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#EE7125]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Total Rewards</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-text-primary leading-[0.95] mb-8 uppercase">
            CARING FOR OUR<br />
            <span className="text-[#EE7125]">ASSOCIATES</span>
          </h2>
          <div className="max-w-3xl">
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
              Taking care of our associates and their families is core to who we are. The Home Depot Canada offers a world-class total value benefits package designed to empower you at every stage of your life.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className={`group rounded-[32px] border transition-all duration-500 overflow-hidden ${
                expanded === benefit.id
                  ? 'bg-secondary border-[#EE7125]/50 shadow-2xl'
                  : 'bg-secondary/40 border-border-primary hover:border-[#EE7125]/30'
              }`}
            >
              <button
                onClick={() => setExpanded(expanded === benefit.id ? null : benefit.id)}
                className="w-full flex items-center gap-6 px-8 py-7 text-left"
                aria-expanded={expanded === benefit.id}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  expanded === benefit.id ? 'bg-[#EE7125] text-white' : 'bg-tertiary border border-border-primary text-[#EE7125] group-hover:bg-[#EE7125]/10'
                }`}>
                  {benefit.icon}
                </div>
                
                <span className={`flex-1 text-base font-black uppercase tracking-widest transition-colors ${
                  expanded === benefit.id ? 'text-[#EE7125]' : 'text-text-primary'
                }`}>
                  {benefit.title}
                </span>

                <div className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  expanded === benefit.id
                    ? 'bg-[#EE7125] border-[#EE7125] text-white rotate-45'
                    : 'border-border-primary text-text-muted group-hover:border-[#EE7125]/50 group-hover:text-[#EE7125]'
                }`}>
                  <Plus className="w-5 h-5" />
                </div>
              </button>

              <div 
                className={`transition-all duration-500 ease-in-out ${
                  expanded === benefit.id ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 pl-[88px]">
                  <div className="h-px w-full bg-border-primary mb-6" />
                  <p className="text-text-secondary text-base leading-relaxed">
                    {benefit.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBenefitsContent;
