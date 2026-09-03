import React from 'react';
import plantImage from '../assets/shevga_vertical.jpg';

const FarmerDetails = ({ language }) => {
  const isMr = language === 'mr';

  const facilities = [
    {
      id: 1,
      nameMr: "जाग्यावरून दुबई (Dubai) पर्यंतचे ट्रान्सपोर्ट आणि पॅकिंग",
      nameEn: "Transport and export packing directly from farm location to Dubai mandi",
      code: "TR-EX"
    },
    {
      id: 2,
      nameMr: "३ मोफत टॉनिक फवारण्या (Free Organic Tonic Spray)",
      nameEn: "3 Free Organic Tonic Spray treatments during crop cycle",
      code: "TN-SP"
    },
    {
      id: 3,
      nameMr: "क्षेत्रीय कृषी तज्ज्ञांचे प्रत्यक्ष मार्गदर्शन व भेट (Consulting Visit)",
      nameEn: "Direct field inspection and technical consulting visits by agronomy team",
      code: "AG-VS"
    },
    {
      id: 4,
      nameMr: "तुट-आळ साठी मोफत बियाणे पुरवठा (Free Seeds for Gap-filling)",
      nameEn: "Free seed supply for gap-filling & replanting (Tut-aal)",
      code: "SD-GF"
    },
    {
      id: 5,
      nameMr: "७ वर्षांचा कायदेशीर खरेदी करार (7-Year Legal Buyback Contract)",
      nameEn: "7-Year Legal Buyback Contract with guaranteed purchase price",
      code: "CT-7Y"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-[#FFFFFF] text-[#1C2A1E] border-b border-[#1C2A1E]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">05 // CONTRACT & FACILITIES</span>
          <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
        </div>

        <div className="mb-12 text-left">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E]">
            {isMr ? 'कंपनीकडून मिळणाऱ्या विशेष सुविधा' : 'Trade Facilities Provided by Sonarsiddha'}
          </h2>
          <p className="font-body text-base text-[#1C2A1E]/70 mt-2 max-w-2xl">
            {isMr 
              ? 'करारबद्ध शेतकऱ्यांसाठी पुरविल्या जाणाऱ्या वाहतूक, तंत्रज्ञान व हमी सुविधा.' 
              : 'Official terms and logistics support provided under the farmer contract agreement.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Real Produce Crop Specification Image with Curved Border & Shadow */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#2F5233]/20 via-[#B8862E]/20 to-transparent rounded-[3.5rem] blur-xl opacity-80 pointer-events-none"></div>
            <div className="relative border-4 border-[#2F5233]/25 bg-white p-3.5 rounded-[2.5rem] shadow-xl hover-lift">
              <div className="rounded-2xl overflow-hidden h-[380px] md:h-[450px] bg-[#1C2A1E]/5 group relative">
                <img 
                  src={plantImage} 
                  alt="Sonarsiddha Contract Crop" 
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#1C2A1E]/90 backdrop-blur-md text-[#F3EEE1] px-3.5 py-1 rounded-full border border-[#B8862E]/50 text-xs font-mono font-bold">
                  ✓ VERIFIED CROPS
                </div>
              </div>
              <div className="mt-3 p-3 bg-[#FFFFFF] rounded-xl border border-[#B8862E]/30 flex items-center justify-between text-xs font-mono text-[#1C2A1E]">
                <span className="font-bold">{isMr ? 'शेतकरी करार संच' : 'Contract Specification'}</span>
                <span className="text-[#B8862E] font-bold">VALIDATED SPECIMEN</span>
              </div>
            </div>
          </div>

          {/* Right Side: Mandi Line-Item Document Checklist with Curved Border */}
          <div className="lg:col-span-7 bg-white border-2 border-[#B8862E]/30 hover:border-[#B8862E] p-6 sm:p-8 rounded-[2.5rem] shadow-xl transition-all duration-300 hover-lift">
            <div className="pb-4 mb-4 border-b border-hairline flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#1C2A1E]/60">
              <span className="font-bold text-[#1C2A1E]">{isMr ? 'सुविधा तपशील' : 'Facility Agreement Terms'}</span>
              <span className="text-[#B8862E] font-bold">{isMr ? 'कोड' : 'Term Code'}</span>
            </div>

            <div className="divide-y divide-[#1C2A1E]/10">
              {facilities.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="py-3.5 px-3 rounded-xl hover:bg-[#1C2A1E] hover:text-[#F3EEE1] transition-all duration-300 group cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-sm font-bold text-[#B8862E] group-hover:text-[#D4AF37]">0{idx + 1}.</span>
                    <h3 className="font-body text-sm sm:text-base font-bold text-[#1C2A1E] group-hover:text-[#F3EEE1] transition-colors leading-tight">
                      {isMr ? item.nameMr : item.nameEn}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#B8862E] bg-[#1C2A1E]/5 group-hover:bg-[#B8862E] group-hover:text-[#1C2A1E] px-2.5 py-1 rounded-lg border border-[#B8862E]/30 shrink-0 transition-colors">
                    {item.code}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono text-[#1C2A1E]/70">
              <span>{isMr ? 'कायदेशीर नोंदणीकृत करार' : 'Registered Legal Contract'}</span>
              <span className="text-[#B8862E] font-bold">{isMr ? '१००% खरेदी हमी' : '100% Buyback Guarantee'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FarmerDetails;
