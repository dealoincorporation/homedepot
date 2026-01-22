'use client';

import { useState } from 'react';
import type { FC } from 'react';

const OurBenefitsContent: FC = () => {
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);

  const benefits = [
    {
      id: 'health',
      title: 'HEALTH BENEFITS',
      content: 'Comprehensive health coverage including medical, dental, and vision benefits for you and your eligible dependents.'
    },
    {
      id: 'maternity',
      title: 'MATERNITY AND PARENTAL LEAVE TOP UP (SALARIED ASSOCIATES)',
      content: 'Enhanced maternity and parental leave benefits with top-up payments for salaried associates to support you during this important time.'
    },
    {
      id: 'bonus',
      title: 'BONUS PLAN',
      content: 'Performance-based bonus opportunities that reward your hard work and contributions to our success.'
    },
    {
      id: 'stock',
      title: 'EMPLOYEE STOCK PURCHASE',
      content: 'Opportunity to purchase company stock at a discounted rate, allowing you to share in our success and build long-term wealth.'
    },
    {
      id: 'timeoff',
      title: 'TIME OFF BENEFITS',
      content: 'Generous paid time off including vacation days, personal days, and holidays to help you maintain a healthy work-life balance.'
    },
    {
      id: 'tuition',
      title: 'TUITION REIMBURSEMENT',
      content: 'Financial support for continuing education and professional development to help you grow your skills and advance your career.'
    },
    {
      id: 'retirement',
      title: 'RETIREMENT PLANS',
      content: 'Comprehensive retirement savings plans including RRSP matching to help you build a secure financial future.'
    },
    {
      id: 'care',
      title: 'CARE PROGRAM',
      content: 'Employee assistance and wellness programs designed to support your physical, mental, and emotional well-being.'
    }
  ];

  const toggleBenefit = (id: string) => {
    setExpandedBenefit(expandedBenefit === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-sm md:text-base font-normal text-gray-500 uppercase tracking-wide mb-2">
            About Us
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8">
            CARING FOR OUR ASSOCIATES
          </h1>
        </div>

        {/* Introductory Text */}
        <div className="mb-12 max-w-4xl">
          <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-6">
            Taking care of our associates and their families is core to who we are. That's why The Home Depot Canada offers a total value benefits package for permanent and eligible part-time associates as part of our total compensation package. From health and financial benefits to paid time off and tuition reimbursement, we're committed to supporting your well-being and growth, at work and beyond.
          </p>
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            Learn more about the benefits offered and discover how we help you build a rewarding future for yourself and your eligible dependents and spouses.
          </p>
        </div>

        {/* Benefits List */}
        <div className="max-w-4xl">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className="border-b border-gray-300 last:border-b-0">
              <button
                onClick={() => toggleBenefit(benefit.id)}
                className="w-full flex items-center gap-4 py-6 text-left hover:bg-gray-50 transition-colors duration-200 group"
                aria-expanded={expandedBenefit === benefit.id}
              >
                {/* Orange Circle with Plus/Minus Icon */}
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <span className="text-white font-bold text-lg leading-none">
                    {expandedBenefit === benefit.id ? '−' : '+'}
                  </span>
                </div>
                
                {/* Benefit Title */}
                <span className="flex-1 text-lg md:text-xl font-bold text-orange-600 uppercase tracking-wide">
                  {benefit.title}
                </span>
              </button>

              {/* Expanded Content */}
              {expandedBenefit === benefit.id && (
                <div className="pl-12 pb-6 pr-4">
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                    {benefit.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBenefitsContent;
