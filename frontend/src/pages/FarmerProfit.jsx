import React, { useState, useEffect } from 'react';
import farmImage from '../assets/shevga_drumsticks.jpg';
import { API_BASE } from '../config';

const FarmerProfit = ({ language }) => {
  const isMr = language === 'mr';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/profit`)
      .then(res => res.ok ? res.json() : {})
      .then(profitData => {
        setData(profitData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profit data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-[#F3EEE1] text-center font-mono text-xs uppercase tracking-widest text-[#1C2A1E]/60">
        {isMr ? 'लेखापरीक्षण डेटा लोड होत आहे...' : 'Loading Mandi Financial Ledger...'}
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <section className="py-8 md:py-12 bg-[#FFFFFF] text-[#1C2A1E] border-b border-[#1C2A1E]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">02 // FINANCIAL LEDGER</span>
          <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
        </div>

        <div className="mb-10 text-left">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E]">
            {isMr ? 'एक एकर शेवगा शेती: खर्चाचे व नफ्याचे गणित' : 'Financial Ledger: 1 Acre Drumstick Economics'}
          </h2>
          <p className="font-body text-base text-[#1C2A1E]/70 mt-2">
            {isMr ? 'व्यापारी अंदाज व उत्पादन खतावणी' : 'Estimated Mandi Input Costs & Net Profit Balance Sheet'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real Produce Photo Specification Sheet with Static Curved Border */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#2F5233]/20 via-[#B8862E]/20 to-transparent rounded-[3.5rem] blur-xl opacity-80 pointer-events-none"></div>
            <div className="relative border-4 border-[#2F5233]/25 bg-white p-3.5 rounded-[2.5rem] shadow-xl">
              <img 
                src={farmImage} 
                alt="Drumstick Produce Lot" 
                className="w-full h-[340px] object-cover rounded-2xl"
              />
              <div className="mt-3 p-3 bg-[#FFFFFF] rounded-xl border border-[#B8862E]/30 font-mono text-xs space-y-1.5 text-[#1C2A1E]/80">
                <div className="flex justify-between">
                  <span>{isMr ? 'पिकाची जात' : 'Crop Variety'}:</span>
                  <strong className="text-[#B8862E]">OIDC-3 Shevga</strong>
                </div>
              <div className="flex justify-between">
                <span>{isMr ? 'अंदाजे उत्पन्न' : 'Est. Yield / Acre'}:</span>
                <span>12 - 15 Tons</span>
              </div>
              <div className="flex justify-between">
                <span>{isMr ? 'सरासरी बाजारभाव' : 'Avg. Mandi Rate'}:</span>
                <span className="tabular-nums text-[#B8862E]">₹40 - ₹60 / kg</span>
              </div>
            </div>
          </div>
        </div>

          {/* Right Column: Authentic Mandi Trade Ledger Table */}
          <div className="lg:col-span-7 bg-white border border-[#1C2A1E]/20 p-6 rounded-xs shadow-xs">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1C2A1E]/20 font-mono text-xs uppercase tracking-wider text-[#1C2A1E]/60">
              <span>{isMr ? 'तपशील / खतावणी' : 'Ledger Line Item'}</span>
              <span className="text-right">{isMr ? 'अंदाजे रक्कम (₹)' : 'Est. Amount (INR)'}</span>
            </div>

            <div className="divide-y divide-[#1C2A1E]/10">
              {data?.expenses?.map((item, index) => (
                <div key={item.id || index} className="py-3.5 flex items-center justify-between hover:bg-[#F3EEE1]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#B8862E]">0{index + 1}.</span>
                    <span className="font-body text-sm font-medium text-[#1C2A1E]">
                      {isMr ? item.nameMr : item.nameEn}
                    </span>
                  </div>
                  <span className="font-mono text-base font-bold text-[#1C2A1E] tabular-nums text-right">
                    ₹{formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Expense Row */}
            <div className="mt-6 pt-4 border-t-2 border-[#1C2A1E] flex items-center justify-between font-mono">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#1C2A1E]/70 block">
                  {isMr ? 'एकूण वार्षिक खर्च' : 'Total Operating Expense'}
                </span>
                <span className="text-sm font-bold text-[#1C2A1E]">
                  {isMr ? data?.totalLabelMr : data?.totalLabelEn}
                </span>
              </div>
              <span className="text-xl font-bold text-[#8C4A2F] tabular-nums text-right">
                ₹{formatCurrency(data?.totalAmount || 45000)}
              </span>
            </div>

            {/* Highlight Computed Profit Row (Field Green Ledger Block) */}
            <div className="mt-6 p-5 bg-gradient-to-r from-[#2F5233] to-[#1C2A1E] text-[#F3EEE1] rounded-2xl border-2 border-[#B8862E] flex items-center justify-between shadow-xl hover-lift animate-pulse-glow">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8862E] font-bold block">
                  {isMr ? 'अंदाजे नि्व्वळ नफा (प्रति एकर)' : 'Estimated Net Profit Balance (Per Acre)'}
                </span>
                <span className="font-display text-lg font-bold">
                  {isMr ? 'वार्षिक निव्वळ उत्पन्न' : 'Annual Net Realization'}
                </span>
              </div>
              <span className="font-mono text-2xl font-bold text-[#B8862E] tabular-nums text-right">
                ₹4,50,000+
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FarmerProfit;
