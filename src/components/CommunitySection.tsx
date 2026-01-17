import Link from 'next/link';
import type { FC } from 'react';

const CommunitySection: FC = () => {
  return (
    <div className="content-wrapper community bg-black">
      <div className="main-container">
        <div className="career-areas-holder">
          <h2>JOIN OUR TALENT COMMUNITY</h2>
          <p>Sign up on Workday to be considered for future opportunities at The Home Depot Canada.</p>
          <Link
            href="https://homedepot.wd5.myworkdayjobs-impl.com/en-US/CareerDepotCanada/introduceYourself"
            target="_blank"
            rel="noopener"
            className="introduceYourSelfBtn bg-orange-600 hover:bg-orange-700 text-white"
          >
            Introduce Yourself
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;