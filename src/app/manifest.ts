import type { MetadataRoute } from 'next';

const ICON = '/logo.avif';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Home Depot Canada Careers',
    short_name: 'THD Careers',
    description:
      'Discover in-store, corporate, and distribution career opportunities at The Home Depot Canada.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#111111',
    theme_color: '#111111',
    lang: 'en',
    categories: ['business'],
    icons: [
      {
        src: ICON,
        sizes: '192x192',
        type: 'image/avif',
        purpose: 'any',
      },
      {
        src: ICON,
        sizes: '512x512',
        type: 'image/avif',
        purpose: 'any',
      },
      {
        src: ICON,
        sizes: '512x512',
        type: 'image/avif',
        purpose: 'maskable',
      },
    ],
  };
}
