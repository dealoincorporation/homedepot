import type { FC } from 'react';

const LogoSVG: FC<{ className?: string; variant?: 'full' | 'icon' }> = ({ 
  className = '', 
  variant = 'full' 
}) => {
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="The Home Depot"
      >
        {/* Orange house icon */}
        <rect width="48" height="48" fill="#EE7125" />
        {/* Roof */}
        <polygon points="24,6 6,22 42,22" fill="white" />
        {/* House body */}
        <rect x="10" y="22" width="28" height="18" fill="white" />
        {/* Door */}
        <rect x="19" y="28" width="10" height="12" fill="#EE7125" />
        {/* HD text hint */}
        <text x="24" y="20" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif"></text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The Home Depot Canada Careers"
    >
      {/* Orange square icon block */}
      <rect x="0" y="4" width="48" height="48" fill="#EE7125" />
      {/* Roof triangle */}
      <polygon points="24,9 5,26 43,26" fill="white" />
      {/* House body */}
      <rect x="10" y="26" width="28" height="18" fill="white" />
      {/* Door */}
      <rect x="18" y="32" width="12" height="12" fill="#EE7125" />

      {/* Main wordmark — THE HOME DEPOT */}
      <text
        x="60"
        y="26"
        fill="white"
        fontSize="22"
        fontWeight="900"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        letterSpacing="-0.5"
      >
        THE HOME DEPOT
      </text>

      {/* Separator line */}
      <line x1="60" y1="31" x2="314" y2="31" stroke="#EE7125" strokeWidth="1.5" />

      {/* Sub-label — CANADA CAREERS */}
      <text
        x="60"
        y="46"
        fill="#EE7125"
        fontSize="12"
        fontWeight="600"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        letterSpacing="3"
      >
        CANADA  CAREERS
      </text>
    </svg>
  );
};

export default LogoSVG;
