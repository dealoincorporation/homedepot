'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openDropdown = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setExpandedMobileMenu(null);
    }
  };

  const toggleMobileSubmenu = (menu: string) => {
    setExpandedMobileMenu(expandedMobileMenu === menu ? null : menu);
  };

  return (
    <header 
      className={`header-bg text-white z-50 shadow-md transition-all duration-300 ${
        isScrolled ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
      }`}
    >
      {/* Top utility bar */}
      <div 
        className={`header-bg text-white text-[10px] py-2 px-4 md:px-8 transition-all duration-300 ${
          isScrolled ? 'hidden' : 'hidden md:block'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-2">
          <Link href="#" className="hover:underline transition-colors text-white">
            ACCESSIBILITY
          </Link>
          <span className="text-white">|</span>
          <Link href="/applicant-login" className="hover:underline transition-colors text-white">
            APPLICANT LOGIN
          </Link>
          <span className="text-white">|</span>
          <Link href="#" className="hover:underline transition-colors text-white">
            CURRENT ASSOCIATES
          </Link>
          <span className="text-white">|</span>
          <Link
            href="#"
            className="border border-black bg-white text-black px-2.5 py-1 hover:bg-gray-100 transition-colors"
          >
            FRANÇAIS
          </Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20 sm:h-24">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/icons/logo.8eb14c19.png"
              alt="The Home Depot Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-black uppercase tracking-wide relative">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-500 transition-colors duration-200 font-black"
          >
            HOME
          </Link>

          {/* About Us Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => openDropdown('about')}
            onMouseLeave={closeDropdown}
          >
            <button
              className="text-white hover:text-orange-500 transition-colors duration-200 flex items-center gap-1 font-black"
            >
              ABOUT US
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'about' && (
              <div 
                className="absolute top-full left-0 pt-2 w-64 z-[100]"
                onMouseEnter={() => openDropdown('about')}
                onMouseLeave={closeDropdown}
              >
                <div className="bg-[#212529] shadow-lg overflow-hidden">
                  <Link
                    href="/about/career-benefits"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                  >
                    Career Growth
                  </Link>
                  <Link
                    href="/about/our-benefits"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                  >
                    Our Benefits
                  </Link>
                  <Link
                    href="/about/culture"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                  >
                    Our Culture
                  </Link>
                  <Link
                    href="/about/social-responsibility"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold"
                  >
                    Social Responsibility
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Career Areas Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => openDropdown('careers')}
            onMouseLeave={closeDropdown}
          >
            <button
              className="text-white hover:text-orange-500 transition-colors duration-200 flex items-center gap-1 font-black"
            >
              CAREER AREAS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'careers' && (
              <div 
                className="absolute top-full left-0 pt-2 w-64 z-[100]"
                onMouseEnter={() => openDropdown('careers')}
                onMouseLeave={closeDropdown}
              >
                <div className="bg-[#212529] shadow-lg overflow-hidden">
                  <Link
                    href="/career-areas/corporate-opportunities"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                  >
                    Corporate
                  </Link>
                  <Link
                    href="/career-areas/early-talent"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                  >
                    Early Talent
                  </Link>
                  <Link
                    href="/career-areas/field"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                  >
                    Field
                  </Link>
                  <Link
                    href="/career-areas/retail-management"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                  >
                    Retail Management
                  </Link>
                  <Link
                    href="/career-areas/retail-store-opportunities"
                    className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold"
                  >
                    Retail Store
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Featured Jobs Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => openDropdown('featured')}
            onMouseLeave={closeDropdown}
          >
            <button
              className="text-white hover:text-orange-500 transition-colors duration-200 flex items-center gap-1 font-black"
            >
              FEATURED JOBS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'featured' && (
              <div 
                className="absolute top-full left-0 pt-2 w-64 z-[100]"
                onMouseEnter={() => openDropdown('featured')}
                onMouseLeave={closeDropdown}
              >
                <div className="bg-[#212529] shadow-lg overflow-hidden">
                <Link
                  href="/featured-jobs/data-entry"
                  className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                >
                  Data Entry
                </Link>
                <Link
                  href="/featured-jobs/payroll-clerk"
                  className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                >
                  Payroll Clerk
                </Link>
                <Link
                  href="/featured-jobs/customer-representative"
                  className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                >
                  Customer Representative
                </Link>
                <Link
                  href="/featured-jobs/virtual-assistant"
                  className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                >
                  Virtual Assistant
                </Link>
                <Link
                  href="/featured-jobs/merchandising-met-associate"
                  className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                >
                  Merchandising "MET" Associate
                </Link>
                <Link
                  href="/featured-jobs/order-picker"
                  className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                >
                  Order Picker
                </Link>
                <Link
                  href="/featured-jobs/receiving-associate"
                  className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold border-b border-white/10"
                >
                  Receiving Associate
                </Link>
                <Link
                  href="/featured-jobs/sales-associate"
                  className="block px-4 py-3 text-white text-left hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out hover:translate-x-2 normal-case font-bold"
                >
                  Sales Associate
                </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/job-search"
            className="text-white hover:text-orange-500 transition-colors duration-200 font-black uppercase"
          >
            SEARCH JOBS
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-white text-2xl focus:outline-none focus:text-orange-500"
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[999] md:hidden"
            onClick={toggleMobileMenu}
          />
          <div className="mobile-menu-panel md:hidden">
            {/* Mobile Menu Header */}
            <div className="mobile-menu-header">
              <Link href="/" className="mobile-menu-logo" onClick={toggleMobileMenu}>
                <Image
                  src="/images/icons/logo.8eb14c19.png"
                  alt="The Home Depot Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-close"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className="mobile-menu-nav">
              <Link href="/" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-home mobile-menu-icon"></i>
                <span>Careers Main Page</span>
              </Link>

              <div className="mobile-menu-item-container">
                <button
                  onClick={() => toggleMobileSubmenu('about')}
                  className="mobile-menu-item mobile-menu-expandable"
                >
                  <i className="fas fa-building mobile-menu-icon"></i>
                  <span>About Us</span>
                  <span className="mobile-menu-expand-icon">{expandedMobileMenu === 'about' ? '−' : '+'}</span>
                </button>
                {expandedMobileMenu === 'about' && (
                  <div className="mobile-submenu">
                    <Link href="/about/career-benefits" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Career Growth
                    </Link>
                    <Link href="/about/our-benefits" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Our Benefits
                    </Link>
                    <Link href="/about/culture" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Our Culture
                    </Link>
                    <Link href="/about/social-responsibility" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Social Responsibility
                    </Link>
                  </div>
                )}
              </div>

              <div className="mobile-menu-item-container">
                <button
                  onClick={() => toggleMobileSubmenu('careers')}
                  className="mobile-menu-item mobile-menu-expandable"
                >
                  <i className="fas fa-briefcase mobile-menu-icon"></i>
                  <span>Career Areas</span>
                  <span className="mobile-menu-expand-icon">{expandedMobileMenu === 'careers' ? '−' : '+'}</span>
                </button>
                {expandedMobileMenu === 'careers' && (
                  <div className="mobile-submenu">
                    <Link href="/career-areas/corporate-opportunities" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Corporate
                    </Link>
                    <Link href="/career-areas/early-talent" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Early Talent
                    </Link>
                    <Link href="/career-areas/field" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Field
                    </Link>
                    <Link href="/career-areas/retail-management" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Retail Management
                    </Link>
                    <Link href="/career-areas/retail-store-opportunities" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Retail Store
                    </Link>
                  </div>
                )}
              </div>

              <div className="mobile-menu-item-container">
                <button
                  onClick={() => toggleMobileSubmenu('featured')}
                  className="mobile-menu-item mobile-menu-expandable"
                >
                  <i className="fas fa-user mobile-menu-icon"></i>
                  <span>Featured Jobs</span>
                  <span className="mobile-menu-expand-icon">{expandedMobileMenu === 'featured' ? '−' : '+'}</span>
                </button>
                {expandedMobileMenu === 'featured' && (
                  <div className="mobile-submenu">
                    <Link href="/featured-jobs/data-entry" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Data Entry
                    </Link>
                    <Link href="/featured-jobs/payroll-clerk" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Payroll Clerk
                    </Link>
                    <Link href="/featured-jobs/customer-representative" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Customer Representative
                    </Link>
                    <Link href="/featured-jobs/virtual-assistant" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Virtual Assistant
                    </Link>
                    <Link href="/featured-jobs/merchandising-met-associate" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Merchandising "MET" Associate
                    </Link>
                    <Link href="/featured-jobs/order-picker" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Order Picker
                    </Link>
                    <Link href="/featured-jobs/receiving-associate" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Receiving Associate
                    </Link>
                    <Link href="/featured-jobs/sales-associate" className="mobile-submenu-item" onClick={toggleMobileMenu}>
                      Sales Associate
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/job-search" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-search mobile-menu-icon"></i>
                <span>Search Jobs</span>
              </Link>

              <Link href="/jobs-map" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-map-marker-alt mobile-menu-icon"></i>
                <span>View Jobs on a Map</span>
              </Link>

              <Link href="/career-events" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-calendar-alt mobile-menu-icon"></i>
                <span>Career Events</span>
              </Link>

              <Link href="/jobs-by-location" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-map-pin mobile-menu-icon"></i>
                <span>Jobs By Location</span>
              </Link>

              <Link href="/saved-jobs" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-bookmark mobile-menu-icon"></i>
                <span>Saved Jobs</span>
              </Link>

              <Link href="/applicant-login" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-sign-in-alt mobile-menu-icon"></i>
                <span>Applicant Login</span>
              </Link>

              <Link href="/current-associates" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-users mobile-menu-icon"></i>
                <span>Current Associates</span>
              </Link>

              <Link href="/accessibility" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-universal-access mobile-menu-icon"></i>
                <span>Accessibility</span>
              </Link>

              <Link href="/fr" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <i className="fas fa-language mobile-menu-icon"></i>
                <span>Version Française</span>
              </Link>
            </nav>

            {/* Social Media Icons */}
            <div className="mobile-menu-social">
              <a href="#" className="mobile-social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="mobile-social-icon" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="mobile-social-icon" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="mobile-social-icon" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;