import React, { useState, useEffect } from 'react';

const Gallery = ({ language }) => {
  const isMr = language === 'mr';
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/team')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sortedData = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setTeamMembers(sortedData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching team data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-[#F3EEE1] text-center font-mono text-xs uppercase text-[#1C2A1E]/60">
        {isMr ? 'टीम माहिती लोड होत आहे...' : 'Loading Team Specimen Sheet...'}
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-[#F3EEE1] text-[#1C2A1E] border-b border-[#1C2A1E]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">03 // MANAGEMENT & TEAM</span>
          <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
        </div>

        <div className="mb-12 text-left">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E]">
            {isMr ? 'आमचे नेतृत्व व प्रतिनिधी' : 'Leadership & Mandi Representatives'}
          </h2>
          <p className="font-body text-base text-[#1C2A1E]/70 mt-2 max-w-2xl">
            {isMr 
              ? 'सोनारसिद्ध संस्थेच्या यशस्वी वाटचालीमागील व शेतकरी मार्गदर्शनासाठी कटिबद्ध असणारे संचालक.' 
              : 'The key trade managers and agricultural experts guiding Sonarsiddha operations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div 
              key={member.id || idx} 
              className="bg-white border-2 border-[#1C2A1E]/15 hover:border-[#B8862E] p-3.5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:bg-[#1C2A1E] hover:text-[#F3EEE1] shadow-sm hover:shadow-[0_15px_35px_rgba(28,42,30,0.3)] group cursor-pointer"
            >
              <div>
                <div className="h-72 overflow-hidden bg-[#1C2A1E]/5 rounded-xl border border-hairline relative">
                  <img 
                    src={member.image} 
                    alt={isMr ? member.nameMr : member.nameEn} 
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Sonarsiddha+Team'; }}
                  />
                </div>
                <div className="mt-3.5 pt-3 border-t border-hairline text-left">
                  <h3 className="font-display text-lg font-bold text-[#1C2A1E] group-hover:text-[#F3EEE1] transition-colors">
                    {isMr ? member.nameMr : member.nameEn}
                  </h3>
                  <p className="font-mono text-xs text-[#B8862E] mt-1 font-medium group-hover:text-[#D4AF37] transition-colors">
                    {isMr ? member.roleMr : member.roleEn}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-hairline flex items-center justify-between text-[11px] font-mono text-[#1C2A1E]/50 group-hover:text-[#F3EEE1]/60 transition-colors">
                <span>MEMB #{idx + 1}</span>
                <span className="group-hover:text-[#B8862E] font-bold">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
