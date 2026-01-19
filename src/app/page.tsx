// pages/index.tsx (or app/page.tsx)
import HeroSection from '@/components/HeroSection';
import StoreLocations from '@/components/StoreLocations';
import CareerAreas from '@/components/CareerAreas';
import FeaturedJobs from '@/components/FeaturedJobs';
import CommunitySection from '@/components/CommunitySection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StoreLocations />
      <CareerAreas />
      <FeaturedJobs />
      <CommunitySection />
    </main>
  );
}