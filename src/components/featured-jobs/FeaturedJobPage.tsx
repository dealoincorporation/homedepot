'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { 
  Hash, 
  MapPin, 
  Clock, 
  Building2, 
  Monitor, 
  Building, 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle2, 
  Plus,
  Briefcase
} from 'lucide-react';

interface FeaturedJobData {
  title: string;
  heroTitle: string;
  featuredJobLabel: string;
  roleOverview: string;
  whyJoin: { title: string; benefits: string[] };
  aboutRole: string;
  whatYoullDo: string[];
  typicalDay?: string[];
  faq?: Array<{ question: string; answer: string }>;
  preferredQualifications?: string[];
  whatWereLookingFor?: string[];
  reqId?: string;
  jobLocation?: string;
  jobType?: string;
  careerArea?: string;
  type?: string;
  image?: string;
  description?: string;
  positionOverview?: string;
  keyResponsibilities?: string[];
  qualifications?: string[];
}

interface FeaturedJobPageProps {
  jobData: FeaturedJobData;
}

const AttributeIcon = ({ label, value }: { label: string; value: string }) => {
  const iconClass = "w-4 h-4 text-[#EE7125]";
  
  if (label === 'Req ID') return <Hash className={iconClass} />;
  if (label === 'Location') return <MapPin className={iconClass} />;
  if (label === 'Job Type') return <Clock className={iconClass} />;
  if (label === 'Career Area') return <Building2 className={iconClass} />;
  
  // For 'Type'
  if (value === 'Onsite') return <Building className={iconClass} />;
  if (value === 'Remote' || value === 'Virtual') return <Monitor className={iconClass} />;
  
  return <Briefcase className={iconClass} />;
};

