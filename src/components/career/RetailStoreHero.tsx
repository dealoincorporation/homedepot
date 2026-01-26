'use client';

import Link from 'next/link';
import type { FC } from 'react';

const RetailStoreHero: FC = () => {
  return (
    <section className="relative w-full bg-white">
      {/* Hero Image */}
      <div className="relative w-full">
        <div className="relative overflow-hidden">
          <img
            src="/general_top_image_mobile.67e53.webp"
            alt="Retail Store Career Opportunities at The Home Depot Canada"
            className="w-full h-[220px] md:h-[280px] lg:h-[320px] object-cover"
          />
          {/* Thick Orange Border Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-orange-600"></div>

          {/* Dark overlay for desktop text readability */}
          <div className="hidden md:block absolute inset-0 bg-black/50"></div>

          {/* Desktop: Content overlaid on image, aligned left */}
          <div className="hidden md:block absolute inset-0 z-10">
            <div className="absolute left-6 lg:left-8 top-[55%] -translate-y-1/2 w-[85%] max-w-7xl ml-10">
              <div className="max-w-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  Retail Store Career<br />
                  Opportunities at<br />
                  The Home Depot Canada
                </h1>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="#retail-opportunities"
                    className="inline-block px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold transition-colors duration-300 text-center"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="#jobs"
                    className="inline-block px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold transition-colors duration-300 text-center"
                  >
                    Retail Store Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Content below image, aligned left */}
      <div className="md:hidden bg-white px-4 py-6">
        <h1 className="text-2xl font-bold text-black mb-4 leading-tight">
          Retail Store Career<br />
          Opportunities at<br />
          The Home Depot Canada
        </h1>

        <div className="flex flex-row gap-3">
          <Link
            href="#retail-opportunities"
            className="flex-1 px-4 sm:px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base font-semibold transition-colors duration-300 text-center"
          >
            Learn More
          </Link>
          <Link
            href="#jobs"
            className="flex-1 px-4 sm:px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base font-semibold transition-colors duration-300 text-center"
          >
            Retail Store Jobs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RetailStoreHero;

