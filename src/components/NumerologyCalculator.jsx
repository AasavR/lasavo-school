import React, { useState, useEffect } from 'react';
import { calculateNumerology } from '../services/numerologyEngine';

export default function NumerologyCalculator({ onBookPackage }) {
  const [name, setName] = useState('Aarav Sharma');
  const [dob, setDob] = useState('1996-08-18');
  const [mobile, setMobile] = useState('9876543210');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('loshu'); // 'loshu' | 'chaldean' | 'remedies'

  useEffect(() => {
    if (name || dob) {
      setResult(calculateNumerology(name, dob, mobile));
    }
  }, [name, dob, mobile]);

  return (
    <section id="calculator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider animate-pulse">
          <span>🔮</span>
          <span>Chaldean Numerology & Lo Shu Grid Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Decode Your Birth Chart & Name Vibration
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Enter your full name and Date of Birth to reveal your Driver (Mulank), Conductor (Bhagyank), Chaldean Name Total & 3x3 Lo Shu Grid map in real-time.
        </p>
      </div>

      {/* Calculator Input Form */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
              Full Registered Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium text-sm transition"
              />
              <span className="absolute right-3.5 top-3.5 text-slate-400">👤</span>
            </div>
            <p className="text-[11px] text-slate-400">Spelling as used in official documents</p>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
              Date of Birth *
            </label>
            <div className="relative">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 font-medium text-sm transition"
              />
            </div>
            <p className="text-[11px] text-slate-400">Determines Mulank & Bhagyank</p>
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
              Primary Mobile Number (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium text-sm transition"
              />
              <span className="absolute right-3.5 top-3.5 text-slate-400">📱</span>
            </div>
            <p className="text-[11px] text-slate-400">10-digit SIM total vibration check</p>
          </div>

        </div>
      </div>

      {/* Numerology Results Display */}
      {result && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Key Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Driver Number */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-500/40 space-y-3 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Driver (Mulank)</span>
                <span className="text-2xl">🌞</span>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-black text-amber-300 font-serif">{result.driverNumber}</span>
                <span className="text-xs text-amber-200 font-medium">{result.driverInfo.planet}</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">{result.driverInfo.nature}</p>
            </div>

            {/* Conductor Number */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/40 space-y-3 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Conductor (Bhagyank)</span>
                <span className="text-2xl">🌌</span>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-black text-purple-300 font-serif">{result.conductorNumber}</span>
                <span className="text-xs text-purple-200 font-medium">{result.conductorInfo.planet}</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">Life Path Destiny & Purpose</p>
            </div>

            {/* Chaldean Name Total */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/40 space-y-3 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Chaldean Name Total</span>
                <span className="text-2xl">🔤</span>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-black text-indigo-300 font-serif">{result.chaldeanNameNumber}</span>
                <span className="text-xs text-indigo-200 font-mono">(Compound {result.chaldeanCompound})</span>
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {result.isNameHarmonious ? '✓ Harmonious Name' : '⚠️ Name Fix Recommended'}
              </div>
            </div>

            {/* Mobile Total */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 space-y-3 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Mobile SIM Total</span>
                <span className="text-2xl">📱</span>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-black text-emerald-300 font-serif">{result.mobileSingleDigit}</span>
                <span className="text-xs text-emerald-200 font-mono">(Sum {result.mobileSum})</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                {result.mobileSingleDigit === 4 || result.mobileSingleDigit === 8 
                  ? '⚠️ Requires careful chart match' 
                  : '✓ Energetically Active'}
              </p>
            </div>

          </div>

          {/* Deep Tabs Section: Lo Shu Grid | Chaldean Breakdown | Remedies */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Tabs Selector */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
              <button
                onClick={() => setActiveTab('loshu')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'loshu'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ☯️ 3x3 Lo Shu Grid Energy Map
              </button>
              <button
                onClick={() => setActiveTab('chaldean')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'chaldean'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                🔠 Chaldean Letter Breakdown
              </button>
              <button
                onClick={() => setActiveTab('remedies')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'remedies'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                💎 Personalized Remedies ({result.missingNumbers.length} Missing)
              </button>
            </div>

            {/* Tab 1: Lo Shu Grid Map */}
            {activeTab === 'loshu' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                
                {/* 3x3 Grid Visual */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Lo Shu Grid Matrix (Birth Date Numerology)
                  </h3>
                  <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 max-w-md mx-auto">
                    {result.loShuLayout.map((row, rIdx) => 
                      row.map((num, cIdx) => {
                        const count = result.loShuCounts[num] || 0;
                        return (
                          <div 
                            key={`${rIdx}-${cIdx}`}
                            className={`h-24 rounded-xl flex flex-col items-center justify-center p-2 border transition-all ${
                              count > 0 
                                ? 'bg-gradient-to-tr from-amber-950/80 to-purple-950/80 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10' 
                                : 'bg-slate-900/50 border-slate-800 text-slate-600'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold text-slate-400">{num}</span>
                            <span className="text-2xl font-serif font-black">
                              {count > 0 ? Array(count).fill(num).join('') : '-'}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1">
                              {count > 0 ? `${count}x Present` : 'Missing'}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Grid Insights */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-2">
                    <p className="font-bold text-sm">Present Numbers in Chart:</p>
                    <p className="text-white font-bold">{result.presentNumbers.join(', ') || 'None'}</p>
                    <p className="text-[11px] text-slate-300">
                      These numbers represent your innate strengths, natural skills, and karmic gifts in this life cycle.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 space-y-2">
                    <p className="font-bold text-sm">Missing Numbers ({result.missingNumbers.length}):</p>
                    <p className="text-rose-300 font-bold">{result.missingNumbers.join(', ') || 'None'}</p>
                    <p className="text-[11px] text-slate-300">
                      Missing numbers point to areas requiring energetic remedies (crystals, metal watches, yantras & name spelling correction).
                    </p>
                  </div>

                  {/* Lucky Elements summary */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300">
                    <p className="text-amber-400 font-bold">Lucky Elements for Driver {result.driverNumber}:</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>• Color: <span className="text-white font-bold">{result.driverInfo.color}</span></div>
                      <div>• Day: <span className="text-white font-bold">{result.driverInfo.day}</span></div>
                      <div>• Gemstone: <span className="text-white font-bold">{result.driverInfo.gemstone}</span></div>
                      <div>• Friendly: <span className="text-emerald-400 font-bold">{result.friendlyNumbers.join(', ')}</span></div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Chaldean Breakdown */}
            {activeTab === 'chaldean' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Letter-by-Letter Chaldean Calculation ({result.fullName})
                  </h3>
                  <span className="text-xs font-mono text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                    Chaldean Total: {result.chaldeanCompound} $\rightarrow$ Single Digit: {result.chaldeanNameNumber}
                  </span>
                </div>

                {/* Letter Chips */}
                <div className="flex flex-wrap gap-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  {result.chaldeanLetterBreakdown.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl">
                      <span className="text-lg font-bold text-amber-300">{item.letter}</span>
                      <span className="text-xs font-mono text-slate-400">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <p className="font-bold text-amber-400">Why Chaldean Name Alignment Matters:</p>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    In ancient Chaldean numerology, every letter emits a specific planetary sound wave frequency. Aligning your compound name total to positive numbers like 24, 33, 42, or 51 neutralizes friction with your birth date.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Remedies */}
            {activeTab === 'remedies' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Specific Remedies for Missing Lo Shu Numbers
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.missingRemedies.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-sm font-serif">
                          {item.number}
                        </span>
                        <span className="text-xs font-bold text-slate-200">{item.planet}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-mono">
                        {item.remedy}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-purple-600/20 to-indigo-600/20 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white">Need Official Name Spelling & Signature Correction?</h4>
                    <p className="text-xs text-slate-300 mt-1">Get an in-depth 10-page report & 1-on-1 consultation by Master Astrolas numerologists.</p>
                  </div>
                  <button
                    onClick={() => onBookPackage(null)}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 shrink-0 hover:scale-105 transition"
                  >
                    ✨ Get Nakshatra Report (₹1,499)
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}