export default function FeaturedJobPage({ jobData }: FeaturedJobPageProps) {
  const [animated, setAnimated] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  const jobSlug = jobData.title.toLowerCase().replace(/\s+/g, '-');

  const getHeroDescription = () => {
    if (jobData.positionOverview) return jobData.positionOverview;
    if (jobData.aboutRole) return jobData.aboutRole;
    return `Join The Home Depot Canada as a ${jobData.title} and be part of something bigger.`;
  };

  const heroDescription = getHeroDescription();

  return (
    <div className="min-h-screen bg-primary">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-[380px] md:min-h-[460px] flex items-end overflow-hidden -mt-16 md:-mt-[89px]">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/general_top_image_mobile.67e5322f (1).webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#EE7125]/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Left accent bar */}
        <div
          className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-transparent via-[#EE7125] to-transparent opacity-0"
          style={{ animation: animated ? 'fadeIn 0.8s ease 0.4s forwards' : 'none' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-10 md:pb-16 pt-24 md:pt-32">
          {/* Back link */}
          <div
            className="mb-6 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.5s ease 0s forwards' : 'none' }}
          >
            <Link
              href="/job-search"
              className="inline-flex items-center gap-2 text-[10px] font-black text-text-muted hover:text-[#EE7125] transition-colors uppercase tracking-[0.2em]"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Job Search
            </Link>
          </div>

          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-4 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.6s ease 0.1s forwards' : 'none' }}
          >
            <span className="h-px w-8 bg-[#EE7125]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">
              {jobData.featuredJobLabel || 'Featured Job'}
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-none mb-4 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.7s ease 0.2s forwards' : 'none' }}
          >
            {jobData.title.toUpperCase()}
          </h1>

          <p
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mb-8 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.7s ease 0.3s forwards' : 'none' }}
          >
            {heroDescription.length > 180 ? heroDescription.slice(0, 177) + '…' : heroDescription}
          </p>

          <div
            className="flex flex-wrap gap-3 opacity-0"
            style={{ animation: animated ? 'fadeUp 0.7s ease 0.45s forwards' : 'none' }}
          >
            <Link
              href={`/apply/${jobSlug}`}
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(238,113,37,0.4)] hover:shadow-[0_8px_30px_rgba(238,113,37,0.5)] hover:-translate-y-0.5"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/job-search"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary/40 backdrop-blur-md text-text-primary font-bold text-sm uppercase tracking-wide rounded-xl border border-border-primary hover:bg-secondary transition-all duration-300"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE7125] via-[#FF8A40] to-transparent opacity-60" />
      </section>

      {/* ── MAIN CONTENT ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Job attributes card */}
              <div className="bg-secondary border border-border-primary rounded-[24px] p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#EE7125] to-[#EE7125]/10" />
                <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase mb-5">
                  Job Attributes
                </h2>

                <div className="space-y-4">
                  {[
                    { label: 'Req ID', value: jobData.reqId },
                    { label: 'Location', value: jobData.jobLocation },
                    { label: 'Job Type', value: jobData.jobType },
                    { label: 'Career Area', value: jobData.careerArea },
                    { label: 'Type', value: jobData.type },
                  ].filter(a => a.value).map((attr) => (
                    <div key={attr.label} className="flex items-start gap-4 p-4 rounded-2xl bg-tertiary border border-border-primary/50 group/attr hover:border-[#EE7125]/30 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[#EE7125]/10 flex items-center justify-center flex-shrink-0 group-hover/attr:scale-110 transition-transform">
                        <AttributeIcon label={attr.label} value={attr.value!} />
                      </div>
                      <div>
                        <div className="text-[9px] font-black tracking-[0.2em] text-[#EE7125] uppercase mb-0.5">{attr.label}</div>
                        <div className="text-sm font-black text-text-primary leading-tight">{attr.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-border-primary">
                  <Link
                    href={`/apply/${jobSlug}`}
                    className="group flex items-center justify-center gap-2 w-full bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(238,113,37,0.35)] hover:shadow-[0_8px_30px_rgba(238,113,37,0.5)]"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Why Join card */}
              <div className="bg-secondary border border-border-primary rounded-[24px] p-8 shadow-lg">
                <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase mb-4">
                  Why Join Us?
                </h2>
                <ul className="space-y-2.5">
                  {jobData.whyJoin.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#EE7125] flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-bold text-text-secondary leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* ── RIGHT MAIN CONTENT ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Job Description */}
            {(jobData.description || jobData.positionOverview) && (
              <div className="bg-secondary border border-border-primary rounded-[32px] p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-6 bg-[#EE7125]" />
                  <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase">Job Description</h2>
                </div>
                {jobData.description && (
                  <p className="text-text-secondary text-lg leading-relaxed mb-8">{jobData.description}</p>
                )}
                {jobData.positionOverview && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-text-primary uppercase tracking-wider">Position Overview</h3>
                    <p className="text-text-secondary text-base leading-relaxed">{jobData.positionOverview}</p>
                  </div>
                )}
              </div>
            )}

            {/* Key Responsibilities */}
            {jobData.keyResponsibilities && jobData.keyResponsibilities.length > 0 && (
              <div className="bg-secondary border border-border-primary rounded-[32px] p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-6 bg-[#EE7125]" />
                  <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase">Key Responsibilities</h2>
                </div>
                <ul className="space-y-3">
                  {jobData.keyResponsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-xl bg-tertiary border border-border-primary flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#EE7125] group-hover:text-white transition-all">
                        <span className="text-[10px] font-black uppercase">{i + 1}</span>
                      </div>
                      <span className="text-text-secondary text-base md:text-lg leading-relaxed group-hover:text-text-primary transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications */}
            {jobData.qualifications && jobData.qualifications.length > 0 && (
              <div className="bg-secondary border border-border-primary rounded-[32px] p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-6 bg-[#EE7125]" />
                  <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase">Qualifications</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {jobData.qualifications.map((q, i) => (
                    <div key={i} className="flex items-start gap-3.5 p-5 rounded-2xl bg-tertiary border border-border-primary hover:border-[#EE7125]/30 transition-all group">
                      <CheckCircle2 className="w-5 h-5 text-[#EE7125] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-text-secondary text-sm font-bold leading-relaxed group-hover:text-text-primary transition-colors">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What You'll Do (if different from keyResponsibilities) */}
            {jobData.whatYoullDo && jobData.whatYoullDo.length > 0 && !jobData.keyResponsibilities && (
              <div className="bg-secondary border border-border-primary rounded-[32px] p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-6 bg-[#EE7125]" />
                  <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase">What You&apos;ll Do</h2>
                </div>
                <ul className="space-y-3">
                  {jobData.whatYoullDo.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <span className="w-2 h-2 rounded-full bg-[#EE7125] flex-shrink-0 mt-2.5 group-hover:scale-150 transition-transform" />
                      <span className="text-text-secondary text-base md:text-lg leading-relaxed group-hover:text-text-primary transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ */}
            {jobData.faq && jobData.faq.length > 0 && (
              <div className="bg-secondary border border-border-primary rounded-[32px] p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-6 bg-[#EE7125]" />
                  <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#EE7125] uppercase">FAQ</h2>
                </div>
                <div className="space-y-2">
                  {jobData.faq.map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                        openFaq === i ? 'border-[#EE7125]/50 bg-tertiary shadow-lg' : 'border-border-primary hover:border-border-primary/80'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                      >
                        <span className={`text-base font-black uppercase tracking-wide transition-colors ${openFaq === i ? 'text-[#EE7125]' : 'text-text-primary'}`}>
                          {item.question}
                        </span>
                        <Plus className={`w-5 h-5 text-[#EE7125] transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5">
                          <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EE7125] to-[#C85E1A] p-8 md:p-10">
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <h3 className="font-display text-4xl md:text-5xl text-white leading-none mb-4">
                  READY TO APPLY?
                </h3>
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-sm">
                  Take the next step in your career journey. Join The Home Depot Canada family today.
                </p>
                <Link
                  href={`/apply/${jobSlug}`}
                  className="group inline-flex items-center gap-2 bg-white text-[#EE7125] font-bold text-sm uppercase tracking-wide px-7 py-3.5 rounded-xl hover:bg-white/90 transition-all duration-200 hover:shadow-lg"
                >
                  Apply for {jobData.title}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
