import React, { useState } from 'react';
import { Headphones, Globe, ShoppingCart, Menu, X, Sparkles, CreditCard } from 'lucide-react';
import { AMAZON_PRODUCT_URL } from '../data/earbudsData';

export default function EarbudsHeader({ lang, setLang, onOpenDealModal, onScrollToSection, onPayOnline, paymentLoading }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const navLinks = [
    { id: 'models-catalog', labelEn: '3 Models (₹350-₹1299)', labelHi: '3 मॉडल (₹350-₹1299)' },
    { id: 'sound-simulator', labelEn: 'Sound Test', labelHi: 'साउंड टेस्ट' },
    { id: 'features', labelEn: 'Features', labelHi: 'विशेषताएं' },
    { id: 'customizer', labelEn: '360° Colors', labelHi: 'कलर वेरिएंट' },
    { id: 'battery', labelEn: 'Playtime', labelHi: 'बैटरी लाइफ' },
    { id: 'comparison', labelEn: 'Compare Specs', labelHi: 'तुलना करें' },
    { id: 'reviews', labelEn: 'Reviews', labelHi: 'रिव्यूज' },
    { id: 'faq', labelEn: 'FAQ', labelHi: 'सवाल-जवाब' }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0F19]/90 border-b border-cyan-500/20 shadow-2xl transition-all duration-300">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
        <span>
          {lang === 'hi' 
            ? '🔥 3 नए मॉडल लॉन्च! ₹350, ₹500 और ₹1,299 में डायरेक्ट Razorpay द्वारा ऑनलाइन खरीदें!' 
            : '🔥 3 Models Available! Shop online via Razorpay at ₹350, ₹500 & ₹1,299!'}
        </span>
        <span className="hidden md:inline bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
          {lang === 'hi' ? 'लाइव भुगतान' : 'Live Razorpay'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/40">
              <Headphones className="w-6 h-6 text-white transform -rotate-12" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 uppercase">
                  LASAVO
                </span>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-1.5 py-0.5 rounded font-mono font-bold">
                  MODELS
                </span>
              </div>
              <p className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase">
                {lang === 'hi' ? 'ईयरफोन सीरीज' : 'Earphone Lineup'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="px-2.5 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-all duration-200"
              >
                {lang === 'hi' ? link.labelHi : link.labelEn}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Toggle Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-cyan-500/30 text-slate-200 text-xs sm:text-sm font-semibold hover:border-cyan-400 hover:bg-slate-700/80 transition-all shadow-md"
              title={lang === 'en' ? "Switch to Hindi (हिंदी में बदलें)" : "Switch to English"}
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'en' ? 'हिंदी 🇮🇳' : 'EN 🇬🇧'}</span>
            </button>

            {/* View Models CTA Button */}
            <button
              onClick={() => onScrollToSection('models-catalog')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all duration-200"
            >
              <CreditCard className="w-4 h-4 text-slate-950" />
              <span>{lang === 'hi' ? '3 मॉडल देखें (₹350+)' : 'Explore 3 Models (₹350+)'}</span>
            </button>

            {/* Direct Amazon CTA Button */}
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-amber-500/40 text-amber-300 font-semibold text-xs hover:bg-slate-700 transition-all"
            >
              <ShoppingCart className="w-4 h-4 fill-amber-300" />
              <span>{lang === 'hi' ? 'अमेज़न' : 'Amazon'}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1322] border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onScrollToSection(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400 font-medium text-sm"
            >
              {lang === 'hi' ? link.labelHi : link.labelEn}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection('models-catalog');
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-lg"
            >
              <CreditCard className="w-4 h-4" />
              <span>{lang === 'hi' ? '3 मॉडल खरीदें (₹350, ₹500, ₹1,299)' : 'Buy 3 Models (₹350, ₹500, ₹1,299)'}</span>
            </button>
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'hi' ? 'अमेज़न पर देखें' : 'View on Amazon'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
