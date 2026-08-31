import React, { useState } from 'react';

export default function AstroHeader({ onOpenCalculator, onSelectPackage, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'calculator', label: 'Instant Calculator', icon: '🔢' },
    { id: 'packages', label: 'Vedic Astrolas Packages', icon: '✨' },
    { id: 'numerologists', label: 'Insta Numerologists', icon: '⭐' },
    { id: 'horoscope', label: 'Daily Horoscope', icon: '🌌' },
    { id: 'ai-chat', label: 'Astrolas AI Assistant', icon: '🔮' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl shadow-purple-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveSection('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all border border-amber-400/30">
            🔮
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 font-serif">
                ASTROLAS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Astro-Numerology
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">astrolas.netlify.app • Chaldean & Lo Shu Grid</p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeSection === item.id 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-500/10' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Action Button: Book Astrolas Consultation */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={() => onSelectPackage(null)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center space-x-2 border border-amber-300/40"
          >
            <span>📜</span>
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none"
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-amber-500/20 px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center space-x-3"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-900">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectPackage(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
            >
              📜 Book Astrolas Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
