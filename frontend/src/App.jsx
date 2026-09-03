import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import logo from './assets/logo.jpeg'

// Public Pages
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Farmer from './pages/Farmer'
import Gallery from './pages/Gallery'
import PhotoGallery from './pages/PhotoGallery'
import FarmerDetails from './pages/FarmerDetails'
import FarmerRequirements from './pages/FarmerRequirements'

// Admin Pages
import Login from './admin/Login'
import ProtectedRoute from './admin/ProtectedRoute'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import Branches from './admin/Branches'
import Members from './admin/Members'
import Products from './admin/Products'
import DailyRates from './admin/DailyRates'
import Profit from './admin/Profit'

function App() {
  const [language, setLanguage] = useState('mr')
  const [initialLoading, setInitialLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1C2A1E] text-[#F3EEE1] flex flex-col items-center justify-center p-4 font-body overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#B8862E]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center space-y-5 text-center max-w-sm">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 border-2 border-dashed border-[#B8862E]/60 rounded-full animate-spin-slow"></div>
            <img 
              src={logo} 
              alt="Sonarsiddha Crest" 
              className="w-14 h-14 rounded-full border border-[#B8862E] object-cover relative z-10 shadow-lg" 
            />
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-2xl font-bold tracking-wider text-[#F3EEE1]">
              SONARSIDDHA
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#B8862E]">
              Trading House & Mandi Portal
            </p>
          </div>
          
          <div className="w-56 h-1.5 bg-[#F3EEE1]/10 rounded-full overflow-hidden border border-[#B8862E]/20 mt-2 p-0.5">
            <div className="h-full bg-[#B8862E] rounded-full animate-progress-fill"></div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#F3EEE1]/70">
            <span className="tabular-nums font-bold text-[#B8862E]">{progress}%</span>
            <span className="text-[#F3EEE1]/40">|</span>
            <span>
              {language === 'mr' ? 'बाजारभाव व खतावणी लोड होत आहे...' : 'Loading Mandi Trade System...'}
            </span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={
          <div className="min-h-screen bg-[#F3EEE1] bg-farm-pattern flex flex-col font-body">
            <Navbar language={language} setLanguage={setLanguage} />
            <main className="flex-grow">
              <Home language={language} />
            </main>
            <Footer language={language} />
          </div>
        } />
        
        <Route path="/about" element={
          <div className="min-h-screen bg-[#F3EEE1] bg-farm-pattern flex flex-col font-body">
            <Navbar language={language} setLanguage={setLanguage} />
            <main className="flex-grow">
              <About language={language} />
            </main>
            <Footer language={language} />
          </div>
        } />
        
        <Route path="/farmer" element={
          <div className="min-h-screen bg-[#F3EEE1] bg-farm-pattern flex flex-col font-body">
            <Navbar language={language} setLanguage={setLanguage} />
            <main className="flex-grow">
              <Farmer language={language} />
            </main>
            <Footer language={language} />
          </div>
        } />
        
        <Route path="/gallery" element={
          <div className="min-h-screen bg-[#F3EEE1] bg-farm-pattern flex flex-col font-body">
            <Navbar language={language} setLanguage={setLanguage} />
            <main className="flex-grow">
              <PhotoGallery language={language} />
            </main>
            <Footer language={language} />
          </div>
        } />
        
        <Route path="/farmer-details" element={
          <div className="min-h-screen bg-[#F3EEE1] bg-farm-pattern flex flex-col font-body">
            <Navbar language={language} setLanguage={setLanguage} />
            <main className="flex-grow">
              <FarmerDetails language={language} />
              <FarmerRequirements language={language} />
            </main>
            <Footer language={language} />
          </div>
        } />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout language={language} setLanguage={setLanguage} />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="branches" element={<Branches />} />
          <Route path="members" element={<Members />} />
          <Route path="products" element={<Products />} />
          <Route path="daily-rates" element={<DailyRates />} />
          <Route path="profit" element={<Profit />} />
          <Route path="*" element={<div className="font-mono text-base p-8 text-[#1C2A1E]">Module Coming Soon</div>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
