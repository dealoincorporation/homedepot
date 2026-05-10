'use client';

import { useState } from 'react';
import JobSearchHero from '@/components/job/JobSearchHero';
import JobSearchFilters from '@/components/job/JobSearchFilters';
import JobSearchResults from '@/components/job/JobSearchResults';
import StoreLocationsSection from '@/components/job/StoreLocationsSection';
import { X } from 'lucide-react';

interface FilterState {
  careerArea: string[];
  jobLocation: string[];
  jobType: string[];
}

export default function JobSearchPage() {
  const [filters, setFilters] = useState<FilterState>({
    careerArea: [],
    jobLocation: [],
    jobType: [],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <main className="min-h-screen bg-primary">
      {/* Desktop Hero */}
      <div className="hidden lg:block">
        <JobSearchHero />
      </div>

      {/* Mobile Hero Banner */}
      <div className="lg:hidden relative w-full h-[140px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-image.png"
            alt="Home Depot Canada"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-center px-6">
          <h1 className="font-display text-3xl text-text-primary leading-none">
            FIND YOUR<br />
            <span className="text-[#EE7125]">NEXT ROLE</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-primary">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="rounded-2xl bg-secondary border border-border-primary overflow-hidden">
                <JobSearchFilters onFilterChange={setFilters} />
              </div>
            </div>

            {/* Center - Job Listings */}
            <div className="lg:col-span-6">
              <JobSearchResults
                filters={filters}
                onFilterClick={() => setShowMobileFilters(true)}
                showMobileFilters={showMobileFilters}
                onCloseMobileFilters={() => setShowMobileFilters(false)}
              />
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="rounded-2xl bg-secondary border border-border-primary overflow-hidden">
                <StoreLocationsSection />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowMobileFilters(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-secondary border-l border-border-primary overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-secondary border-b border-border-primary px-5 py-4 flex items-center justify-between z-10">
              <h2 className="text-base font-bold text-text-primary">Filter Jobs</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-primary text-text-primary hover:border-[#EE7125] hover:text-[#EE7125] transition-colors"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <JobSearchFilters onFilterChange={setFilters} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
