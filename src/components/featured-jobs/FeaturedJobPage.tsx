import Link from 'next/link';
import Image from 'next/image';

interface FeaturedJobData {
  title: string;
  heroTitle: string;
  featuredJobLabel: string;
  roleOverview: string;
  whyJoin: {
    title: string;
    benefits: string[];
  };
  aboutRole: string;
  whatYoullDo: string[];
  typicalDay?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  preferredQualifications?: string[];
  whatWereLookingFor?: string[];
  // Job attributes
  reqId?: string;
  jobLocation?: string;
  jobType?: string;
  careerArea?: string;
  type?: string;
  image?: string;
  // Job description fields
  description?: string;
  positionOverview?: string;
  keyResponsibilities?: string[];
  qualifications?: string[];
}

interface FeaturedJobPageProps {
  jobData: FeaturedJobData;
}

export default function FeaturedJobPage({ jobData }: FeaturedJobPageProps) {
  // Get job-specific image or fallback
  const jobImage = jobData.image || '/general_top_image_mobile.67e53.webp';
  // Get job slug from title for apply link
  const jobSlug = jobData.title.toLowerCase().replace(/\s+/g, '-');

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

        {/* Job Image */}
        <div className="mb-8">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={jobImage}
              alt={jobData.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Job Attributes */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-black mb-6 uppercase">JOB ATTRIBUTES</h2>
              
              <div className="space-y-4 mb-8">
                {jobData.reqId && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Req ID</div>
                    <div className="text-base text-black">{jobData.reqId}</div>
                  </div>
                )}

                {jobData.jobLocation && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Job Location</div>
                    <div className="text-base text-black">{jobData.jobLocation}</div>
                  </div>
                )}

                {jobData.jobType && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Job Type</div>
                    <div className="text-base text-black">{jobData.jobType}</div>
                  </div>
                )}

                {jobData.careerArea && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Career Area</div>
                    <div className="text-base text-black">{jobData.careerArea}</div>
                  </div>
                )}

                {jobData.type && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Type</div>
                    <div className="text-base text-black">{jobData.type}</div>
                  </div>
                )}
              </div>

              <Link
                href={`/apply/${jobSlug}`}
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
              {jobData.description && (
                <p className="text-base text-black leading-relaxed">
                  {jobData.description}
                </p>
              )}

              {jobData.positionOverview && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Position Overview</h3>
                  <p className="text-base text-black leading-relaxed">
                    {jobData.positionOverview}
                  </p>
                </div>
              )}

              {jobData.keyResponsibilities && jobData.keyResponsibilities.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {jobData.keyResponsibilities.map((responsibility, index) => (
                      <li key={index} className="text-base text-black leading-relaxed flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {jobData.qualifications && jobData.qualifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Qualifications</h3>
                  <ul className="space-y-2">
                    {jobData.qualifications.map((qualification, index) => (
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
}
