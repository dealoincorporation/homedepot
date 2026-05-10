// Library configurations and shared utilities

// Font Awesome configuration
export const FONT_AWESOME_CONFIG = {
  kitUrl: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
};

// Image optimization settings
export const IMAGE_CONFIG = {
  domains: ['careers.homedepot.ca', 'homedepot.ca'],
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
};

// API configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  retries: 3
};

// Analytics configuration
export const ANALYTICS_CONFIG = {
  enabled: process.env.NODE_ENV === 'production',
  trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID
};

// Feature flags
export const FEATURES = {
  enableSearch: true,
  enableFilters: true,
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableDarkMode: false,
  enableMultiLanguage: false
};

// Validation rules
export const VALIDATION_RULES = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters'
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    message: 'Message must be between 10 and 1000 characters'
  }
};

// Cache configuration
export const CACHE_CONFIG = {
  defaultTtl: 300, // 5 minutes
  maxAge: 3600, // 1 hour
  staleWhileRevalidate: 60 // 1 minute
};

// SEO defaults
export const SEO_DEFAULTS = {
  title: 'Careers at The Home Depot Canada | Apply Now',
  description: 'Join The Home Depot Canada team! Discover a range of in-store, corporate, and distribution job opportunities near you.',
  keywords: 'jobs, careers, employment, retail, corporate, distribution',
  image: '/images/social_image.jpg',
  url: 'https://careers.homedepot.ca',
  type: 'website'
};