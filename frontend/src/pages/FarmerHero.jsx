import React from 'react';
import shevgaImage from '../assets/shevga_drumsticks.jpg';

const FarmerHero = ({ language }) => {
  const isMr = language === 'mr';

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[70vh] flex items-center bg-[#FFFFFF] border-b border-[#1C2A1E]/15 overflow-hidden">
      {/* Right Side Image */}
      <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/75 to-transparent z-10 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/75 to-transparent z-10 md:hidden"></div>
        <img 
          src={shevgaImage} 
          alt="Shevga Produce Lot" 
          className="w-full h-full object-cover object-center contrast-110"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center py-10 md:py-16">
        <div className="w-full md:w-[58%] lg:w-1/2">
          
          <div className="inline-flex items-center gap-2 bg-[#2F5233] text-[#F3EEE1] px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#B8862E]/50 shadow-md">
            <span>🌱 {isMr ? 'शेवगा लागवड क्रांती' : 'SHEVGA FARMING MODEL'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1C2A1E] leading-tight mb-4">
            {isMr ? (
              <>शेवगा लागवडीची<br/><span className="text-[#B8862E]">आधुनिक व प्रगत पद्धत.</span></>
            ) : (
              <>Modern Drumstick<br/><span className="text-[#B8862E]">Cultivation Model.</span></>
            )}
          </h1>

          <div className="bg-white/90 backdrop-blur-md border-2 border-[#B8862E]/30 p-5 rounded-3xl shadow-xl space-y-3 font-body text-sm text-[#1C2A1E]">
            <p className="font-bold text-[#2F5233] text-base border-b border-hairline pb-2">
              {isMr ? 'शेवगा (बियाणे) मुख्य वैशिष्ट्ये' : 'OIDC Seed Specifications'}
            </p>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2F5233] text-[#F3EEE1] flex items-center justify-center text-xs font-bold">✓</span>
                <span>{isMr ? 'सुधारित OIDC उच्च प्रतीचे बियाणे पुरवठा' : 'High-yield certified OIDC drumstick seed supply'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2F5233] text-[#F3EEE1] flex items-center justify-center text-xs font-bold">✓</span>
                <span>{isMr ? 'वार्षिक किमान ५० किलो प्रति झाड उत्पन्न' : 'Minimum 50 kg yield per tree annually'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2F5233] text-[#F3EEE1] flex items-center justify-center text-xs font-bold">✓</span>
                <span>{isMr ? '२ फूट लांब हिरवी व चवदार शेंग' : '2-feet uniform dark green pods'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#2F5233] text-[#F3EEE1] flex items-center justify-center text-xs font-bold">✓</span>
                <span>{isMr ? '७ वर्षांचा थेट हमीभाव खरेदी करार' : '7-Year legal buyback price agreement'}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FarmerHero;
