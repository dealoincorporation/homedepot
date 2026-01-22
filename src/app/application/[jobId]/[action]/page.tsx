'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ApplicationActionPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobId as string;
  const action = params?.action as string;

  useEffect(() => {
    // All actions (autofill, manual, reuse) redirect to the main application form
    // The form itself handles the different modes if needed
    router.replace(`/application/${jobId}`);
  }, [jobId, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
