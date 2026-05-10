'use client';

import { useState } from 'react';
import RetailStoreHero from '@/components/career/RetailStoreHero';
import RetailStoreContent from '@/components/career/RetailStoreContent';
import RetailStoreRoles from '@/components/career/RetailStoreRoles';
import RetailStoreJobFilters from '@/components/career/RetailStoreJobFilters';
import RetailStoreJobListings from '@/components/career/RetailStoreJobListings';

interface FilterState {
  category: string;
  location: string;
  jobType: string;
}

export default function RetailStoreOpportunitiesPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    location: '',
    jobType: ''
  });

  return (
    <main>
      <RetailStoreHero />
      <RetailStoreContent />
      <RetailStoreRoles />
      <section id="jobs" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
            Retail Store Opportunities
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <RetailStoreJobFilters onFilterChange={setFilters} />
            </div>
            <div className="lg:col-span-3">
              <RetailStoreJobListings />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
