import Link from 'next/link';
import type { FC } from 'react';

const HeroSection: FC = () => {
  return (
    <div 
      className="relative overflow-hidden min-h-[400px] md:min-h-[280px] bg-cover bg-center bg-no-repeat border-b-4 md:border-b-8 border-orange-600"
      style={{
        backgroundImage: "url('/images/hero/hero-image.png')",
      }}
    >
      <div className="relative z-[2] px-5 md:px-5 py-[60px] md:py-[50px] text-white max-w-[1200px] mx-auto">
        <div className="max-w-[600px] text-left">
          <h1 className="text-[2.5rem] md:text-[3rem] font-bold mb-4 md:mb-4 leading-tight text-white">
            Find Yourself A Great Career at The Home Depot Canada
          </h1>
          <p className="text-[1.1rem] md:text-[1.25rem] mb-10 md:mb-10 leading-relaxed text-white">
            Where you're empowered to make a real impact, foster growth, and shape the future of home improvement.
          </p>
          <div className="flex flex-row gap-2.5 md:gap-2.5 flex-wrap mt-5 md:mt-5">
            <Link 
              href="/job-search" 
              aria-label="Press enter to search for jobs" 
              tabIndex={-1} 
              className="flex flex-1 min-w-[140px] items-center justify-center px-6 md:px-[30px] py-3 md:py-[15px] bg-[#ff6600] hover:bg-[#212529] text-white text-center font-bold md:font-bold transition-all duration-300 no-underline"
            >
              Search All Jobs
            </Link>
            <Link 
              href="/associate-portal" 
              aria-label="Press enter to go to the associates site" 
              tabIndex={-1} 
              className="flex flex-1 min-w-[140px] items-center justify-center px-6 md:px-[30px] py-3 md:py-[15px] bg-[#ff6600] hover:bg-[#212529] text-white text-center font-bold md:font-bold transition-all duration-300 no-underline"
            >
              Current Associates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;