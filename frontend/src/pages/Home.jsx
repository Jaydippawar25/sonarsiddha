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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/dailyRates`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) setRates(data);
      })
      .catch(err => console.error("Error fetching rates ticker:", err));
  }, []);

  const filteredRates = rates.filter(r => {
    const crop = (isMr ? r.cropName?.mr || r.cropName : r.cropName?.en || r.cropName) || '';
    const loc = r.marketLocation || '';
    return crop.toLowerCase().includes(searchQuery.toLowerCase()) || loc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full bg-slate-50 text-slate-900 font-body">
      
      {/* Main Hero Landing Banner Section - Crisp & Responsive */}
      <div className="w-full bg-slate-900 flex justify-center border-b border-emerald-600/30 shadow-sm overflow-hidden relative">
        <img 
          src={language === 'en' ? heroImageEn : heroImageMr} 
          alt="Sonarsiddha Banner" 
          className="w-full min-h-[360px] xs:min-h-[420px] sm:min-h-[520px] md:min-h-[600px] lg:h-auto object-cover block object-center transition-transform duration-500 transform hover:scale-[1.01]"
        />
      </div> 

      {/* Modern Agri-Tech Stat Strip (4 Clean Cards) */}
      <section className="bg-white border-b border-slate-200 py-6 sm:py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <ScrollReveal delay={0}>
              <div className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-500/40 p-4 sm:p-5 rounded-2xl transition-all shadow-xs flex flex-col justify-center h-full group">
                <span className="block font-display text-2xl sm:text-4xl font-extrabold text-emerald-700 tabular-nums leading-none mb-1 group-hover:scale-105 transition-transform">2,500+</span>
                <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold block leading-tight">
                  {isMr ? 'नोंदणीकृत शेतकरी' : 'Registered Farmers'}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-500/40 p-4 sm:p-5 rounded-2xl transition-all shadow-xs flex flex-col justify-center h-full group">
                <span className="block font-display text-2xl sm:text-4xl font-extrabold text-emerald-700 tabular-nums leading-none mb-1 group-hover:scale-105 transition-transform">14</span>
                <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold block leading-tight">
                  {isMr ? 'प्रादेशिक खरेदी केंद्रे' : 'Mandi Outlets'}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-500/40 p-4 sm:p-5 rounded-2xl transition-all shadow-xs flex flex-col justify-center h-full group">
                <span className="block font-display text-2xl sm:text-4xl font-extrabold text-emerald-700 tabular-nums leading-none mb-1 group-hover:scale-105 transition-transform">120+</span>
                <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold block leading-tight">
                  {isMr ? 'वार्षिक कार्गो कंटेनर्स' : 'Cargo Export Containers'}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-500/40 p-4 sm:p-5 rounded-2xl transition-all shadow-xs flex flex-col justify-center h-full group">
                <span className="block font-display text-2xl sm:text-4xl font-extrabold text-amber-600 tabular-nums leading-none mb-1 group-hover:scale-105 transition-transform">100%</span>
                <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold block leading-tight">
                  {isMr ? 'वेळेवर खाते भरणा' : 'Prompt Ledger Payout'}
                </span>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Data-Forward Dedicated Live Mandi Rates Dashboard Widget */}
      <section className="py-8 sm:py-12 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal>
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 animate-ping"></span>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <span>{isMr ? 'आजचे लाईव्ह बाजारभाव' : 'Live Daily Mandi Rates'}</span>
                      <span className="text-xs font-mono bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                        {isMr ? 'अपडेटेड' : 'LIVE'}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {isMr ? 'थेट सोलापूर, सांगली व नाशिक खरेदी केंद्र भाव' : 'Direct mandi rates updated from regional procurement centers'}
                    </p>
                  </div>
                </div>

                {/* Instant Crop Search Filter */}
                <div className="w-full md:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isMr ? "पिक किंवा बाजार शोधा..." : "Filter crop or market..."}
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Rate Cards Grid */}
              {rates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {(filteredRates.length > 0 ? filteredRates : rates).map(r => (
                    <div 
                      key={r.id} 
                      className="bg-slate-50 hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-400 p-4 rounded-2xl transition-all shadow-xs flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <span className="font-display font-bold text-sm sm:text-base text-slate-900 block group-hover:text-emerald-700">
                          {isMr ? r.cropName?.mr || r.cropName : r.cropName?.en || r.cropName}
                        </span>
                        <span className="text-xs font-mono text-slate-500 block">
                          📍 {r.marketLocation || 'Solapur Central Mandi'}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-display font-extrabold text-lg sm:text-xl text-emerald-700 tabular-nums block">
                          ₹{r.ratePerKg || r.rate || '45'}<span className="text-xs text-slate-500 font-normal">/kg</span>
                        </span>
                        <span className="inline-block text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          ▲ MANDI VERIFIED
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs font-mono text-slate-500">
                  {isMr ? 'आजचे भाव लोड होत आहेत...' : 'Fetching live mandi rate updates...'}
                </div>
              )}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Executive 4-Pillar Quick Feature Grid */}
      <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                {isMr ? 'सोनारसिद्धी प्रमुख सेवा व सुविधा' : 'Core Mandi Services & Buyback Ecosystem'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-body">
                {isMr ? 'शेतकऱ्यांना हमीभाव, दर्जा आणि खात्रीशीर व्यापार मिळवून देणारा प्लॅटफॉर्म' : 'Empowering drumstick growers with guaranteed buyback, quality seeds & global logistics'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Feature Card 1 */}
            <ScrollReveal delay={0}>
              <Link 
                to="/farmer" 
                className="bg-white border border-slate-200 hover:border-emerald-500 p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 mb-2 leading-tight">
                    {isMr ? 'शेतकरी नोंदणी व खरेदी' : 'Farmer Buyback Contract'}
                  </h3>
                  <p className="font-body text-xs text-slate-600 leading-relaxed">
                    {isMr ? '७ वर्षांचा कायदेशीर हमीभाव खरेदी करार.' : '7-Year legal buyback contract with technical field visits.'}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono font-bold text-emerald-700">
                  <span>{isMr ? 'नोंदणी करा' : 'Register Now'}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Feature Card 2 */}
            <ScrollReveal delay={100}>
              <Link 
                to="/farmer-details" 
                className="bg-white border border-slate-200 hover:border-emerald-500 p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 mb-2 leading-tight">
                    {isMr ? '१ एकर नफा गणित' : '1 Acre Profit Ledger'}
                  </h3>
                  <p className="font-body text-xs text-slate-600 leading-relaxed">
                    {isMr ? 'वार्षिक ४.५ लाखांचा निव्वळ नफा.' : '₹4.5 Lakhs net profit with 100% digital weighing.'}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono font-bold text-amber-700">
                  <span>{isMr ? 'गणित पहा' : 'View Ledger'}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Feature Card 3 */}
            <ScrollReveal delay={200}>
              <Link 
                to="/about" 
                className="bg-white border border-slate-200 hover:border-emerald-500 p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 mb-2 leading-tight">
                    {isMr ? 'सुधारित OIDC बियाणे' : 'High-Yield OIDC Seeds'}
                  </h3>
                  <p className="font-body text-xs text-slate-600 leading-relaxed">
                    {isMr ? 'वर्षभर भरघोस उत्पादन देणारी सुधारित वाण.' : 'Year-round high yield drumstick variety for all soil types.'}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono font-bold text-emerald-700">
                  <span>{isMr ? 'माहिती घ्या' : 'Learn More'}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Feature Card 4 */}
            <ScrollReveal delay={300}>
              <Link 
                to="/gallery" 
                className="bg-white border border-slate-200 hover:border-emerald-500 p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2zm9-13.5V9" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 mb-2 leading-tight">
                    {isMr ? 'थेट निर्यात कार्गो' : 'Direct Global Export'}
                  </h3>
                  <p className="font-body text-xs text-slate-600 leading-relaxed">
                    {isMr ? 'दुबई व आंतरराष्ट्रीय विमान कार्गो.' : 'Direct air & sea cargo supply to Dubai mandis.'}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono font-bold text-emerald-700">
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
