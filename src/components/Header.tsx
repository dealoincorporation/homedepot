'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ChevronDown, Globe, User, LogIn, Accessibility, Menu, X, Facebook, Linkedin, Instagram, Youtube, Briefcase, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openDropdown = (dropdown: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(dropdown);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (isMobileMenuOpen) setExpandedMobileMenu(null);
  };

  const toggleMobileSubmenu = (menu: string) => {
    setExpandedMobileMenu(expandedMobileMenu === menu ? null : menu);
  };

  const navItems = [
    {
      label: 'About Us',
      key: 'about',
      links: [
        { href: '/about/career-benefits', label: 'Career Growth' },
        { href: '/about/our-benefits', label: 'Our Benefits' },
        { href: '/about/culture', label: 'Our Culture' },
        { href: '/about/social-responsibility', label: 'Social Responsibility' },
      ],
    },
    {
      label: 'Career Areas',
      key: 'careers',
      links: [
        { href: '/career-areas/corporate-opportunities', label: 'Corporate' },
        { href: '/career-areas/early-talent', label: 'Early Talent' },
        { href: '/career-areas/field', label: 'Field' },
        { href: '/career-areas/retail-management', label: 'Retail Management' },
        { href: '/career-areas/retail-store-opportunities', label: 'Retail Store' },
      ],
    },
    {
      label: 'Featured Jobs',
      key: 'featured',
      links: [
        { href: '/featured-jobs/data-entry', label: 'Data Entry' },
        { href: '/featured-jobs/payroll-clerk', label: 'Payroll Clerk' },
        { href: '/featured-jobs/customer-representative', label: 'Customer Representative' },
        { href: '/featured-jobs/virtual-assistant', label: 'Virtual Assistant' },
        { href: '/featured-jobs/merchandising-met-associate', label: 'MET Associate' },
        { href: '/featured-jobs/order-picker', label: 'Order Picker' },
        { href: '/featured-jobs/receiving-associate', label: 'Receiving Associate' },
        { href: '/featured-jobs/sales-associate', label: 'Sales Associate' },
      ],
    },
  ];

  const utilityLinks = [
    { href: '/accessibility', label: 'ACCESSIBILITY', id: 'util-accessibility' },
    { href: '/applicant-login', label: 'APPLICANT LOGIN', id: 'util-login' },
    { href: '/associate-portal', label: 'CURRENT ASSOCIATES', id: 'util-associates' },
  ];

  const socials = [
    { href: 'https://www.facebook.com/homedepotcanada', icon: 'fa-facebook-f', label: 'Facebook' },
    { href: 'https://www.linkedin.com/company/the-home-depot-canada/', icon: 'fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://www.instagram.com/homedepotcanada/', icon: 'fa-instagram', label: 'Instagram' },
    { href: 'https://www.youtube.com/homedepotcanada', icon: 'fa-youtube', label: 'YouTube' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-primary/90 backdrop-blur-xl border-b border-border-primary shadow-xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Top utility bar */}
        <div
          className={`border-b border-white/5 transition-all duration-300 ${
            isScrolled ? 'h-0 overflow-hidden opacity-0' : 'opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-end items-center gap-4 h-9">
            {utilityLinks.map((item) => (
              <span key={item.id} className="flex items-center gap-2 md:gap-4">
                <Link
                  href={item.href}
                  className="text-[9px] md:text-[10px] font-bold tracking-widest text-text-muted hover:text-[#EE7125] transition-colors duration-200 uppercase whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </span>
            ))}
            <span className="text-white/20 text-[10px] hidden sm:inline">|</span>
            <Link
              href="/fr"
              className="text-[9px] md:text-[10px] font-bold tracking-widest border border-border-primary text-text-secondary hover:border-[#EE7125] hover:text-[#EE7125] px-2 md:px-2.5 py-1 transition-all duration-200 uppercase flex items-center gap-1.5"
            >
              <Globe className="w-3 h-3" />
              <span className="hidden xs:inline">FRANÇAIS</span>
              <span className="xs:hidden">FR</span>
            </Link>
            <div className="h-4 w-px bg-border-primary mx-1 hidden sm:block" />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Main nav */}
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo — real Home Depot logo + CAREERS wordmark */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/images/icons/logo.8eb14c19.png"
              alt="The Home Depot"
              width={52}
              height={52}
              className="object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-text-primary text-[10px] font-bold tracking-[0.18em] uppercase opacity-70">
                The Home Depot
              </span>
              <span className="text-[#EE7125] text-sm font-black tracking-[0.22em] uppercase">
                Careers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="text-[11px] font-bold tracking-widest uppercase text-[#EE7125] relative"
            >
              HOME
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#EE7125] rounded-full" />
            </Link>

            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => openDropdown(item.key)}
                onMouseLeave={closeDropdown}
              >
                <button className="text-[11px] font-bold tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-1.5 py-1">
                  {item.label}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.key ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeDropdown === item.key && (
                  <div
                    className="absolute top-full left-0 pt-3 w-64 z-[100]"
                    style={{ animation: 'slideDown 0.25s ease forwards' }}
                    onMouseEnter={() => openDropdown(item.key)}
                    onMouseLeave={closeDropdown}
                  >
                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.65)] overflow-hidden rounded-xl">
                      {item.links.map((link, idx) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-5 py-3 text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 hover:pl-7 border-b border-white/10 hover:border-[#EE7125]/70 transition-all duration-200 ${
                            idx === item.links.length - 1 ? 'last:border-b-0' : ''
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/job-search"
              className="ml-2 text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 bg-[#EE7125] text-white hover:bg-[#FF8A40] transition-all duration-200 rounded-lg shadow-[0_0_20px_rgba(238,113,37,0.3)] hover:shadow-[0_0_30px_rgba(238,113,37,0.5)]"
            >
              SEARCH JOBS
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle mobile menu"
          >
            <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-[89px]" />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998] md:hidden"
            onClick={toggleMobileMenu}
          />
          <div
            className="fixed top-0 left-0 w-[320px] max-w-[90vw] h-screen bg-primary border-r border-white/10 z-[999] md:hidden overflow-y-auto flex flex-col"
            style={{ animation: 'slideInLeft 0.35s cubic-bezier(0.23, 1, 0.32, 1) forwards' }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <Link href="/" onClick={toggleMobileMenu} className="flex items-center gap-3">
                <Image
                  src="/images/icons/logo.8eb14c19.png"
                  alt="The Home Depot"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-text-primary text-[9px] font-bold tracking-widest uppercase opacity-60">The Home Depot</span>
                  <span className="text-[#EE7125] text-xs font-black tracking-widest uppercase">Careers</span>
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <ThemeSwitcher />
                <button
                  onClick={toggleMobileMenu}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-border-primary text-text-primary hover:border-[#EE7125] hover:text-[#EE7125] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile nav */}
            <nav className="flex-1 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-[#EE7125] border-b border-white/5"
                  onClick={toggleMobileMenu}
                >
                  <Briefcase className="w-5 h-5" />
                  Careers Main Page
                </Link>

              {navItems.map((item) => (
                <div key={item.key} className="border-b border-white/5">
                  <button
                    onClick={() => toggleMobileSubmenu(item.key)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-tertiary transition-colors"
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-[#EE7125] text-lg font-light transition-transform duration-200 ${
                        expandedMobileMenu === item.key ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {expandedMobileMenu === item.key && (
                    <div className="bg-tertiary pl-8 pr-5 pb-2" style={{ animation: 'slideDown 0.2s ease forwards' }}>
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={toggleMobileMenu}
                          className="block py-2.5 text-sm text-text-secondary hover:text-[#EE7125] transition-colors border-b border-border-primary last:border-0"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="border-b border-border-primary">
                <Link href="/job-search" className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-text-secondary hover:text-text-primary" onClick={toggleMobileMenu}>
                  <MapPin className="w-5 h-5 text-[#EE7125]" />
                  Search Jobs
                </Link>
              </div>
              <div className="border-b border-border-primary">
                <Link href="/applicant-login" className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-text-secondary hover:text-text-primary" onClick={toggleMobileMenu}>
                  <LogIn className="w-5 h-5 text-[#EE7125]" />
                  Applicant Login
                </Link>
              </div>
              <div className="border-b border-border-primary">
                <Link href="/accessibility" className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-text-secondary hover:text-text-primary" onClick={toggleMobileMenu}>
                  <Accessibility className="w-5 h-5 text-[#EE7125]" />
                  Accessibility
                </Link>
              </div>
            </nav>

            {/* Social icons */}
            <div className="p-5 border-t border-white/10 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#EE7125] hover:text-[#EE7125] transition-all duration-200 text-sm"
                >
                  {s.label === 'Facebook' && <Facebook className="w-4 h-4" />}
                  {s.label === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                  {s.label === 'Instagram' && <Instagram className="w-4 h-4" />}
                  {s.label === 'YouTube' && <Youtube className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;