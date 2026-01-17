import Link from 'next/link';
import type { FC } from 'react';

const HeroSection: FC = () => {
  return (
    <div className="top-image">
      <div className="main-container">
        <div className="intro left-aligned">
          <h1>Find Yourself A Great Career at The Home Depot Canada</h1>
          <p>Where you're empowered to make a real impact, foster growth, and shape the future of home improvement.</p>
          <Link href="/job-search" aria-label="Press enter to search for jobs" tabIndex={-1} className="search-jobs-btn">
            Search All Jobs
          </Link>
          <Link href="/associate-portal" aria-label="Press enter to go to the associates site" tabIndex={-1} className="current-associates-link">
            Current Associates
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;