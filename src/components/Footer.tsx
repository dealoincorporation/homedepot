import Link from 'next/link';
import type { FC } from 'react';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer: FC = () => {
  const footerSections = [
    {
      title: "Careers Main Page",
      links: [
        { name: "Applicant Login", href: "https://homedepot.wd5.myworkdayjobs.com/en-US/CareerDepotCanada/login", external: true, className: "applicant-login-link" },
        { name: "Current Associates", href: "/associate-portal" },
        { name: "Version Française", href: "/fr", special: true }
      ]
    },
    {
      title: "About Us",
      links: [
        { name: "Career Growth", href: "/about-us/career-growth" },
        { name: "Our Benefits", href: "/about-us/our-benefits" },
        { name: "Our Culture", href: "/about-us/our-culture" },
        { name: "Social Responsibility", href: "/about-us/social-responsibility" }
      ]
    },
    {
      title: "Career Areas",
      links: [
        { name: "Corporate", href: "/career-areas/corporate-opportunities" },
        { name: "Early Talent", href: "/career-areas/early-talent" },
        { name: "Field", href: "/career-areas/field" },
        { name: "Retail Management", href: "/career-areas/retail-management-opportunities" },
        { name: "Retail Store", href: "/career-areas/retail-store-opportunities" }
      ]
    },
    {
      title: "Search Jobs",
      links: [
        { name: "View Jobs On A Map", href: "/jobs-on-a-map" },
        { name: "Jobs By Location", href: "/location" },
        { name: "Featured Jobs", href: "/featured-jobs" }
      ]
    }
  ];

  return (
    <footer className="footer-wrapper bg-white">
      <div className="main-container">
        {footerSections.map((section, index) => (
          <div key={section.title} className="footer-column">
            <h3>
              {section.title === "Search Jobs" ? (
                <Link href="/job-search">{section.title}</Link>
              ) : (
                section.title
              )}
            </h3>
            <ul>
              {section.links.map((link) => (
                <li key={link.name}>
                  {link.special ? (
                    <Link href={link.href} aria-label="Press enter to open the French version of the site">
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className={link.className}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.name === "Featured Jobs" && (
                    <div className="footer-social-icons">
                      <Link
                        href="https://www.facebook.com/homedepotcanada"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Press enter to visit our Facebook page"
                      >
                        <Facebook size={20} />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/company/the-home-depot-canada/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Press enter to visit our LinkedIn page"
                      >
                        <Linkedin size={20} />
                      </Link>
                      <Link
                        href="https://www.instagram.com/homedepotcanada/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Press enter to visit our Instagram page"
                      >
                        <Instagram size={20} />
                      </Link>
                      <Link
                        href="https://www.youtube.com/homedepotcanada"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Press enter to visit our YouTube page"
                      >
                        <Youtube size={20} />
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="copyrights">
          <span>&copy; 2026 Home Depot International, Inc. All Rights Reserved.</span>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/associate-privacy-statement" target="_self">Associate Privacy Statement</Link>
          <Link href="javascript:;" className="ot-sdk-show-settings">Cookie Preferences</Link>
          <Link href="https://adverto.co/" target="_blank" rel="noreferrer">Powered by Adverto Inc.</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;