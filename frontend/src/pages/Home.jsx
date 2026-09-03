import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import FarmerProfit from './FarmerProfit';
import Gallery from './Gallery';
import YoutubeVideos from './YoutubeVideos';
import heroImageMr from '../assets/hero_mr.jpg';
import heroImageEn from '../assets/hero_en.jpg';

const Home = ({ language }) => {
  const isMr = language === 'mr';
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/dailyRates')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRates(data);
      })
      .catch(err => console.error("Error fetching rates ticker:", err));
  }, []);

  return (
    <div className="w-full bg-[#F3EEE1] text-[#1C2A1E]">
      
      {/* Simple Main Hero Landing Banner Section */}
      <div className="w-full bg-[#1C2A1E] flex justify-center border-b border-[#B8862E]/40 shadow-sm">
        <img 
          src={language === 'en' ? heroImageEn : heroImageMr} 
          alt="Sonarsiddha Banner" 
          className="w-full max-w-7xl h-auto object-contain block"
        />
      </div> 

      {/* Gold-Rule Stat & Rate Strip */}
      <section className="bg-[#1C2A1E] text-[#F3EEE1] border-b border-[#B8862E]/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-[#B8862E]/20">
            <div className="px-2">
              <span className="block font-mono text-3xl md:text-4xl font-bold text-[#B8862E] tabular-nums">2,500+</span>
              <span className="text-xs uppercase tracking-wider text-[#F3EEE1]/70 mt-1 block">
                {isMr ? 'नोंदणीकृत शेतकरी' : 'Registered Farmers'}
              </span>
            </div>

            <div className="px-2">
              <span className="block font-mono text-3xl md:text-4xl font-bold text-[#B8862E] tabular-nums">14</span>
              <span className="text-xs uppercase tracking-wider text-[#F3EEE1]/70 mt-1 block">
                {isMr ? 'प्रादेशिक खरेदी केंद्रे' : 'Mandi Outlets'}
              </span>
            </div>

            <div className="px-2">
              <span className="block font-mono text-3xl md:text-4xl font-bold text-[#B8862E] tabular-nums">120+</span>
              <span className="text-xs uppercase tracking-wider text-[#F3EEE1]/70 mt-1 block">
                {isMr ? 'वार्षिक कार्गो कंटेनर्स' : 'Cargo Export Containers'}
              </span>
            </div>

            <div className="px-2">
              <span className="block font-mono text-3xl md:text-4xl font-bold text-[#B8862E] tabular-nums">100%</span>
              <span className="text-xs uppercase tracking-wider text-[#F3EEE1]/70 mt-1 block">
                {isMr ? 'वेळेवर खाते भरणा' : 'Prompt Ledger Payout'}
              </span>
            </div>
          </div>

          {/* Rate Ticker Bar */}
          {rates.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[#B8862E]/20 flex items-center gap-4 overflow-x-auto text-xs font-mono">
              <span className="bg-[#B8862E] text-[#1C2A1E] px-2 py-0.5 font-bold uppercase tracking-wider rounded-xs shrink-0">
                {isMr ? 'आजचे बाजारभाव' : 'Daily Rates'}
              </span>
              <div className="flex items-center gap-6 whitespace-nowrap">
                {rates.map(r => (
                  <span key={r.id} className="text-[#F3EEE1]/90">
                    <strong className="text-[#B8862E]">{isMr ? r.cropName?.mr || r.cropName : r.cropName?.en || r.cropName}:</strong> ₹{r.ratePerKg || r.rate || '45'}/kg ({r.marketLocation || 'Solapur Mandi'})
                  </span>
                ))}
              </div>
            </div>
          )}

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
