'use client';

import { useState } from 'react';
import FieldHero from '@/components/career/FieldHero';
import FieldContent from '@/components/career/FieldContent';
import FieldJobFilters from '@/components/career/FieldJobFilters';
import JobListings from '@/components/career/JobListings';

interface FilterState {
  category: string;
  location: string;
  jobType: string;
}

export default function FieldPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    location: '',
    jobType: ''
  });

  return (
    <main>
      <FieldHero />
      <FieldContent />
      <section id="jobs" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
            Field Opportunities
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FieldJobFilters onFilterChange={setFilters} />
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
