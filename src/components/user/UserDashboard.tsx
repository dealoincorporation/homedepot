'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  RefreshCw, 
  MapPin, 
  ArrowRight, 
  ClipboardList, 
  User, 
  LogOut, 
  Search, 
  Clock, 
  FileText,
  ChevronRight,
  Briefcase,
} from 'lucide-react';

type Application = {
  _id: string;
  jobTitle: string;
  jobAddress?: string;
  reqId?: string;
  status: string;
  statusHistory?: { status: string; at: string }[];
  createdAt: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  resumeFileName?: string;
  resumeUrl?: string;
  requiredDocuments?: string[];
  workExperience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy?: string;
  }>;
};

export default function UserDashboard() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/applications', { cache: 'no-store' });
      const text = await res.text();
      if (!text) throw new Error('Empty response from server');
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error('Invalid response from server.');
      }
      if (!res.ok) throw new Error(data?.error ?? 'Failed to load');
      setApps((data.applications ?? []).map((a: any) => ({ ...a, _id: a._id.toString?.() ?? a._id })));
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load');
    } finally {
      setLoading(false);
      setAnimated(true);
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/applicant-login';
  }

  useEffect(() => {
    void refresh();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'received': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'interviewing': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'offered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-[#EE7125]/20 text-[#EE7125] border-[#EE7125]/30';
    }
  };

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      
      {/* Dashboard Hero / Stats */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
         {/* Background Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#EE7125]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#EE7125]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            <div className={`transition-all duration-1000 cubic-bezier transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-[#EE7125] to-transparent" />
                <span className="text-[11px] font-black tracking-[0.4em] text-[#EE7125] uppercase">Talent Command Center</span>
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-text-primary leading-[0.9] mb-6">
                ORCHESTRATE YOUR<br />
                <span className="text-[#EE7125]">FUTURE.</span>
              </h1>
              <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed font-medium">
                Welcome to your professional trajectory hub. Real-time application tracking, profile optimization, and curated opportunities with The Home Depot Canada.
              </p>
            </div>

            <div className={`flex flex-wrap items-center gap-4 transition-all duration-1000 delay-300 transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
               <Link href="/job-search" className="group px-10 py-4 bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold text-xs uppercase tracking-widest rounded-[20px] transition-all shadow-[0_10px_30px_rgba(238,113,37,0.35)] hover:shadow-[0_15px_40px_rgba(238,113,37,0.5)] flex items-center gap-3">
                  Discover Opportunities
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
               <button onClick={logout} className="px-10 py-4 bg-secondary/40 backdrop-blur-md border border-border-primary hover:bg-secondary/60 text-text-primary font-bold text-xs uppercase tracking-widest rounded-[20px] transition-all flex items-center gap-3">
                  Logout
                  <LogOut className="w-4 h-4 opacity-50" />
               </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-500 transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
             {[
               { label: 'Active Pipeline', value: apps.length, icon: ClipboardList },
               { label: 'In Review', value: apps.filter(a => a.status.toLowerCase() === 'received').length, icon: Clock },
               { label: 'Interviews', value: apps.filter(a => a.status.toLowerCase() === 'interviewing').length, icon: User },
               { label: 'Saved Assets', value: 0, icon: FileText },
             ].map((stat, i) => (
               <div key={i} className="relative overflow-hidden bg-secondary/30 backdrop-blur-xl p-8 rounded-[32px] group transition-all duration-500 shadow-lg hover:shadow-[#EE7125]/10">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 group-hover:scale-110 transition-all">
                     <stat.icon className="w-16 h-16 text-[#EE7125]" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#EE7125]" />
                       {stat.label}
                    </div>
                    <div className="text-5xl font-display text-text-primary group-hover:text-[#EE7125] transition-colors leading-none tracking-tight">
                       {stat.value.toString().padStart(2, '0')}
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-black tracking-[0.3em] text-text-muted uppercase">Application Pipeline</h2>
            <button onClick={refresh} className="text-[10px] font-bold text-[#EE7125] hover:text-[#FF8A40] uppercase tracking-widest flex items-center gap-2">
               <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
               Refresh
            </button>
          </div>

          {error && (
            <div className="mb-12 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {loading && apps.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1,2,3].map(i => (
                 <div key={i} className="h-64 rounded-[32px] bg-secondary/30 border border-border-primary animate-pulse" />
               ))}
            </div>
          ) : apps.length === 0 ? (
            <div className="bg-secondary/40 border border-border-primary rounded-[40px] p-20 text-center">
               <div className="w-24 h-24 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-6">
                  <ClipboardList className="w-10 h-10 text-text-muted opacity-20" />
               </div>
               <h3 className="text-2xl font-display text-text-primary mb-4">NO ACTIVE APPLICATIONS</h3>
               <p className="text-text-muted text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                  You haven&apos;t applied to any roles yet. Start your journey by exploring our open opportunities.
               </p>
               <Link href="/job-search" className="inline-flex px-10 py-4 bg-[#EE7125] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#FF8A40] transition-all">
                  Search Jobs
               </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apps.map((a, i) => (
                <div 
                  key={a._id} 
                  className={`bg-secondary/30 backdrop-blur-xl rounded-[40px] overflow-hidden group transition-all duration-500 flex flex-col transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} shadow-xl hover:shadow-[#EE7125]/5`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="p-10 flex-1 relative">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.07] transition-all">
                      <Briefcase className="w-32 h-32 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <span className={`px-5 py-2 rounded-xl text-[9px] font-black tracking-[0.25em] uppercase border ${getStatusColor(a.status)} shadow-lg`}>
                         {a.status}
                       </span>
                       <span className="text-[10px] font-black text-text-muted/60 uppercase tracking-[0.2em]">{a.reqId}</span>
                    </div>
 
                    <h3 className="text-2xl font-black text-text-primary mb-3 group-hover:text-[#EE7125] transition-all duration-300 leading-tight tracking-tight relative z-10">
                       {a.jobTitle.toUpperCase()}
                    </h3>
                    <p className="text-text-muted text-xs font-bold mb-8 flex items-center gap-2.5 opacity-80 relative z-10">
                       <MapPin className="w-4 h-4 text-[#EE7125]" />
                       {a.jobAddress || 'Global Operations'}
                    </p>
 
                    <div className="space-y-5 pt-8 border-t border-border-primary/50 relative z-10">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Deployment Date</span>
                          <span className="text-xs text-text-primary font-bold">{new Date(a.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                       </div>
                       {a.resumeFileName && (
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Documentation</span>
                            <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-[#EE7125]/10 text-[#EE7125] text-[10px] font-black uppercase tracking-widest hover:bg-[#EE7125] hover:text-white transition-all flex items-center gap-2">
                              <FileText className="w-3 h-3" />
                              Resume
                            </a>
                         </div>
                       )}
                    </div>

                    <div className="mt-8 pt-7 border-t border-border-primary/40 relative z-10">
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em] mb-3">Progress Timeline</p>
                      <div className="space-y-2">
                        {(a.statusHistory ?? [])
                          .slice()
                          .reverse()
                          .slice(0, 4)
                          .map((entry, idx) => (
                            <div key={`${entry.status}-${entry.at}-${idx}`} className="flex items-center justify-between text-[11px]">
                              <span className={`font-bold ${idx === 0 ? 'text-[#EE7125]' : 'text-text-secondary'}`}>
                                {entry.status}
                              </span>
                              <span className="text-text-muted text-[10px]">
                                {new Date(entry.at).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        {(!a.statusHistory || a.statusHistory.length === 0) && (
                          <p className="text-xs text-text-muted">No timeline events yet.</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border-primary/40 relative z-10">
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em] mb-3">Required Next Steps</p>
                      {a.requiredDocuments && a.requiredDocuments.length > 0 ? (
                        <ul className="space-y-2">
                          {a.requiredDocuments.map((item, idx) => (
                            <li key={`${a._id}-req-${idx}`} className="text-xs text-text-secondary flex items-start gap-2">
                              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#EE7125] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-text-muted">No additional forms/documents requested.</p>
                      )}
                    </div>
                  </div>
 
                  <div className="p-6 bg-white/[0.03] border-t border-border-primary/50 group-hover:bg-[#EE7125]/5 transition-all">
                     <Link href={`/job/${a._id}`} className="flex items-center justify-center gap-3 w-full py-2 text-[11px] font-black text-text-muted uppercase tracking-[0.3em] group-hover:text-text-primary transition-all">
                        Analysis Details
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border-primary bg-primary/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[10px] font-light tracking-[0.4em] text-text-muted uppercase">Powered By</span>
            <div className="font-display text-xl text-text-muted/30 tracking-widest uppercase">WORKDAY</div>
          </div>
          <div className="flex items-center gap-8">
             <Link href="/associate-privacy-statement" className="text-[10px] font-bold text-text-muted hover:text-text-primary transition-colors uppercase tracking-widest">Privacy</Link>
             <Link href="/accessibility" className="text-[10px] font-bold text-text-muted hover:text-text-primary transition-colors uppercase tracking-widest">Accessibility</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
