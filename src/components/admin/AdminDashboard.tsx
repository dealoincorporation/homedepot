'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LogOut, 
  Loader2, 
  FileText, 
  Send, 
  User, 
  ChevronRight, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';

type Application = {
  _id: string;
  jobTitle: string;
  jobAddress?: string;
  reqId?: string;
  status: string;
  statusHistory?: { status: string; at: string }[];
  createdAt: string;
  userId?: { email?: string; name?: string };
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  resumeFileName?: string;
  resumeUrl?: string;
  requiredDocuments?: string[];
  workExperience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }>;
  skills?: string[];
  applicationQuestions?: Record<string, string>;
  voluntaryDisclosures?: Record<string, any>;
};

type Message = {
  _id: string;
  direction: 'outbound' | 'inbound' | 'system';
  subject?: string;
  body: string;
  createdAt: string;
  from?: string;
  to?: string;
};

const STATUSES = ['Applied', 'Under Review', 'Interview', 'Offer', 'Rejected', 'Hired'] as const;

export default function AdminDashboard() {
  const [apps, setApps] = useState<Application[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  const [emailSubject, setEmailSubject] = useState('Application update');
  const [emailBody, setEmailBody] = useState('');
  const [requiredDocsDraft, setRequiredDocsDraft] = useState('');

  const selected = useMemo(() => apps.find((a) => a._id === selectedId) ?? null, [apps, selectedId]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/applications', { cache: 'no-store' });
      const text = await res.text();
      if (!text) throw new Error('Empty response');
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error('Invalid response');
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

  async function loadMessages(applicationId: string) {
    const res = await fetch(`/api/messages?applicationId=${encodeURIComponent(applicationId)}`, { cache: 'no-store' });
    const data = await res.json();
    if (res.ok) setMessages(data.messages ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    void loadMessages(selectedId);
  }, [selectedId]);

  useEffect(() => {
    if (!selected) {
      setRequiredDocsDraft('');
      return;
    }
    setRequiredDocsDraft((selected.requiredDocuments ?? []).join('\n'));
  }, [selected]);

  async function updateStatus(applicationId: string, status: string) {
    setBusy(applicationId);
    try {
      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update');
      await refresh();
      await loadMessages(applicationId);
    } finally {
      setBusy(null);
    }
  }

  async function sendMessage() {
    if (!selected) return;
    setBusy(selected._id);
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: selected._id, subject: emailSubject, body: emailBody }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setEmailBody('');
      await loadMessages(selected._id);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to send');
    } finally {
      setBusy(null);
    }
  }

  async function saveRequiredDocuments() {
    if (!selected) return;
    setBusy(selected._id);
    setError(null);
    try {
      const requiredDocuments = requiredDocsDraft
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      const res = await fetch(`/api/applications/${selected._id}/requirements`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requiredDocuments }),
      });
      if (!res.ok) throw new Error('Failed to save required documents');
      await refresh();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to save required documents');
    } finally {
      setBusy(null);
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/applicant-login';
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'under review': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'interview': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'hired': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-white/5 text-white/40 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-primary text-text-primary font-sans selection:bg-[#EE7125]/30">
      
      {/* Admin Header */}
      <header className="relative z-20 border-b border-border-primary backdrop-blur-md bg-primary/40 px-6 h-20">
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
           <Link href="/" className="flex items-center gap-4 group">
             <div className="relative">
                <Image src="/images/icons/logo.8eb14c19.png" alt="HD" width={44} height={44} className="object-contain group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#EE7125]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="flex flex-col leading-tight">
                <span className="text-white text-[10px] font-black tracking-[0.4em] uppercase opacity-30">Intelligence Hub</span>
                <span className="text-[#EE7125] text-base font-black tracking-[0.15em] uppercase">ADMIN CENTER</span>
             </div>
           </Link>

            <div className="flex items-center gap-6">
               <Link href="/dashboard" className="text-xs font-bold text-text-secondary hover:text-text-primary uppercase tracking-widest transition-colors flex items-center gap-2">
                 <LayoutDashboard className="w-3.5 h-3.5" />
                 Candidate View
               </Link>
               <div className="h-4 w-px bg-border-primary" />
               <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary shadow-lg hover:bg-tertiary text-[10px] font-black uppercase tracking-widest transition-all">
                 Sign Out
                 <LogOut className="w-3.5 h-3.5" />
               </button>
            </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Applications List */}
          <aside className="lg:w-[450px] flex flex-col gap-6">
             <div className="bg-secondary/30 backdrop-blur-3xl rounded-[40px] overflow-hidden flex flex-col h-[calc(100vh-160px)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EE7125] via-[#FF8A40] to-transparent opacity-40" />
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.03]">
                   <h2 className="text-[11px] font-black tracking-[0.4em] text-[#EE7125] uppercase">Inbound Pipeline</h2>
                   <span className="px-3 py-1 rounded-xl bg-primary/40 border border-white/5 text-[10px] font-black text-[#EE7125] shadow-inner">{apps.length}</span>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                   {loading ? (
                     <div className="p-12 text-center text-text-muted">
                        <Loader2 className="w-10 h-10 text-[#EE7125] animate-spin mx-auto mb-6" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing...</span>
                     </div>
                   ) : apps.length === 0 ? (
                     <div className="p-16 text-center text-text-muted uppercase tracking-[0.4em] text-[10px] font-black opacity-30">No Data Detected</div>
                   ) : (
                     <div className="divide-y divide-border-primary/50">
                        {apps.map((a) => (
                          <button
                            key={a._id}
                            onClick={() => setSelectedId(a._id)}
                            className={`w-full text-left p-8 transition-all duration-500 relative group ${selectedId === a._id ? 'bg-[#EE7125]/5' : 'hover:bg-white/[0.04]'}`}
                          >
                             {selectedId === a._id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#EE7125] to-[#FF8A40]" />}
                             <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between mb-2">
                                   <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.25em] border ${getStatusColor(a.status)} shadow-lg`}>
                                      {a.status}
                                   </span>
                                   <span className="text-[10px] text-text-muted/60 font-black tracking-widest">{new Date(a.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className={`text-base font-black tracking-tight transition-colors ${selectedId === a._id ? 'text-[#EE7125]' : 'text-text-primary/90 group-hover:text-text-primary'}`}>{a.jobTitle.toUpperCase()}</h3>
                                <div className="flex items-center gap-3 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-60">
                                   <span className="truncate max-w-[200px]">{a.userId?.email || 'Anonymous Entity'}</span>
                                   <span className="w-1 h-1 rounded-full bg-[#EE7125]" />
                                   <span>{a.reqId}</span>
                                </div>
                             </div>
                          </button>
                        ))}
                     </div>
                   )}
                </div>
             </div>
          </aside>

          {/* Details Panel */}
          <div className="flex-1">
             {!selected ? (
               <div className="h-[calc(100vh-160px)] bg-secondary/40 shadow-lg border-dashed rounded-[40px] flex flex-col items-center justify-center text-text-muted">
                  <div className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center mb-6">
                     <User className="w-10 h-10 opacity-20" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Select an entry to view details</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-160px)]">
                  
                  {/* Info Column */}
                  <div className="xl:col-span-7 bg-secondary/60 backdrop-blur-xl shadow-lg rounded-[32px] overflow-hidden flex flex-col shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
                     <div className="p-8 border-b border-border-primary flex items-center justify-between">
                        <div>
                           <h2 className="text-2xl font-display text-text-primary leading-tight">{selected.jobTitle.toUpperCase()}</h2>
                           <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mt-1">Applicant: {selected.userId?.email || 'Unknown'}</p>
                        </div>
                        <select
                          value={selected.status}
                          onChange={(e) => updateStatus(selected._id, e.target.value)}
                          disabled={busy === selected._id}
                          className="bg-primary shadow-lg rounded-xl px-4 py-2 text-xs font-bold text-[#EE7125] focus:outline-none focus:border-[#EE7125]/50 appearance-none"
                        >
                          {STATUSES.map(s => <option key={s} value={s} className="bg-secondary">{s}</option>)}
                        </select>
                     </div>

                     <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
                        {/* Summary Blocks */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div className="p-6 rounded-[24px] bg-white/[0.03] shadow-lg">
                              <h4 className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] mb-4">Contact Details</h4>
                              <div className="space-y-3">
                                 <div>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-0.5">Full Name</p>
                                    <p className="text-sm font-bold text-text-primary">{selected.firstName} {selected.lastName}</p>
                                 </div>
                                 <div>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-0.5">Phone</p>
                                    <p className="text-sm font-bold text-text-primary">{selected.phone || '—'}</p>
                                 </div>
                              </div>
                           </div>
                           <div className="p-6 rounded-[24px] bg-white/[0.03] shadow-lg">
                              <h4 className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] mb-4">Files & Docs</h4>
                              {selected.resumeFileName ? (
                                <a href={selected.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/file">
                                   <div className="w-12 h-12 rounded-2xl bg-[#EE7125]/10 border border-[#EE7125]/20 flex items-center justify-center text-[#EE7125] group-hover/file:bg-[#EE7125]/20 transition-all">
                                      <FileText className="w-6 h-6" />
                                   </div>
                                   <div>
                                      <p className="text-xs font-bold text-text-primary group-hover/file:text-[#EE7125] transition-colors">{selected.resumeFileName}</p>
                                      <p className="text-[10px] text-text-muted uppercase tracking-widest mt-0.5">Click to view PDF</p>
                                   </div>
                                </a>
                              ) : (
                                <p className="text-xs text-text-muted">No resume provided</p>
                              )}
                           </div>
                        </div>

                        {/* Experience */}
                        {selected.workExperience && selected.workExperience.length > 0 && (
                          <div className="space-y-6">
                             <h4 className="text-[10px] font-black text-[#EE7125] uppercase tracking-[0.4em] flex items-center gap-3">
                                <span className="h-px w-8 bg-[#EE7125]/30" /> Work History
                             </h4>
                             <div className="space-y-4">
                                {selected.workExperience.map((exp, idx) => (
                                  <div key={idx} className="p-6 rounded-[24px] bg-white/[0.02] shadow-lg relative">
                                     <div className="absolute left-6 top-10 bottom-6 w-[1px] bg-border-primary" />
                                     <div className="ml-6">
                                        <h5 className="text-base font-bold text-text-primary">{exp.position}</h5>
                                        <p className="text-xs font-bold text-[#EE7125] uppercase tracking-widest mt-0.5">{exp.company}</p>
                                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-2">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                                        <p className="text-xs text-text-secondary leading-relaxed mt-4">{exp.description}</p>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                        )}
                     </div>
                  </div>

                  {/* Actions Column */}
                  <div className="xl:col-span-5 flex flex-col gap-8 h-full">
                     
                     {/* Messenger */}
                     <div className="bg-secondary/60 backdrop-blur-xl rounded-[32px] overflow-hidden flex flex-col flex-1 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
                        <div className="p-6 border-b border-border-primary bg-white/[0.02]">
                           <h3 className="text-xs font-black tracking-[0.3em] text-[#EE7125] uppercase">Communication</h3>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
                           {messages.length === 0 ? (
                             <div className="h-full flex items-center justify-center text-text-muted uppercase tracking-widest text-[9px] font-bold">No message history</div>
                           ) : (
                             messages.map((m) => (
                               <div key={m._id} className={`p-4 rounded-2xl border ${m.direction === 'outbound' ? 'bg-[#EE7125]/5 border-[#EE7125]/20 ml-6' : 'bg-tertiary/50 border-border-primary mr-6'}`}>
                                  <div className="flex items-center justify-between mb-2 opacity-40">
                                     <span className="text-[9px] font-black uppercase tracking-widest">{m.direction}</span>
                                     <span className="text-[9px] font-bold">{new Date(m.createdAt).toLocaleTimeString()}</span>
                                  </div>
                                  {m.subject && <p className="text-[11px] font-bold text-[#EE7125] mb-1">{m.subject}</p>}
                                  <p className="text-xs text-text-secondary leading-relaxed">{m.body}</p>
                               </div>
                             ))
                           )}
                        </div>

                        <div className="p-6 border-t border-border-primary space-y-4">
                           <input
                             value={emailSubject}
                             onChange={(e) => setEmailSubject(e.target.value)}
                             className="w-full bg-primary shadow-lg rounded-xl px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-[#EE7125]/50 transition-all"
                             placeholder="Subject"
                           />
                           <textarea
                             value={emailBody}
                             onChange={(e) => setEmailBody(e.target.value)}
                             className="w-full bg-primary shadow-lg rounded-xl px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-[#EE7125]/50 transition-all resize-none h-24"
                             placeholder="Type a message..."
                           />
                           <button
                             onClick={sendMessage}
                             disabled={!emailBody.trim() || busy === selected._id}
                             className="w-full bg-[#EE7125] hover:bg-[#FF8A40] disabled:bg-[#EE7125]/30 text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                           >
                             {busy === selected._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                             {busy === selected._id ? 'Sending...' : 'Send Message'}
                           </button>
                        </div>
                     </div>

                     {/* Required Documents */}
                     <div className="bg-secondary/60 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)]">
                        <div className="p-6 border-b border-border-primary bg-white/[0.02]">
                           <h3 className="text-xs font-black tracking-[0.3em] text-[#EE7125] uppercase">Required Documents</h3>
                        </div>
                        <div className="p-6 space-y-4">
                           <p className="text-[10px] text-text-muted uppercase tracking-[0.2em]">
                              One item per line. Applicants will see this in their dashboard.
                           </p>
                           <textarea
                             value={requiredDocsDraft}
                             onChange={(e) => setRequiredDocsDraft(e.target.value)}
                             className="w-full bg-primary shadow-lg rounded-xl px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-[#EE7125]/50 transition-all resize-none h-28"
                             placeholder={'Example:\nUpload updated resume (PDF)\nComplete right-to-work form'}
                           />
                           <button
                             onClick={saveRequiredDocuments}
                             disabled={busy === selected._id}
                             className="w-full bg-[#EE7125] hover:bg-[#FF8A40] disabled:bg-[#EE7125]/30 text-white font-black text-[10px] uppercase tracking-[0.2em] py-3 rounded-2xl transition-all"
                           >
                             {busy === selected._id ? 'Saving...' : 'Save Requirements'}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(238,113,37,0.3); }
      `}</style>
    </div>
  );
}
