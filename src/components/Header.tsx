'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const openDropdown = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="header-bg text-white sticky top-0 z-50 shadow-md">
      {/* Top utility bar */}
      <div className="header-bg text-white text-xs py-2 px-4 md:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-3">
          <Link href="#" className="hover:underline transition-colors">
            ACCESSIBILITY
          </Link>
          <span className="text-white/60">|</span>
          <Link href="#" className="hover:underline transition-colors">
            APPLICANT LOGIN
          </Link>
          <span className="text-white/60">|</span>
          <Link href="#" className="hover:underline transition-colors">
            CURRENT ASSOCIATES
          </Link>
          <span className="text-white/60">|</span>
          <Link
            href="#"
            className="border border-white/40 px-2.5 py-1 rounded hover:bg-white/10 transition-colors"
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
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-base font-black uppercase tracking-wide relative">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-500 transition-colors duration-200"
          >
            Home
          </Link>

          {/* About Us Dropdown */}
          <div className="relative">
            <button
              onClick={() => activeDropdown === 'about' ? closeDropdown() : openDropdown('about')}
              className="hover:text-orange-500 transition-colors duration-200 flex items-center gap-1"
            >
              ABOUT US
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 mt-2 w-64 header-bg shadow-lg z-[100]">
                <Link
                  href="/about/career-benefits"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Career Benefits
                </Link>
                <Link
                  href="/about/our-benefits"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Our Benefits
                </Link>
                <Link
                  href="/about/culture"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Our Culture
                </Link>
                <Link
                  href="/about/social-responsibility"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Social Responsibility
                </Link>
              </div>
            )}
          </div>

          {/* Career Areas Dropdown */}
          <div className="relative">
            <button
              onClick={() => activeDropdown === 'careers' ? closeDropdown() : openDropdown('careers')}
              className="hover:text-orange-500 transition-colors duration-200 flex items-center gap-1"
            >
              CAREER AREAS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'careers' && (
              <div className="absolute top-full left-0 mt-2 w-64 header-bg shadow-lg z-[100]">
                <Link
                  href="/career-areas/corporate-opportunities"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Corporate
                </Link>
                <Link
                  href="/career-areas/early-talent"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Early Talent
                </Link>
                <Link
                  href="/career-areas/field"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Field
                </Link>
                <Link
                  href="/career-areas/retail-management"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Retail Management
                </Link>
                <Link
                  href="/career-areas/retail-store-opportunities"
                  className="block px-4 py-3 text-white hover:text-white transition-all duration-300 ease-in-out hover:underline bg-transparent focus:outline-none normal-case font-normal"
                  style={{'--tw-hover-bg-opacity': '1'} as any}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Retail Store
                </Link>
              </div>
            )}
          </div>

          {/* Featured Jobs Dropdown */}
          <div className="relative">
            <button
              onClick={() => activeDropdown === 'featured' ? closeDropdown() : openDropdown('featured')}
              className="hover:text-orange-500 transition-colors duration-200 flex items-center gap-1"
            >
              FEATURED JOBS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'featured' && (
              <div className="absolute top-full left-0 mt-2 w-64 header-bg shadow-lg z-[100]">
                <Link
                  href="/featured-jobs/management"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Management Positions
                </Link>
                <Link
                  href="/featured-jobs/technical"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Technical Roles
                </Link>
                <Link
                  href="/featured-jobs/seasonal"
                  className="block px-4 py-3 text-white text-left hover:text-white border-b-2 border-white/20 transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Seasonal Opportunities
                </Link>
                <Link
                  href="/featured-jobs/entry-level"
                  className="block px-4 py-3 text-white hover:text-white transition-all duration-300 ease-in-out hover:underline hover:translate-x-1 bg-transparent focus:outline-none normal-case font-normal"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6600'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Entry Level Positions
                </Link>
              </div>
            )}
          </div>
          <Link
            href="#"
            className="text-white hover:text-orange-500 px-5 py-2.5 rounded-md transition-colors duration-200 font-black uppercase"
          >
            Search Jobs
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white text-2xl focus:outline-none focus:text-orange-500">
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Header;