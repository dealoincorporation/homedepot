'use client';

import { useState } from 'react';
import type { FC } from 'react';

const EarlyTalentContent: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/early-talent-v01.a98847b9.webp',
      alt: 'Home Depot Canada early talent team members wearing orange aprons and standing together in front of a Home Depot backdrop.'
    },
    {
      image: '/early-talent-v02.af6cce84.webp',
      alt: 'Home Depot Canada associates volunteering together, wearing orange shirts and holding signs promoting hope, dignity, and resilience.'
    }
  ];

  return (
    <section id="build-future" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
          {/* Left Column - Text Content */}
          <div className="order-2 md:order-1">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-sm md:text-base font-normal text-gray-500 mb-2 uppercase tracking-wide">
                Early Talent
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Build Your Future Here
                <span className="sr-only">Press ENTER to read the content or TAB to skip.</span>
              </h3>
            </div>

            {/* Content */}
            <div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-6">
                Are you ready to launch your career and make a real impact? At The Home Depot Canada, we empower early talent to grow, learn, and thrive. Whether you're looking for your first job, a co-op placement, or a pathway to long-term success, you'll find endless opportunities to discover your strengths and shape your future.
              </p>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-8">
                Many of our Early Talent Programs are designed to support our store associates, helping you build skills, gain experience, and achieve your goals. We're committed to your growth and learning, so you can make a difference from day one.
              </p>
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

        {/* Programs Section */}
        <div className="max-w-4xl">
          {/* Summer Internship/Co-op Program */}
          <div className="mb-12 pb-12 border-b border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 uppercase">
              Summer Internship/Co-op Program:
            </h3>
            <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4">
              Our paid 16-week summer internship offers hands-on projects that directly impact our business. You'll be part of a fast-paced team, working on meaningful assignments and building your professional network. This program is <strong>open to all hourly associates and external candidates</strong> currently enrolled in a Canadian accredited university or college.
            </p>
          </div>

          {/* Career Launch Program */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 uppercase">
              Career Launch Program:
            </h3>
            <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4">
              This paid 13-week program gives hourly field associates a chance to gain SSC (Store Support Centre) exposure, diversify their skillsets, and prepare for future roles. Open to <strong>current hourly associates</strong> who have completed a post-secondary degree or diploma within the last three years, in Canada or abroad.
            </p>
          </div>

          {/* Closing Paragraph */}
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            Our early talent programs provide the tools and experiences you need to build the foundation for your career and help revolutionize the future of retail. You'll hear from inspiring leaders, participate in development sessions, and join team-building activities, all designed to help you grow and succeed.
          </p>
        </div>

      </div>
    </section>
  );
};

export default EarlyTalentContent;
