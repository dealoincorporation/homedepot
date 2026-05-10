'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { 
  MapPin, 
  Calendar, 
  User, 
  Share2, 
  Bookmark, 
  Heart, 
  ArrowRight,
  Monitor,
  Briefcase
} from 'lucide-react';

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
      className="bg-secondary/40 lg:border lg:border-white/5 lg:rounded-[24px] lg:hover:border-[#EE7125]/30 lg:hover:bg-secondary/60 lg:hover:shadow-[0_12px_40px_rgba(238,113,37,0.1)] transition-all duration-300 relative cursor-pointer group"
    >
      {/* NEW Banner */}
      {isNew && (
        <div className="absolute top-0 left-0 bg-[#EE7125] text-white text-[10px] font-black px-4 py-1.5 transform -rotate-12 origin-top-left z-10 shadow-lg tracking-widest">
          NEW
        </div>
      )}

      <div className="flex gap-3 lg:gap-4 items-start p-4 lg:p-5 md:p-6">
        {/* Home Depot Logo - Mobile: Orange Square, Desktop: Regular Logo */}
        <div className="flex-shrink-0">
          {/* Mobile: Orange Square Logo */}
          <div className="lg:hidden w-14 h-14 bg-[#EE7125] flex items-center justify-center p-1.5 rounded-xl shadow-lg">
            <div className="text-white text-[7px] font-black leading-[1.1] text-center uppercase tracking-tight">
              THE HOME DEPOT
            </div>
          </div>
          {/* Desktop: Regular Logo */}
          <div className="hidden lg:flex w-16 h-16 md:w-20 md:h-20 relative items-center justify-center bg-tertiary rounded-2xl border border-border-primary p-3 group-hover:border-[#EE7125]/30 transition-colors">
            <Image
              src="/images/icons/logo.8eb14c19.png"
              alt="The Home Depot Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-sm lg:text-base md:text-xl font-black text-text-primary uppercase mb-2 lg:mb-1.5 leading-snug group-hover:text-[#EE7125] transition-colors">
            {title}
          </h3>
          
          {/* Mobile Layout: Stacked vertically */}
          <div className="lg:hidden space-y-1.5">
            {/* Location */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#EE7125] flex-shrink-0" />
              <span className="text-xs font-bold text-text-secondary">{address}</span>
            </div>

            {/* Req ID */}
            <div className="flex items-center">
              <span className="text-[10px] font-black text-[#EE7125] uppercase tracking-widest bg-[#EE7125]/10 px-2 py-0.5 rounded">#{reqId}</span>
            </div>

            {/* Job Type and Work Arrangement in a row */}
            <div className="flex items-center gap-4">
              {/* Job Type */}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                <span className="text-xs font-bold text-text-secondary">{jobType}</span>
              </div>

              {/* Work Type/Arrangement */}
              {displayWorkType && (
                <div className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                  <span className="text-xs font-bold text-text-secondary">{displayWorkType}</span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout: Horizontal with icons */}
          <div className="hidden lg:flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#EE7125]" />
              <span className="text-xs font-bold text-text-secondary">{address}</span>
            </div>

            {/* Req ID */}
            <div className="flex items-center">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest px-2 py-0.5 bg-tertiary rounded border border-border-primary">#{reqId}</span>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-muted" />
              <span className="text-xs font-bold text-text-secondary">{jobType}</span>
            </div>

            {/* Work Type/Arrangement */}
            {displayWorkType && (
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-text-muted" />
                <span className="text-xs font-bold text-text-secondary">{displayWorkType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Icons - Desktop only */}
        <div className="hidden lg:flex flex-shrink-0 flex-row gap-2 items-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleShare}
            className="w-10 h-10 flex flex-col items-center justify-center bg-tertiary hover:bg-[#EE7125] text-text-muted hover:text-white rounded-xl transition-all"
            aria-label={`Share ${title}`}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            className={`w-10 h-10 flex flex-col items-center justify-center rounded-xl transition-all ${
              saved
                ? 'bg-[#EE7125] text-white'
                : 'bg-tertiary text-text-muted hover:bg-[#EE7125]/20 hover:text-[#EE7125]'
            }`}
            aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
          <div className="w-10 h-10 flex items-center justify-center text-text-muted group-hover:text-[#EE7125] transition-all group-hover:translate-x-1">
             <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
