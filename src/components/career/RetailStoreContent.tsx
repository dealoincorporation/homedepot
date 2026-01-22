'use client';

import { useState } from 'react';
import type { FC } from 'react';

const RetailStoreContent: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/rs-01.4b1ed1bc.webp',
      alt: 'Home Depot store associates walking down an aisle together, representing retail store opportunities.',
    },
    {
      image: '/rs-02.83ab8685.webp',
      alt: 'Home Depot store associates working in a welcoming store environment.',
    },
  ];

  return (
    <section id="retail-opportunities" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Two Column Layout - 50% text, 50% image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Text Content (50% width) */}
          <div className="order-2 md:order-1 space-y-10">
            {/* Header Section */}
            <div>
              <h2 className="text-sm md:text-base font-normal text-gray-500 uppercase tracking-wide mb-2">
                Retail Store Opportunities
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Discover Your Opportunity In-Store
              </h3>
            </div>

            {/* Introductory Paragraph */}
            <div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                At The Home Depot Canada, every store is powered by our incredible associates. Whether you're looking
                for your first job, a flexible part-time role, or a long-term career, we've got you covered. Our stores
                are more than just workplaces, they're communities where genuine connections are made, collaboration is
                valued, and everyone is welcome.
              </p>
            </div>

            {/* Why Join Section */}
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 uppercase">
                WHY JOIN OUR IN-STORE TEAM?
              </h4>
              <ul className="space-y-4 text-base md:text-lg text-gray-800 leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Join a supportive team where you'll build genuine friendships and a strong sense of community.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You'll be empowered to learn new skills, build relationships, and make a real difference for
                    customers and your team.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Your career journey matters, explore endless opportunities to grow, develop, and succeed.</span>
                </li>
              </ul>
            </div>

            {/* Ready to Join CTA */}
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-orange-600 uppercase">
                READY TO JOIN OUR TEAM? LEARN MORE ABOUT OUR STORE ROLES.
              </h4>
            </div>
          </div>

          {/* Right Column - Image Slider (50% width) */}
          <div className="order-1 md:order-2 relative">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="min-w-full h-full">
                    <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Circles - Orange filled/outlined */}
            <div className="flex justify-end gap-3 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-orange-600' : 'border-2 border-orange-600 bg-transparent'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetailStoreContent;

