import React from 'react';
import { Award, CheckCircle2, XCircle, ShoppingCart, ArrowRight } from 'lucide-react';
import { AMAZON_PRODUCT_URL, PRODUCT_DATA } from '../data/earbudsData';

export default function ComparisonMatrix({ lang }) {
  return (
    <section id="comparison" className="py-16 bg-gradient-to-b from-[#0B0F19] via-[#0D1424] to-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'hi' ? 'फ्लैगशिप तुलना' : 'Flagship Specification Comparison'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'hi' ? 'महंगे ब्रांड्स से बेहतर फीचर्स, एक तिहाई कीमत में' : 'Top Tier Features at 1/10th the Price'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'hi' 
              ? 'देखें कि लासावो प्रो कैसे अन्य महंगे प्रीमियम ब्रांड्स से अधिक प्लेटाइम और कम गेमिंग लेटेंसी प्रदान करता है।' 
              : 'See how Lasavo Audio Pro beats premium high-priced earbuds on battery life and gaming latency.'}
          </p>
        </div>

        {/* Comparison Table Box */}
        <div className="max-w-5xl mx-auto overflow-x-auto rounded-3xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="p-4 sm:p-6 text-sm font-bold text-slate-300">
                  {lang === 'hi' ? 'फीचर्स स्पेक्स' : 'Specifications'}
                </th>
                <th className="p-4 sm:p-6 text-base font-black text-cyan-400 bg-cyan-950/50 border-x border-cyan-500/30">
                  <div className="flex items-center gap-2">
                    <span>LASAVO PRO TWS</span>
                    <span className="text-[10px] bg-cyan-400 text-slate-950 px-2 py-0.5 rounded font-mono font-bold uppercase">WINNER</span>
                  </div>
                </th>
                <th className="p-4 sm:p-6 text-sm font-semibold text-slate-400">
                  AirPods Pro 2
                </th>
                <th className="p-4 sm:p-6 text-sm font-semibold text-slate-400">
                  Galaxy Buds 2 Pro
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {PRODUCT_DATA.comparison.map((item, idx) => (
                <tr key={idx} className={item.highlight ? 'bg-slate-900/60' : 'hover:bg-slate-900/40'}>
                  <td className="p-4 sm:p-6 font-medium text-slate-200">
                    {item.feature}
                  </td>
                  <td className="p-4 sm:p-6 font-bold text-cyan-300 bg-cyan-950/30 border-x border-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item.lasavo}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    {item.airpods}
                  </td>
                  <td className="p-4 sm:p-6 text-slate-400">
                    {item.galaxy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table Footer Action */}
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold text-base">
                {lang === 'hi' ? 'केवल ₹1,299 में सर्वश्रेष्ठ साउंड और 60 घंटे की पावर!' : 'Get Best Sound & 60 Hours Playtime for just ₹1,299!'}
              </div>
              <div className="text-slate-400 text-xs">
                {lang === 'hi' ? 'अमेज़न इंडिया पर फ्री 1-डे प्राइम डिलीवरी उपलब्ध' : 'Free 1-Day Prime Delivery available on Amazon India'}
              </div>
            </div>

            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm hover:scale-105 transition-transform"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'hi' ? 'अमेज़न से ऑर्डर करें' : 'Buy Now on Amazon'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
