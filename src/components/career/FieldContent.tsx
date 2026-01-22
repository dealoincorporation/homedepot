'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FC } from 'react';

const FieldContent: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/field-careers-01.4d8f80dc.webp',
      alt: 'Distribution associate operating forklifts inside The Home Depot Canada distribution centre.'
    },
    {
      image: '/images/field-careers-02.9da23e87.webp',
      alt: 'The Home Depot Canada field associate handling appliance delivery in a warehouse environment.'
    }
  ];

  return (
    <section id="field-opportunities" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Two Column Layout - 50% text, 50% image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Text Content (50% width) */}
          <div className="order-2 md:order-1">
            {/* Field Opportunities Header */}
            <div className="mb-4">
              <h2 className="text-sm md:text-base font-normal text-gray-500 uppercase tracking-wide">
                Field Opportunities
              </h2>
            </div>

            {/* Main Heading */}
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                Drive Success Behind the Scenes
                <span className="sr-only">Press ENTER to read the content or TAB to skip.</span>
              </h3>
            </div>

            {/* Content Paragraph */}
            <div className="mb-8">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                At The Home Depot Canada, our business thrives thanks to the dedicated teams working in our distribution and warehouse centres, outside sales, home services, and contact centers. Whether you're moving products, supporting customers, or delivering solutions, you'll find a place where your work truly matters.
              </p>
            </div>

            {/* Why Join Section */}
            <div className="mb-8">
              <h4 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 uppercase">
                Why join the team?
              </h4>
              <ul className="space-y-4 text-base md:text-lg text-gray-800 leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Join a team focused on precision, safety, and scale, where your commitment to accuracy and teamwork directly delivers products to our stores and customers across Canada.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You'll be empowered to learn new skills, build relationships, and make a real difference for customers and your team.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Your career journey matters, explore endless opportunities to grow, develop, and succeed.</span>
                </li>
              </ul>
            </div>

            {/* Ready to Join CTA */}
            <div className="mb-8">
              <h4 className="text-xl md:text-2xl font-bold text-orange-600 uppercase">
                Ready to join our team? Learn more about field roles.
              </h4>
            </div>
          </div>

          {/* Right Column - Image Slider (50% width) */}
          <div className="order-1 md:order-2 relative">
            <div className="relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
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

        {/* Warehouse and Contact Center Sections - Below the main content */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Warehouse Section */}
          <div className="pb-8 border-b md:border-b-0 md:border-r border-gray-200 md:pr-8">
            <h4 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 uppercase">
              Warehouse – Distribution Centres
            </h4>
            <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-6">
              We have distribution centers all across the country, and we're adding even more. Jobs in our warehouses offer consistent schedules and competitive pay. As part of our growing supply chain, you'll have opportunities to learn on the job and expand your career. Find out more about our warehouse jobs below.
            </p>
            <Link
              href="#jobs"
              className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold transition-colors duration-300 text-center"
            >
              Search open roles now
            </Link>
          </div>

          {/* Contact Center Section */}
          <div className="pb-8 md:pl-8">
            <h4 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 uppercase">
              Contact Center
            </h4>
            <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-6">
              From assisting customers while placing an order to supporting our internal teams, our contact center associates are always ready to help.
            </p>
            <Link
              href="#jobs"
              className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold transition-colors duration-300 text-center"
            >
              Search open roles now
            </Link>
          </div>
        </div>

        {/* View Open Roles Button */}
        <div className="text-center mt-12">
          <Link
            href="#jobs"
            className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold transition-colors duration-300"
          >
            View open roles now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FieldContent;
