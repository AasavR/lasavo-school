import React from 'react';
import { Star, ShieldCheck, Zap, BatteryCharging, Gamepad2, Mic, Play, ShoppingCart, CheckCircle2, ArrowRight, CreditCard, Sparkles } from 'lucide-react';
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
            
            {/* Amazon Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold shadow-inner">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'hi' ? 'अमेज़न इंडिया वेरिफ़ाइड TWS ईयरबड्स' : 'Amazon.in Verified Choice TWS Earbuds'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {lang === 'hi' ? (
                <>
                  महसूस करें <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">असली ऑडियो पावर</span> और 60 घंटे की बैटरी
                </>
              ) : (
                <>
                  Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Pure Audio Power</span> & 60H Playtime
                </>
              )}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {lang === 'hi' ? PRODUCT_DATA.taglineHi : PRODUCT_DATA.taglineEn}
            </p>

            {/* Ratings & Price Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              
              {/* Star Rating */}
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-white font-bold text-sm">4.9 / 5.0</span>
                <span className="text-slate-400 text-xs">(18,450+ {lang === 'hi' ? 'रिव्यूज' : 'reviews'})</span>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 px-4 py-1.5 rounded-xl">
                <span className="text-2xl sm:text-3xl font-black text-cyan-300">₹{PRODUCT_DATA.discountPrice}</span>
                <span className="text-sm text-slate-400 line-through">₹{PRODUCT_DATA.originalPrice}</span>
                <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded font-extrabold">
                  {PRODUCT_DATA.discountPercent}% OFF
                </span>
              </div>

            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              
              {/* Primary Razorpay Checkout Button */}
              <button
                onClick={onPayOnline}
                disabled={paymentLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-lg shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200"
              >
                <CreditCard className="w-6 h-6 text-slate-950" />
                <span>{lang === 'hi' ? 'ऑनलाइन भुगतान करें (Razorpay - ₹1,299)' : 'Pay Online with Razorpay (₹1,299)'}</span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </button>

              {/* Amazon Buy Button */}
              <a
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-slate-800/90 border border-amber-500/40 hover:bg-slate-700/90 text-amber-300 font-bold text-base shadow-lg transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5 fill-amber-300" />
                <span>{lang === 'hi' ? 'अमेज़न पर खरीदें' : 'Buy on Amazon'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-left">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <BatteryCharging className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="text-xs text-slate-400">{lang === 'hi' ? 'कुल प्लेटाइम' : 'Total Battery'}</div>
                <div className="text-sm font-bold text-white">60 Hours</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <Gamepad2 className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="text-xs text-slate-400">{lang === 'hi' ? 'गेमिंग लेटेंसी' : 'Low Latency'}</div>
                <div className="text-sm font-bold text-white">45ms Ultra-Low</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <Zap className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="text-xs text-slate-400">{lang === 'hi' ? 'फास्ट चार्जिंग' : 'Fast Charge'}</div>
                <div className="text-sm font-bold text-white">10m = 120m</div>
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
                alt="Lasavo Audio Pro TWS Wireless Earbuds"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Badges on Image */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                  {lang === 'hi' ? '13mm टाइटेनियम ड्राइवर्स' : '13mm Titanium Drivers'}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-amber-500/40 px-3 py-2 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">{lang === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Razorpay Checkout'}</div>
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
