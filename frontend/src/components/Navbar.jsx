import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Navbar = ({ language, setLanguage }) => {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/api/navbar')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          data.sort((a, b) => a.id - b.id);
          
          const galleryIndex = data.findIndex(item => item.path === '/gallery');
          let galleryItem = null;
          if (galleryIndex !== -1) {
            galleryItem = data.splice(galleryIndex, 1)[0];
            galleryItem.nameEn = 'Gallery';
            galleryItem.nameMr = 'गॅलरी';
          }

          const farmerIndex = data.findIndex(item => item.path === '/farmer');
          if (farmerIndex !== -1) {
            data.splice(farmerIndex + 1, 0, {
              id: 99,
              nameEn: 'Farmer Details',
              nameMr: 'शेतकरी माहिती',
              path: '/farmer-details'
            });
          } else {
            data.push({
              id: 99,
              nameEn: 'Farmer Details',
              nameMr: 'शेतकरी माहिती',
              path: '/farmer-details'
            });
          }

          if (galleryItem) {
            data.push(galleryItem);
          }

          setNavItems(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching navbar items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <header className="w-full bg-[#1C2A1E] text-[#F3EEE1] border-b-2 border-[#B8862E]/60 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Wordmark & Small Crest */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img 
              src={logo} 
              alt="Sonarsiddhi Crest" 
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-[#B8862E] object-cover shadow-sm" 
            />
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-xl tracking-tight text-[#F3EEE1] font-bold group-hover:text-[#B8862E] transition-colors leading-none">
                {language === 'mr' ? 'सोनारसिद्धी' : 'SONARSIDDHI'}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-[#B8862E] uppercase font-mono mt-0.5">
                {language === 'mr' ? 'ट्रेडिंग हाऊस आणि मंडी' : 'Trading House & Mandi'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {!loading && navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`text-sm font-medium transition-all py-1 border-b-2 ${
                    isActive 
                      ? 'border-[#B8862E] text-[#B8862E] font-bold' 
                      : 'border-transparent text-[#F3EEE1]/80 hover:text-[#F3EEE1] hover:border-[#B8862E]/40'
                  }`}
                >
                  {language === 'mr' ? item.nameMr : item.nameEn}
                </Link>
              );
            })}
          </nav>

          {/* Language Toggle (MR / EN) & Admin Backoffice Link */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center border border-[#B8862E]/50 rounded-full overflow-hidden text-xs font-mono bg-[#1C2A1E]/80 shadow-xs">
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1 transition-all cursor-pointer ${
                  language === 'mr' 
                    ? 'bg-[#B8862E] text-[#1C2A1E] font-bold shadow-xs' 
                    : 'bg-transparent text-[#F3EEE1]/70 hover:text-[#F3EEE1]'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 transition-all cursor-pointer ${
                  language === 'en' 
                    ? 'bg-[#B8862E] text-[#1C2A1E] font-bold shadow-xs' 
                    : 'bg-transparent text-[#F3EEE1]/70 hover:text-[#F3EEE1]'
                }`}
              >
                ENG
              </button>
            </div>

            <Link
              to="/admin/login"
              className="text-xs uppercase tracking-wider font-mono text-[#F3EEE1]/80 hover:text-[#B8862E] border border-[#B8862E]/40 hover:border-[#B8862E] px-3 py-1 rounded-lg transition-all"
            >
              {language === 'mr' ? 'अ‍ॅडमिन लॉगिन' : 'Admin Login'}
            </Link>
          </div>

          {/* Mobile Menu Trigger & Language Pill */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center border border-[#B8862E]/50 rounded-full overflow-hidden text-[11px] font-mono bg-[#1C2A1E]">
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 ${language === 'mr' ? 'bg-[#B8862E] text-[#1C2A1E] font-bold' : 'text-[#F3EEE1]/70'}`}
              >
                MR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 ${language === 'en' ? 'bg-[#B8862E] text-[#1C2A1E] font-bold' : 'text-[#F3EEE1]/70'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-[#F3EEE1] hover:text-[#B8862E] focus:outline-none rounded-lg bg-[#2C3E63]/40 border border-[#B8862E]/30"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-[#B8862E]/30 bg-[#1C2A1E] px-4 pt-3 pb-6 space-y-3">
          {!loading && navItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className="block text-base text-[#F3EEE1]/90 hover:text-[#B8862E] py-1 border-b border-[#B8862E]/10"
              onClick={() => setIsOpen(false)}
            >
              {language === 'mr' ? item.nameMr : item.nameEn}
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="block text-xs uppercase tracking-widest text-[#B8862E] font-mono pt-2"
            onClick={() => setIsOpen(false)}
          >
            {language === 'mr' ? 'अ‍ॅडमिन लॉगिन' : 'Admin Login'}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
