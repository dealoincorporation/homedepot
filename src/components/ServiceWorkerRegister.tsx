'use client';

import { useEffect } from 'react';

/**
 * Registers `/sw.js` in production only so `next dev` is not affected by caching.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV !== 'production') return;

    const ctrl = navigator.serviceWorker.controller;
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        if (ctrl) reg.update().catch(() => {});
      })
      .catch(() => {});
  }, []);

  return null;
}
