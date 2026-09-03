import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { API_BASE } from '../config';

const Gallery = ({ language }) => {
  const isMr = language === 'mr';
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/team`)
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
        <ScrollReveal>
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
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {teamMembers.map((member, idx) => (
            <ScrollReveal key={member.id || idx} delay={idx * 100}>
              <div 
                className="bg-white border-2 border-[#B8862E]/30 hover:border-[#B8862E] p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl flex flex-col justify-between transition-all duration-300 hover:bg-[#1C2A1E] hover:text-[#F3EEE1] shadow-sm hover:shadow-2xl group cursor-pointer h-full"
              >
              <div>
                <div className="h-44 sm:h-64 md:h-72 overflow-hidden bg-[#1C2A1E]/5 rounded-xl sm:rounded-2xl border border-hairline relative">
                  <img 
                    src={member.image} 
                    alt={isMr ? member.nameMr : member.nameEn} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Sonarsiddha+Team'; }}
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#1C2A1E]/80 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[#B8862E]/40 text-[9px] sm:text-[10px] font-mono text-[#B8862E] font-bold">
                    #{idx + 1}
                  </div>
                </div>
                
                <div className="mt-2.5 sm:mt-4 pt-1.5 sm:pt-2 border-t border-hairline text-left">
                  <h3 className="font-display text-sm sm:text-lg font-bold text-[#1C2A1E] group-hover:text-[#F3EEE1] transition-colors leading-tight">
                    {isMr ? member.nameMr : member.nameEn}
                  </h3>
                  <p className="font-body text-[10px] sm:text-xs text-[#B8862E] mt-0.5 font-bold tracking-wider group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                    {isMr ? member.roleMr : member.roleEn}
                  </p>
                </div>
              </div>

              <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-hairline flex items-center justify-between">
                <span className="text-[9px] sm:text-[11px] font-mono text-[#2F5233] group-hover:text-[#B8862E] font-bold hidden xs:inline">
                  ✓ VERIFIED
                </span>
                <a 
                  href={`tel:${member.phone || '9876543210'}`}
                  className="w-full xs:w-auto text-center px-2 py-1 sm:px-3 sm:py-1 bg-[#F3EEE1] group-hover:bg-[#B8862E] text-[#1C2A1E] text-[10px] sm:text-xs font-mono font-bold rounded-lg sm:rounded-xl transition-all border border-[#B8862E]/30 flex items-center justify-center gap-1"
                >
                  📞 {isMr ? 'संपर्क' : 'Call'}
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
