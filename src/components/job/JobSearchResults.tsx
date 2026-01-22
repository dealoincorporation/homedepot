'use client';

import { useState, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import JobListingCard from '@/components/job/JobListingCard';

interface JobSearchResultsProps {
  filters?: {
    careerArea: string[];
    jobLocation: string[];
    jobType: string[];
  };
}

const JobSearchResults: FC<JobSearchResultsProps> = ({ filters }) => {
  const [sortBy, setSortBy] = useState('proximity');
  const [currentPage, setCurrentPage] = useState(1);

  // Generate mock job data - base jobs that will be repeated
  const baseJobs = [
    {
      id: '1',
      title: 'FIELD SERVICE PROFESSIONAL - EDMONTON',
      location: 'Virtual, AB',
      address: 'Virtual, AB',
      reqId: 'Req163351',
      jobType: 'Full Time',
      workType: 'Multiple Locations',
      careerArea: 'Field',
      isNew: false
    },
    {
      id: '2',
      title: 'OVERNIGHT FREIGHT ASSOCIATE PART TIME (ST.JOHN\'S)',
      location: 'St. Johns, NL',
      address: '70 Kelsey Drive, St. Johns, NL A1B 5C7',
      reqId: 'Req164191',
      jobType: 'Part Time',
      workType: 'Onsite',
      careerArea: 'Retail Store',
      isNew: false
    },
    {
      id: '3',
      title: 'ELECTRICAL/PLUMBING SALES PART TIME (ST.JOHN\'S)',
      location: 'St. Johns, NL',
      address: '70 Kelsey Drive, St. Johns, NL A1B 5C7',
      reqId: 'Req164345',
      jobType: 'Part Time',
      workType: 'Onsite',
      careerArea: 'Retail Store',
      isNew: true
    },
    {
      id: '4',
      title: 'CASHIER PART TIME (SYDNEY)',
      location: 'Sydney, NS',
      address: '50 Sydney Port Access Road, Sydney, NS B1P 7H2',
      reqId: 'Req164116',
      jobType: 'Part Time',
      workType: 'Onsite',
      careerArea: 'Retail Store',
      isNew: false
    },
    {
      id: '5',
      title: 'LOT ASSOCIATE PART TIME (SYDNEY)',
      location: 'Sydney, NS',
      address: '50 Sydney Port Access Road, Sydney, NS B1P 7H2',
      reqId: 'Req164117',
      jobType: 'Part Time',
      workType: 'Onsite',
      careerArea: 'Retail Store',
      isNew: false
    }
  ];

  // Generate more job variations to simulate 372 jobs
  const generateJobs = () => {
    const allJobs = [];
    const jobTitles = [
      'SALES ASSOCIATE', 'CASHIER', 'LOT ASSOCIATE', 'FREIGHT ASSOCIATE',
      'DEPARTMENT SUPERVISOR', 'ASSISTANT STORE MANAGER', 'STORE MANAGER',
      'MERCHANDISING ASSOCIATE', 'CUSTOMER SERVICE ASSOCIATE', 'PRO ASSOCIATE'
    ];
    const locations = [
      { city: 'Toronto', province: 'ON', address: '123 Main St, Toronto, ON M1A 1A1' },
      { city: 'Vancouver', province: 'BC', address: '456 Oak Ave, Vancouver, BC V1B 2C2' },
      { city: 'Calgary', province: 'AB', address: '789 Pine Rd, Calgary, AB T1A 2B3' },
      { city: 'Montreal', province: 'QC', address: '321 Maple St, Montreal, QC H1A 2B3' },
      { city: 'Ottawa', province: 'ON', address: '654 Elm Dr, Ottawa, ON K1A 2B3' }
    ];
    const jobTypes = ['Full Time', 'Part Time', 'Seasonal'];
    const workTypes = ['Onsite', 'Hybrid', 'Multiple Locations', 'Virtual'];
    const careerAreas = ['Corporate', 'Field', 'Retail Management', 'Retail Store'];

    // Simple deterministic hash function for consistent results
    const hash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    // Add base jobs first
    allJobs.push(...baseJobs);

    // Generate additional jobs
    for (let i = 6; i <= 372; i++) {
      const jobId = i.toString();
      // Use deterministic selection based on job ID
      const titleIndex = hash(`title-${jobId}`) % jobTitles.length;
      const locationIndex = hash(`location-${jobId}`) % locations.length;
      const jobTypeIndex = hash(`jobType-${jobId}`) % jobTypes.length;
      const workTypeIndex = hash(`workType-${jobId}`) % workTypes.length;
      const careerAreaIndex = hash(`careerArea-${jobId}`) % careerAreas.length;
      
      // Deterministic isNew: roughly 10% of jobs (based on hash)
      const isNew = (hash(`isNew-${jobId}`) % 10) === 0;
      
      allJobs.push({
        id: jobId,
        title: `${jobTitles[titleIndex]} - ${locations[locationIndex].city.toUpperCase()}`,
        location: `${locations[locationIndex].city}, ${locations[locationIndex].province}`,
        address: locations[locationIndex].address,
        reqId: `Req${160000 + i}`,
        jobType: jobTypes[jobTypeIndex],
        workType: workTypes[workTypeIndex],
        careerArea: careerAreas[careerAreaIndex],
        isNew
      });
    }

    return allJobs;
  };

  // Memoize job generation to avoid regenerating on every render
  const allJobs = useMemo(() => generateJobs(), []);
  
  // Apply filters
  const filteredJobs = useMemo(() => {
    if (!filters || (!filters.careerArea?.length && !filters.jobLocation?.length && !filters.jobType?.length)) {
      return allJobs;
    }

    return allJobs.filter(job => {
      // Filter by career area
      if (filters.careerArea?.length && !filters.careerArea.includes(job.careerArea)) {
        return false;
      }

      // Filter by job location (check if location matches any selected location)
      if (filters.jobLocation?.length) {
        const jobLocationMatch = filters.jobLocation.some(selectedLocation => {
          // Check if job location contains the selected location (e.g., "AB - Calgary" matches "Calgary, AB")
          const [province, city] = selectedLocation.split(' - ');
          return job.location.includes(city) || job.location.includes(province);
        });
        if (!jobLocationMatch) {
          return false;
        }
      }

      // Filter by job type
      if (filters.jobType?.length && !filters.jobType.includes(job.jobType)) {
        return false;
      }

      return true;
    });
  }, [allJobs, filters]);

  const totalJobs = filteredJobs.length;
  const jobsPerPage = 10;
  const startIndex = (currentPage - 1) * jobsPerPage + 1;
  const endIndex = Math.min(currentPage * jobsPerPage, totalJobs);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  // Get jobs for current page
  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice(startIndex - 1, endIndex);
  }, [filteredJobs, startIndex, endIndex]);

  return (
    <div>
      {/* Header with Sort and Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Showing {startIndex}-{endIndex} of {totalJobs} jobs sorted by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-600 text-sm"
          >
            <option value="proximity">Proximity to you</option>
            <option value="date">Date</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-600 text-sm"
          >
            {Array.from({ length: Math.ceil(totalJobs / jobsPerPage) }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Page {(i + 1).toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          <button
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalJobs / jobsPerPage), prev + 1))}
            disabled={currentPage >= Math.ceil(totalJobs / jobsPerPage)}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {paginatedJobs.map((job) => (
          <JobListingCard
            key={job.id}
            id={job.id}
            title={job.title}
            address={job.address}
            reqId={job.reqId}
            jobType={job.jobType}
            workType={job.workType}
            isNew={job.isNew}
          />
        ))}
      </div>
    </div>
  );
};

export default JobSearchResults;
