'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/applicant-login';
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-6 md:mb-8">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-black">My Applications</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Track your progress and status updates in one place.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Link 
            href="/job-search" 
            className="px-4 py-2 bg-orange-600 text-white rounded font-semibold hover:bg-orange-700 text-center text-sm sm:text-base transition-colors"
          >
            Search Jobs
          </Link>
          <button 
            onClick={logout} 
            className="px-4 py-2 bg-black text-white rounded font-semibold hover:bg-gray-900 text-sm sm:text-base transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
      )}

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
          <div className="p-6 text-gray-600">
            You haven’t applied to any jobs yet.{' '}
            <Link href="/job-search" className="text-orange-600 hover:text-orange-700 font-semibold underline">
              Search jobs
            </Link>
            .
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {apps.map((a) => (
              <div key={a._id} className="px-5 py-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-black text-base sm:text-lg">{a.jobTitle}</div>
                    {a.jobAddress && <div className="text-xs sm:text-sm text-gray-600 mt-1">{a.jobAddress}</div>}
                    <div className="text-xs text-gray-500 mt-1">Req: {a.reqId ?? '—'}</div>
                    
                    {/* Personal Info */}
                    {(a.firstName || a.lastName) && (
                      <div className="mt-3 text-xs sm:text-sm text-gray-700">
                        <strong>Applicant:</strong> {a.firstName} {a.lastName}
                        {a.phone && <span className="block sm:inline sm:ml-4 mt-1 sm:mt-0"><strong>Phone:</strong> {a.phone}</span>}
                      </div>
                    )}

                    {/* Resume */}
                    {a.resumeFileName && (
                      <div className="mt-2">
                        <a
                          href={a.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          {a.resumeFileName}
                        </a>
                      </div>
                    )}

                    {/* Work Experience Summary */}
                    {a.workExperience && a.workExperience.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-semibold text-black">Experience:</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {a.workExperience.slice(0, 2).map((exp, idx) => (
                            <div key={idx}>
                              {exp.position} at {exp.company}
                            </div>
                          ))}
                          {a.workExperience.length > 2 && (
                            <div className="text-gray-500">+{a.workExperience.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Education Summary */}
                    {a.education && a.education.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-semibold text-black">Education:</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {a.education.slice(0, 2).map((edu, idx) => (
                            <div key={idx}>
                              {edu.degree} - {edu.institution}
                            </div>
                          ))}
                          {a.education.length > 2 && (
                            <div className="text-gray-500">+{a.education.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-bold text-xs sm:text-sm">
                      {a.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Applied {new Date(a.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {a.statusHistory && a.statusHistory.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs sm:text-sm font-bold text-black mb-2">Status history</div>
                    <div className="flex flex-col gap-2">
                      {a.statusHistory
                        .slice()
                        .reverse()
                        .map((h, idx) => (
                          <div key={idx} className="text-xs sm:text-sm text-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                            <span>{h.status}</span>
                            <span className="text-xs text-gray-500">{new Date(h.at).toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

