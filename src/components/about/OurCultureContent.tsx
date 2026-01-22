'use client';

import { useState } from 'react';
import type { FC } from 'react';

const OurCultureContent: FC = () => {
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

  const sliderImages = [
    '/slider/01 (1).webp',
    '/slider/02.webp',
    '/slider/03.webp',
    '/slider/04.webp',
    '/slider/05.webp',
    '/slider/06.webp',
    '/slider/07.webp',
    '/slider/08.webp',
  ];

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
      title: "Developing Our People",
      description: "We invest in our associates' growth and development, providing training and opportunities to help them reach their full potential."
    }
  ];

  const nextValue = () => {
    setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
  };

  const prevValue = () => {
    setCurrentValueIndex((prev) => (prev - 1 + coreValues.length) % coreValues.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Main Content */}
          <div className="space-y-12">
            {/* Living Our Values Section */}
            <div>
              <h2 className="text-sm md:text-base font-normal text-gray-500 uppercase tracking-wide mb-2">
                About Us
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Living Our Values
              </h3>
              <div className="space-y-6">
                <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                  We live by our values. We think of them as instructions that guide our actions each day. Our values keep us all working toward the same goals, allowing us to build strong teams and deliver the exceptional service our customers count on from us.
                </p>
                <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                  At The Home Depot Canada, we're more than just a workplace, we're a community built on genuine connections and spirited collaboration, where the entrepreneurial spirit is encouraged. We share a fundamental commitment to supporting both our customers, our associates, and our communities.
                </p>
              </div>
            </div>

            {/* WeAreTHD Section */}
            <div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                WeAreTHD
              </h3>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                We strive to maintain a culture that welcomes everyone. We believe it helps us achieve our business goals by driving excellent customer service and innovation, empowering our associates to thrive and excel, and enriching the communities in which we operate. This includes creating an environment where our associates feel welcomed, valued, and respected, and providing equal opportunity for all of our associates.
              </p>
            </div>

          </div>

          {/* Right Side - Core Values Box */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-gray-50 rounded-xl p-8 md:p-10 shadow-lg border border-gray-200">
              {/* Our Core Values Heading */}
              <div className="flex items-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-black mr-4">
                  Our Core Values
                </h3>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Current Value Display */}
              <div className="mb-8">
                <h4 className="text-xl md:text-2xl font-bold text-black mb-4">
                  {coreValues[currentValueIndex].title}
                </h4>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {coreValues[currentValueIndex].description}
                </p>
              </div>

              {/* Image Slider */}
              <div className="relative mb-8 w-full h-[300px] md:h-[400px] overflow-hidden">
                <img
                  src={sliderImages[currentValueIndex % sliderImages.length]}
                  alt={`Culture image ${currentValueIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={prevValue}
                  className="w-12 h-12 bg-white border-2 border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 transition-all duration-200 flex items-center justify-center rounded-lg shadow-sm hover:shadow-md"
                  aria-label="Previous value"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm text-gray-600 font-medium px-4">
                  {currentValueIndex + 1} of {coreValues.length}
                </span>
                <button
                  onClick={nextValue}
                  className="w-12 h-12 bg-white border-2 border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 transition-all duration-200 flex items-center justify-center rounded-lg shadow-sm hover:shadow-md"
                  aria-label="Next value"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCultureContent;
