'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

export interface JobListingCardProps {
  id: string;
  title: string;
  address: string;
  reqId: string;
  jobType: string;
  workType?: string;
  workArrangement?: string;
  isNew?: boolean;
  onShare?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

const JobListingCard: FC<JobListingCardProps> = ({
  id,
  title,
  address,
  reqId,
  jobType,
  workType,
  workArrangement,
  isNew = false,
  onShare,
  onSave,
  isSaved = false,
}) => {
  const router = useRouter();
  const [saved, setSaved] = useState(isSaved);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(id);
  };

  const handleCardClick = () => {
    router.push(`/job/${id}`);
  };

  // Use workType if available, otherwise fall back to workArrangement
  const displayWorkType = workType || workArrangement || '';

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 hover:border-orange-600 hover:shadow-[0_2px_8px_rgba(255,102,0,0.1)] transition-all duration-200 relative cursor-pointer"
    >
      {/* NEW Banner */}
      {isNew && (
        <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold px-3 py-1 transform -rotate-12 origin-top-left z-10">
          NEW
        </div>
      )}

      <div className="flex gap-4 items-center">
        {/* Home Depot Logo */}
        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center bg-white border border-gray-200 rounded overflow-hidden">
            <Image
              src="/images/icons/logo.8eb14c19.png"
              alt="The Home Depot Logo"
              width={80}
              height={80}
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-base md:text-lg font-bold text-black uppercase mb-2 md:mb-3 leading-snug">
            {title}
          </h3>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 md:text-gray-700">
            {/* Location */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <i className="fas fa-map-marker-alt text-red-600 md:text-gray-600 text-sm w-4"></i>
              <span>{address}</span>
            </div>

            {/* Req ID */}
            <div className="flex items-center">
              <span className="font-medium">Req ID: {reqId}</span>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <i className="fas fa-calendar text-gray-600 text-sm w-4"></i>
              <span>{jobType}</span>
            </div>

            {/* Work Type/Arrangement */}
            {displayWorkType && (
              <div className="flex items-center gap-1.5 md:gap-2">
                <i className="fas fa-user text-gray-600 text-sm w-4"></i>
                <span>{displayWorkType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex-shrink-0 flex flex-row gap-3 items-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 p-2 bg-transparent border-none cursor-pointer text-gray-600 text-[11px] font-semibold uppercase hover:text-orange-600 transition-colors"
            aria-label={`Share ${title}`}
          >
            <i className="fas fa-share-alt text-lg mb-0.5"></i>
            <span>SHARE</span>
          </button>
          <button
            onClick={handleSave}
            className={`flex flex-col items-center gap-1 p-2 bg-transparent border-none cursor-pointer text-[11px] font-semibold uppercase transition-colors ${
              saved
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
            aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
          >
            <i className={`fas fa-bookmark text-lg mb-0.5 ${saved ? 'fill-current' : ''}`}></i>
            <span>SAVE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
