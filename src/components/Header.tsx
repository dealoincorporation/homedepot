import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      {/* Top utility bar */}
      <div className="bg-black text-white text-xs py-2 px-4 md:px-8 hidden md:block">
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
        <div
          ref={dropdownRef}
          className="hidden md:flex items-center gap-8 lg:gap-10 text-base font-black uppercase tracking-wide relative"
        >
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-500 transition-colors duration-200"
          >
            Home
          </Link>

          {/* About Us Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('about')}
              className="hover:text-orange-500 transition-colors duration-200 flex items-center gap-1"
            >
              About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-black border border-white/20 rounded-md shadow-lg z-50">
                <Link
                  href="/about/company"
                  className="block px-4 py-3 text-white hover:bg-white/10 border-b border-white/20 transition-colors"
                  onClick={closeDropdown}
                >
                  Company Overview
                </Link>
                <Link
                  href="/about/history"
                  className="block px-4 py-3 text-white hover:bg-white/10 border-b border-white/20 transition-colors"
                  onClick={closeDropdown}
                >
                  Our History
                </Link>
                <Link
                  href="/about/leadership"
                  className="block px-4 py-3 text-white hover:bg-white/10 border-b border-white/20 transition-colors"
                  onClick={closeDropdown}
                >
                  Leadership Team
                </Link>
                <Link
                  href="/about/culture"
                  className="block px-4 py-3 text-white hover:bg-white/10 transition-colors"
                  onClick={closeDropdown}
                >
                  Our Culture
                </Link>
              </div>
            )}
          </div>

          {/* Career Areas Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('careers')}
              className="hover:text-orange-500 transition-colors duration-200 flex items-center gap-1"
            >
              Career Areas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'careers' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-black border border-white/20 rounded-md shadow-lg z-50">
                <Link
                  href="/career-areas/retail-store-opportunities"
                  className="block px-4 py-3 text-white hover:bg-white/10 border-b border-white/20 transition-colors"
                  onClick={closeDropdown}
                >
                  Retail Store Opportunities
                </Link>
                <Link
                  href="/career-areas/field"
                  className="block px-4 py-3 text-white hover:bg-white/10 border-b border-white/20 transition-colors"
                  onClick={closeDropdown}
                >
                  Field Opportunities
                </Link>
                <Link
                  href="/career-areas/corporate-opportunities"
                  className="block px-4 py-3 text-white hover:bg-white/10 border-b border-white/20 transition-colors"
                  onClick={closeDropdown}
                >
                  Corporate Careers
                </Link>
                <Link
                  href="/career-areas/early-talent"
                  className="block px-4 py-3 text-white hover:bg-white/10 transition-colors"
                  onClick={closeDropdown}
                >
                  Early Talent Program
                </Link>
              </div>
            )}
          </div>

          <Link href="#" className="hover:text-orange-500 transition-colors duration-200 flex items-center gap-1">
            Featured Jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
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