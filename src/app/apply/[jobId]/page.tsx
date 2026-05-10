'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface JobData {
  id: string;
  title: string;
  address: string;
  reqId: string;
}

export default function StartApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobId as string;
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [animated, setAnimated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) {
          // User is authenticated, redirect directly to application form
          router.push(`/application/${jobId}`);
          return;
        }
      } catch (error) {
        // Not authenticated, stay on page
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

  const checkAuthAndProceed = async (action: () => void) => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user) {
        toast.error('Please sign in or create an account to continue');
        router.push(`/applicant-login?redirect=/application/${jobId}&apply=true`);
        return;
      }
      
      action();
    } catch (error) {
      toast.error('Please sign in or create an account to continue');
      router.push(`/applicant-login?redirect=/application/${jobId}&apply=true`);
    }
  };

  const handleAutofill = () => checkAuthAndProceed(() => router.push(`/application/${jobId}`));
  const handleManualApply = () => checkAuthAndProceed(() => router.push(`/application/${jobId}`));
  const handleUseLastApplication = () => checkAuthAndProceed(() => router.push(`/application/${jobId}`));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/5 border-t-[#EE7125] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-6">🔍</div>
          <h1 className="font-display text-3xl text-white mb-4">JOB NOT FOUND</h1>
          <p className="text-white/40 mb-8">The opportunity you&apos;re looking for might have been filled or is no longer available.</p>
          <Link href="/job-search" className="inline-flex items-center gap-2 px-8 py-4 bg-[#EE7125] text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-[#FF8A40] transition-all">
            Return to Job Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#EE7125]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#EE7125]/5 blur-[100px] rounded-full pointer-events-none" />

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

          <div className="flex items-center gap-4 text-xs font-bold text-white/60 uppercase">
             <Link href="/applicant-login" className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/30 hover:text-white transition-all">Sign In</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-12">
        <div 
          className={`w-full max-w-3xl transition-all duration-700 transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="bg-[#1C1C1E]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col md:flex-row gap-12">
              
              {/* Left Column: Job Info */}
              <div className="flex-1">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#EE7125]/10 border border-[#EE7125]/20 text-[#EE7125] text-[10px] font-black tracking-[0.2em] uppercase mb-6">
                  Application Process
                </div>
                <h1 className="font-display text-4xl text-white leading-tight mb-4">
                  READY TO JOIN<br /><span className="text-[#EE7125]">THE TEAM?</span>
                </h1>
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Position</p>
                    <p className="text-white font-bold leading-tight">{job.title}</p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Location</p>
                      <p className="text-white/70 text-sm">{job.address}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Req ID</p>
                      <p className="text-white/70 text-sm">{job.reqId}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Taking this step means joining 30,000+ associates building a better future together. You can save your progress at any time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="w-full md:w-80 space-y-3">
                <button
                  onClick={handleAutofill}
                  className="group w-full bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 text-left relative overflow-hidden shadow-[0_8px_24px_-8px_rgba(238,113,37,0.4)]"
                >
                  <div className="relative z-10">
                    <span className="block text-xs uppercase tracking-widest mb-1 opacity-70">Fast Track</span>
                    <span className="block">Autofill with Resume</span>
                  </div>
                  <div className="absolute right-4 bottom-4 opacity-20 group-hover:translate-x-1 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </button>

                <button
                  onClick={handleManualApply}
                  className="group w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 text-left"
                >
                  <span className="block text-xs uppercase tracking-widest mb-1 opacity-40">Step-by-step</span>
                  <span className="block">Apply Manually</span>
                </button>

                <button
                  onClick={handleUseLastApplication}
                  className="group w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 text-left"
                >
                  <span className="block text-xs uppercase tracking-widest mb-1 opacity-40">Welcome back</span>
                  <span className="block">Use Last Application</span>
                </button>

                <p className="text-[10px] text-center text-white/20 uppercase tracking-[0.2em] pt-4 leading-relaxed">
                  By continuing, you agree to our<br />
                  <Link href="/associate-privacy-statement" className="text-white/40 hover:text-[#EE7125] underline transition-colors">Privacy Statement</Link>
                </p>
              </div>

            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/job-search" className="text-xs font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Cancel Application
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-8 px-6 text-center">
        <div className="flex flex-col items-center gap-2 opacity-10">
          <span className="text-[10px] font-light tracking-[0.4em] text-white uppercase">Powered By</span>
          <div className="font-display text-xl text-white tracking-widest">WORKDAY</div>
        </div>
      </footer>
    </div>
  );
}
