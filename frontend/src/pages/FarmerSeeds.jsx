import React from 'react';
import image11 from '../assets/image11.jpeg';
import image12 from '../assets/image12.jpeg';
import shevgaImage from '../assets/shevga_vertical.jpg';


const FarmerSeeds = ({ language }) => {
  const isMr = language === 'mr';

  const calculations = [
    {
      en: "1 Acre - 9 Years lifespan",
      mr: "१ एकर - ९ वर्ष"
    },
    {
      en: "5 by 10 spacing - 2 trees in between",
      mr: "५ बाय १० - मध्ये २ झाडे"
    },
    {
      en: "1800 trees × 50 kg yield = 90,000 kg",
      mr: "१८०० झाडे × ५० किलो माल = ९०,००० किलो"
    },
    {
      en: "90,000 kg × ₹30 = ₹27 Lakh Profit",
      mr: "९०,००० × ३० रु = २७ लाख नफा"
    }
  ];

  const profitShares = [
    {
      roleEn: "Farmer (60%)",
      roleMr: "शेतकरी (६०%)",
      amountEn: "₹14,40,000 Profit",
      amountMr: "१४,४०,००० रु नफा",
      color: "bg-green-100 text-green-800",
      image: image11
    },
    {
      roleEn: "Company (40%)",
      roleMr: "कंपनी (४०%)",
      amountEn: "Remaining Profit",
      amountMr: "उर्वरित नफा",
      color: "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#1C2A1E] py-8 md:py-12 px-4 sm:px-6 lg:px-12 font-body border-b border-[#1C2A1E]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">06 // SEEDS & YIELD MODEL</span>
          <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
        </div>

        <div className="mb-10 text-left">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E]">
            {isMr ? 'शेवगा बियाणे आणि उत्पादनाचे गणित' : 'Drumstick Seeds & Production Math'}
          </h2>
          <p className="font-body text-base text-[#1C2A1E]/70 mt-2">
            {isMr ? '१ एकर लागवड, झाडांचे अंतर व नफ्याची आकडेवारी' : '1 Acre Planting Geometry, Tree Count & Financial Yield Breakdown'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image with Static Curved Border & Ambient Shadow */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#2F5233]/20 via-[#B8862E]/20 to-transparent rounded-[3.5rem] blur-xl opacity-80 pointer-events-none"></div>
            <div className="relative border-4 border-[#2F5233]/25 bg-white p-3.5 rounded-[2.5rem] shadow-xl">
              <div className="rounded-2xl overflow-hidden h-[380px] md:h-[450px] bg-[#1C2A1E]/5">
                <img 
                  src={shevgaImage} 
                  alt={isMr ? "शेवग्याच्या शेंगा" : "Drumsticks"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 p-3 bg-[#FFFFFF] rounded-xl border border-[#B8862E]/30 flex items-center justify-between text-xs font-mono text-[#1C2A1E]">
                <span>{isMr ? 'ओआयडीसी-३ वाण' : 'OIDC-3 Variety'}</span>
                <span className="text-[#B8862E] font-bold">1800 TREES/ACRE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Ledger Calculations */}
          <div className="lg:col-span-7 bg-white border-2 border-[#1C2A1E]/15 hover:border-[#B8862E] p-6 rounded-3xl shadow-sm hover:shadow-[0_20px_50px_rgba(28,42,30,0.25)] transition-all duration-300">
            <h3 className="font-display text-xl font-bold text-[#1C2A1E] mb-4 pb-3 border-b border-hairline flex items-center justify-between">
              <span>{isMr ? 'उत्पादनाचे आणि नफ्याचे गणित' : 'Production and Profit Calculation'}</span>
              <span className="font-mono text-xs text-[#B8862E] font-normal">EST. MODEL</span>
            </h3>
            
            <ul className="space-y-3 mb-8">
              {calculations.map((calc, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-[#FFFFFF] hover:bg-[#1C2A1E] hover:text-[#F3EEE1] p-3.5 rounded-xl border border-[#B8862E]/20 transition-all duration-300 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#B8862E] text-[#1C2A1E] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    0{idx + 1}
                  </div>
                  <span className="font-body text-base font-semibold transition-colors">
                    {isMr ? calc.mr : calc.en}
                  </span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-hairline">
              {profitShares.map((share, idx) => (
                <div key={idx} className="bg-[#2F5233] text-[#F3EEE1] p-4 rounded-2xl border border-[#B8862E]/40 flex items-center gap-3 shadow-sm">
                  {share.image && (
                    <div className="flex-shrink-0">
                      <img 
                        src={share.image} 
                        alt={isMr ? share.roleMr : share.roleEn} 
                        className="w-11 h-11 object-cover rounded-full border-2 border-[#B8862E]" 
                      />
                    </div>
                  )}
                  <div className={share.image ? "text-left" : "text-center w-full"}>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#B8862E]">
                      {isMr ? share.roleMr : share.roleEn}
                    </p>
                    <p className="font-mono text-lg font-bold tabular-nums mt-0.5">
                      {isMr ? share.amountMr : share.amountEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FarmerSeeds;
