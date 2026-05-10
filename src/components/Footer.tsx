'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const columns = [
    {
      title: 'Careers',
      links: [
        { href: '/', label: 'Careers Main Page' },
        { href: 'https://homedepot.wd5.myworkdayjobs.com/en-US/CareerDepotCanada/login', label: 'Applicant Login', external: true },
        { href: '/associate-portal', label: 'Current Associates' },
        { href: 'https://careers.homedepot.ca/fr/', label: 'Français', external: true },
      ],
    },
    {
      title: 'About Us',
      links: [
        { href: '/about/career-benefits', label: 'Career Growth' },
        { href: '/about/our-benefits', label: 'Our Benefits' },
        { href: '/about/culture', label: 'Our Culture' },
        { href: '/about/social-responsibility', label: 'Social Responsibility' },
      ],
    },
    {
      title: 'Career Areas',
      links: [
        { href: '/career-areas/corporate-opportunities', label: 'Corporate' },
        { href: '/career-areas/early-talent', label: 'Early Talent' },
        { href: '/career-areas/field', label: 'Field' },
        { href: '/career-areas/retail-management-opportunities', label: 'Retail Management' },
        { href: '/career-areas/retail-store-opportunities', label: 'Retail Store' },
      ],
    },
    {
      title: 'Search Jobs',
      links: [
        { href: '/jobs-on-a-map', label: 'View Jobs on Map' },
        { href: '/location', label: 'Jobs By Location' },
        { href: '/featured-jobs', label: 'Featured Jobs' },
        { href: '/job-search', label: 'Search All Jobs' },
      ],
    },
  ];

  const socials = [
    { href: 'https://www.facebook.com/homedepotcanada', icon: 'fa-facebook-f', label: 'Facebook' },
    { href: 'https://www.linkedin.com/company/the-home-depot-canada/', icon: 'fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://www.instagram.com/homedepotcanada/', icon: 'fa-instagram', label: 'Instagram' },
    { href: 'https://www.youtube.com/homedepotcanada', icon: 'fa-youtube', label: 'YouTube' },
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-white/5">
      {/* EEO Strip */}
      <div className="border-b border-white/5 bg-[#1C1C1E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <p className="text-xs text-white/40 leading-relaxed max-w-4xl">
            We strive to maintain a culture that welcomes everyone. This includes creating an environment where our associates feel welcomed, valued and respected and providing equal opportunity for all.{' '}
            <a href="#" className="text-[#EE7125] hover:underline">Learn more</a>
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <Image
              src="/images/icons/logo.8eb14c19.png"
              alt="The Home Depot"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-white text-[9px] font-bold tracking-widest uppercase opacity-60">The Home Depot</span>
              <span className="text-[#EE7125] text-xs font-black tracking-widest uppercase">Careers</span>
            </div>
          </Link>
            <p className="text-xs text-white/40 leading-relaxed mb-6 max-w-[200px]">
              Building careers and communities across Canada since 1994.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#EE7125] hover:text-[#EE7125] transition-all duration-200 text-xs"
                >
                  {s.label === 'Facebook' && <Facebook className="w-3.5 h-3.5" />}
                  {s.label === 'LinkedIn' && <Linkedin className="w-3.5 h-3.5" />}
                  {s.label === 'Instagram' && <Instagram className="w-3.5 h-3.5" />}
                  {s.label === 'YouTube' && <Youtube className="w-3.5 h-3.5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold tracking-[0.2em] text-[#EE7125] uppercase mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/25">
            © 2026 Home Depot International, Inc. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {
              [
                { href: '/terms-and-conditions', label: 'Terms & Conditions' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/associate-privacy-statement', label: 'Associate Privacy Statement' },
              ].map((item, i, arr) => (
                <span key={item.label} className="flex items-center gap-4">
                <Link href={item.href} className="text-[10px] text-white/25 hover:text-white/60 transition-colors">
                  {item.label}
                </Link>
                {i < arr.length - 1 && <span className="text-white/10 text-xs">·</span>}
              </span>
            ))}
            <span className="text-white/10 text-xs">·</span>
            <span className="text-[10px] text-white/25">
              Powered by{' '}
              <a href="https://adverto.co/" target="_blank" rel="noopener noreferrer" className="hover:text-[#EE7125] transition-colors">
                Adverto Inc.
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
