import React, { useState } from 'react';
import { BatteryCharging, Zap, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCT_DATA } from '../data/earbudsData';

export default function BatteryCalculator({ lang }) {
  const [dailyHours, setDailyHours] = useState(4);

  const totalDays = (60 / dailyHours).toFixed(1);

  return (
    <section id="battery" className="py-16 bg-[#0B0F19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-[#0D1525] to-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <BatteryCharging className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'hi' ? 'स्मार्ट बैटरी कैलकुलेटर' : 'Smart Playtime Calculator'}</span>
            </div>
            <h2 className="text-3xl font-black text-white">
              {lang === 'hi' ? '60 घंटे की बैटरी आपके लिए कितने दिन चलेगी?' : 'How Long Will 60 Hours Last For You?'}
            </h2>
            <p className="text-slate-400 text-sm">
              {lang === 'hi' 
                ? 'स्लाइडर को हिलाकर अपने दैनिक उपयोग के अनुसार बैटरी बैकअप देखें।' 
                : 'Drag the slider to see how many days of continuous power you get based on your daily usage.'}
            </p>
          </div>

          {/* Slider Input Box */}
          <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-white">
              <span>{lang === 'hi' ? 'दैनिक सुनने का समय' : 'Daily Listening Hours'}</span>
              <span className="text-cyan-400 text-xl font-mono">{dailyHours} {lang === 'hi' ? 'घंटे / दिन' : 'hrs / day'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>1 hr (Light use)</span>
              <span>4 hrs (Average)</span>
              <span>8 hrs (Heavy gaming)</span>
              <span>12 hrs (Non-stop)</span>
            </div>
          </div>

          {/* Calculation Metrics Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center space-y-1">
              <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400 uppercase font-mono">{lang === 'hi' ? 'कुल दिन' : 'Total Days Without Charging Case'}</div>
              <div className="text-3xl font-black text-white">{totalDays} {lang === 'hi' ? 'दिन' : 'Days'}</div>
              <div className="text-[11px] text-cyan-400 font-medium">
                {lang === 'hi' ? 'बिना प्लग लगाए 60 घंटे की लाइफ' : 'Full 60H capacity'}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-center space-y-1">
              <Zap className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400 uppercase font-mono">{lang === 'hi' ? 'टाइप-सी फास्ट चार्ज' : 'Type-C Fast Charge'}</div>
              <div className="text-3xl font-black text-white">10 Min = 2 Hours</div>
              <div className="text-[11px] text-blue-400 font-medium">
                {lang === 'hi' ? '10 मिनट चार्ज पर 120 मिनट प्लेबैक' : 'Flash Charging Speed'}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400 uppercase font-mono">{lang === 'hi' ? 'केस रीचार्ज' : 'Case Battery Recharges'}</div>
              <div className="text-3xl font-black text-white">5 Full Cycles</div>
              <div className="text-[11px] text-emerald-400 font-medium">
                {lang === 'hi' ? 'एलईडी डिजिटल डिस्प्ले केस' : 'LED Percentage Screen'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
