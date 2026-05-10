import Link from 'next/link';
import type { FC } from 'react';

const EEOSection: FC = () => {
  return (
    <div className="eeo-strip bg-white">
      <div className="eeo-main-container">
        <div className="shortEeoStatement text-gray-800">
          We strive to maintain a culture that welcomes everyone, and we believe it helps us achieve our business goals by driving excellent customer service and innovation, empowering our associates to thrive and excel, and enriching the communities in which we operate. This includes creating an environment where our associates feel welcomed, valued and respected and providing equal opportunity for all of our associates.
          <Link href="#" className="eeo-learn-more text-orange-600 hover:text-orange-700 ml-2 font-medium">
            Learn more
          </Link>
        </div>
        <div className="fullEeoStatement text-gray-800" tabIndex={0}>
          <p>For any Accessibility requests, please follow <Link href="https://www.homedepot.ca/content/dam/homedepot/pdf/static/home-depot-canada-accessibility-policies.pdf" target="_blank" className="text-orange-600 hover:text-orange-700 underline">this link</Link> to reach out to us.</p>
        </div>
      </div>
    </div>
  );
};

export default EEOSection;