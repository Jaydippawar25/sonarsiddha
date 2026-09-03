import React, { useState, useEffect } from 'react';
import image1 from '../assets/image1.png';
import logo from '../assets/logo.jpeg';

const About = ({ language }) => {
  const isMr = language === 'mr';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then(res => res.json())
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
    <section className="py-8 md:py-12 bg-[#F3EEE1] text-[#1C2A1E] border-b border-[#1C2A1E]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">01 // ABOUT SONARSIDDHA</span>
          <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Photo Frame with Static Curved Border & Ambient Shadow */}
          <div className="lg:col-span-5 relative">
            
            {/* Static Ambient Background Shadow Lighting Aura */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#2F5233]/20 via-[#B8862E]/20 to-[#2C3E63]/15 rounded-[3.5rem] blur-xl opacity-80 pointer-events-none"></div>

            {/* Main Outer Card with Thick Border & Curved Corners */}
            <div className="relative border-4 border-[#2F5233]/25 p-3.5 bg-white rounded-[2.5rem] shadow-xl">
              
              {/* Inner Image Container with Matching Curves */}
              <div className="relative h-[380px] md:h-[460px] overflow-hidden rounded-2xl bg-[#1C2A1E]/5">
                <img 
                  src={image1} 
                  alt="Sonarsiddha Field Operations" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Brand Badge */}
                <div className="absolute top-4 left-4 bg-[#1C2A1E]/90 backdrop-blur-md text-[#F3EEE1] px-3 py-1.5 rounded-full border border-[#B8862E]/50 flex items-center gap-2 shadow-lg">
                  <img src={logo} alt="Logo" className="w-6 h-6 rounded-full border border-[#B8862E]" />
                  <span className="text-[11px] font-mono tracking-wider font-bold">SONARSIDDHA TRADING</span>
                </div>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="p-3 bg-[#F3EEE1]/80 rounded-xl mt-3 border border-hairline flex items-center justify-between text-xs font-mono text-[#1C2A1E]/80">
                <span className="font-bold">{isMr ? 'गुणवत्ता तपासणी केंद्र' : 'Quality Inspection Center'}</span>
                <span className="text-[#B8862E] font-bold">ISO 9001:2015</span>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Copy & 28px Serif Pull-Quote */}
          <div className="lg:col-span-7 space-y-6">
            
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E] leading-tight">
              {isMr ? 'शेतकऱ्यांच्या प्रगतीचा खरा साथीदार' : 'A True Trading Companion in Farmer Prosperity'}
            </h2>

            {/* 28px Display Serif Pull Quote */}
            <blockquote className="border-l-2 border-[#B8862E] pl-6 py-2 my-4">
              <p className="font-display text-xl sm:text-2xl text-[#1C2A1E] leading-relaxed italic">
                {isMr 
                  ? '“आम्ही शेतकऱ्यांचे सक्षमीकरण करण्यासाठी आणि पारदर्शक वजनासह थेट बाजारातील वाजवी दर मिळवून देण्यासाठी कटिबद्ध आहोत.”' 
                  : '“We are dedicated to empowering farmers with direct market access, transparent weighing standards, and prompt financial settlements.”'}
              </p>
              <cite className="block mt-2 font-mono text-xs not-italic text-[#B8862E] uppercase tracking-wider">
                — {isMr ? 'सोनारसिद्ध संचालक मंडळ' : 'Sonarsiddha Management Board'}
              </cite>
            </blockquote>

            <p className="font-body text-base md:text-lg text-[#1C2A1E]/80 leading-relaxed">
              {isMr 
                ? 'शेतकऱ्यांना त्यांचे उत्पादन आणि नफा वाढवण्यास मदत व्हावी यासाठी आम्ही सातत्याने प्रयत्नशील असतो. आमचा ठाम विश्वास आहे की शेतकऱ्यांची प्रगती हीच आपल्या राष्ट्राच्या समृद्धीचा पाया आहे.' 
                : 'We continuously strive to help farmers increase their crop yield, quality standards, and profitability. We firmly believe that transparent trade infrastructure is the foundation of agricultural growth.'}
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-hairline text-sm font-mono">
              <div>
                <strong className="block text-[#B8862E]">{isMr ? 'पारदर्शक वजन' : 'Fair Weighing'}</strong>
                <span className="text-xs text-[#1C2A1E]/70">{isMr ? 'संगणकीय काटे व पावत्या' : 'Computerized mandi scales'}</span>
              </div>
              <div>
                <strong className="block text-[#B8862E]">{isMr ? 'थेट बँक भरणा' : 'Direct Payout'}</strong>
                <span className="text-xs text-[#1C2A1E]/70">{isMr ? '२४ तासांत खाते व्यवहार' : '24-hr ledger clearance'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;