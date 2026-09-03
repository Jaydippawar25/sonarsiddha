import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import image1 from '../assets/image1.png';
import logo from '../assets/logo.jpeg';
import { API_BASE } from '../config';

const About = ({ language }) => {
  const isMr = language === 'mr';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/about`)
      .then(res => res.ok ? res.json() : {})
      .then(aboutData => {
        setData(aboutData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching about data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 px-4 bg-[#F3EEE1] text-center">
        <div className="max-w-xs mx-auto space-y-3">
          <div className="h-1 w-full bg-[#1C2A1E]/10 rounded overflow-hidden">
            <div className="h-full bg-[#B8862E] w-2/3 animate-pulse"></div>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#1C2A1E]/60">
            {isMr ? 'माहिती लोड होत आहे...' : 'Loading Ledger Data...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              01 // ABOUT SONARSIDDHA
            </span>
            <span className="h-px bg-slate-200 flex-grow"></span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Photo Frame with Modern Curved Border & Shadow */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal delay={100}>
              <div className="relative border-4 border-emerald-600/20 p-3 bg-white rounded-3xl shadow-md">
                
                {/* Inner Image Container */}
                <div className="relative h-[380px] md:h-[450px] overflow-hidden rounded-2xl bg-slate-100 group">
                  <img 
                    src={image1} 
                    alt="Sonarsiddha Field Operations" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Brand Badge */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full border border-emerald-500/50 flex items-center gap-2 shadow-lg">
                    <img src={logo} alt="Logo" className="w-5 h-5 rounded-full border border-emerald-400" />
                    <span className="text-xs font-mono tracking-wider font-bold text-emerald-400">
                      {isMr ? 'सोनारसिद्धी ट्रेडिंग' : 'SONARSIDDHI TRADING'}
                    </span>
                  </div>
                </div>

                {/* Bottom Metadata Bar */}
                <div className="p-3 bg-slate-50 rounded-xl mt-3 border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                  <span className="font-bold">{isMr ? 'गुणवत्ता तपासणी केंद्र' : 'Quality Inspection Center'}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">ISO 9001:2015</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal delay={200}>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {isMr ? 'शेतकऱ्यांच्या प्रगतीचा खरा साथीदार' : 'A True Trading Companion in Farmer Prosperity'}
              </h2>

              {/* Display Pull Quote */}
              <blockquote className="border-l-4 border-emerald-600 pl-5 py-2 my-4 bg-emerald-50/50 rounded-r-2xl">
                <p className="font-display text-lg sm:text-xl text-slate-800 font-semibold leading-relaxed">
                  {isMr 
                    ? '“आम्ही शेतकऱ्यांचे सक्षमीकरण करण्यासाठी आणि पारदर्शक वजनासह थेट बाजारातील वाजवी दर मिळवून देण्यासाठी कटिबद्ध आहोत.”' 
                    : '“We are dedicated to empowering farmers with direct market access, transparent weighing standards, and prompt financial settlements.”'}
                </p>
                <cite className="block mt-2 font-mono text-xs not-italic text-emerald-700 font-bold uppercase tracking-wider">
                  — {isMr ? 'सोनारसिद्ध संचालक मंडळ' : 'Sonarsiddha Management Board'}
                </cite>
              </blockquote>

              <p className="font-body text-base text-slate-600 leading-relaxed">
                {isMr 
                  ? 'शेतकऱ्यांना त्यांचे उत्पादन आणि नफा वाढवण्यास मदत व्हावी यासाठी आम्ही सातत्याने प्रयत्नशील असतो. आमचा ठाम विश्वास आहे की शेतकऱ्यांची प्रगती हीच आपल्या राष्ट्राच्या समृद्धीचा पाया आहे.' 
                  : 'We continuously strive to help farmers increase their crop yield, quality standards, and profitability. We firmly believe that transparent trade infrastructure is the foundation of agricultural growth.'}
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-200 text-sm font-mono">
                <div>
                  <strong className="block text-emerald-700 font-bold">{isMr ? 'पारदर्शक वजन' : 'Fair Weighing'}</strong>
                  <span className="text-xs text-slate-500">{isMr ? 'संगणकीय काटे व पावत्या' : 'Computerized mandi scales'}</span>
                </div>
                <div>
                  <strong className="block text-amber-600 font-bold">{isMr ? 'थेट बँक भरणा' : 'Direct Bank Payout'}</strong>
                  <span className="text-xs text-slate-500">{isMr ? '२४ तासांत जमा' : 'Prompt 24hr ledger transfer'}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;