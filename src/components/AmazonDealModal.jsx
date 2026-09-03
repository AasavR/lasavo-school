import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Sparkles, Copy, Check, ShieldCheck, Clock, ArrowRight, CreditCard } from 'lucide-react';
import { AMAZON_PRODUCT_URL, PRODUCT_DATA } from '../data/earbudsData';

export default function AmazonDealModal({ isOpen, onClose, lang, onPayOnline, paymentLoading }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 14, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const copyCoupon = () => {
    navigator.clipboard.writeText(PRODUCT_DATA.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0E1626] to-[#0B0F19] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{lang === 'hi' ? 'विशेष अमेज़न एवं ऑनलाइन डिस्काउंट' : 'Exclusive Deal & Razorpay Offer'}</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {lang === 'hi' ? '20% की अतिरिक्त छूट के साथ सीधे ऑर्डर करें!' : 'Get Extra 20% OFF — Order Direct or via Amazon!'}
          </h3>
        </div>

        {/* Coupon Code Copy Box */}
        <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-4 text-center space-y-3">
          <div className="text-xs text-slate-400 font-mono uppercase">
            {lang === 'hi' ? 'कूपन कोड (अमेज़न चेकआउट में डालें)' : 'Promo Code (Apply at Amazon Checkout)'}
          </div>
          <div className="flex items-center justify-between bg-slate-950 px-4 py-3 rounded-xl border border-dashed border-amber-500/60">
            <span className="text-2xl font-mono font-black text-amber-400 tracking-widest">
              {PRODUCT_DATA.couponCode}
            </span>
            <button
              onClick={copyCoupon}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'कोड कॉपी करें' : 'Copy Code'}</span>
                </>
              )}
            </button>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>{lang === 'hi' ? 'ऑफ़र समाप्त होने में समय:' : 'Offer Expires In:'}</span>
            <span className="font-mono font-bold text-rose-400">
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-300">
            <span>{lang === 'hi' ? 'मूल MRP' : 'Original Price'}</span>
            <span className="line-through text-slate-500">₹{PRODUCT_DATA.originalPrice}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>{lang === 'hi' ? 'अमेज़न डील प्राइस' : 'Amazon Deal Price'}</span>
            <span className="font-bold text-white">₹{PRODUCT_DATA.discountPrice}</span>
          </div>
          <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-2 text-base">
            <span>{lang === 'hi' ? 'अंतिम प्रभावी कीमत (ऑफ़र के साथ)' : 'Effective Price with Deal'}</span>
            <span className="text-xl font-black">₹1,039</span>
          </div>
        </div>

        {/* Payment Buttons Stack */}
        <div className="space-y-3">
          {/* Direct Razorpay Online Payment Button */}
          <button
            onClick={onPayOnline}
            disabled={paymentLoading}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/25 transition-all"
          >
            <CreditCard className="w-5 h-5 text-slate-950" />
            <span>{lang === 'hi' ? 'Razorpay से डायरेक्ट भुगतान करें (₹1,039)' : 'Pay Directly via Razorpay (₹1,039)'}</span>
          </button>

          {/* Direct Amazon Buy Link Button */}
          <a
            href={AMAZON_PRODUCT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-sm hover:bg-slate-700 transition-all"
          >
            <ShoppingCart className="w-4 h-4 fill-amber-300" />
            <span>{lang === 'hi' ? 'अमेज़न पर कूपन लागू करें' : 'Redeem Coupon on Amazon.in'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>1 Year Warranty</span>
          </div>
          <span>•</span>
          <div>Instant Order Receipt & Verification</div>
        </div>

      </div>
    </div>
  );
}
