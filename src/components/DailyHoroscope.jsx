import React, { useState } from 'react';
import { DAILY_HOROSCOPES } from '../data/astrologyData';

export default function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState(DAILY_HOROSCOPES[0]);

  return (
    <section id="horoscope" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <span>🌌</span>
          <span>Cosmic Transits</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Daily Zodiac Horoscope & Lucky Vibrations
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Select your Zodiac sign to check today's planetary transit, lucky numbers, gemstone affinity, and cosmic recommendation.
        </p>
      </div>

      {/* 12 Sign Selector Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {DAILY_HOROSCOPES.map((horo) => (
          <button
            key={horo.sign}
            onClick={() => setSelectedSign(horo)}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              selectedSign.sign === horo.sign
                ? 'bg-gradient-to-tr from-amber-500 to-yellow-600 border-amber-300 text-slate-950 shadow-xl shadow-amber-500/20 scale-105 font-bold'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:bg-slate-800'
            }`}
          >
            <div className="text-2xl mb-1">{horo.icon}</div>
            <div className="text-xs font-serif font-bold">{horo.sign}</div>
            <div className="text-[10px] opacity-80 font-mono">{horo.dates}</div>
          </button>
        ))}
      </div>

      {/* Selected Horoscope Detail Box */}
      {selectedSign && (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl font-serif text-amber-300">
                {selectedSign.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-serif">{selectedSign.sign} Daily Forecast</h3>
                <p className="text-xs text-amber-400 font-mono">{selectedSign.dates}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-bold">
                Lucky Number: <span className="text-white">{selectedSign.luckyNum}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-bold">
                Color: <span className="text-white">{selectedSign.luckyColor}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Planetary Alignment Today:</h4>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {selectedSign.transit}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
