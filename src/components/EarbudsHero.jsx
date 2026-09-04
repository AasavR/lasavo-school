import React from 'react';
import { Star, ShieldCheck, Zap, BatteryCharging, Gamepad2, Mic, Play, ShoppingCart, CheckCircle2, ArrowRight, CreditCard, Sparkles, Layers } from 'lucide-react';
import { AMAZON_PRODUCT_URL, PRODUCT_DATA } from '../data/earbudsData';

export default function EarbudsHero({ lang, onOpenDealModal, onScrollToSection, onPayOnline, paymentLoading }) {
  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#0E1626] to-[#0B0F19]">
      
      {/* Background Glowing Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Product Information & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 3 Model Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{lang === 'hi' ? 'लासावो ईयरफोन 3 मॉडल रेंज: ₹350, ₹500, ₹1,299' : '3 Model Lineup Available: ₹350, ₹500 & ₹1,299'}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {lang === 'hi' ? (
                <>
                  महसूस करें <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">असली साउंड पावर</span> 3 अलग-अलग मॉडल में
                </>
              ) : (
                <>
                  Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">Pure Audio Power</span> Across 3 Models
                </>
              )}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {lang === 'hi' 
                ? 'डीप बेस वायर्ड इयरफ़ोन (₹350), स्पोर्ट्स TWS (₹500), और 60H फ्लैगशिप गेमिंग बड्स (₹1,299) — अपनी पसंद का मॉडल ऑनलाइन खरीदें!' 
                : 'HD Bass Wired Earphones (₹350), AirPulse Sport TWS (₹500), and 60H Flagship Gaming Earbuds (₹1,299) — direct online checkout via Razorpay!'}
            </p>

            {/* 3 Price Badges Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 max-w-md mx-auto lg:mx-0">
              <div 
                onClick={() => onScrollToSection('models-catalog')}
                className="cursor-pointer p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 text-center transition-all"
              >
                <div className="text-[10px] text-emerald-400 font-mono font-bold uppercase">{lang === 'hi' ? 'बजट वायर्ड' : 'Wired HD'}</div>
                <div className="text-xl font-black text-emerald-300">₹350</div>
              </div>

              <div 
                onClick={() => onScrollToSection('models-catalog')}
                className="cursor-pointer p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/50 hover:border-cyan-400 text-center transition-all ring-2 ring-cyan-500/30"
              >
                <div className="text-[10px] text-cyan-400 font-mono font-bold uppercase">{lang === 'hi' ? 'स्पोर्ट्स TWS' : 'Sport TWS'}</div>
                <div className="text-xl font-black text-cyan-300">₹500</div>
              </div>

              <div 
                onClick={() => onScrollToSection('models-catalog')}
                className="cursor-pointer p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 text-center transition-all"
              >
                <div className="text-[10px] text-amber-400 font-mono font-bold uppercase">{lang === 'hi' ? 'फ्लैगशिप 60H' : 'Flagship Pro'}</div>
                <div className="text-xl font-black text-amber-300">₹1,299</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              
              {/* Select Model Button */}
              <button
                onClick={() => onScrollToSection('models-catalog')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-lg shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all duration-200"
              >
                <Layers className="w-6 h-6 text-slate-950" />
                <span>{lang === 'hi' ? '3 मॉडल देखें एवं खरीदें (₹350+)' : 'Explore 3 Models (₹350+)'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Direct Amazon Buy Button */}
              <a
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-slate-800/90 border border-amber-500/40 hover:bg-slate-700/90 text-amber-300 font-bold text-base shadow-lg transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5 fill-amber-300" />
                <span>{lang === 'hi' ? 'अमेज़न पर देखें' : 'Buy on Amazon'}</span>
              </a>

            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-left">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <BatteryCharging className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="text-xs text-slate-400">{lang === 'hi' ? 'फ्लैगशिप बैटरी' : 'Total Battery'}</div>
                <div className="text-sm font-bold text-white">Up to 60 Hours</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <Gamepad2 className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="text-xs text-slate-400">{lang === 'hi' ? 'गेमिंग लेटेंसी' : 'Low Latency'}</div>
                <div className="text-sm font-bold text-white">45ms Ultra-Low</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <Zap className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="text-xs text-slate-400">{lang === 'hi' ? 'शुरुआती कीमत' : 'Price Starting'}</div>
                <div className="text-sm font-bold text-emerald-400">₹350 Only</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <Mic className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="text-xs text-slate-400">{lang === 'hi' ? 'कॉल नॉइज़' : 'Noise Cancel'}</div>
                <div className="text-sm font-bold text-white">Quad-Mic ENC</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Product Display */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glowing Backdrop Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />
            
            {/* Product Image Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-slate-900/80 group">
              <img
                src="/earbuds_hero.jpg"
                alt="Lasavo Audio Earphone Series"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Badges on Image */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                  {lang === 'hi' ? '3 मॉडल रेंज: ₹350 - ₹1,299' : '3 Models: ₹350 to ₹1,299'}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-amber-500/40 px-3 py-2 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">{lang === 'hi' ? 'सुरक्षित ऑनलाइन भुगतान' : 'Live Razorpay Payments'}</div>
                  <div className="text-xs font-bold text-white">{lang === 'hi' ? 'UPI, कार्ड्स एवं नेटबैंकिंग' : 'UPI, Cards & NetBanking'}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
