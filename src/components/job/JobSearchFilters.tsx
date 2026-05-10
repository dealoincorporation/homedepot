'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Filter, ChevronDown, ChevronUp, XCircle, CheckCircle2 } from 'lucide-react';

interface JobSearchFiltersProps {
  onFilterChange?: (filters: { careerArea: string[]; jobLocation: string[]; jobType: string[] }) => void;
}

const JobSearchFilters: FC<JobSearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<{
    careerArea: string[];
    jobLocation: string[];
    jobType: string[];
  }>({
    careerArea: [],
    jobLocation: [],
    jobType: []
  });

  const [expandedSections, setExpandedSections] = useState<{
    careerArea: boolean;
    jobLocation: boolean;
    jobType: boolean;
  }>({
    careerArea: true, // Expanded by default
    jobLocation: false,
    jobType: false
  });

  const careerAreas = [
    'Corporate',
    'Field',
    'Retail Management',
    'Retail Store'
  ];

  const jobLocations = [
    'Virtual', 'AB - Airdrie', 'AB - Calgary', 'AB - Edmonton', 'BC - Vancouver', 'ON - Toronto',
    'ON - Mississauga', 'ON - Ottawa', 'ON - Hamilton', 'QC - Montreal', 'QC - Quebec City'
  ];

  const jobTypes = [
    'Full Time',
    'Part Time',
    'Seasonal',
    'Other'
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (key: 'careerArea' | 'jobLocation' | 'jobType', value: string) => {
    const newFilters = { ...filters };
    if (newFilters[key].includes(value)) {
      newFilters[key] = newFilters[key].filter(item => item !== value);
    } else {
      newFilters[key] = [...newFilters[key], value];
    }
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      careerArea: [],
      jobLocation: [],
      jobType: []
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const activeFilterCount = filters.careerArea.length + filters.jobLocation.length + filters.jobType.length;

  return (
    <div className="sticky top-4 space-y-2">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-[11px] font-black text-[#EE7125] flex items-center gap-3 uppercase tracking-[0.4em]">
          <Filter className="w-4 h-4 shadow-[0_0_15px_rgba(238,113,37,0.4)]" />
          Intelligence Filter
        </h2>
        {activeFilterCount > 0 && (
          <span className="text-[9px] font-black text-white bg-[#EE7125] px-2 py-0.5 rounded-md shadow-[0_0_20px_rgba(238,113,37,0.3)]">
            {activeFilterCount}
          </span>
        )}
      </div>
      
      {activeFilterCount > 0 && (
        <button
          onClick={handleClearFilters}
          className="w-full mb-8 px-4 py-3 text-[10px] font-black text-[#EE7125] hover:text-white border border-[#EE7125]/20 hover:bg-[#EE7125] rounded-2xl transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 shadow-lg"
        >
          <XCircle className="w-3.5 h-3.5" />
          Reset Search Context
        </button>
      )}

      <div className="space-y-4">
        {[
          { id: 'careerArea', label: 'Career Area', options: careerAreas },
          { id: 'jobLocation', label: 'Job Location', options: jobLocations, scroll: true },
          { id: 'jobType', label: 'Job Type', options: jobTypes },
        ].map((section) => (
          <div key={section.id} className="bg-primary/20 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#EE7125]/20">
            <button
              onClick={() => toggleSection(section.id as any)}
              className="w-full flex justify-between items-center px-6 py-5 text-left group hover:bg-white/[0.02]"
            >
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${expandedSections[section.id as keyof typeof expandedSections] ? 'text-text-primary' : 'text-text-muted'}`}>
                {section.label}
              </span>
              <div className={`p-1.5 rounded-lg bg-tertiary/30 transition-all ${expandedSections[section.id as keyof typeof expandedSections] ? 'rotate-180 text-[#EE7125]' : 'text-text-muted'}`}>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </button>
            
            {expandedSections[section.id as keyof typeof expandedSections] && (
              <div className={`px-6 pb-6 pt-2 space-y-3 ${section.scroll ? 'max-h-72 overflow-y-auto custom-scrollbar' : ''}`}>
                {section.options.map((option) => (
                  <label key={option} className="flex items-center gap-3 py-1 cursor-pointer group/label">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={filters[section.id as keyof typeof filters].includes(option)}
                        onChange={() => handleCheckboxChange(section.id as any, option)}
                        className="peer appearance-none w-5 h-5 rounded-lg bg-tertiary/50 border border-white/5 checked:bg-[#EE7125] checked:border-[#EE7125] transition-all cursor-pointer"
                      />
                      <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                    </div>
                    <span className={`text-xs font-bold tracking-tight transition-colors ${filters[section.id as keyof typeof filters].includes(option) ? 'text-[#EE7125]' : 'text-text-secondary group-hover/label:text-text-primary'}`}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearchFilters;
