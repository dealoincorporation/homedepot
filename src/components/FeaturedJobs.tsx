import Link from 'next/link';
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
    <div className="featuredJobsBoxes">
      <h2>Featured Jobs</h2>
      <div className="featuredJobsBoxesList">
        {featuredJobs.map((job) => (
          <Link key={job.href} href={job.href}>
            <img src={job.image} alt={`${job.title} Image`} />
            <div className="overlay-gradient">{job.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;