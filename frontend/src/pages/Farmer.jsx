import React from 'react';
import FarmerHero from './FarmerHero';
import FarmerSeeds from './FarmerSeeds';

const Farmer = ({ language }) => {
  return (
    <div className="bg-gray-100 min-h-screen pb-16 font-sans pt-12">
      <FarmerHero language={language} />
      
      {/* New component containing Seeds info, calculations, and images */}
      <FarmerSeeds language={language} />

    </div>
  );
};

export default Farmer;
