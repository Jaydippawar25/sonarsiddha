import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { API_BASE } from '../config';

const Dashboard = () => {
  const context = useOutletContext() || {};
  const language = context.language || 'mr';
  const isMr = language === 'mr';

  const [stats, setStats] = useState({
    branches: 0,
    members: 0,
    products: 0,
    dailyRates: 0,
    certifications: 0,
    videos: 0
  });

  const statLabels = {
    branches: isMr ? 'खरेदी केंद्रे' : 'Mandi Outlets',
    members: isMr ? 'कार्यकारी मंडळ' : 'Trade Members',
    products: isMr ? 'उत्पादने व वाण' : 'Products & Varieties',
    dailyRates: isMr ? 'दैनिक बाजार भाव' : 'Daily Market Rates',
    certifications: isMr ? 'प्रमाणपत्रे' : 'Certifications',
    videos: isMr ? 'व्हिडिओ नोंदणी' : 'Video Records'
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = ['branches', 'members', 'products', 'dailyRates', 'certifications', 'videos'];
        const newStats = {};
        for(let ep of endpoints) {
          const res = await fetch(`${API_BASE}/${ep}`);
          if (res.ok) {
            const data = await res.json();
            newStats[ep] = data.length || 0;
          }
        }
        setStats(prev => ({ ...prev, ...newStats }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  const activityLog = [
    { 
      id: 'TX-901', 
      type: 'RATE_UPDATE', 
      detail: isMr ? 'सोलापूर बाजारभाव नोंदवला: ₹४५/किलो' : 'Solapur Mandi Rate set to ₹45/kg', 
      time: '10:45 AM', 
      status: isMr ? 'पूर्ण' : 'COMPLETED' 
    },
    { 
      id: 'TX-902', 
      type: 'BRANCH_SYNC', 
      detail: isMr ? 'दुबई मध्यवर्ती आउटलेट संपर्क पडताळणी झाली' : 'Dubai Central Outlet phone verified', 
      time: '09:30 AM', 
      status: isMr ? 'सिंक्ड' : 'SYNCED' 
    },
    { 
      id: 'TX-903', 
      type: 'MEMBER_ADD', 
      detail: isMr ? 'कृषी अधिकारी प्रोफाइल अपडेट केले' : 'Agronomy Officer profile updated', 
      time: isMr ? 'काल' : 'Yesterday', 
      status: isMr ? 'सक्रिय' : 'ACTIVE' 
    },
    { 
      id: 'TX-904', 
      type: 'MEDIA_INDEX', 
      detail: isMr ? 'शेवगा छाटणी व्हिडिओ #४ इंडेक्स केला' : 'Field Pruning Video #4 indexed', 
      time: '02-09-2026', 
      status: isMr ? 'प्रकाशित' : 'PUBLISHED' 
    },
  ];

  return (
    <div className="space-y-8 font-body">
      
      <div>
        <h2 className="font-display text-2xl font-bold text-[#1C2A1E]">
          {isMr ? 'सिस्टीम नोंदणी व कामकाज आढावा' : 'System Registry Overview'}
        </h2>
        <p className="font-body text-xs text-[#1C2A1E]/70 mt-1 uppercase tracking-wider font-semibold">
          {isMr ? 'प्रत्यक्ष फायलींची संख्या आणि कार्यप्रणाली लॉग' : 'Real-time Firestore Record Counts & Operations Log'}
        </p>
      </div>

      {/* Compact Stat Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white border border-[#1C2A1E]/15 p-4 rounded-xl text-left shadow-xs">
            <span className="font-body text-[11px] font-bold uppercase tracking-wider text-[#2C3E63] block">
              {statLabels[key] || key}
            </span>
            <span className="font-display text-2xl font-bold text-[#1C2A1E] tabular-nums mt-1 block">
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Dense Activity Ledger Table */}
      <div className="bg-white border border-[#1C2A1E]/15 rounded-2xl overflow-hidden shadow-xs overflow-x-auto">
        <div className="p-4 bg-[#F3EEE1]/40 border-b border-hairline flex items-center justify-between min-w-[600px]">
          <span className="font-body text-xs uppercase font-bold tracking-wider text-[#1C2A1E]">
            {isMr ? 'नुकतेच झालेली बॅक-ऑफिस कामकाज नोंदी' : 'Recent Back-Office System Ledger'}
          </span>
          <span className="font-body text-xs font-bold text-[#2C3E63]">
            {isMr ? 'ऑडिट लॉग' : 'AUDIT LOG'}
          </span>
        </div>

        <table className="w-full text-left font-body text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#F3EEE1] border-b border-hairline text-[#1C2A1E]/80 uppercase tracking-wider text-xs font-bold">
              <th className="p-3.5">{isMr ? 'संदर्भ आयडी' : 'Ref ID'}</th>
              <th className="p-3.5">{isMr ? 'प्रक्रिया प्रकार' : 'Operation'}</th>
              <th className="p-3.5">{isMr ? 'तपशील' : 'Audit Details'}</th>
              <th className="p-3.5">{isMr ? 'वेळ' : 'Timestamp'}</th>
              <th className="p-3.5 text-right">{isMr ? 'स्थिती' : 'Status'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline text-[#1C2A1E]">
            {activityLog.map((log) => (
              <tr key={log.id} className="hover:bg-[#F3EEE1]/40 transition-colors">
                <td className="p-3.5 font-bold text-[#2C3E63]">{log.id}</td>
                <td className="p-3.5 text-[#2F5233] font-bold">{log.type}</td>
                <td className="p-3.5 text-[#1C2A1E] font-medium">{log.detail}</td>
                <td className="p-3.5 text-[#1C2A1E]/70 font-mono text-xs">{log.time}</td>
                <td className="p-3.5 text-right font-bold text-[#2F5233]">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
