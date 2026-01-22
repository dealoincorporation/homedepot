'use client';

import type { FC } from 'react';

const AwardsRecognition: FC = () => {
  const awards = [
    {
      id: 'greater-toronto',
      image: '/2025_greater_toronto_best_employers_en (1).webp',
      alt: "Greater Toronto's Top 2025 Employers"
    },
    {
      id: 'career-directory',
      image: '/2024_career_directory_award_en.webp',
      alt: "The Career Directory 2024: Canada's Best Employers for Recent Graduates"
    },
    {
      id: 'diversity',
      image: '/2025_best_diversity_employers_en.webp',
      alt: "2025 Canada's Best Diversity Employers"
    },
    {
      id: 'greenest',
      image: '/2025_canada_greenest_employers_en.webp',
      alt: "2025 Canada's Greenest Employers"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Awards & Recognition
          </h2>
        </div>

        {/* Awards - All in One Box */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {awards.map((award) => (
              <div
                key={award.id}
                className="flex items-center justify-center"
              >
                <img
                  src={award.image}
                  alt={award.alt}
                  className="w-full h-auto max-h-32 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognition;
