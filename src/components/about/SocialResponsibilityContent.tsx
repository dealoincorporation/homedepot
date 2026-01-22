'use client';

import { useState } from 'react';
import type { FC } from 'react';

const SocialResponsibilityContent: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/social-responsibility-01.6f754c52.webp',
      alt: 'Team Depot volunteers wearing orange t-shirts, holding banners and signs, posing outdoors in front of buildings.'
    },
    {
      image: '/images/social-responsibility-02.5b840abe.webp',
      alt: 'Team Depot volunteers giving back to the community.'
    },
    {
      image: '/images/social-responsibility-03.769a836a.webp',
      alt: 'Team Depot community service project.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Two Column Layout - 50% text, 50% image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Text Content (50% width) */}
          <div className="order-2 md:order-1 space-y-10">
            {/* Header Section */}
            <div>
              <h2 className="text-sm md:text-base font-normal text-gray-500 uppercase tracking-wide mb-2">
                About Us
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Social Corporate Responsibility
              </h3>
            </div>

            {/* Introductory Paragraph */}
            <div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                At The Home Depot Canada, we're committed to making a positive impact in the communities where we live and work. Through The Home Depot Canada Foundation and Team Depot, we support initiatives that strengthen neighborhoods, help those in need, and create lasting change.
              </p>
            </div>

            {/* Team Depot Section */}
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 uppercase">
                TEAM DEPOT: GIVING BACK, BUILDING COMMUNITY
              </h4>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                Team Depot is The Home Depot's associate volunteer force, dedicated to improving the communities where we live and work. Our associates donate their time and talents to support local charities, respond to natural disasters, and tackle community improvement projects. Team Depot projects are driven by our values of giving back and doing the right thing, with participation from all stores, distribution centers, and offices nationwide.
              </p>
            </div>

            {/* Foundation Section */}
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 uppercase">
                THE HOME DEPOT CANADA FOUNDATION: ENDING YOUTH HOMELESSNESS
              </h4>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                The Home Depot Canada Foundation (THDCF) is committed to preventing and ending youth homelessness in Canada. Through community partnerships, THDCF aims to break down systemic barriers and create healthy pathways out of homelessness. By 2030, The Home Depot Canada plans to invest $125 million to create new paths for youth at risk or experiencing homelessness.
              </p>
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
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
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
                    currentSlide === index
                      ? 'bg-orange-600'
                      : 'border-2 border-orange-600 bg-transparent'
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

export default SocialResponsibilityContent;
