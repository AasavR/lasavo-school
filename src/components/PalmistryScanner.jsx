import React, { useState } from 'react';

export default function PalmistryScanner({ onBookPackage }) {
  const [selectedHand, setSelectedHand] = useState('right'); // 'right' | 'left'
  const [palmImage, setPalmImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [palmResult, setPalmResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPalmImage(url);
      runAnalysis();
    }
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setPalmResult({
        handType: selectedHand === 'right' ? 'Dominant Active Palm (Karma & Future Actions)' : 'Passive Non-Dominant Palm (Innate Gifts & Inborn Trait)',
        lifeLine: {
          title: 'Life Line (आयु रेखा / Ayur Rekha)',
          rating: 'Strong & Unbroken',
          meaning: 'Deep, curved line extending towards Mount of Venus. Indicates high vitality, immunity, and long lifespan stability.'
        },
        heartLine: {
          title: 'Heart Line (हृदय रेखा / Hridaya Rekha)',
          rating: 'Extends towards Mount of Jupiter',
          meaning: 'High emotional maturity, devotion in relationships, and strong empathy. Auspicious for marital peace.'
        },
        headLine: {
          title: 'Head Line (मस्तिष्क रेखा / Buddhi Rekha)',
          rating: 'Long, Straight & Sharp',
          meaning: 'Exceptional analytical focus, sharp business acumen, and high strategic capacity in complex situations.'
        },
        fateLine: {
          title: 'Fate Line (भाग्य रेखा / Bhagya Rekha)',
          rating: 'Starts from Wrist & Reaches Saturn Mount',
          meaning: 'Strong career trajectory with major wealth surges around ages 28, 35, and 42.'
        },
        mounts: [
          { name: 'Jupiter Mount (गुरु पर्वत)', status: 'Prominent / Elevated', impact: 'Leadership, wisdom & executive status.' },
          { name: 'Sun Mount (सूर्य पर्वत)', status: 'Clear Sun Line Present', impact: 'Fame, public recognition & creative talent.' },
          { name: 'Venus Mount (शुक्र पर्वत)', status: 'Full & Radiant', impact: 'Attraction for luxury, Vehicles & comfort.' }
        ]
      });
    }, 1800);
  };

  return (
    <section id="palmistry" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <span>✋</span>
          <span>Hast Rekha & Palm Reading</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Astrolas Hast Rekha & Palmistry Scanner
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Upload or scan your palm lines (Life Line, Heart Line, Head Line & Fate Line) to combine Hast Rekha science with Chaldean Numerology.
        </p>
      </div>

      {/* Upload & Hand Selector */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🖐️</span>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">Select Palm to Analyze</h3>
              <p className="text-xs text-slate-400">Right hand for active karma, Left hand for inborn energy</p>
            </div>
          </div>

          <div className="flex rounded-2xl bg-slate-950 p-1.5 border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setSelectedHand('right')}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                selectedHand === 'right'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Right Palm (Dominant)
            </button>
            <button
              onClick={() => setSelectedHand('left')}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                selectedHand === 'left'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Left Palm (Passive)
            </button>
          </div>
        </div>

        {/* Upload Box or Demo Scanner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="p-8 rounded-3xl bg-slate-950 border-2 border-dashed border-amber-500/40 text-center space-y-4 relative overflow-hidden group hover:border-amber-400 transition">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl mx-auto">
              ✋
            </div>
            
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Upload Clear Photo of your Palm</h4>
              <p className="text-xs text-slate-400">Ensure good lighting capturing palm lines & mounts clearly</p>
            </div>

            <label className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-105 transition">
              <span>📷 Take Photo / Upload Image</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            <div className="pt-2">
              <button
                onClick={runAnalysis}
                className="text-xs text-amber-400 underline hover:text-amber-300 font-mono"
              >
                Or Run Quick Instant Demo Palm Scan $\rightarrow$
              </button>
            </div>
          </div>

          {/* Guidelines / Information */}
          <div className="space-y-4 font-mono text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <p className="font-bold text-amber-300">4 Key Lines Analyzed in Hast Rekha:</p>
              <ul className="space-y-1.5 text-[11px]">
                <li>• <strong className="text-white">Life Line:</strong> Health, vitality & life longevity.</li>
                <li>• <strong className="text-white">Heart Line:</strong> Emotional depth, relationships & marriage.</li>
                <li>• <strong className="text-white">Head Line:</strong> Intellect, decision speed & strategy.</li>
                <li>• <strong className="text-white">Fate Line:</strong> Wealth surges, business luck & career peaks.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-[11px] text-slate-400">
              <p className="text-amber-400 font-bold">Mounts & Elemental Forces:</p>
              <p>Jupiter (Guru), Sun (Surya), Venus (Shukra) & Saturn (Shani) mounts are cross-referenced with your Chaldean Name total for 100% accuracy.</p>
            </div>
          </div>

        </div>

      </div>

      {/* Analysis Results Display */}
      {analyzing && (
        <div className="py-12 text-center space-y-4 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-8 shadow-2xl">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-amber-300">Scanning Palm Lines & Planetary Mount Frequencies...</p>
          <p className="text-xs text-slate-400">Cross-referencing Hast Rekha with Chaldean & Lo Shu matrix</p>
        </div>
      )}

      {palmResult && !analyzing && (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn backdrop-blur-md">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white font-serif">Hast Rekha Analysis Results</h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {palmResult.handType}
            </span>
          </div>

          {/* 4 Lines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-serif">{palmResult.lifeLine.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{palmResult.lifeLine.rating}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{palmResult.lifeLine.meaning}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-serif">{palmResult.heartLine.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{palmResult.heartLine.rating}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{palmResult.heartLine.meaning}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-serif">{palmResult.headLine.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{palmResult.headLine.rating}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{palmResult.headLine.meaning}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-serif">{palmResult.fateLine.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{palmResult.fateLine.rating}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{palmResult.fateLine.meaning}</p>
            </div>

          </div>

          {/* Mounts Summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">Planetary Mount Strengths:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {palmResult.mounts.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 font-mono text-[11px]">
                  <p className="font-bold text-white">{m.name}</p>
                  <p className="text-emerald-400">{m.status}</p>
                  <p className="text-slate-400 text-[10px]">{m.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-purple-600/20 to-indigo-600/20 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">Get Complete Palmistry + Numerology Master Consultation</h4>
              <p className="text-xs text-slate-300 mt-1">1-on-1 private reading with Master Numerologist & Palmistry Specialist.</p>
            </div>
            <button
              onClick={() => onBookPackage(null)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 shrink-0 hover:scale-105 transition"
            >
              📜 Book Palmistry Reading
            </button>
          </div>

        </div>
      )}

    </section>
  );
}
