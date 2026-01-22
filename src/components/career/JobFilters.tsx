'use client';

import { useState } from 'react';
import type { FC } from 'react';

interface JobFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  location: string;
  jobType: string;
}

const JobFilters: FC<JobFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    location: '',
    jobType: ''
  });

  const [expandedSections, setExpandedSections] = useState<{
    category: boolean;
    location: boolean;
    jobType: boolean;
  }>({
    category: false,
    location: false,
    jobType: false
  });

  const categories = [
    'HD Direct',
    'HD Equipment Services',
    'HD Rental',
    'Human Resources',
    'Information Technology',
    'JOB_FAMILY-3-111',
    'Merchandising',
    'Shared Corporate Job Families',
    'Stores/Operations'
  ];

  const locations = [
    'AB - Virtual',
    'BC - Virtual',
    'ON - Thunder Bay',
    'ON - Toronto'
  ];

  const jobTypes = [
    'Full Time',
    'Other'
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <aside className="bg-white p-5 border border-gray-200 rounded-lg lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-200">
        <h3 className="text-base font-semibold text-black">
          Filter Jobs By:
        </h3>
        <i className="fas fa-filter text-orange-600 text-sm"></i>
      </div>

      {/* Job Category */}
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex justify-between items-center py-4 bg-transparent border-none text-left text-[15px] font-medium text-black hover:text-orange-600 transition-colors cursor-pointer"
          aria-expanded={expandedSections.category}
        >
          <span>Job Category</span>
          <span className="text-orange-600 text-xl font-bold ml-auto">{expandedSections.category ? '−' : '+'}</span>
        </button>
        {expandedSections.category && (
          <div className="flex flex-col gap-2 pb-4">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer py-1 text-sm text-gray-700">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="cursor-pointer accent-orange-600"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Job Location */}
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection('location')}
          className="w-full flex justify-between items-center py-4 bg-transparent border-none text-left text-[15px] font-medium text-black hover:text-orange-600 transition-colors cursor-pointer"
          aria-expanded={expandedSections.location}
        >
          <span>Job Location</span>
          <span className="text-orange-600 text-xl font-bold ml-auto">{expandedSections.location ? '−' : '+'}</span>
        </button>
        {expandedSections.location && (
          <div className="flex flex-col gap-2 pb-4">
            {locations.map((loc) => (
              <label key={loc} className="flex items-center gap-2.5 cursor-pointer py-1 text-sm text-gray-700">
                <input
                  type="radio"
                  name="location"
                  value={loc}
                  checked={filters.location === loc}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="cursor-pointer accent-orange-600"
                />
                <span>{loc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Job Type */}
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection('jobType')}
          className="w-full flex justify-between items-center py-4 bg-transparent border-none text-left text-[15px] font-medium text-black hover:text-orange-600 transition-colors cursor-pointer"
          aria-expanded={expandedSections.jobType}
        >
          <span>Job Type</span>
          <span className="text-orange-600 text-xl font-bold ml-auto">{expandedSections.jobType ? '−' : '+'}</span>
        </button>
        {expandedSections.jobType && (
          <div className="flex flex-col gap-2 pb-4">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center gap-2.5 cursor-pointer py-1 text-sm text-gray-700">
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={filters.jobType === type}
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  className="cursor-pointer accent-orange-600"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default JobFilters;
