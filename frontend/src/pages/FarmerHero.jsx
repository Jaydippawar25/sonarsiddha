import React from 'react';
import shevgaImage from '../assets/shevga_drumsticks.jpg';

const FarmerHero = ({ language }) => {
  const isMr = language === 'mr';

  return (
    <div className="relative w-full min-h-[600px] md:min-h-[80vh] flex items-center bg-[#FDFBF7] overflow-hidden">
      {/* Right Side Image */}
      <div className="absolute top-0 right-0 w-full md:w-[70%] h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] from-[5%] via-[#FDFBF7]/60 via-[30%] to-transparent to-[70%] z-10 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] from-[10%] via-[#FDFBF7]/60 to-transparent z-10 md:hidden"></div>
        <img 
          src={shevgaImage} 
          alt="Shevga" 
          className="w-full h-full object-cover object-center brightness-[0.75] contrast-125"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center">
        <div className="w-full md:w-[55%] lg:w-1/2 py-12 md:py-24">
          {/* Red line */}
          <div className="w-10 h-[1.5px] bg-[#B22222] mb-6"></div>
          
          {/* Subtitle */}
          <h3 className="text-[#B22222] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-6">
            {isMr ? 'आमची शेतकरी कथा' : 'OUR FARMER STORY'}
          </h3>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif text-[#1A1A1A] leading-[1.1] mb-6">
            {isMr ? <>शेवगा लागवडीची<br/>प्रगत पद्धत<span className="text-[#B22222]">.</span></> : <>Generations<br/>of Shevga<br/>Farming<span className="text-[#B22222]">.</span></>}
          </h1>
          
          {/* Description */}
          <div className="text-[#4A4A4A] text-sm sm:text-base leading-relaxed mb-10 pr-4 md:pr-10 font-light">
            {isMr ? (
              <div className="space-y-2">
                <p className="font-semibold text-lg">शेवगा (बियाणे) वैशिष्ट्ये</p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> आम्ही बियाणे पुरवतो</li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> उच्च दर्जाचे बियाणे</li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> ओकोमोटापोरा (फार्मा व्हरायटी)</li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> वार्षिक किमान ५० किलो उत्पादन</li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> शेवग्याची लांबी २ फूट</li>
                </ul>
              </div>
            ) : (
              <p>
                Sonarsiddha represents the absolute pinnacle of Shevga farming. Founded with a vision to empower farmers, our project is dedicated to modern farming methods and delivering true micro-enterprise luxury to the global stage.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FarmerHero;
