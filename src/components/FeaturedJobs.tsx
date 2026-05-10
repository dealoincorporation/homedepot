'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const featuredJobs = [
  {
    title: 'Data Entry',
    image: '/images/assistant-store-manager-fj.dd1dc314.webp',
    href: '/featured-jobs/data-entry',
    tag: 'Administrative',
    size: 'large',
  },
  {
    title: 'Payroll Clerk',
    image: '/images/cashier-fj.dd6cbaeb.webp',
    href: '/featured-jobs/payroll-clerk',
    tag: 'Finance',
    size: 'small',
  },
  {
    title: 'Customer Representative',
    image: '/images/department-supervisor-fj.33264519.webp',
    href: '/featured-jobs/customer-representative',
    tag: 'Customer Service',
    size: 'small',
  },
  {
    title: 'Virtual Assistant',
    image: '/images/freight-associate-fj.235589f6.webp',
    href: '/featured-jobs/virtual-assistant',
    tag: 'Remote-Friendly',
    size: 'small',
  },
];

const hrTeam = [
  { name: 'Hiring Manager', role: 'Recruitment Lead', img: '/images/hr.jpeg' },
  { name: 'HR Manager', role: 'Human Resources', img: '/images/hr_2.jpeg' },
  { name: 'HR Coordinator', role: 'Talent Acquisition', img: '/images/hr_3.jpeg' },
];

const FeaturedJobs: FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 opacity-0"
          style={{ animation: visible ? 'fadeUp 0.7s ease forwards' : 'none' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#EE7125]" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#EE7125] uppercase">Open Positions</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-none">
              FEATURED JOBS
            </h2>
          </div>
          <Link
            href="/job-search"
            className="group inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors"
          >
            View all positions
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Magazine-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-6">
          {/* Large hero card */}
          <Link
            href={featuredJobs[0].href}
            className="group relative col-span-2 row-span-2 aspect-square md:aspect-auto rounded-2xl overflow-hidden opacity-0"
            style={{ animation: visible ? 'scaleIn 0.6s ease 0.1s forwards' : 'none' }}
          >
            <Image
              src={featuredJobs[0].image}
              alt={featuredJobs[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute inset-0 bg-[#EE7125]/0 group-hover:bg-[#EE7125]/10 transition-all duration-500" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#EE7125] uppercase mb-2">
                {featuredJobs[0].tag}
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-white leading-none mb-3">
                {featuredJobs[0].title.toUpperCase()}
              </h3>
              <div className="inline-flex items-center gap-2 bg-[#EE7125] text-white text-xs font-bold px-4 py-2 rounded-lg w-fit opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Apply Now
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EE7125] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>

          {/* Smaller cards */}
          {featuredJobs.slice(1).map((job, i) => (
            <Link
              key={job.href}
              href={job.href}
              className="group relative aspect-square rounded-2xl overflow-hidden opacity-0"
              style={{ animation: visible ? `scaleIn 0.5s ease ${0.2 + i * 0.1}s forwards` : 'none' }}
            >
              <Image
                src={job.image}
                alt={job.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
              <div className="absolute inset-0 bg-[#EE7125]/0 group-hover:bg-[#EE7125]/10 transition-all duration-300" />

              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="text-[9px] font-bold tracking-widest text-[#EE7125] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {job.tag}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white uppercase leading-tight">
                  {job.title}
                </h3>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE7125] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </Link>
          ))}
        </div>

        {/* HR Contact panel */}
        <div
          className="relative rounded-2xl overflow-hidden bg-secondary border border-border-primary p-6 md:p-10 opacity-0"
          style={{ animation: visible ? 'fadeUp 0.7s ease 0.5s forwards' : 'none' }}
        >
          {/* Orange top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EE7125] to-transparent" />

          <div className="mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-none mb-1">
              CONTACT OUR HIRING TEAM
            </h2>
            <div className="h-px bg-border-primary w-full mt-4" />
          </div>

          {/* HR team grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            {hrTeam.map((person, i) => (
              <div
                key={person.name}
                className="group flex flex-col items-start gap-4"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#EE7125]/50 transition-colors duration-300">
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary mb-0.5">{person.name}</h3>
                  <p className="text-sm text-text-muted font-medium">{person.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border-primary">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#EE7125] uppercase mb-2">Email</p>
              <a href="mailto:support@thehomedepott.com" className="text-sm text-white/70 hover:text-white transition-colors break-all">
                support@thehomedepott.com
              </a>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-[#EE7125] uppercase mb-2">Phone</p>
              <p className="text-sm text-text-muted">To Be Updated</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-[#EE7125] uppercase mb-2">International</p>
              <p className="text-sm text-text-muted">To Be Updated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;