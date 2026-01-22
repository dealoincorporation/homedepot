import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';

const FeaturedJobs: FC = () => {
  const featuredJobs = [
    {
      title: "Assistant Store Manager",
      image: "/images/assistant-store-manager-fj.dd1dc314.webp",
      href: "/featured-jobs/assistant-store-manager"
    },
    {
      title: "Cashier",
      image: "/images/cashier-fj.dd6cbaeb.webp",
      href: "/featured-jobs/cashier"
    },
    {
      title: "Department Supervisor",
      image: "/images/department-supervisor-fj.33264519.webp",
      href: "/featured-jobs/department-supervisor"
    },
    {
      title: "Freight Associate",
      image: "/images/freight-associate-fj.235589f6.webp",
      href: "/featured-jobs/freight-associate"
    },
    {
      title: "Human Resources Manager",
      image: "/images/human-resources-manager-fj.725c463c.webp",
      href: "/featured-jobs/human-resources-manager"
    },
    {
      title: "Lot Associate",
      image: "/images/lot-associate-fj.833ed9cf.webp",
      href: "/featured-jobs/lot-associate"
    },
    {
      title: 'Merchandising "MET" Associate',
      image: "/images/merchandising-met-associate-fj.54d6df36.webp",
      href: "/featured-jobs/merchandising-met-associate"
    },
    {
      title: "Order Picker",
      image: "/images/order-picker-fj.6c712e3d.webp",
      href: "/featured-jobs/order-picker"
    }
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-10 md:mb-12 uppercase tracking-tight">
          Featured Jobs
        </h2>

        {/* Grid Layout - 2x4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {featuredJobs.map((job) => (
            <Link
              key={job.href}
              href={job.href}
              className="group relative block aspect-square overflow-hidden border border-black shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={job.image}
                  alt={`${job.title} Image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                />
                
                {/* Gradient Overlay - Bottom Left */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Job Title - Bottom Left */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h3 className="text-white text-base md:text-lg lg:text-xl font-bold uppercase leading-tight tracking-tight">
                    {job.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;