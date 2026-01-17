// pages/careers.tsx (or app/careers/page.tsx)
import CareersHero from '@/components/CareersHero';
import StoreLocations from '@/components/StoreLocations';
import CareerAreas from '@/components/CareerAreas';
import FeaturedJobs from '@/components/FeaturedJobs';
import CommunitySection from '@/components/CommunitySection';
import EEOSection from '@/components/EEOSection';
import Footer from '@/components/Footer';

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <StoreLocations />
      <CareerAreas />
      <FeaturedJobs />
      <CommunitySection />
      <EEOSection />
      <Footer />
    </main>
  );
}