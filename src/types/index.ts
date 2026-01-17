// Shared TypeScript types and interfaces

export interface CareerArea {
  title: string;
  href: string;
  image: string;
}

export interface Store {
  id: number;
  name: string;
  location: string;
  href: string;
  hiddenOnMedium?: boolean;
}

export interface CareerOption {
  value: string;
  text: string;
}

export interface FeaturedJob {
  id: string;
  title: string;
  location: string;
  image: string;
  href: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface FooterColumn {
  title: string;
  links: Array<{
    text: string;
    href: string;
  }>;
}

// Component Props Types
export interface CardProps {
  title: string;
  href: string;
  image: string;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Theme and Styling Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Breakpoint {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}