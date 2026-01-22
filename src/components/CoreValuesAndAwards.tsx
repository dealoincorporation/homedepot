'use client';

import { useState } from 'react';
import Image from 'next/image';

const CoreValuesAndAwards: React.FC = () => {
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

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
      title: "Creating Shareholder Value",
      description: "The investors who provide the capital necessary to allow our company to grow need and expect a return on their investment. We are committed to providing it."
    }
  ];

  const nextValue = () => {
    setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
  };

  const prevValue = () => {
    setCurrentValueIndex((prev) => (prev - 1 + coreValues.length) % coreValues.length);
  };

  const currentValue = coreValues[currentValueIndex];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Panel - Our Core Values */}
          <div className="border border-black bg-white p-6 md:p-8 rounded-lg">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                Our Core Values
              </h2>
              <div className="h-px bg-black w-full"></div>
            </div>

            {/* Current Value Title */}
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              {currentValue.title}
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-black leading-relaxed mb-6">
              {currentValue.description}
            </p>

            {/* Circular Diagram */}
            <div className="flex justify-center items-center mb-6">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/01.webp"
                  alt="Our Core Values representation"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={prevValue}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 border border-black flex items-center justify-center transition-colors"
                aria-label="Previous value"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextValue}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 border border-black flex items-center justify-center transition-colors"
                aria-label="Next value"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Panel - Awards & Recognition */}
          <div className="border border-black bg-white p-6 md:p-8 rounded-lg">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                Awards & Recognition
              </h2>
              <div className="h-px bg-black w-full"></div>
            </div>

            {/* Awards Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-center justify-center">
                <Image
                  src="/2025_greater_toronto_best_employers_en (1).webp"
                  alt="2025 Greater Toronto's Best Employers Award"
                  width={200}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/2024_career_directory_award_en.webp"
                  alt="2024 Career Directory Award"
                  width={200}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/2025_best_diversity_employers_en.webp"
                  alt="2025 Best Diversity Employers Award"
                  width={200}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/2025_canada_greenest_employers_en.webp"
                  alt="2025 Canada's Greenest Employers Award"
                  width={200}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesAndAwards;
