'use client';

import type { FC } from 'react';

const awards = [
  { id: 'greater-toronto', image: '/2025_greater_toronto_best_employers_en (1).webp', alt: "Greater Toronto's Top 2025 Employers" },
  { id: 'career-directory', image: '/2024_career_directory_award_en.webp', alt: "Canada's Best Employers for Recent Graduates 2024" },
  { id: 'diversity', image: '/2025_best_diversity_employers_en.webp', alt: "2025 Canada's Best Diversity Employers" },
  { id: 'greenest', image: '/2025_canada_greenest_employers_en.webp', alt: "2025 Canada's Greenest Employers" },
];

const AwardsRecognition: FC = () => (
  <section className="py-16 md:py-20 bg-[#1C1C1E] border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-[#EE7125]" />
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Recognition</span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl text-white leading-none mb-10">
        AWARDS &amp; RECOGNITION
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {awards.map((award) => (
          <div
            key={award.id}
            className="bg-white/5 rounded-xl p-4 flex items-center justify-center border border-white/5 hover:border-[#EE7125]/30 hover:bg-white/10 transition-all duration-300 aspect-square"
          >
            <img
              src={award.image}
              alt={award.alt}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AwardsRecognition;
