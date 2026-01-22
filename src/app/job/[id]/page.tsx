'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import JobDetail from '@/components/job/JobDetail';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id as string;

  if (!jobId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Invalid Job ID</h1>
        </div>
      </div>
    );
  }

  return <JobDetail jobId={jobId} />;
}
