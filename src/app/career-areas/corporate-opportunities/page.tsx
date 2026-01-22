'use client';

import { useState } from 'react';
import CorporateHero from '@/components/career/CorporateHero';
import SupportCentreSection from '@/components/career/SupportCentreSection';
import JobFilters from '@/components/career/JobFilters';
import JobListings from '@/components/career/JobListings';

interface FilterState {
  category: string;
  location: string;
  jobType: string;
}

export default function CorporateOpportunitiesPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    location: '',
    jobType: ''
  });

  return (
    <main>
      <CorporateHero />
      <SupportCentreSection />
      <section id="jobs" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <JobFilters onFilterChange={setFilters} />
            </div>
            <div className="lg:col-span-3">
              <JobListings filters={filters} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
