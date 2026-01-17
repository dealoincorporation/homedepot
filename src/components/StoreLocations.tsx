import Link from 'next/link';
import type { FC } from 'react';
import { STORE_LOCATIONS } from '@/constants';

const StoreLocations: FC = () => {
  return (
    <div className="content-wrapper sub-header relative">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 bg-black"></div>
        <div className="w-[300px] bg-orange-600"></div>
      </div>

      <div className="main-container relative z-10">
        <div className="holder">
          <div className="content">
            <div className="leftSide text-white">
              <h2 className="text-lg md:text-xl !text-white">Join Our Store Team In A Location Near You</h2>
              <div className="store-boxes">
                {STORE_LOCATIONS.map((store) => (
                  <Link
                    key={store.id}
                    href={store.href}
                    className={`store-info ${store.hiddenOnMedium ? 'hideMedium' : ''}`}
                  >
                    <div className="storeName">{store.name}</div>
                    <div className="storeLocation">{store.location}</div>
                  </Link>
                ))}
              </div>
              <p className="!text-white">
                Interested in <Link href="/career-areas/corporate-opportunities" className="!text-white underline decoration-white hover:no-underline">Corporate</Link> or{' '}
                <Link href="/career-areas/field" className="!text-white underline decoration-white hover:no-underline">Field</Link> opportunities?
              </p>
            </div>
            <div className="rightSide">
              <Link href="/location" className="block text-white border-white border-2 px-2 py-3 mb-4 hover:bg-white/10 text-center">
                <span className="fas fa-list mr-2"></span> View All Locations
              </Link>
              <Link href="/jobs-on-a-map" className="block text-white border-white border-2 px-2 py-3 hover:bg-white/10 text-center">
                <span className="fas fa-map mr-2"></span> View Jobs On A Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocations;