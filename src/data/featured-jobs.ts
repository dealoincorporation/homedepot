export interface FeaturedJobData {
  title: string;
  heroTitle: string;
  featuredJobLabel: string;
  roleOverview: string;
  whyJoin: {
    title: string;
    benefits: string[];
  };
  aboutRole: string;
  whatYoullDo: string[];
  typicalDay?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  preferredQualifications?: string[];
  whatWereLookingFor?: string[];
}

export const featuredJobsData: Record<string, FeaturedJobData> = {
  'assistant-store-manager': {
    title: 'Assistant Store Manager',
    heroTitle: `Assistant Store Manager
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Assistant Store Manager Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `As an Assistant Store Manager (ASM), you'll be a key leader in driving store performance and delivering an exceptional customer experience. You'll coach and develop associates, solve problems, and help implement strategies that support sales and operational excellence.`,
    whatYoullDo: [
      'Lead and coach associates to deliver outstanding customer service',
      'Collaborate with the Store Manager to set goals and drive performance',
      'Analyze sales and inventory reports to identify trends and opportunities',
      'Ensure departments are properly staffed and scheduled to meet customer demand',
      'Support store events and promotions',
      'Provide feedback and career development guidance to associates',
      'Maintain safety standards and respond to emergencies appropriately',
      'Oversee daily operations including opening/closing procedures, markdowns, and deliveries',
    ],
    typicalDay: [
      'Meet with the Customer Experience Manager (CXM) to review store priorities',
      'Walk the store to ensure safety and readiness',
      'Review operational reports to identify areas for improvements',
      'Provide real-time coaching and feedback to associates',
      'Support customer needs and resolve issues efficiently',
    ],
    whatWereLookingFor: [
      'Minimum 2 years of management experience',
      'Strong customer service and communication skills',
      'Proficiency with computers and reporting tools',
      'Analytical mindset and problem-solving ability',
      'Team-oriented with a strong work ethic',
      'Attention to detail and commitment to confidentiality',
      'Must meet internal performance standards and time-in-position requirements',
    ],
  },
  'cashier': {
    title: 'Cashier',
    heroTitle: `Cashier
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Cashier Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Cashiers are the face of The Home Depot, providing fast, friendly, and accurate service to our customers. They ensure a safe and organized checkout area and assist customers with transactions, questions, and locating products. As a cashier you are our first and last line of defense in ensuring that they have a positive shopping experience.`,
    whatYoullDo: [
      'Ensure every item is scanned and payment is processed accurately',
      'Monitor and maintain the Self-Checkout area',
      'Maintain inventory accuracy and follow all store policies',
      'Achieve daily cashier performance metrics',
      'Stay informed about store promotions and rebates',
      'Lift and organize merchandise for customer pick-up',
      'Use computer terminals or portable devices to check inventory and notify customers',
      'Support a clean, safe, and organized checkout area',
    ],
    faq: [
      {
        question: "What is a Cashier's job?",
        answer: 'Cashiers process checkout and return transactions, monitor the self-checkout area, scan items, handle payments, and thank customers.',
      },
      {
        question: 'Does the role require heavy lifting?',
        answer: 'Some lifting may be required during checkout to ensure items are processed correctly.',
      },
      {
        question: "How much interaction does a Cashier have with customers?",
        answer: 'Cashiers regularly interact with customers to ensure a positive shopping and checkout experience.',
      },
      {
        question: 'Is the work schedule consistent?',
        answer: 'Yes, full-time Cashiers have consistent schedules with morning, afternoon, and evening shifts available. Schedules are provided in advance.',
      },
    ],
    preferredQualifications: [
      'Excellent customer service skills',
      'Previous cashier experience is an asset',
      'Strong decision-making and problem-solving abilities',
      'Ability to work flexible schedules including evenings and weekends',
    ],
  },
  'department-supervisor': {
    title: 'Department Supervisor',
    heroTitle: `Department Supervisor
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Department Supervisor Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `As a Department Supervisor, you'll lead a team of associates in delivering exceptional customer service and driving department performance. You'll be responsible for managing inventory, training associates, and ensuring your department meets sales and operational goals.`,
    whatYoullDo: [
      'Lead and develop a team of department associates',
      'Manage inventory levels and ensure product availability',
      'Train associates on product knowledge and customer service',
      'Drive sales and meet department performance goals',
      'Maintain a clean, safe, and organized department',
      'Resolve customer issues and provide exceptional service',
      'Coordinate with other departments and store management',
    ],
    whatWereLookingFor: [
      'Previous retail or supervisory experience',
      'Strong leadership and communication skills',
      'Ability to work flexible schedules',
      'Customer-focused mindset',
      'Problem-solving and decision-making abilities',
    ],
  },
  'freight-associate': {
    title: 'Freight Associate',
    heroTitle: `Freight Associate
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Freight Associate Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Freight Associates are essential to keeping our stores stocked and ready for customers. You'll unload trucks, organize merchandise, and ensure products are properly displayed and available for customers.`,
    whatYoullDo: [
      'Unload merchandise from delivery trucks',
      'Organize and stock products in designated areas',
      'Operate equipment such as forklifts and pallet jacks',
      'Maintain inventory accuracy',
      'Work efficiently in a fast-paced environment',
      'Follow safety procedures and guidelines',
      'Assist with store opening and closing procedures',
    ],
    whatWereLookingFor: [
      'Ability to lift heavy items (up to 50 lbs)',
      'Previous warehouse or freight experience preferred',
      'Forklift certification is an asset',
      'Strong attention to detail',
      'Ability to work early morning or overnight shifts',
    ],
  },
  'human-resources-manager': {
    title: 'Human Resources Manager',
    heroTitle: `Human Resources Manager
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Human Resources Manager Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `As a Human Resources Manager, you'll play a key role in supporting our associates and driving our people strategy. You'll handle recruitment, employee relations, training, and ensure compliance with employment laws and company policies.`,
    whatYoullDo: [
      'Manage recruitment and hiring processes',
      'Support employee relations and conflict resolution',
      'Develop and deliver training programs',
      'Ensure compliance with employment laws and regulations',
      'Manage benefits administration',
      'Support performance management processes',
      'Maintain accurate HR records and documentation',
    ],
    whatWereLookingFor: [
      "Bachelor's degree in HR or related field",
      '3+ years of HR management experience',
      'Strong knowledge of employment law',
      'Excellent communication and interpersonal skills',
      'CHRP designation preferred',
    ],
  },
  'lot-associate': {
    title: 'Lot Associate',
    heroTitle: `Lot Associate
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Lot Associate Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Lot Associates are the first point of contact for customers arriving at our stores. You'll assist customers with loading purchases, maintain the parking lot and store entrance, and provide exceptional customer service.`,
    whatYoullDo: [
      'Assist customers with loading purchases into vehicles',
      'Maintain a clean and organized parking lot',
      'Provide directions and answer customer questions',
      'Monitor shopping carts and ensure availability',
      'Follow safety procedures when handling merchandise',
      'Work in various weather conditions',
      'Support store security and loss prevention efforts',
    ],
    whatWereLookingFor: [
      'Excellent customer service skills',
      'Ability to lift heavy items (up to 50 lbs)',
      'Comfortable working outdoors in all weather conditions',
      'Friendly and approachable demeanor',
      'Ability to work flexible schedules',
    ],
  },
  'merchandising-met-associate': {
    title: 'Merchandising MET Associate',
    heroTitle: `Merchandising MET Associate
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Merchandising MET Associate Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Merchandising Execution Team (MET) Associates ensure our products are properly displayed, priced, and organized. You'll work with a team to set up displays, maintain planograms, and ensure the store looks its best for customers.`,
    whatYoullDo: [
      'Set up and maintain product displays according to planograms',
      'Install and update pricing and signage',
      'Organize and restock merchandise',
      'Work with store associates to ensure proper product placement',
      'Maintain display standards and visual merchandising',
      'Assist with store resets and remodels',
      'Ensure products are properly labeled and priced',
    ],
    whatWereLookingFor: [
      'Attention to detail and organizational skills',
      'Ability to read and follow planograms',
      'Previous retail or merchandising experience preferred',
      'Ability to work early morning shifts',
      'Physical ability to lift and move merchandise',
    ],
  },
  'order-picker': {
    title: 'Order Picker',
    heroTitle: `Order Picker
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Order Picker Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Order Pickers are responsible for accurately selecting and preparing customer orders for pickup or delivery. You'll work in our distribution centers or stores to fulfill online and in-store orders efficiently.`,
    whatYoullDo: [
      'Pick and pack customer orders accurately',
      'Use handheld devices to locate and verify products',
      'Prepare orders for customer pickup or delivery',
      'Maintain inventory accuracy',
      'Operate equipment such as forklifts and pallet jacks',
      'Work efficiently to meet productivity goals',
      'Follow safety procedures and quality standards',
    ],
    whatWereLookingFor: [
      'Ability to lift heavy items (up to 50 lbs)',
      'Attention to detail and accuracy',
      'Previous warehouse or order fulfillment experience preferred',
      'Ability to work in a fast-paced environment',
      'Forklift certification is an asset',
    ],
  },
  'receiving-associate': {
    title: 'Receiving Associate',
    heroTitle: `Receiving Associate
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Receiving Associate Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Receiving Associates are responsible for processing incoming shipments, verifying deliveries, and ensuring merchandise is properly received and documented. You'll work closely with vendors and store teams to maintain inventory accuracy.`,
    whatYoullDo: [
      'Receive and verify incoming shipments',
      'Check merchandise against purchase orders',
      'Document and process receiving paperwork',
      'Organize received merchandise for stocking',
      'Operate receiving equipment and tools',
      'Maintain accurate inventory records',
      'Coordinate with vendors and store departments',
    ],
    whatWereLookingFor: [
      'Attention to detail and accuracy',
      'Ability to lift heavy items',
      'Previous receiving or warehouse experience preferred',
      'Strong organizational skills',
      'Ability to work flexible schedules',
    ],
  },
  'sales-associate': {
    title: 'Sales Associate',
    heroTitle: `Sales Associate
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Sales Associate Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Sales Associates are product experts who help customers find the right solutions for their projects. You'll provide knowledgeable assistance, answer questions, and ensure customers have everything they need for their home improvement projects.`,
    whatYoullDo: [
      'Assist customers with product selection and questions',
      'Provide expert advice on home improvement projects',
      'Maintain product knowledge and stay current on promotions',
      'Process sales transactions and handle returns',
      'Maintain department organization and cleanliness',
      'Build relationships with customers',
      'Support store sales goals and initiatives',
    ],
    whatWereLookingFor: [
      'Excellent customer service skills',
      'Interest in home improvement and DIY projects',
      'Strong communication and interpersonal skills',
      'Ability to learn product knowledge quickly',
      'Ability to work flexible schedules including evenings and weekends',
    ],
  },
};
