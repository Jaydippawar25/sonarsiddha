import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import About from './About';
import FarmerProfit from './FarmerProfit';
import Gallery from './Gallery';
import YoutubeVideos from './YoutubeVideos';
import heroImageMr from '../assets/hero_mr.jpg';
import heroImageEn from '../assets/hero_en.jpg';
import { API_BASE } from '../config';

const Home = ({ language }) => {
  const isMr = language === 'mr';
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/dailyRates`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRates(data);
      })
      .catch(err => console.error("Error fetching rates ticker:", err));
  }, []);

  return (
    <div className="w-full bg-[#F3EEE1] text-[#1C2A1E]">
      
      {/* Main Hero Landing Banner Section - Extra Large & Tall */}
      <div className="w-full bg-[#1C2A1E] flex justify-center border-b-2 border-[#B8862E] shadow-md overflow-hidden relative">
        <img 
          src={language === 'en' ? heroImageEn : heroImageMr} 
          alt="Sonarsiddha Banner" 
          className="w-full min-h-[360px] xs:min-h-[420px] sm:min-h-[520px] md:min-h-[600px] lg:h-auto object-cover block object-center transition-all duration-300 transform hover:scale-[1.01]"
        />
      </div> 

      {/* Gold-Rule Stat & Rate Strip */}
      <section className="bg-[#1C2A1E] text-[#F3EEE1] border-b border-[#B8862E]/40 py-2 sm:py-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 text-center">
            <ScrollReveal delay={0}>
              <div className="bg-[#2F5233]/40 border border-[#B8862E]/30 py-2.5 px-2 sm:p-4 rounded-xl sm:rounded-2xl hover-lift transition-all shadow-xs flex flex-col justify-center h-full">
                <span className="block font-display text-base sm:text-3xl md:text-4xl font-bold text-[#B8862E] tabular-nums leading-none mb-1">2,500+</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-tight sm:tracking-wider text-[#F3EEE1]/90 block leading-tight font-semibold">
                  {isMr ? 'नोंदणीकृत शेतकरी' : 'Registered Farmers'}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-[#2F5233]/40 border border-[#B8862E]/30 py-2.5 px-2 sm:p-4 rounded-xl sm:rounded-2xl hover-lift transition-all shadow-xs flex flex-col justify-center h-full">
                <span className="block font-display text-base sm:text-3xl md:text-4xl font-bold text-[#B8862E] tabular-nums leading-none mb-1">14</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-tight sm:tracking-wider text-[#F3EEE1]/90 block leading-tight font-semibold">
                  {isMr ? 'प्रादेशिक खरेदी केंद्रे' : 'Mandi Outlets'}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-[#2F5233]/40 border border-[#B8862E]/30 py-2.5 px-2 sm:p-4 rounded-xl sm:rounded-2xl hover-lift transition-all shadow-xs flex flex-col justify-center h-full">
                <span className="block font-display text-base sm:text-3xl md:text-4xl font-bold text-[#B8862E] tabular-nums leading-none mb-1">120+</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-tight sm:tracking-wider text-[#F3EEE1]/90 block leading-tight font-semibold">
                  {isMr ? 'वार्षिक कार्गो कंटेनर्स' : 'Cargo Export Containers'}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-[#2F5233]/40 border border-[#B8862E]/30 py-2.5 px-2 sm:p-4 rounded-xl sm:rounded-2xl hover-lift transition-all shadow-xs flex flex-col justify-center h-full">
                <span className="block font-display text-base sm:text-3xl md:text-4xl font-bold text-[#B8862E] tabular-nums leading-none mb-1">100%</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-tight sm:tracking-wider text-[#F3EEE1]/90 block leading-tight font-semibold">
                  {isMr ? 'वेळेवर खाते भरणा' : 'Prompt Ledger Payout'}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Rate Ticker Bar */}
          {rates.length > 0 && (
            <ScrollReveal delay={150}>
              <div className="mt-6 pt-4 border-t border-[#B8862E]/20 flex items-center gap-4 overflow-x-auto text-xs font-mono">
                <span className="bg-[#B8862E] text-[#1C2A1E] px-3 py-1 font-bold uppercase tracking-wider rounded-lg shrink-0 flex items-center gap-2 shadow-sm animate-pulse-glow">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C2A1E] animate-ping"></span>
                  {isMr ? 'आजचे बाजारभाव' : 'Daily Rates'}
                </span>
                <div className="flex items-center gap-6 whitespace-nowrap">
                  {rates.map(r => (
                    <span key={r.id} className="text-[#F3EEE1]/90 bg-[#2F5233]/40 hover:bg-[#2F5233]/80 px-3 py-1 rounded-lg border border-[#B8862E]/20 transition-all hover:scale-105">
                      <strong className="text-[#B8862E]">{isMr ? r.cropName?.mr || r.cropName : r.cropName?.en || r.cropName}:</strong> ₹{r.ratePerKg || r.rate || '45'}/kg <span className="text-[#F3EEE1]/60">({r.marketLocation || 'Solapur Mandi'})</span>
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>

      {/* Executive 4-Pillar Quick Feature Grid */}
      <section className="py-6 sm:py-10 bg-[#F3EEE1] border-b border-[#1C2A1E]/15">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            
            {/* Feature Card 1 */}
            <ScrollReveal delay={0}>
              <Link 
                to="/farmer" 
                className="bg-white border-2 border-[#B8862E]/30 hover:border-[#B8862E] p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover-lift hover:bg-[#1C2A1E] hover:text-[#F3EEE1] transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2F5233]/10 group-hover:bg-[#B8862E]/20 border border-[#B8862E]/40 flex items-center justify-center text-[#2F5233] group-hover:text-[#B8862E] mb-2 sm:mb-4 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xs sm:text-lg font-bold text-[#1C2A1E] group-hover:text-[#F3EEE1] mb-1 sm:mb-2 leading-tight">
                    {isMr ? 'शेतकरी नोंदणी व खरेदी' : 'Farmer Buyback Contract'}
                  </h3>
                  <p className="font-body text-[10px] sm:text-xs text-[#1C2A1E]/70 group-hover:text-[#F3EEE1]/80 leading-tight line-clamp-2 sm:line-clamp-none">
                    {isMr ? '७ वर्षांचा कायदेशीर हमीभाव खरेदी करार.' : '7-Year legal buyback contract with technical visits.'}
                  </p>
                </div>
                <div className="mt-2 sm:mt-4 flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-[#B8862E]">
                  <span>{isMr ? 'नोंदणी करा' : 'Register Now'}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Feature Card 2 */}
            <ScrollReveal delay={100}>
              <Link 
                to="/farmer-details" 
                className="bg-white border-2 border-[#B8862E]/30 hover:border-[#B8862E] p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover-lift hover:bg-[#1C2A1E] hover:text-[#F3EEE1] transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2F5233]/10 group-hover:bg-[#B8862E]/20 border border-[#B8862E]/40 flex items-center justify-center text-[#2F5233] group-hover:text-[#B8862E] mb-2 sm:mb-4 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xs sm:text-lg font-bold text-[#1C2A1E] group-hover:text-[#F3EEE1] mb-1 sm:mb-2 leading-tight">
                    {isMr ? '१ एकर नफा गणित' : '1 Acre Profit Ledger'}
                  </h3>
                  <p className="font-body text-[10px] sm:text-xs text-[#1C2A1E]/70 group-hover:text-[#F3EEE1]/80 leading-tight line-clamp-2 sm:line-clamp-none">
                    {isMr ? 'वार्षिक ४.५ लाखांचा निव्वळ नफा.' : '₹4.5 Lakhs net profit with 100% digital weighing.'}
                  </p>
                </div>
                <div className="mt-2 sm:mt-4 flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-[#B8862E]">
                  <span>{isMr ? 'गणित पहा' : 'View Ledger'}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Feature Card 3 */}
            <ScrollReveal delay={200}>
              <Link 
                to="/about" 
                className="bg-white border-2 border-[#B8862E]/30 hover:border-[#B8862E] p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover-lift hover:bg-[#1C2A1E] hover:text-[#F3EEE1] transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2F5233]/10 group-hover:bg-[#B8862E]/20 border border-[#B8862E]/40 flex items-center justify-center text-[#2F5233] group-hover:text-[#B8862E] mb-2 sm:mb-4 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xs sm:text-lg font-bold text-[#1C2A1E] group-hover:text-[#F3EEE1] mb-1 sm:mb-2 leading-tight">
                    {isMr ? 'सुधारित OIDC बियाणे' : 'High-Yield OIDC Seeds'}
                  </h3>
                  <p className="font-body text-[10px] sm:text-xs text-[#1C2A1E]/70 group-hover:text-[#F3EEE1]/80 leading-tight line-clamp-2 sm:line-clamp-none">
                    {isMr ? 'वर्षभर भरघोस उत्पादन देणारी सुधारित वाण.' : 'Year-round high yield drumstick variety for all soil types.'}
                  </p>
                </div>
                <div className="mt-2 sm:mt-4 flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-[#B8862E]">
                  <span>{isMr ? 'माहिती घ्या' : 'Learn More'}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Feature Card 4 */}
            <ScrollReveal delay={300}>
              <Link 
                to="/gallery" 
                className="bg-white border-2 border-[#B8862E]/30 hover:border-[#B8862E] p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover-lift hover:bg-[#1C2A1E] hover:text-[#F3EEE1] transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2F5233]/10 group-hover:bg-[#B8862E]/20 border border-[#B8862E]/40 flex items-center justify-center text-[#2F5233] group-hover:text-[#B8862E] mb-2 sm:mb-4 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2zm9-13.5V9" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xs sm:text-lg font-bold text-[#1C2A1E] group-hover:text-[#F3EEE1] mb-1 sm:mb-2 leading-tight">
                    {isMr ? 'थेट निर्यात कार्गो' : 'Direct Global Export'}
                  </h3>
                  <p className="font-body text-[10px] sm:text-xs text-[#1C2A1E]/70 group-hover:text-[#F3EEE1]/80 leading-tight line-clamp-2 sm:line-clamp-none">
                    {isMr ? 'दुबई व आंतरराष्ट्रीय विमान कार्गो.' : 'Direct air & sea cargo supply to Dubai mandis.'}
                  </p>
                </div>
                <div className="mt-2 sm:mt-4 flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-[#B8862E]">
                  <span>{isMr ? 'गॅलरी पहा' : 'View Archive'}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* About Section Excerpt */}
      <div>
        <About language={language} />
      </div>

      {/* Farmer Profit Ledger Section */}
      <div>
        <FarmerProfit language={language} />
      </div>

      {/* Team Specimen Gallery Section */}
      <div>
        <Gallery language={language} />
      </div>

      {/* YouTube Educational Videos Section */}
      <div>
        <YoutubeVideos language={language} />
      </div>

    </div>
  );
};

export default Home;
