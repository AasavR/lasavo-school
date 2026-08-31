import React from 'react';
import { INSTA_NUMEROLOGISTS, TESTIMONIALS } from '../data/astrologyData';

export default function InstagramNumerologists({ onBookPackage }) {
  return (
    <section id="numerologists" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <span>⭐</span>
          <span>Featured Instagram Experts</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Top Indian Instagram Numerologists & Astrologers
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Learn from master numerology trendsetters who have transformed thousands of lives across Instagram & YouTube through Chaldean spelling alignment & Lo Shu remedies.
        </p>
      </div>

      {/* Numerologist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INSTA_NUMEROLOGISTS.map((expert) => (
          <div 
            key={expert.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 space-y-5 shadow-2xl transition duration-300 group"
          >
            <div className="flex items-center space-x-4">
              <img 
                src={expert.image} 
                alt={expert.name} 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/40 shadow-lg shrink-0"
              />
              <div>
                <h3 className="text-base font-bold text-white font-serif">{expert.name}</h3>
                <p className="text-xs text-amber-400 font-mono">{expert.handle}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {expert.followers} Followers
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="text-amber-400 font-bold">Specialty: </span>
              <span>{expert.specialty}</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {expert.bio}
            </p>

            <button
              onClick={() => onBookPackage(null)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs uppercase tracking-wider text-amber-300 transition duration-200"
            >
              Consult Astrolas Expert
            </button>
          </div>
        ))}
      </div>

      {/* Verified Client Testimonials */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-8 space-y-8 shadow-2xl">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white font-serif">Client Transformation Stories</h3>
          <p className="text-xs text-slate-400">Real results from verified Astrolas consultation clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex text-amber-400 text-sm">
                {'★'.repeat(test.rating)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed font-serif">
                "{test.quote}"
              </p>
              <div className="pt-2 border-t border-slate-900 font-mono text-[11px]">
                <p className="font-bold text-white">{test.name}</p>
                <p className="text-slate-400">{test.role}</p>
                <span className="text-amber-400 text-[10px]">{test.package}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
