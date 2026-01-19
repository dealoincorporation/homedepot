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

      {/* Main Footer */}
      <footer className="footer-wrapper">
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
          <a href="#" className="hamburger-menu footerBtn">
            <span aria-hidden="true" className="fas fa-bars"></span>
            <span aria-hidden="true" className="fas fa-caret-down"></span>
          </a>
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