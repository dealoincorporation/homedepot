'use client';

import OurCultureHero from '@/components/about/OurCultureHero';
import OurCultureContent from '@/components/about/OurCultureContent';
import AwardsRecognition from '@/components/about/AwardsRecognition';

export default function CulturePage() {
  return (
    <main>
      <OurCultureHero />
      <OurCultureContent />
      <AwardsRecognition />
    </main>
  );
}
