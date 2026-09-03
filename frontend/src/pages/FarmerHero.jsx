import React from 'react';
import shevgaImage from '../assets/shevga_drumsticks.jpg';

const FarmerHero = ({ language }) => {
  const isMr = language === 'mr';

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[65vh] flex items-center bg-white border-b border-slate-200 overflow-hidden">
      {/* Right Side Image */}
      <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10 md:hidden"></div>
        <img 
          src={shevgaImage} 
          alt="Shevga Produce Lot" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-center py-10 md:py-16">
        <div className="w-full md:w-[58%] lg:w-1/2">
          
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-emerald-300 shadow-xs">
            <span>🌱 {isMr ? 'शेवगा लागवड क्रांती' : 'SHEVGA FARMING MODEL'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 leading-tight mb-5">
            {isMr ? (
              <>शेवगा लागवडीची<br/><span className="text-emerald-700">आधुनिक व प्रगत पद्धत.</span></>
            ) : (
              <>Modern Drumstick<br/><span className="text-emerald-700">Cultivation Model.</span></>
            )}
          </h1>

          <div className="bg-white/95 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-md space-y-3 font-body text-sm text-slate-800">
            <p className="font-bold text-emerald-700 text-base border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>{isMr ? 'शेवगा (बियाणे) मुख्य वैशिष्ट्ये' : 'OIDC Seed Specifications'}</span>
              <span className="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">OIDC-3</span>
            </p>
            <ul className="space-y-2 font-medium text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{isMr ? 'कमी पाण्यात, सर्व प्रकारच्या जमिनीत भरघोस उत्पादन.' : 'High yield in all soil types with minimum water requirement.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{isMr ? '६ ते ७ महिन्यांत पहिली तोडणी सुरू.' : 'First harvest starting within 6 to 7 months of planting.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{isMr ? 'कंपनीकडून ७ वर्षांचा खरेदी हमीभाव करार.' : '7-Year legal buyback price guarantee from Sonarsiddha.'}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FarmerHero;
