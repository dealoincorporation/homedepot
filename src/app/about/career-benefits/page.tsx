'use client';

import Link from 'next/link';
import AboutUs from '@/components/AboutUs';



export default function CareerBenefitsPage() {


  return (
    <>
      {/* Hero Section - Career Growth Image */}
      <div className="career-growth-hero">
        <img
          src="/career-growth.png"
          alt="Career Growth at The Home Depot Canada"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="main-container">
          <div className="career-areas-holder">
            <div className="content contentPage">
              <div className="contentPage-content noPadding">
                {/* About Us Component */}
                <AboutUs />

                {/* Mobile Image Slider */}
                <div className="careerAreasSlider hideOnDesktop">
                  <div className="careerAreasSlide">
                    <img
                      src="/images/static/career-areas/cg-01.webp"
                      alt="Home Depot team walking through store, representing career growth and teamwork"
                    />
                  </div>
                  <div className="careerAreasSlide">
                    <img
                      src="/images/static/career-areas/cg-02.webp"
                      alt="Home Depot associate smiling in lumber aisle, showcasing career growth opportunities"
                    />
                  </div>
                </div>


              </div>
            </div>

            {/* Awards Section */}
            <div className="awards-content awards">
              <div className="awards-content-inner">
                <div className="flex items-center mb-6">
                  <h2 tabIndex={0} className="text-3xl font-bold text-black mr-4">
                    Awards & Recognition
                  </h2>
                  <div className="flex-1 h-px bg-orange-600"></div>
                  <label className="ada-information">
                    Press ENTER to read the content or TAB to skip.
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="space-y-4">
                    <img
                      src="/2025_greater_toronto_best_employers_en (1).webp"
                      alt="The Home Depot Canada is recognized as one of Greater Toronto's Top Employers in 2025."
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <img
                      src="/2024_career_directory_award_en.webp"
                      alt="The Home Depot Canada is recognized as one of Canada's Best Employers For Recent Graduates in 2024."
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="space-y-4">
                    <img
                      src="/2025_best_diversity_employers_en.webp"
                      alt="The Home Depot Canada is recognized as one of Canada's Best Diversity Employers in 2025."
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <img
                      src="/2025_canada_greenest_employers_en.webp"
                      alt="The Home Depot Canada is recognized as one of Canada's Greenest Employers in 2025."
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Community Join Section */}
      <div className="content-wrapper community">
        <div className="main-container">
          <div className="career-areas-holder">
            <h2 className="center">JOIN OUR TALENT COMMUNITY</h2>
            <p className="center">
              Sign up on Workday to be considered for future opportunities at The Home Depot Canada.
            </p>
            <a
              href="https://homedepot.wd5.myworkdayjobs-impl.com/en-US/CareerDepotCanada/introduceYourself"
              target="_blank"
              rel="noopener noreferrer"
              className="introduceYourSelfBtn"
            >
              Introduce Yourself
            </a>
          </div>
        </div>
      </div>
    </>
  );
}