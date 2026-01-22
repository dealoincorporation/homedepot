'use client';

import { useState } from 'react';
import type { FC } from 'react';

const LocationSelector: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [
    'AB - Airdrie', 'AB - Calgary', 'AB - Edmonton', 'AB - Rockyview County', 'AB - Acheson',
    'AB - Fort Saskatchewan', 'AB - Grande Prairie', 'AB - Lethbridge', 'AB - Lloydminster',
    'AB - Medicine Hat', 'AB - Okotoks', 'AB - Red Deer', 'AB - Sherwood Park', 'AB - Spruce Grove',
    'AB - St. Albert', 'BC - Abbotsford', 'BC - Burnaby', 'BC - Vancouver Cambie', 'BC - Campbell River',
    'BC - Chilliwack', 'BC - Coquitlam', 'BC - Courtenay', 'BC - Cranbrook', 'BC - Duncan',
    'BC - Kamloops', 'BC - Kelowna', 'BC - Langley', 'BC - Nanaimo', 'BC - Surrey',
    'BC - West Vancouver', 'BC - Port Coquitlam', 'BC - Prince George', 'BC - Richmond',
    'BC - Saanich', 'BC - Squamish', 'BC - Vancouver Terminal', 'BC - Vernon', 'BC - Victoria',
    'BC - Westbank', 'MB - Brandon', 'MB - Winnipeg', 'NB - Fredericton', 'NB - Moncton',
    'NB - Saint John', 'NL - St. Johns', 'NS - Dartmouth', 'NS - Halifax', 'NS - New Minas',
    'NS - Sydney', 'ON - Ajax', 'ON - Ancaster', 'ON - Toronto', 'ON - Aurora',
    'ON - Mississauga', 'ON - Ottawa', 'ON - Barrie', 'ON - Belleville', 'ON - Bolton',
    'ON - Bowmanville', 'ON - Bracebridge', 'ON - Bradford', 'ON - Brampton', 'ON - Brantford',
    'ON - Brockville', 'ON - Burlington', 'ON - Cambridge', 'ON - Carleton Place', 'ON - Chatham',
    'ON - Cobourg', 'ON - Collingwood', 'ON - Cornwall', 'ON - Scarborough', 'ON - Etobicoke',
    'ON - Guelph', 'ON - Hamilton', 'ON - Huntsville', 'ON - Kingston', 'ON - Kitchener',
    'ON - London', 'ON - Markham', 'ON - Midland', 'ON - Milton', 'ON - Newmarket',
    'ON - Niagara Falls', 'ON - North Bay', 'ON - Oakville', 'ON - Orangeville', 'ON - Orillia',
    'ON - Oshawa', 'ON - Owen Sound', 'ON - Parry Sound', 'ON - Pembroke', 'ON - Peterborough',
    'ON - Pickering', 'ON - Richmond Hill', 'ON - Sarnia', 'ON - Sault Ste. Marie', 'ON - St. Catharines',
    'ON - Sudbury', 'ON - Thunder Bay', 'ON - Timmins', 'ON - Vaughan', 'ON - Waterloo',
    'ON - Brooklin', 'ON - Whitby', 'ON - Windsor', 'ON - Woodbridge', 'ON - Woodstock',
    'PE - Charlottetown', 'QC - Anjou', 'QC - Montreal', 'QC - Boisbriand', 'QC - Gatineau',
    'QC - Granby', 'QC - Greenfield Park', 'QC - Lachenaie', 'QC - Laval', 'QC - Quebec City',
    'QC - St Laurent', 'QC - Pointe-Claire', 'QC - Ste-Foy', 'QC - Sherbrooke', 'QC - St.Jerome',
    'QC - St. Bruno de Montarville', 'QC - St. Constant', 'QC - St. Jean Sur Richelieu', 'QC - Levis',
    'QC - Trois Rivieres', 'QC - Vaudreuil', 'QC - Victoriaville', 'SK - Regina', 'SK - Saskatoon South',
    'SK - Saskatoon'
  ];

  return (
    <section id="search" className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`px-4 py-2 text-sm rounded transition-colors duration-200 ${
                selectedLocation === location
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-300'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded transition-colors duration-300">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default LocationSelector;
