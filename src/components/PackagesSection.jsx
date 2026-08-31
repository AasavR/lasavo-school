import React from 'react';
import { ASTROLAS_PACKAGES } from '../data/astrologyData';

export default function PackagesSection({ onSelectPackage }) {
  return (
    <section id="packages" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <span>✨</span>
          <span>Authentic Astrolas Series</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Curated Astrolas Series & Remedies
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Select from specialized Chaldean name correction, Lo Shu grid analysis, mobile SIM vibration tuning & VIP corporate brand alignment packages.
        </p>
      </div>

      {/* Grid of Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ASTROLAS_PACKAGES.map((pkg) => (
          <div 
            key={pkg.id}
            className="bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden group backdrop-blur-md"
          >
            {/* Top Badge */}
            {pkg.badge && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-500 text-slate-950 font-black text-[10px] uppercase px-4 py-1.5 rounded-bl-2xl shadow-md tracking-wider">
                {pkg.badge}
              </div>
            )}

            <div className="space-y-4">
              
              {/* Package Icon & Title */}
              <div className="flex items-center space-x-3 pt-2">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pkg.color} flex items-center justify-center text-2xl shadow-lg border border-white/20 shrink-0`}>
                  {pkg.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-serif leading-snug">{pkg.title}</h3>
                  <p className="text-[11px] text-amber-400 font-mono">{pkg.subtitle || pkg.curator}</p>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-amber-300 font-serif">{pkg.priceFormatted}</span>
                  <span className="text-xs text-slate-500 line-through ml-2 font-mono">{pkg.originalPrice}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-500/30">
                  {pkg.discountPercent}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {pkg.description}
              </p>

              {/* Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">What's Included:</p>
                <ul className="space-y-2 text-xs text-slate-200">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendation Note */}
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-200">
                <span className="font-bold text-purple-300">Best For: </span>
                {pkg.recommendedFor}
              </div>

            </div>

            {/* Book Button */}
            <button
              onClick={() => onSelectPackage(pkg)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform group-hover:scale-[1.02] flex items-center justify-center space-x-2 border border-amber-300/40"
            >
              <span>📜</span>
              <span>Book Astrolas Package ({pkg.priceFormatted})</span>
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}
