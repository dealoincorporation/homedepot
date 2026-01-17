// Main entry point for the modular codebase

// Export all types
export * from './types';

// Export all constants
export * from './constants';

// Export all utilities
export * from './utils';

// Export all hooks
export * from './hooks';

// Export all common components
export * from './components/common';

// Export library configurations
export * from './lib';

// Re-export Next.js components for convenience
export { default as Link } from 'next/link';
export { default as Image } from 'next/image';
export { default as Head } from 'next/head';

// Re-export React for convenience
export { default as React } from 'react';
export type { FC, ReactNode, CSSProperties, MouseEvent } from 'react';