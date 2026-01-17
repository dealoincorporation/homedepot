import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
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
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-base font-black uppercase tracking-wide">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link href="#" className="hover:text-orange-500 transition-colors duration-200 flex items-center gap-1">
            About Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link href="#" className="hover:text-orange-500 transition-colors duration-200 flex items-center gap-1">
            Career Areas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
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