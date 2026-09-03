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
    <section className="py-8 md:py-12 bg-[#F3EEE1] text-[#1C2A1E] border-b border-[#1C2A1E]/15">
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
          
          {/* Left Side: Real Produce Crop Specification Image */}
          <div className="lg:col-span-5 border border-[#1C2A1E]/20 bg-white p-3 rounded-xs">
            <img 
              src={plantImage} 
              alt="Sonarsiddha Contract Crop" 
              className="w-full h-[400px] object-cover rounded-xs"
            />
            <div className="mt-3 pt-3 border-t border-hairline flex items-center justify-between font-mono text-xs text-[#1C2A1E]/70">
              <span>{isMr ? 'शेतकरी करार संच' : 'Contract Specification'}</span>
              <span className="text-[#B8862E]">VALIDATED</span>
            </div>
          </div>

          {/* Right Side: Mandi Line-Item Document Checklist */}
          <div className="lg:col-span-7 bg-white border border-[#1C2A1E]/20 p-6 rounded-xs">
            <div className="pb-4 mb-4 border-b border-[#1C2A1E]/20 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#1C2A1E]/60">
              <span>{isMr ? 'सुविधा तपशील' : 'Facility Agreement Terms'}</span>
              <span>{isMr ? 'कोड' : 'Term Code'}</span>
            </div>

            <div className="divide-y divide-[#1C2A1E]/10">
              {facilities.map((item, idx) => (
                <div key={item.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#B8862E] pt-0.5">0{idx + 1}.</span>
                    <div>
                      <h3 className="font-body text-base font-bold text-[#1C2A1E]">
                        {isMr ? item.nameMr : item.nameEn}
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2F5233] bg-[#2F5233]/10 px-2 py-1 rounded-xs shrink-0">
                    {item.code}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono text-[#1C2A1E]/60">
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
