import React from 'react';

export default function AstroFooter({ onBookPackage }) {
  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-xl text-white font-serif">
              🔮
            </div>
            <div>
              <span className="text-lg font-black text-white font-serif tracking-tight">ASTROLAS</span>
              <p className="text-[10px] text-amber-400 font-mono">astrolas.netlify.app</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            India's premier Chaldean numerology, Lo Shu grid analysis & Vedic Astro-branding platform. Inspired by leading Instagram numerologists.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">Numerology Tools</h4>
          <ul className="space-y-2">
            <li><a href="#calculator" className="hover:text-amber-400">Chaldean Name Calculator</a></li>
            <li><a href="#calculator" className="hover:text-amber-400">3x3 Lo Shu Grid Matrix</a></li>
            <li><a href="#horoscope" className="hover:text-amber-400">Daily Zodiac Transits</a></li>
            <li><a href="#ai-chat" className="hover:text-amber-400">24/7 AI Numerologist</a></li>
          </ul>
        </div>

        {/* Col 3: Astrolas Packages */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">Astrolas Packages</h4>
          <ul className="space-y-2">
            <li><button onClick={() => onBookPackage(null)} className="hover:text-amber-400 text-left">नक्षत्र पैकेज (₹1,499)</button></li>
            <li><button onClick={() => onBookPackage(null)} className="hover:text-amber-400 text-left">ग्रह दिशा (₹1,999)</button></li>
            <li><button onClick={() => onBookPackage(null)} className="hover:text-amber-400 text-left">दृष्टि / कालदृष्टि (₹2,499)</button></li>
            <li><button onClick={() => onBookPackage(null)} className="hover:text-amber-400 text-left">भाग्यचक्र (₹2,999)</button></li>
            <li><button onClick={() => onBookPackage(null)} className="hover:text-amber-400 text-left">कुंडली योग (₹4,999)</button></li>
            <li><button onClick={() => onBookPackage(null)} className="hover:text-amber-400 text-left">दिव्य दृष्टि (₹9,999)</button></li>
          </ul>
        </div>

        {/* Col 4: Secure Vault Badge */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">Encrypted Vault</h4>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-[11px]">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Astrolas Secure Checkout</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Supports UPI, Credit/Debit Cards, NetBanking, Paytm & GPay via 256-Bit SSL Encryption.
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-mono">
        <p>© 2026 Astrolas Astro-Numerology Platform (astrolas.netlify.app). All rights reserved.</p>
        <p className="mt-2 sm:mt-0 text-amber-400 font-bold">Designed for Authentic Astrolas Brand Excellence</p>
      </div>
    </footer>
  );
}
