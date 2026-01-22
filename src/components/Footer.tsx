'use client';

import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <>
      {/* EEO Statement */}
      <div className="eeo-strip">
        <div className="eeo-main-container">
          <div className="shortEeoStatement">
            We strive to maintain a culture that welcomes everyone, and we believe it helps us achieve our business goals by driving excellent customer service and innovation, empowering our associates to thrive and excel, and enriching the communities in which we operate. This includes creating an environment where our associates feel welcomed, valued and respected and providing equal opportunity for all of our associates.
            <a href="#" className="eeo-learn-more">Learn more</a>
          </div>
          <div className="fullEeoStatement" tabIndex={0}>
            <p>For any Accessibility requests, please follow <a href="https://www.homedepot.ca/content/dam/homedepot/pdf/static/home-depot-canada-accessibility-policies.pdf" target="_blank" rel="noopener noreferrer">this link</a> to reach out to us.</p>
          </div>
        </div>
      </div>

      <div className="footer-line"></div>

      {/* Mobile Footer */}
      <footer className="md:hidden bg-white text-black w-full">
        <div className="px-4 py-6">
          {/* Our Benefits Section */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-black mb-3">Our Benefits</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/about/culture" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Our Culture</Link>
              <Link href="/about/social-responsibility" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Social Responsibility</Link>
            </div>
          </div>

          {/* Career Areas Section */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-black mb-3">Career Areas</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/career-areas/corporate-opportunities" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Corporate</Link>
              <Link href="/career-areas/early-talent" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Early Talent</Link>
              <Link href="/career-areas/field" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Field</Link>
              <Link href="/career-areas/retail-management-opportunities" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Retail Management</Link>
              <Link href="/career-areas/retail-store-opportunities" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Retail Store</Link>
            </div>
          </div>

          {/* Search Jobs Section */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-black mb-3">Search Jobs</h3>
            <div className="flex flex-col gap-2.5 mb-4">
              <Link href="/jobs-on-a-map" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">View Jobs On A Map</Link>
              <Link href="/location" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Jobs By Location</Link>
              <Link href="/featured-jobs" className="text-black no-underline text-sm transition-colors hover:text-gray-600 block">Featured Jobs</Link>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 flex-wrap mt-4">
              <a href="https://www.facebook.com/homedepotcanada" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none no-underline transition-colors hover:bg-gray-800 text-lg">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.linkedin.com/company/the-home-depot-canada/" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page" className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none no-underline transition-colors hover:bg-gray-800 text-lg">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/homedepotcanada/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none no-underline transition-colors hover:bg-gray-800 text-lg">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/homedepotcanada" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube page" className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none no-underline transition-colors hover:bg-gray-800 text-lg">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Bottom Section - Copyright and Legal */}
          <div className="border-t border-gray-300 pt-4 mt-5">
            <div className="text-[0.7rem] text-black leading-snug">
              © 2026 Home Depot International, Inc. All Rights Reserved. <Link href="/terms-and-conditions" className="text-black no-underline hover:text-gray-600 hover:underline">Terms & Conditions</Link>. <Link href="/privacy-policy" className="text-black no-underline hover:text-gray-600 hover:underline">Privacy Policy</Link>. <Link href="/associate-privacy-statement" className="text-black no-underline hover:text-gray-600 hover:underline">Associate Privacy Statement</Link>. <a href="javascript:;" className="ot-sdk-show-settings text-black no-underline hover:text-gray-600 hover:underline">Cookie Preferences</a>. Powered by <a href="https://adverto.co/" target="_blank" rel="noopener noreferrer" className="text-black no-underline hover:text-gray-600 hover:underline">Adverto Inc.</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Desktop Footer */}
      <footer className="footer-wrapper hidden md:block">
        <div className="main-container">
          <div className="footer-column">
            <h3><Link href="/">Careers Main Page</Link></h3>
            <ul>
              <li><a href="https://homedepot.wd5.myworkdayjobs.com/en-US/CareerDepotCanada/login" target="_blank" rel="noopener noreferrer">Applicant Login</a></li>
              <li><Link href="/associate-portal">Current Associates</Link></li>
              <li className="moreMargin">
                <a href="https://careers.homedepot.ca/fr/a-propos-de-nous/formation" aria-label="Press enter to open the French version of the site">
                  Français
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><Link href="/about/career-benefits">Career Growth</Link></li>
              <li><Link href="/about/our-benefits">Our Benefits</Link></li>
              <li><Link href="/about/our-culture">Our Culture</Link></li>
              <li><Link href="/about/social-responsibility">Social Responsibility</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Career Areas</h3>
            <ul>
              <li><Link href="/career-areas/corporate-opportunities">Corporate</Link></li>
              <li><Link href="/career-areas/early-talent">Early Talent</Link></li>
              <li><Link href="/career-areas/field">Field</Link></li>
              <li><Link href="/career-areas/retail-management-opportunities">Retail Management</Link></li>
              <li><Link href="/career-areas/retail-store-opportunities">Retail Store</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3><Link href="/job-search">Search Jobs</Link></h3>
            <ul>
              <li><Link href="/jobs-on-a-map">View Jobs On A Map</Link></li>
              <li><Link href="/location">Jobs By Location</Link></li>
              <li><Link href="/featured-jobs">Featured Jobs</Link></li>
              <ul>
                <li><a href="https://www.facebook.com/homedepotcanada" target="_blank" rel="noopener noreferrer" aria-label="Press enter to visit our Facebook page"><i className="fab fa-facebook"></i></a></li>
                <li><a href="https://www.linkedin.com/company/the-home-depot-canada/" target="_blank" rel="noopener noreferrer" aria-label="Press enter to visit our LinkedIn page"><i className="fab fa-linkedin"></i></a></li>
                <li><a href="https://www.instagram.com/homedepotcanada/" target="_blank" rel="noopener noreferrer" aria-label="Press enter to visit our Instagram page"><i className="fab fa-instagram"></i></a></li>
                <li><a href="https://www.youtube.com/homedepotcanada" target="_blank" rel="noopener noreferrer" aria-label="Press enter to visit our YouTube page"><i className="fab fa-youtube"></i></a></li>
              </ul>
            </ul>
          </div>
        </div>

        {/* Full-width Copyright */}
        <div className="copyrights-fullwidth">
          &copy; 2026 Home Depot International, Inc. All Rights Reserved.
          <Link href="/terms-and-conditions">Terms & Conditions</Link>.
          <Link href="/privacy-policy">Privacy Policy</Link>.
          <Link href="/associate-privacy-statement" target="_self">Associate Privacy Statement</Link>.
          <a href="javascript:;" className="ot-sdk-show-settings">Cookie Preferences</a>.
          <a href="https://adverto.co/" target="_blank" rel="noopener noreferrer">Powered by Adverto Inc.</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
