'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FC } from 'react';

const RetailStoreRoles: FC = () => {
  const [expandedRole, setExpandedRole] = useState<string>('freight');

  const roles = [
    {
      id: 'freight',
      title: 'FREIGHT (OVERNIGHT) ASSOCIATES',
      description: 'Our Freight Team Associates are dedicated to working together to create a pleasant and healthy environment to shop and work in. Stocking the shelves to full capacity. Keeping the store neat and organized to create a safe space for customers to visit. Teamwork and commitment, that\'s what our team is about.'
    },
    {
      id: 'cashiers',
      title: 'CASHIERS',
      description: 'Cashiers provide excellent customer service by processing transactions efficiently and accurately, helping customers with their purchases, and maintaining a friendly, welcoming checkout experience.'
    },
    {
      id: 'department-supervisor',
      title: 'DEPARTMENT SUPERVISOR',
      description: 'Department Supervisors lead and support their teams to deliver exceptional customer service, manage daily operations, and ensure department goals are met while fostering a positive work environment.'
    },
    {
      id: 'kitchen-designers',
      title: 'KITCHEN DESIGNERS',
      description: 'Kitchen Designers help customers create their dream kitchens by providing expert design consultation, product recommendations, and project planning services.'
    },
    {
      id: 'appliance-sales',
      title: 'APPLIANCE SALES ASSOCIATES',
      description: 'Appliance Sales Associates assist customers in finding the perfect appliances for their homes, providing product knowledge, recommendations, and exceptional customer service.'
    },
    {
      id: 'sales-specialists',
      title: 'SALES SPECIALISTS',
      description: 'Sales Specialists provide expert guidance and product knowledge to help customers find the right solutions for their home improvement projects.'
    },
    {
      id: 'merchandising-execution',
      title: 'MERCHANDISING EXECUTION ASSOCIATES',
      description: 'Merchandising Execution Associates ensure products are properly displayed, organized, and stocked to create an optimal shopping experience for customers.'
    },
    {
      id: 'merchandising-supervisors',
      title: 'MERCHANDISING EXECUTION AREA SUPERVISORS',
      description: 'Merchandising Execution Area Supervisors lead teams to execute merchandising plans, maintain store standards, and ensure products are properly displayed and organized.'
    }
  ];

  const toggleRole = (id: string) => {
    setExpandedRole(expandedRole === id ? '' : id);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl">
          {roles.map((role, index) => (
            <div key={role.id} className={`border-b border-gray-300 ${index === 0 ? 'border-t border-gray-300' : ''}`}>
              <button
                onClick={() => toggleRole(role.id)}
                className="w-full flex items-center gap-4 py-6 text-left hover:bg-gray-50 transition-colors duration-200 group"
                aria-expanded={expandedRole === role.id}
              >
                {/* Orange/Red Circle with Plus/Minus Icon */}
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold text-lg leading-none transition-opacity duration-300">
                    {expandedRole === role.id ? '−' : '+'}
                  </span>
                </div>
                
                {/* Role Title */}
                <span className="flex-1 text-lg md:text-xl font-bold text-orange-600 uppercase tracking-wide">
                  {role.title}
                </span>
              </button>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedRole === role.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-12 pb-6 pr-4">
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-6">
                    {role.description}
                  </p>
                  <Link
                    href="#jobs"
                    className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold transition-colors duration-300 text-center rounded"
                  >
                    View current opportunities
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom CTA Button */}
          <div className="text-center mt-12">
            <Link
              href="#jobs"
              className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold transition-colors duration-300 rounded"
            >
              View open roles now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetailStoreRoles;
