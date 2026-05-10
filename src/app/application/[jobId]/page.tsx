'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ApplicationForm from '@/components/application/ApplicationForm';
import { applicantInitials } from '@/lib/applicant-display';

interface JobData {
  id: string;
  title: string;
  address: string;
  reqId: string;
}

export default function ApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobId as string;
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [applicant, setApplicant] = useState<{ name: string | null; email: string } | null>(null);
  const [animated, setAnimated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!data.user) {
          router.push(`/applicant-login?redirect=/application/${jobId}&apply=true`);
          return;
        }
        setApplicant({
          name: data.user.name ?? null,
          email: data.user.email ?? '',
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        router.push(`/applicant-login?redirect=/application/${jobId}&apply=true`);
      }
    };
    checkAuth();
    setAnimated(true);
  }, [jobId, router]);

  useEffect(() => {
    // Mock job data - in production, fetch from API
    const mockJobs: Record<string, JobData> = {
      '1': {
        id: '1',
        title: 'Field Service Professional - Edmonton',
        address: 'Virtual, AB',
        reqId: 'Req163351',
      },
      '2': {
        id: '2',
        title: 'Overnight Freight Associate Part Time (St.John\'s)',
        address: '70 Kelsey Drive, St. Johns, NL A1B 5C7',
        reqId: 'Req164191',
      },
      '3': {
        id: '3',
        title: 'Electrical/Plumbing Sales Part Time (St.John\'s)',
        address: '70 Kelsey Drive, St. Johns, NL A1B 5C7',
        reqId: 'Req164345',
      },
    };

    // Simulate API call
    setTimeout(() => {
      const jobData = mockJobs[jobId] || mockJobs['1'];
      setJob(jobData);
      setLoading(false);
    }, 300);
  }, [jobId]);

  if (loading || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/5 border-t-[#EE7125] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (!job) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-display text-3xl text-white mb-4">JOB NOT FOUND</h1>
          <Link href="/job-search" className="text-[#EE7125] hover:underline uppercase tracking-widest font-bold">
            Return to Job Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EE7125]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#EE7125]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/icons/logo.8eb14c19.png"
              alt="The Home Depot"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">The Home Depot</span>
              <span className="text-[#EE7125] text-sm font-black tracking-[0.1em] uppercase">Careers</span>
            </div>
          </Link>

          {applicant && (
            <div className="flex items-center gap-6 min-w-0">
              <div className="flex flex-col items-end gap-0.5 min-w-0 max-w-[min(100%,320px)] sm:max-w-[380px]">
                <div className="flex items-center gap-2 min-w-0 w-full justify-end">
                  <div
                    className="w-8 h-8 rounded-full bg-[#EE7125]/10 flex items-center justify-center border border-[#EE7125]/20 shrink-0"
                    title={applicant.email}
                  >
                    <span className="text-[#EE7125] text-[10px] font-bold tracking-tight">
                      {applicantInitials(null, applicant.email)}
                    </span>
                  </div>
                  <span
                    className="min-w-0 text-xs font-semibold text-white/90 normal-case tracking-tight truncate"
                    title={applicant.email}
                  >
                    {applicant.email}
                  </span>
                </div>
                {applicant.name?.trim() ? (
                  <span className="hidden sm:block text-[10px] font-medium text-white/45 normal-case truncate w-full text-right">
                    {applicant.name.trim()}
                  </span>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 py-12 px-6">
        <div 
          className={`max-w-5xl mx-auto transition-all duration-700 transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          {/* Breadcrumb / Back */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <Link 
              href={`/apply/${jobId}`} 
              className="inline-flex items-center gap-2 text-xs font-bold text-white/40 hover:text-[#EE7125] transition-colors uppercase tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              Change Method
            </Link>
            
            <div className="flex items-center gap-3 text-left sm:text-right">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Applying for</span>
                <span className="text-sm font-bold text-white">{job.title}</span>
              </div>
            </div>
          </div>

          {/* Form Component Wrapper */}
          <div className="bg-[#1C1C1E]/60 backdrop-blur-xl border border-white/10 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
            <div className="p-5 sm:p-8 md:p-12">
              <ApplicationForm
                jobId={jobId}
                jobTitle={job.title}
                jobAddress={job.address}
                reqId={job.reqId}
                applicantName={applicant?.name ?? undefined}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-12 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[10px] font-light tracking-[0.4em] text-white/20 uppercase">Powered By</span>
            <div className="font-display text-xl text-white/10 tracking-widest">WORKDAY</div>
          </div>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] text-center md:text-left">© {new Date().getFullYear()} The Home Depot Canada. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
