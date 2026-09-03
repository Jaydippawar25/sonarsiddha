import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

const Footer = ({ language }) => {
  const isMr = language === 'mr';

  return (
    <footer className="bg-slate-900 text-slate-100 border-t-2 border-emerald-600 font-body relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Mission (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Sonarsiddhi Logo" className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover" />
              <div>
                <h3 className="font-display font-bold text-xl tracking-tight text-white">
                  {isMr ? 'सोनारसिद्धी' : 'SONARSIDDHI'}
                </h3>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-400 block -mt-0.5">
                  {isMr ? 'ट्रेडिंग हाऊस आणि मंडी' : 'Trading House & Mandi Portal'}
                </span>
              </div>
            </div>

            <p className="font-body text-sm text-slate-300 leading-relaxed max-w-sm">
              {isMr 
                ? 'सोनारसिद्ध ट्रेडिंग हाऊसच्या माध्यमातून शेतकऱ्यांना योग्य तोल, थेट खरेदी आणि खात्रीशीर बँक भरणा मिळवून देणारी एकमेव संस्था.' 
                : 'Connecting drumstick growers directly to national mandis and international cargo buyers with guaranteed weighing standards and prompt ledger settlements.'}
            </p>

            <div className="pt-2 flex items-center gap-2.5 font-mono text-xs text-emerald-400 font-semibold">
              <ShieldCheck size={16} className="text-amber-400" />
              <span>ISO 9001:2015 CERTIFIED TRADING HOUSE</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold border-b border-slate-800 pb-2">
              {isMr ? 'मुख्य विभाग' : 'Site Navigation'}
            </h4>
            <ul className="space-y-2 font-mono text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> {isMr ? 'मुखपृष्ठ' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> {isMr ? 'आमच्याबद्दल' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/farmer" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> {isMr ? 'शेतकरी नोंदणी' : 'Farmer Registration'}
                </Link>
              </li>
              <li>
                <Link to="/farmer-details" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> {isMr ? 'बाजारभाव व नियम' : 'Mandi Rates & Specs'}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> {isMr ? 'छायाचित्रे व व्हिडिओ' : 'Photo & Video Archive'}
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-400 font-bold pt-1">
                  <ExternalLink size={12} /> {isMr ? 'अ‍ॅडमिन लॉगिन' : 'Admin Back-Office'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold border-b border-slate-800 pb-2">
              {isMr ? 'संपर्क व पत्ता' : 'Contact & Office'}
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Solapur - Pune Highway, Maharashtra 413002, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-400 shrink-0" />
                <span>contact@sonarsiddha.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-emerald-400 shrink-0" />
                <span>Mon - Sat: 08:00 AM - 08:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Guarantee Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Sonarsiddha Exports & Trading House. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-amber-400 font-semibold text-[11px]">
            <span>100% COMPUTERIZED WEIGHING GUARANTEE</span>
            <span>•</span>
            <span>PROMPT LEDGER CLEARANCE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
