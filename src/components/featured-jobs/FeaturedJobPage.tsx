import Link from 'next/link';

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
}

interface FeaturedJobPageProps {
  jobData: FeaturedJobData;
}

export default function FeaturedJobPage({ jobData }: FeaturedJobPageProps) {
  return (
    <main>
      {/* Hero Section with Image and Overlay Text */}
      <section className="relative w-full bg-white">
        <div className="relative w-full">
          <div className="relative overflow-hidden">
            <img
              src="/general_top_image_mobile.67e53.webp"
              alt={`${jobData.title} Opportunities at The Home Depot Canada`}
              className="w-full h-[220px] md:h-[280px] lg:h-[320px] object-cover"
            />
            {/* Thick Orange Border Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-orange-600"></div>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content overlaid on image, aligned left */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {jobData.heroTitle}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <div className="border-2 border-black rounded-lg p-6 md:p-8 mb-8">
                <div className="mb-6">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{jobData.featuredJobLabel}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-black mb-8">
                  {jobData.roleOverview}
                </h2>

                {/* Why Join Section */}
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                    {jobData.whyJoin.title}
                  </h3>
                  <ul className="space-y-3 text-lg text-gray-700">
                    {jobData.whyJoin.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-black mr-3 font-bold">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* About the Role */}
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  About the Role:
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {jobData.aboutRole}
                </p>
              </div>

              {/* What You'll Do */}
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                  What You'll Do:
                </h3>
                <ul className="space-y-3 text-lg text-gray-700">
                  {jobData.whatYoullDo.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-black mr-3 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* A Typical Day (if provided) */}
              {jobData.typicalDay && jobData.typicalDay.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                    A Typical Day:
                  </h3>
                  <ul className="space-y-3 text-lg text-gray-700">
                    {jobData.typicalDay.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-black mr-3 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ (if provided) */}
              {jobData.faq && jobData.faq.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                    Frequently Asked Questions:
                  </h3>
                  <div className="space-y-6">
                    {jobData.faq.map((item, index) => (
                      <div key={index}>
                        <h4 className="text-xl font-semibold text-black mb-2">
                          {item.question}
                        </h4>
                        <p className="text-lg text-gray-700">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What We're Looking For (if provided) */}
              {jobData.whatWereLookingFor && jobData.whatWereLookingFor.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                    What We're Looking For:
                  </h3>
                  <ul className="space-y-3 text-lg text-gray-700">
                    {jobData.whatWereLookingFor.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-black mr-3 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preferred Qualifications (if provided) */}
              {jobData.preferredQualifications && jobData.preferredQualifications.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                    Preferred Qualifications:
                  </h3>
                  <ul className="space-y-3 text-lg text-gray-700">
                    {jobData.preferredQualifications.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-black mr-3 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Call to Action */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href={`/job-search?role=${jobData.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded hover:bg-orange-700 transition-colors"
                >
                  View {jobData.title} Jobs
                </Link>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply in Store Location Box */}
              <div className="bg-black text-white p-6 mb-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase">Apply in a Store Location Near You</h3>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <select className="w-full bg-gray-900 text-white px-4 py-2 rounded mb-4">
                    <option>Filter By City</option>
                  </select>
                  <div className="bg-gray-900 p-4 rounded mb-4">
                    <div className="font-semibold mb-2">DIRECTEUR(TRICE) ADJOINT(E) DE MAGASIN</div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Trois Rivieres - QC 4500 Real-Proulx</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-gray-400">1 of 4</span>
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Saved Jobs Box */}
              <div className="bg-white border-2 border-orange-600 p-6 mb-6 rounded-lg">
                <h3 className="text-lg font-bold text-orange-600 uppercase mb-2">Saved Jobs</h3>
                <div className="border-t-2 border-orange-600 mb-4"></div>
                <p className="text-gray-600 text-sm">
                  You haven't saved any active jobs.
                </p>
              </div>

              {/* Benefits Box */}
              <div className="bg-white border-2 border-orange-600 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-orange-600 uppercase mb-2">Benefits</h3>
                <div className="border-t-2 border-orange-600 mb-4"></div>
                <p className="text-gray-600 text-sm">
                  Learn more about our total value benefits package offered to all our associates.
                </p>
                <Link
                  href="/about/our-benefits"
                  className="mt-4 inline-block text-orange-600 font-semibold hover:underline text-sm"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
