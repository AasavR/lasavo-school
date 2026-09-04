import React from 'react';
import { Star, ShieldCheck, CheckCircle2, CreditCard, ShoppingCart, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { PRODUCT_MODELS, AMAZON_PRODUCT_URL } from '../data/earbudsData';

export default function ModelSelectionCatalog({ lang, onPayOnline, paymentLoading }) {
  return (
    <section id="models-catalog" className="py-16 sm:py-24 bg-gradient-to-b from-[#0B0F19] via-[#0E1626] to-[#0B0F19] relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase shadow-inner">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{lang === 'hi' ? 'ऑफिशियल लासावो मॉडल सीरीज' : 'Official Lasavo Earphone Lineup'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {lang === 'hi' ? (
              <>
                अपनी जरूरत के अनुसार चुनें <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">3 पावरफुल मॉडल</span>
              </>
            ) : (
              <>
                Choose Your Match from <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">3 Premium Models</span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {lang === 'hi'
              ? 'बजट वायर्ड इयरफ़ोन से लेकर स्पोर्ट्स वायरलेस और 60H फ्लैगशिप तक — हर साउंड लवर के लिए ₹350 से शुरू!'
              : 'From budget HD wired earphones to wireless sport earbuds and flagship 60H gaming TWS — starting at just ₹350!'}
          </p>
        </div>

        {/* 3 Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRODUCT_MODELS.map((model) => (
            <div
              key={model.id}
              className={`relative rounded-3xl bg-gradient-to-b ${model.gradient} border ${model.borderColor} p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:scale-[1.02] group`}
            >
              
              {/* Popular Badge overlay */}
              {model.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-lg border border-cyan-300">
                  {lang === 'hi' ? model.popularTagHi : model.popularTagEn}
                </div>
              )}

              <div className="space-y-6">
                
                {/* Header Badge & Name */}
                <div className="space-y-2">
                  <div className={`inline-block px-3 py-1 rounded-lg border text-xs font-mono font-bold ${model.badgeColor}`}>
                    {lang === 'hi' ? model.badgeHi : model.badgeEn}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {lang === 'hi' ? model.nameHi : model.nameEn}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {lang === 'hi' ? model.taglineHi : model.taglineEn}
                  </p>
                </div>

                {/* Pricing Box */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">
                    {lang === 'hi' ? 'विशेष ऑफर मूल्य' : 'Special Offer Price'}
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-4xl font-black ${model.priceColor}`}>₹{model.price}</span>
                    <span className="text-sm text-slate-400 line-through">₹{model.originalPrice}</span>
                    <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded font-extrabold ml-auto">
                      {model.discountPercent}% OFF
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white">{model.rating}</span>
                  <span className="text-slate-400">({model.reviewsCount.toLocaleString()} {lang === 'hi' ? 'रिव्यूज' : 'reviews'})</span>
                </div>

                {/* Key Specifications list */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    {lang === 'hi' ? 'मुख्य विशेषताएं:' : 'Key Highlights:'}
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {(lang === 'hi' ? model.featuresHi : model.featuresEn).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action CTAs */}
              <div className="pt-6 space-y-3">
                
                {/* Razorpay Online Payment */}
                <button
                  onClick={() => onPayOnline(model.price, lang === 'hi' ? model.nameHi : model.nameEn)}
                  disabled={paymentLoading}
                  className={`w-full py-3.5 px-4 rounded-xl bg-gradient-to-r ${model.btnGradient} flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all text-sm font-bold`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {lang === 'hi' 
                      ? `ऑनलाइन खरीदें (Razorpay - ₹${model.price})` 
                      : `Pay Online (Razorpay - ₹${model.price})`}
                  </span>
                </button>

                {/* Amazon Purchase Option */}
                <a
                  href={AMAZON_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 hover:bg-slate-800 flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 fill-amber-300" />
                  <span>{lang === 'hi' ? 'अमेज़न पर देखें' : 'Buy on Amazon'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

              </div>

            </div>
          ))}
        </div>

        {/* Brand Guarantee & Warranty Banner */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">
                {lang === 'hi' ? '100% असली उत्पाद और आधिकारिक 1 वर्ष वारंटी' : '100% Genuine Products & Official 1 Year Warranty'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'hi' ? 'Razorpay द्वारा सुरक्षित ऑनलाइन भुगतान (UPI, कार्ड्स, नेटबैंकिंग)' : 'Secured Online Payments via Razorpay (UPI, Credit/Debit Cards, NetBanking)'}
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'hi' ? 'मुफ्त एवं तेज़ शिपिंग' : 'Free & Express Shipping across India'}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
