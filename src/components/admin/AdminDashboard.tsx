'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

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

  const [emailSubject, setEmailSubject] = useState('Application update');
  const [emailBody, setEmailBody] = useState('');

  const selected = useMemo(() => apps.find((a) => a._id === selectedId) ?? null, [apps, selectedId]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/applications', { cache: 'no-store' });
      const text = await res.text();
      if (!text) {
        throw new Error('Empty response from server');
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error('Invalid response from server. Please check your MongoDB connection.');
      }
      if (!res.ok) throw new Error(data?.error ?? 'Failed to load');
      setApps((data.applications ?? []).map((a: any) => ({ ...a, _id: a._id.toString?.() ?? a._id })));
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load');
    } finally {
      setLoading(false);
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

  async function updateStatus(applicationId: string, status: string) {
    setBusy(applicationId);
    try {
      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? 'Failed to update');
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? 'Failed to send');
      setEmailBody('');
      await loadMessages(selected._id);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to send');
    } finally {
      setBusy(null);
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/applicant-login';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-black">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Review applications, update status, and message applicants.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded font-semibold">
            User View
          </Link>
          <button onClick={logout} className="px-4 py-2 bg-black text-white rounded font-semibold hover:bg-gray-900">
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-bold text-black">Applications</h2>
              <button onClick={refresh} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="p-6 text-gray-600">Loading…</div>
            ) : apps.length === 0 ? (
              <div className="p-6 text-gray-600">No applications yet.</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {apps.map((a) => (
                  <button
                    key={a._id}
                    onClick={() => setSelectedId(a._id)}
                    className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors ${
                      selectedId === a._id ? 'bg-orange-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-bold text-black truncate">{a.jobTitle}</div>
                        <div className="text-sm text-gray-600 mt-1 truncate">
                          Applicant: {a.userId?.email ?? '—'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Req: {a.reqId ?? '—'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-orange-600">{a.status}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(a.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-bold text-black">Details</h2>
            </div>

            {!selected ? (
              <div className="p-6 text-gray-600">Select an application to view details.</div>
            ) : (
              <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div>
                  <div className="text-lg font-black text-black">{selected.jobTitle}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Applicant: {selected.userId?.email ?? '—'}
                  </div>
                  {selected.firstName && selected.lastName && (
                    <div className="text-sm text-gray-600 mt-1">
                      Name: {selected.firstName} {selected.lastName}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mt-1">{selected.jobAddress ?? ''}</div>
                  {selected.reqId && (
                    <div className="text-sm text-gray-600 mt-1">Req ID: {selected.reqId}</div>
                  )}
                </div>

                {/* Personal Information */}
                {(selected.firstName || selected.phone || selected.address) && (
                  <div>
                    <h3 className="text-sm font-bold text-black mb-2">Contact Information</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                      {selected.phone && <div><strong>Phone:</strong> {selected.phone}</div>}
                      {selected.address && (
                        <div>
                          <strong>Address:</strong> {selected.address}
                          {selected.city && `, ${selected.city}`}
                          {selected.province && `, ${selected.province}`}
                          {selected.postalCode && ` ${selected.postalCode}`}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Resume */}
                {selected.resumeFileName && (
                  <div>
                    <h3 className="text-sm font-bold text-black mb-2">Resume/CV</h3>
                    <a
                      href={selected.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {selected.resumeFileName}
                    </a>
                  </div>
                )}

                {/* Work Experience */}
                {selected.workExperience && selected.workExperience.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-black mb-2">Work Experience</h3>
                    <div className="space-y-3">
                      {selected.workExperience.map((exp, idx) => (
                        <div key={idx} className="text-sm text-gray-700 border-l-2 border-orange-500 pl-3">
                          <div className="font-semibold">{exp.position}</div>
                          <div className="text-gray-600">{exp.company}</div>
                          <div className="text-xs text-gray-500">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                          {exp.description && (
                            <div className="text-gray-600 mt-1 text-xs">{exp.description}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {selected.education && selected.education.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-black mb-2">Education</h3>
                    <div className="space-y-2">
                      {selected.education.map((edu, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          <div className="font-semibold">{edu.degree}</div>
                          <div className="text-gray-600">{edu.institution}</div>
                          {edu.fieldOfStudy && (
                            <div className="text-xs text-gray-500">Field: {edu.fieldOfStudy}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {selected.skills && selected.skills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-black mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Application Questions */}
                {selected.applicationQuestions && Object.keys(selected.applicationQuestions).length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-black mb-2">Application Questions</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      {Object.entries(selected.applicationQuestions).map(([key, value]) => (
                        <div key={key}>
                          <div className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</div>
                          <div className="text-gray-600">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-black mb-2">Status</label>
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected._id, e.target.value)}
                    disabled={busy === selected._id}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">Message applicant</label>
                  <input
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                    placeholder="Subject"
                  />
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 h-28"
                    placeholder="Write a message…"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!emailBody.trim() || busy === selected._id}
                    className="mt-3 w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-2.5 rounded"
                  >
                    Send Email
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Note: emails send only after you set SMTP env vars (see `ENV_SETUP.md`).
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-black">Messages</label>
                    <button
                      className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                      onClick={() => loadMessages(selected._id)}
                    >
                      Refresh
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded max-h-64 overflow-auto">
                    {messages.length === 0 ? (
                      <div className="p-3 text-sm text-gray-600">No messages yet.</div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {messages.map((m) => (
                          <div key={m._id} className="p-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-xs font-bold text-gray-700 uppercase">{m.direction}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(m.createdAt).toLocaleString()}
                              </div>
                            </div>
                            {m.subject && <div className="text-sm font-semibold text-black mt-1">{m.subject}</div>}
                            <div className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{m.body}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

