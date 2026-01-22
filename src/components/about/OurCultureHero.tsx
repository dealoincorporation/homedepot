'use client';

import type { FC } from 'react';

const OurCultureHero: FC = () => {
  return (
    <section className="relative w-full bg-white">
      <div className="relative w-full">
        <img
          src="/images/culture.png"
          alt="Our Culture at The Home Depot Canada"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default OurCultureHero;
