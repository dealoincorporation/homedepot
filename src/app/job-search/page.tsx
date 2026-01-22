'use client';

import { useState } from 'react';
import JobSearchHero from '@/components/job/JobSearchHero';
import JobSearchFilters from '@/components/job/JobSearchFilters';
import JobSearchResults from '@/components/job/JobSearchResults';
import StoreLocationsSection from '@/components/job/StoreLocationsSection';

interface FilterState {
  careerArea: string[];
  jobLocation: string[];
  jobType: string[];
}

export default function JobSearchPage() {
  const [filters, setFilters] = useState<FilterState>({
    careerArea: [],
    jobLocation: [],
    jobType: []
  });

  return (
    <main>
      <JobSearchHero />
      <div className="bg-white">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-3">
              <JobSearchFilters onFilterChange={setFilters} />
            </div>

            {/* Center - Job Listings */}
            <div className="lg:col-span-6">
              <JobSearchResults filters={filters} />
            </div>

            {/* Right Sidebar - Store Locations, Map, Saved Jobs, Benefits */}
            <div className="lg:col-span-3">
              <StoreLocationsSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
