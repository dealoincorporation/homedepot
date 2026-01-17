// Utility functions

import type { CareerArea, Store, CareerOption } from '@/types';

/**
 * Combines multiple class names into a single string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a store location string
 */
export function formatStoreLocation(location: string): string {
  return location.replace(/, ([A-Z]{2})$/, ' $1');
}

/**
 * Generates a unique key for React lists
 */
export function generateKey(prefix: string, id: string | number): string {
  return `${prefix}-${id}`;
}

/**
 * Checks if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http') || url.startsWith('//');
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Filters career areas by search term
 */
export function filterCareerAreas(areas: CareerArea[], searchTerm: string): CareerArea[] {
  if (!searchTerm) return areas;
  const term = searchTerm.toLowerCase();
  return areas.filter(area =>
    area.title.toLowerCase().includes(term) ||
    area.href.toLowerCase().includes(term)
  );
}

/**
 * Filters stores by location
 */
export function filterStoresByLocation(stores: Store[], location: string): Store[] {
  if (!location) return stores;
  const loc = location.toLowerCase();
  return stores.filter(store =>
    store.location.toLowerCase().includes(loc) ||
    store.name.toLowerCase().includes(loc)
  );
}

/**
 * Sorts career options alphabetically
 */
export function sortCareerOptions(options: CareerOption[]): CareerOption[] {
  return [...options].sort((a, b) => a.text.localeCompare(b.text));
}

/**
 * Gets the current page from pathname
 */
export function getCurrentPage(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  return segments[0] || 'home';
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Gets file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Checks if an image URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
  const extension = getFileExtension(url);
  return imageExtensions.includes(extension);
}