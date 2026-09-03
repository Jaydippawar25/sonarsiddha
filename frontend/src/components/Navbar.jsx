import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { API_BASE } from '../config';

const DEFAULT_NAV_ITEMS = [
  { id: 1, nameEn: 'Home', nameMr: 'मुखपृष्ठ', path: '/' },
  { id: 2, nameEn: 'About Us', nameMr: 'आमच्याबद्दल', path: '/about' },
  { id: 3, nameEn: 'Farmer', nameMr: 'शेतकरी', path: '/farmer' },
  { id: 4, nameEn: 'Farmer Details', nameMr: 'शेतकरी माहिती', path: '/farmer-details' },
  { id: 5, nameEn: 'Gallery', nameMr: 'गॅलरी', path: '/gallery' }
];

const Navbar = ({ language, setLanguage }) => {
  const [navItems, setNavItems] = useState(DEFAULT_NAV_ITEMS);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_BASE}/navbar`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
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
      })
      .catch(err => {
        console.error("Error fetching navbar items:", err);
      });
  }, []);

  return (
    <header className="w-full bg-[#1C2A1E] text-white border-b-2 border-emerald-600/70 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src={logo} 
              alt="Sonarsiddhi Crest" 
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-amber-400 object-cover shadow-xs group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl tracking-tight text-white font-bold group-hover:text-amber-400 transition-colors leading-none">
                {language === 'mr' ? 'सोनारसिद्धी' : 'SONARSIDDHI'}
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-wider text-amber-400 uppercase font-mono font-semibold mt-0.5">
                {language === 'mr' ? 'ट्रेडिंग हाऊस आणि मंडी' : 'Trading House & Mandi'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`text-sm font-semibold transition-all py-1.5 border-b-2 ${
                    isActive 
                      ? 'border-amber-400 text-amber-400 font-bold' 
                      : 'border-transparent text-slate-200 hover:text-amber-400 hover:border-amber-400/50'
                  }`}
                >
                  {language === 'mr' ? item.nameMr : item.nameEn}
                </Link>
              );
            })}
          </nav>

          {/* Language Toggle & Admin Login Action */}
          <div className="hidden md:flex items-center gap-4">
            {/* Segmented Language Switcher Pill */}
            <div className="flex items-center p-1 bg-slate-900/90 rounded-full border border-slate-700 text-xs font-semibold shadow-xs">
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'mr' 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'en' 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ENG
              </button>
            </div>

            <Link
              to="/admin/login"
              className="text-xs font-mono font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              {language === 'mr' ? 'ॲडमिन लॉगिन' : 'Admin Login'}
            </Link>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center p-0.5 bg-slate-900 rounded-full border border-slate-700 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded-full ${language === 'mr' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                MR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full ${language === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-amber-400 focus:outline-none rounded-xl bg-slate-800 border border-slate-700"
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

      {/* Mobile Touch Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#1C2A1E] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className="block text-base font-semibold text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800"
              onClick={() => setIsOpen(false)}
            >
              {language === 'mr' ? item.nameMr : item.nameEn}
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="block text-xs uppercase tracking-wider text-amber-400 font-mono font-bold pt-3"
            onClick={() => setIsOpen(false)}
          >
            {language === 'mr' ? 'ॲडमिन लॉगिन' : 'Admin Login'}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
