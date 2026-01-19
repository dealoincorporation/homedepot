'use client';

import Link from 'next/link';
import { useState } from 'react';


const AboutUs: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
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
    }
  ];

  const toggleAccordion = (accordionId: string) => {
    setOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  const nextValue = () => {
    setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
  };

  const prevValue = () => {
    setCurrentValueIndex((prev) => (prev - 1 + coreValues.length) % coreValues.length);
  };

  return (
    <section className="px-5 py-20 bg-white w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="max-w-[85vw] mx-auto">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Text Content - Left Side */}
          <div className="lg:pr-4">
            <h2 className="text-5xl font-bold mb-8 leading-tight" style={{ color: '#000000' }}>
              LEARN. GROW. SUCCEED.
            </h2>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: '#000000' }}>
                At The Home Depot Canada, your journey starts with curiosity and a warm smile. If you love learning and find satisfaction in helping others, you'll discover a rewarding career here, where every day brings new opportunities to build your skills and make a real difference.
              </p>

              <p className="text-lg leading-relaxed" style={{ color: '#000000' }}>
                As Canada's leading home improvement retailer, we thrive on the energy, expertise, and enthusiasm of our associates. That means you'll get the training and support you need to learn, grow, and succeed, no matter where you start or where you want to go.
              </p>

              <p className="text-lg leading-relaxed" style={{ color: '#000000' }}>
                We're committed to your development. In fact, The Home Depot Canada delivers more than 1,000,000 hours of training each year, supporting over 28,000 associates nationwide. Here, you'll be empowered to take on new challenges, expand your know-how, and celebrate your achievements as you build your career.
              </p>

              <p className="text-xl font-semibold mb-8" style={{ color: '#000000' }}>
                Ready to start your journey? Join us and see how far you can go.
              </p>

              <Link href="/job-search" className="inline-block bg-orange-600 text-white px-8 py-4 text-lg font-bold hover:bg-orange-700 transition-colors duration-300 border-0 rounded-none">
                Search open roles now
              </Link>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/cg-01.d1d65574.webp"
              alt="Home Depot team walking through store, representing career growth and teamwork"
              className="w-full max-w-lg max-h-80 h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Orientation Program Section */}
        <div className="bg-white py-16 px-4">
          <h3 className="text-3xl font-bold text-orange-600 text-center mb-12">ORIENTATION PROGRAM</h3>

          <div className="max-w-4xl mx-auto">
            {/* Accordions - Centered */}
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-md mb-2 overflow-hidden">
                <h4 className="bg-white">
                  <button
                    onClick={() => toggleAccordion('sales')}
                    className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 font-bold text-gray-800"
                    aria-expanded={openAccordion === 'sales'}
                  >
                    <span className="text-orange-600 text-xl font-bold transition-transform duration-200">{openAccordion === 'sales' ? '−' : '+'}</span>
                    <span style={{ color: '#ff6600' }}>SALES AND SERVICES CLASSES</span>
                  </button>
                </h4>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'sales' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p style={{ color: '#000000' }}>
                      All the information you need to help customers access and use The Home Depot services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-md mb-2 overflow-hidden">
                <h4 className="bg-white">
                  <button
                    onClick={() => toggleAccordion('processes')}
                    className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 font-bold text-gray-800"
                    aria-expanded={openAccordion === 'processes'}
                  >
                    <span className="text-orange-600 text-xl font-bold transition-transform duration-200">{openAccordion === 'processes' ? '−' : '+'}</span>
                    <span style={{ color: '#ff6600' }}>HOW TO AND OPERATIONAL PROCESS CLASSES</span>
                  </button>
                </h4>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'processes' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p style={{ color: '#000000' }}>
                      Step-by-step instruction on how to operate the equipment, powered tools, or machines to meet the special needs of our customers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-md mb-2 overflow-hidden">
                <h4 className="bg-white">
                  <button
                    onClick={() => toggleAccordion('systems')}
                    className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 font-bold text-gray-800"
                    aria-expanded={openAccordion === 'systems'}
                  >
                    <span className="text-orange-600 text-xl font-bold transition-transform duration-200">{openAccordion === 'systems' ? '−' : '+'}</span>
                    <span style={{ color: '#ff6600' }}>SYSTEM CLASSES</span>
                  </button>
                </h4>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'systems' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p style={{ color: '#000000' }}>
                      Lessons on how to operate the computer systems within the store and process customer transactions at the cash as efficiently as possible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-md mb-2 overflow-hidden">
                <h4 className="bg-white">
                  <button
                    onClick={() => toggleAccordion('products')}
                    className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 font-bold text-gray-800"
                    aria-expanded={openAccordion === 'products'}
                  >
                    <span className="text-orange-600 text-xl font-bold transition-transform duration-200">{openAccordion === 'products' ? '−' : '+'}</span>
                    <span style={{ color: '#ff6600' }}>CORE PRODUCT KNOWLEDGE COURSE</span>
                  </button>
                </h4>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'products' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p style={{ color: '#000000' }}>
                      Essentials about the features and benefits of The Home Depot products so you can assist customers with their purchases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="py-16 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Text Content - Left Side */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <h3 className="text-3xl font-bold text-black mr-4">Our Core Values</h3>
                <div className="flex-1 h-px bg-orange-600"></div>
              </div>
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-3 text-orange-600">
                  {coreValues[currentValueIndex].title}
                </h4>
                <p className="text-lg leading-relaxed" style={{ color: '#000000' }}>
                  {coreValues[currentValueIndex].description}
                </p>
              </div>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={prevValue}
                  disabled={currentValueIndex === 0}
                  className={`text-2xl font-bold transition-colors duration-200 ${
                    currentValueIndex === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-orange-600 hover:text-orange-700 cursor-pointer'
                  }`}
                  aria-label="Previous value"
                >
                  ←
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  {currentValueIndex + 1} of {coreValues.length}
                </span>
                <button
                  onClick={nextValue}
                  disabled={currentValueIndex === coreValues.length - 1}
                  className={`text-2xl font-bold transition-colors duration-200 ${
                    currentValueIndex === coreValues.length - 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-orange-600 hover:text-orange-700 cursor-pointer'
                  }`}
                  aria-label="Next value"
                >
                  →
                </button>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/01.webp"
                alt="Our Core Values representation"
                className="w-full max-w-lg h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Awards & Recognition Section */}
        <div className="py-16 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Text Content - Left Side */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <h3 className="text-3xl font-bold text-black mr-4">Awards & Recognition</h3>
                <div className="flex-1 h-px bg-orange-600"></div>
              </div>
            </div>

            {/* Images - Right Side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/2025_greater_toronto_best_employers_en (1).webp"
                  alt="2025 Greater Toronto's Best Employers Award"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <img
                  src="/2024_career_directory_award_en.webp"
                  alt="2024 Career Directory Award"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="/2025_best_diversity_employers_en.webp"
                  alt="2025 Best Diversity Employers Award"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <img
                  src="/2025_canada_greenest_employers_en.webp"
                  alt="2025 Canada's Greenest Employers Award"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;