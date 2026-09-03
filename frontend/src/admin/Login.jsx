import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../assets/logo.jpeg';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email === 'admin@gmail.com' && password === '123456') {
      localStorage.setItem('tempAdmin', 'true');
      toast.success('Operator authenticated');
      navigate('/admin/dashboard');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Operator authenticated');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Authentication failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('admin@gmail.com');
    setPassword('123456');
    localStorage.setItem('tempAdmin', 'true');
    toast.success('Demo Operator Authenticated!');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1C2A1E] text-[#F3EEE1] flex items-center justify-center p-4 font-body relative overflow-hidden">
      
      {/* Ambient Gold Background Glow */}
      <div className="absolute w-96 h-96 bg-[#B8862E]/15 rounded-full blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute w-72 h-72 bg-[#2F5233]/20 rounded-full blur-3xl pointer-events-none top-1/4 left-1/4"></div>

      {/* Main Executive Card */}
      <div className="relative z-10 w-full max-w-md bg-white text-[#1C2A1E] border-2 border-[#B8862E]/40 p-8 sm:p-10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
        
        {/* Header with Brand Crest */}
        <div className="text-center pb-5 mb-5 border-b border-[#1C2A1E]/15">
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-[#1C2A1E] border-2 border-[#B8862E] mb-3 shadow-md">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-[#1C2A1E]">
            SONARSIDDHA TRADING
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#B8862E] mt-1 font-bold">
            Back-Office & Mandi Console
          </p>
        </div>

        {/* Quick Demo Access Badge */}
        <div className="mb-6 p-3 bg-[#F3EEE1]/90 border border-[#B8862E]/40 rounded-2xl font-mono text-xs flex items-center justify-between shadow-sm">
          <div>
            <span className="font-bold text-[#B8862E] uppercase tracking-wider block">Demo Operator Access</span>
            <span className="text-[11px] text-[#1C2A1E]/80">admin@gmail.com / 123456</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="px-3 py-1.5 bg-[#B8862E] hover:bg-[#1C2A1E] text-[#F3EEE1] font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm cursor-pointer shrink-0"
          >
            Quick Login
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#1C2A1E]/80 mb-2 font-bold flex items-center gap-1.5">
              <Mail size={14} className="text-[#B8862E]" />
              <span>Operator Email</span>
            </label>
            <div className="relative">
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 bg-[#F3EEE1]/50 border-2 border-[#1C2A1E]/15 rounded-xl font-mono text-sm text-[#1C2A1E] focus:outline-none focus:border-[#B8862E] focus:bg-white transition-all shadow-inner"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sonarsiddha.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#1C2A1E]/80 mb-2 font-bold flex items-center gap-1.5">
              <Lock size={14} className="text-[#B8862E]" />
              <span>Access Secret</span>
            </label>
            <div className="relative">
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 bg-[#F3EEE1]/50 border-2 border-[#1C2A1E]/15 rounded-xl font-mono text-sm text-[#1C2A1E] focus:outline-none focus:border-[#B8862E] focus:bg-white transition-all shadow-inner tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2F5233] hover:bg-[#1C2A1E] text-[#F3EEE1] font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 border border-[#B8862E]/50 shadow-md hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            <span>{loading ? 'Authenticating...' : 'Authenticate Operator'}</span>
            <ArrowRight size={16} className="text-[#B8862E]" />
          </button>
        </form>

        {/* Security Badge Footer */}
        <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-[11px] font-mono text-[#1C2A1E]/60">
          <span className="flex items-center gap-1 text-[#2F5233] font-bold">
            <ShieldCheck size={14} className="text-[#B8862E]" />
            ENCRYPTED SESSION
          </span>
          <span className="text-[#B8862E] font-bold">SYS v2.4</span>
        </div>

      </div>
    </div>
  );
};

export default Login;
