import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import logo from '../assets/logo.jpeg';
import { LayoutDashboard, Users, MapPin, Package, DollarSign, Award, Video, LogOut, Menu, X, ShieldCheck, Globe } from 'lucide-react';

const AdminLayout = ({ language = 'mr', setLanguage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMr = language === 'mr';

  const toggleLanguage = () => {
    if (setLanguage) {
      const nextLang = language === 'mr' ? 'en' : 'mr';
      setLanguage(nextLang);
      toast.success(nextLang === 'mr' ? 'भाषा: मराठी सेट केली' : 'Language: English set');
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('tempAdmin');
      await signOut(auth);
      toast.success(isMr ? 'लॉगआउट यशस्वी' : 'Logged out');
      navigate('/');
    } catch (error) {
      localStorage.removeItem('tempAdmin');
      toast.success(isMr ? 'लॉगआउट यशस्वी' : 'Logged out');
      navigate('/');
    }
  };

  const navItems = [
    { 
      nameEn: 'Dashboard Overview', 
      nameMr: 'डॅशबोर्ड', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard size={18} /> 
    },
    { 
      nameEn: 'Mandi Outlets', 
      nameMr: 'खरेदी केंद्रे', 
      path: '/admin/branches', 
      icon: <MapPin size={18} /> 
    },
    { 
      nameEn: 'Trade Members', 
      nameMr: 'कार्यकारी मंडळ', 
      path: '/admin/members', 
      icon: <Users size={18} /> 
    },
    { 
      nameEn: 'Seeds & Products', 
      nameMr: 'बियाणे व उत्पादने', 
      path: '/admin/products', 
      icon: <Package size={18} /> 
    },
    { 
      nameEn: 'Daily Mandi Rates', 
      nameMr: 'दैनंदिन बाजारभाव', 
      path: '/admin/daily-rates', 
      icon: <DollarSign size={18} /> 
    },
    { 
      nameEn: 'Certifications', 
      nameMr: 'प्रमाणपत्रे', 
      path: '/admin/certifications', 
      icon: <Award size={18} /> 
    },
    { 
      nameEn: 'Field Recordings', 
      nameMr: 'व्हिडिओ दालन', 
      path: '/admin/videos', 
      icon: <Video size={18} /> 
    },
    { 
      nameEn: 'Farmer Ledger Model', 
      nameMr: 'शेतकरी नफा गणित', 
      path: '/admin/profit', 
      icon: <DollarSign size={18} /> 
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F3EEE1] text-[#1C2A1E] font-body overflow-hidden">
      
      {/* Mobile Top Navigation Bar (< md) */}
      <header className="md:hidden bg-[#1C2A1E] text-[#F3EEE1] border-b border-[#B8862E]/40 px-4 py-3 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Logo" className="w-7 h-7 rounded-full border border-[#B8862E]" />
          <span className="font-display font-bold text-base tracking-tight text-[#F3EEE1]">
            {isMr ? 'सोनारसिद्धी' : 'SONARSIDDHI'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#F3EEE1]/10 hover:bg-[#B8862E] border border-[#B8862E]/40 rounded-full text-xs font-mono transition-colors text-[#F3EEE1] cursor-pointer"
          >
            <Globe size={12} className="text-[#B8862E]" />
            <span className="font-bold">{isMr ? 'मराठी' : 'ENG'}</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-[#2C3E63] text-[#F3EEE1] border border-[#B8862E]/30 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop Overlay (< md) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer Sidebar (< md) */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#1C2A1E] text-[#F3EEE1] flex flex-col border-r border-[#1C2A1E] z-50 transform transition-transform duration-300 md:hidden ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-5 border-b border-[#F3EEE1]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full border border-[#B8862E]" />
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight text-[#F3EEE1]">
                {isMr ? 'सोनारसिद्धी' : 'SONARSIDDHI'}
              </h2>
              <span className="text-[10px] font-body font-bold uppercase tracking-widest text-[#B8862E] block -mt-0.5">
                {isMr ? 'बॅक-ऑफिस कंसोल' : 'Console'}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#F3EEE1]/60 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const label = isMr ? item.nameMr : item.nameEn;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-body font-semibold transition-all ${
                  isActive 
                    ? 'bg-[#2C3E63] text-white font-bold shadow-sm' 
                    : 'text-[#F3EEE1]/80 hover:bg-[#F3EEE1]/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#F3EEE1]/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-body font-bold text-[#8C4A2F] hover:bg-[#8C4A2F]/20 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span className="uppercase tracking-wider">
              {isMr ? 'सत्र समाप्त (लॉगआउट)' : 'Terminate Session'}
            </span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar (>= md) */}
      <aside className="hidden md:flex w-64 bg-[#1C2A1E] text-[#F3EEE1] flex-col border-r border-[#1C2A1E] shrink-0">
        <div className="p-5 border-b border-[#F3EEE1]/10 flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-full border border-[#B8862E]" />
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-[#F3EEE1]">
              {isMr ? 'सोनारसिद्धी' : 'SONARSIDDHI'}
            </h2>
            <span className="text-[10px] font-body font-bold uppercase tracking-widest text-[#B8862E] block -mt-0.5">
              {isMr ? 'बॅक-ऑफिस कंसोल' : 'Back-Office Console'}
            </span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const label = isMr ? item.nameMr : item.nameEn;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-body font-semibold transition-all ${
                  isActive 
                    ? 'bg-[#2C3E63] text-white font-bold shadow-sm' 
                    : 'text-[#F3EEE1]/80 hover:bg-[#F3EEE1]/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#F3EEE1]/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-body font-bold text-[#8C4A2F] hover:bg-[#8C4A2F]/20 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span className="uppercase tracking-wider">
              {isMr ? 'सत्र समाप्त (लॉगआउट)' : 'Terminate Session'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="hidden md:flex bg-white border-b border-hairline px-8 py-4 items-center justify-between">
          <h1 className="font-display text-xl font-bold text-[#1C2A1E]">
            {isMr ? 'बॅक-ऑफिस व्यापार कामकाज प्रणाली' : 'Back-Office Trade Operations'}
          </h1>
          
          <div className="flex items-center gap-4">
            {/* Desktop Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F3EEE1] hover:bg-[#B8862E] hover:text-white border border-[#B8862E]/40 rounded-full text-xs font-mono transition-all text-[#1C2A1E] cursor-pointer shadow-xs"
            >
              <Globe size={14} className="text-[#B8862E]" />
              <span className="font-bold">{isMr ? 'मराठी' : 'ENGLISH'}</span>
            </button>

            <div className="font-body text-xs font-bold text-[#2C3E63] bg-[#2C3E63]/10 px-3 py-1 rounded-lg flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#B8862E]" />
              <span>{isMr ? 'ऑपरेटर: प्रमाणित' : 'OPERATOR: AUTHENTICATED'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#F3EEE1] bg-farm-pattern">
          <Outlet context={{ language, setLanguage }} />
        </main>
      </div>
      
    </div>
  );
};

export default AdminLayout;
