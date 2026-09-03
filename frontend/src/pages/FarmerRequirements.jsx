import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

const FarmerRequirements = ({ language }) => {
  const isMr = language === 'mr';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/requirements`)
      .then(res => res.json())
      .then(reqData => {
        setData(reqData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching requirements data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-lg font-bold animate-pulse text-green-700">Loading...</div>;
  }

  if (!data || !data.documents) {
    return null;
  }

  return (
    <div className="bg-[#FFFFFF] py-8 md:py-12 px-4 font-body relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">06 // REQUIRED DOCUMENTS</span>
          <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
        </div>

        {/* Title */}
        <div className="mb-10 text-left">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E]">
            {isMr ? data.titleMr : data.titleEn}
          </h2>
          <p className="font-body text-xs sm:text-base text-[#1C2A1E]/70 mt-2 max-w-2xl">
            {isMr ? 'शेवगा लागवड करारासाठी खालील कागदपत्रे आवश्यक आहेत.' : 'The following verified documents are required for agreement execution.'}
          </p>
        </div>

        {/* Attractive List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.documents.map((doc, index) => (
            <div 
              key={doc.id || index} 
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border-2 border-[#B8862E]/30 hover:border-[#B8862E] hover:bg-[#1C2A1E] hover:text-[#F3EEE1] flex flex-col items-center text-center gap-3 group min-h-[180px] justify-center relative overflow-hidden hover-lift cursor-pointer"
            >
              {/* Icon / Number */}
              <div className="w-14 h-14 rounded-full bg-[#1C2A1E]/5 text-[#2F5233] flex items-center justify-center text-3xl shadow-sm border-2 border-[#B8862E]/30 z-10 group-hover:bg-[#B8862E] group-hover:text-[#1C2A1E] group-hover:border-[#B8862E] transition-all duration-300 transform group-hover:scale-110">
                {doc.icon}
              </div>
              
              {/* Document Name */}
              <div className="z-10 relative">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#B8862E] uppercase tracking-widest mb-1 block group-hover:text-[#D4AF37]">
                  {isMr ? `कागदपत्र ${index + 1}` : `Document ${index + 1}`}
                </span>
                <h3 className="font-display text-base md:text-lg font-bold text-[#1C2A1E] group-hover:text-[#F3EEE1] transition-colors leading-tight">
                  {isMr ? doc.nameMr : doc.nameEn}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FarmerRequirements;
