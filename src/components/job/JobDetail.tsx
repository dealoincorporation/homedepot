'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface JobDetailProps {
  jobId: string;
}

interface JobData {
  id: string;
  title: string;
  address: string;
  reqId: string;
  jobType: string;
  workType?: string;
  workArrangement?: string;
  careerArea: string;
  description: string;
  overview: string;
  responsibilities: string[];
  qualifications?: string[];
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId }) => {
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate job data dynamically - matches JobSearchResults logic
    const generateJobData = (id: string): JobData | null => {
      // Base jobs with detailed information
      const baseJobs: Record<string, JobData> = {
        '1': {
          id: '1',
          title: 'FIELD SERVICE PROFESSIONAL - EDMONTON',
          address: 'Virtual, AB',
          reqId: 'Req163351',
          jobType: 'Full Time',
          workType: 'Multiple Locations',
          careerArea: 'Field',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: 'The Field Service Professional (FSP) will maintain light industrial equipment (paint shakers, saws, blind cutting machines, lift equipment) at Home Depot retail locations and manufacturing facilities. The FSP must be a self-starter, customer service oriented, and have the ability to perform preventative maintenance and repairs on light industrial equipment. The FSP will travel with a company vehicle to various Home Depot locations.',
          responsibilities: [
            'Maintain, troubleshoot and service light industrial equipment both mechanically and electrically.',
            'Perform preventative maintenance on equipment to ensure optimal performance.',
            'Respond to service calls in a timely manner and provide excellent customer service.',
            'Travel to various Home Depot locations using company vehicle.',
            'Document all service work and maintain accurate records.',
            'Work independently and manage time effectively.',
          ],
          qualifications: [
            'High school diploma or equivalent.',
            'Previous experience with light industrial equipment maintenance preferred.',
            'Strong mechanical and electrical troubleshooting skills.',
            'Valid driver\'s license and clean driving record.',
            'Excellent customer service and communication skills.',
            'Ability to work independently and manage time effectively.',
          ],
        },
        '2': {
          id: '2',
          title: 'OVERNIGHT FREIGHT ASSOCIATE PART TIME (ST.JOHN\'S)',
          address: '70 Kelsey Drive, St. Johns, NL A1B 5C7',
          reqId: 'Req164191',
          jobType: 'Part Time',
          workType: 'Onsite',
          careerArea: 'Retail Store',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: 'Our Freight Team Associates are dedicated to working together to create a pleasant and healthy environment to shop and work in. Stocking the shelves to full capacity. Keeping the store neat and organized to create a safe space for customers to visit. Teamwork and commitment, that\'s what our team is about.',
          responsibilities: [
            'Unload merchandise from trucks and organize in the stockroom.',
            'Stock shelves to full capacity and maintain organized displays.',
            'Ensure store is clean, safe, and ready for customers.',
            'Work overnight shifts to prepare store for next day operations.',
            'Follow safety procedures and guidelines.',
          ],
        },
        '3': {
          id: '3',
          title: 'ELECTRICAL/PLUMBING SALES PART TIME (ST.JOHN\'S)',
          address: '70 Kelsey Drive, St. Johns, NL A1B 5C7',
          reqId: 'Req164345',
          jobType: 'Part Time',
          workType: 'Onsite',
          careerArea: 'Retail Store',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: 'Sales Associates provide excellent customer service by helping customers find the right products for their projects, answering questions, and maintaining department organization.',
          responsibilities: [
            'Assist customers with product selection and provide expert advice.',
            'Maintain department organization and product displays.',
            'Process transactions and handle customer inquiries.',
            'Stay current on product knowledge and industry trends.',
          ],
        },
        '4': {
          id: '4',
          title: 'CASHIER PART TIME (SYDNEY)',
          address: '50 Sydney Port Access Road, Sydney, NS B1P 7H2',
          reqId: 'Req164116',
          jobType: 'Part Time',
          workType: 'Onsite',
          careerArea: 'Retail Store',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: 'Cashiers are the face of The Home Depot, providing fast, friendly, and accurate service to our customers. They ensure a safe and organized checkout area and assist customers with transactions, questions, and locating products.',
          responsibilities: [
            'Process customer transactions accurately and efficiently.',
            'Maintain a clean and organized checkout area.',
            'Assist customers with questions and product location.',
            'Handle returns and exchanges according to store policy.',
            'Provide excellent customer service at all times.',
          ],
        },
        '5': {
          id: '5',
          title: 'LOT ASSOCIATE PART TIME (SYDNEY)',
          address: '50 Sydney Port Access Road, Sydney, NS B1P 7H2',
          reqId: 'Req164117',
          jobType: 'Part Time',
          workType: 'Onsite',
          careerArea: 'Retail Store',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: 'Lot Associates are the first point of contact for customers arriving at our stores. You\'ll assist customers with loading purchases, maintain the parking lot and store entrance, and provide exceptional customer service.',
          responsibilities: [
            'Assist customers with loading purchases into vehicles.',
            'Maintain a clean and organized parking lot.',
            'Provide directions and answer customer questions.',
            'Monitor shopping carts and ensure availability.',
            'Follow safety procedures when handling merchandise.',
          ],
        },
      };

      // If it's a base job, return it
      if (baseJobs[id]) {
        return baseJobs[id];
      }

      // Generate job data for other IDs (matching JobSearchResults logic)
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

      // Deterministic hash function
      const hash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        return Math.abs(hash);
      };

      const titleIndex = hash(`title-${id}`) % jobTitles.length;
      const locationIndex = hash(`location-${id}`) % locations.length;
      const jobTypeIndex = hash(`jobType-${id}`) % jobTypes.length;
      const workTypeIndex = hash(`workType-${id}`) % workTypes.length;
      const careerAreaIndex = hash(`careerArea-${id}`) % careerAreas.length;

      const title = `${jobTitles[titleIndex]} - ${locations[locationIndex].city.toUpperCase()}`;
      const jobType = jobTypes[jobTypeIndex];
      const workType = workTypes[workTypeIndex];
      const careerArea = careerAreas[careerAreaIndex];
      const location = `${locations[locationIndex].city}, ${locations[locationIndex].province}`;
      const address = locations[locationIndex].address;
      const numericId = parseInt(id) || 0;
      const reqId = `Req${160000 + numericId}`;

      // Generic job descriptions based on title
      const getJobOverview = (title: string, careerArea: string) => {
        if (title.includes('SALES ASSOCIATE')) {
          return 'Sales Associates provide excellent customer service by helping customers find the right products for their projects, answering questions, and maintaining department organization.';
        } else if (title.includes('CASHIER')) {
          return 'Cashiers are the face of The Home Depot, providing fast, friendly, and accurate service to our customers. They ensure a safe and organized checkout area and assist customers with transactions.';
        } else if (title.includes('LOT ASSOCIATE')) {
          return 'Lot Associates are the first point of contact for customers arriving at our stores. You\'ll assist customers with loading purchases, maintain the parking lot and store entrance, and provide exceptional customer service.';
        } else if (title.includes('FREIGHT ASSOCIATE')) {
          return 'Freight Associates are essential to keeping our stores stocked and ready for customers. You\'ll unload trucks, organize merchandise, and ensure products are properly displayed and available for customers.';
        } else if (title.includes('DEPARTMENT SUPERVISOR')) {
          return 'Department Supervisors lead a team of associates in delivering exceptional customer service and driving department performance. You\'ll be responsible for managing inventory, training associates, and ensuring your department meets sales and operational goals.';
        } else if (title.includes('ASSISTANT STORE MANAGER') || title.includes('STORE MANAGER')) {
          return 'Store Managers are key leaders in driving store performance and delivering an exceptional customer experience. You\'ll coach and develop associates, solve problems, and help implement strategies that support sales and operational excellence.';
        } else {
          return `Join The Home Depot team as a ${title.split(' - ')[0]} and be part of something bigger. We're looking for dedicated individuals who are passionate about customer service and teamwork.`;
        }
      };

      const getResponsibilities = (title: string) => {
        if (title.includes('SALES ASSOCIATE')) {
          return [
            'Assist customers with product selection and provide expert advice.',
            'Maintain department organization and product displays.',
            'Process transactions and handle customer inquiries.',
            'Stay current on product knowledge and industry trends.',
            'Work collaboratively with team members.',
          ];
        } else if (title.includes('CASHIER')) {
          return [
            'Process customer transactions accurately and efficiently.',
            'Maintain a clean and organized checkout area.',
            'Assist customers with questions and product location.',
            'Handle returns and exchanges according to store policy.',
            'Provide excellent customer service at all times.',
          ];
        } else if (title.includes('LOT ASSOCIATE')) {
          return [
            'Assist customers with loading purchases into vehicles.',
            'Maintain a clean and organized parking lot.',
            'Provide directions and answer customer questions.',
            'Monitor shopping carts and ensure availability.',
            'Follow safety procedures when handling merchandise.',
          ];
        } else if (title.includes('FREIGHT ASSOCIATE')) {
          return [
            'Unload merchandise from trucks and organize in the stockroom.',
            'Stock shelves to full capacity and maintain organized displays.',
            'Ensure store is clean, safe, and ready for customers.',
            'Operate equipment such as forklifts and pallet jacks safely.',
            'Follow safety procedures and guidelines.',
          ];
        } else {
          return [
            'Provide excellent customer service.',
            'Maintain a clean and organized work area.',
            'Follow all safety procedures and guidelines.',
            'Work collaboratively with team members.',
            'Complete assigned tasks efficiently and accurately.',
          ];
        }
      };

      return {
        id,
        title,
        address,
        reqId,
        jobType,
        workType,
        careerArea,
        description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
        overview: getJobOverview(title, careerArea),
        responsibilities: getResponsibilities(title),
        qualifications: [
          'High school diploma or equivalent preferred.',
          'Previous retail or customer service experience is an asset.',
          'Strong communication and interpersonal skills.',
          'Ability to work flexible schedules including evenings and weekends.',
          'Physical ability to lift and move merchandise as required.',
        ],
      };
    };

    // Simulate API call
    setTimeout(() => {
      const jobData = generateJobData(jobId);
      setJob(jobData);
      setLoading(false);
    }, 300);
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Job Not Found</h1>
          <Link href="/job-search" className="text-orange-600 hover:underline">
            Return to Job Search
          </Link>
        </div>
      </div>
    );
  }

  const displayWorkType = job.workType || job.workArrangement || '';

  return (
    <div className="min-h-screen bg-white">
      {/* Orange line separator */}
      <div className="h-0.5 bg-orange-600"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Back button */}
        <Link 
          href="/job-search"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Job Search</span>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Job Attributes */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-black mb-6 uppercase">JOB ATTRIBUTES</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Req ID</div>
                  <div className="text-base text-black">{job.reqId}</div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Job Location</div>
                  <div className="text-base text-black">{job.address}</div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Job Type</div>
                  <div className="text-base text-black">{job.jobType}</div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Career Area</div>
                  <div className="text-base text-black">{job.careerArea}</div>
                </div>

                {displayWorkType && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Type</div>
                    <div className="text-base text-black">{displayWorkType}</div>
                  </div>
                )}
              </div>

              <Link
                href={`/apply/${jobId}`}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 text-center block transition-colors duration-300 uppercase"
              >
                APPLY NOW
              </Link>
            </div>
          </div>

          {/* Right Column - Job Description */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-black mb-6 uppercase">JOB DESCRIPTION</h2>
            
            <div className="space-y-6">
              <p className="text-base text-black leading-relaxed">
                {job.description}
              </p>

              <div>
                <h3 className="text-lg font-bold text-black mb-4">Position Overview</h3>
                <p className="text-base text-black leading-relaxed">
                  {job.overview}
                </p>
              </div>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-base text-black leading-relaxed flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.qualifications && job.qualifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Qualifications</h3>
                  <ul className="space-y-2">
                    {job.qualifications.map((qualification, index) => (
                      <li key={index} className="text-base text-black leading-relaxed flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
