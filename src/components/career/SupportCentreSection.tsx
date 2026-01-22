'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FC } from 'react';

const SupportCentreSection: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/corporate-career-area-v1.e73fe68e.webp',
      alt: 'Home Depot Canada corporate team members having a meeting in a modern office space'
    },
    {
      image: '/corporate-career-area-v2.29009516.webp',
      alt: 'Home Depot Canada corporate associate working at a desk in an open office environment'
    }
  ];

  return (
    <section id="support-centre" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="order-2 md:order-1">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-sm md:text-base font-normal text-gray-500 mb-2 uppercase tracking-wide">
                Corporate Opportunities
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
                Join Our Store Support Centre Team
                <span className="sr-only">Press ENTER to read the content or TAB to skip.</span>
              </h3>
            </div>

            {/* Content */}
            <div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-6">
                Behind every great store is a team of corporate associates driving innovation, strategy, and support. 
                At The Home Depot Canada, our corporate associates are empowered to excel, collaborate, and lead with purpose, 
                with our customers and store associates at the forefront of everything we do. Our mission is to remove barriers 
                and provide the support our stores and customers need to thrive, ensuring every decision and initiative helps 
                build a better experience for all. Our Support Centre (SSC) is based in Toronto (North York), Ontario.
              </p>

              <div className="mb-6">
                <h4 className="text-base md:text-lg font-bold text-orange-600 mb-4 uppercase">
                  Learn more about some of our corporate teams:
                </h4>
                <div className="team-grid">
                  {['Human Resources', 'Information Technology', 'Merchandising', 'Stores/Operations', 'HD Direct', 'HD Equipment Services'].map((team) => (
                    <div key={team} className="team-card">
                      <p className="text-base md:text-lg font-semibold text-gray-800">{team}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="#jobs"
                className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-base md:text-lg font-semibold transition-colors duration-300"
              >
                Search open roles now
              </Link>
            </div>
          </div>

          {/* Right Column - Image Slider */}
          <div className="order-1 md:order-2 relative">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg">
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

            {/* Navigation Circles */}
            <div className="flex justify-end gap-3 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-orange-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
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

export default SupportCentreSection;
