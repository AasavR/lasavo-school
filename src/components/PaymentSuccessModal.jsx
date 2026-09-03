import React, { useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Copy, Check, X, Headphones, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentSuccessModal({ isOpen, onClose, paymentDetails, lang }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger festive confetti explosion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen || !paymentDetails) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0E1626] to-[#0B0F19] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {lang === 'hi' ? 'भुगतान सफल रहा! 🎉' : 'Payment Successful! 🎉'}
          </h3>
          <p className="text-sm text-slate-300">
            {lang === 'hi'
              ? 'आपके Lasavo Pro TWS ईयरबड्स का ऑर्डर सफलतापूर्वक कन्फर्म हो गया है।'
              : 'Your order for Lasavo Pro TWS Earbuds has been successfully confirmed.'}
          </p>
        </div>

        {/* Payment Summary Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 font-sans text-sm">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-slate-400">{lang === 'hi' ? 'भुगतान स्थिति' : 'Payment Status'}</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'hi' ? 'सत्यापित (Paid)' : 'VERIFIED PAID'}</span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">{lang === 'hi' ? 'पेमेंट आईडी' : 'Payment ID'}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-300 font-bold">{paymentDetails.payment_id}</span>
              <button
                onClick={() => copyToClipboard(paymentDetails.payment_id)}
                className="text-slate-400 hover:text-white"
                title="Copy Payment ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">{lang === 'hi' ? 'ऑर्डर आईडी' : 'Order ID'}</span>
            <span className="font-mono text-slate-200 font-semibold">{paymentDetails.order_id}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            <span className="text-slate-300 font-bold">{lang === 'hi' ? 'कुल भुगतान राशि' : 'Total Paid'}</span>
            <span className="text-xl font-black text-amber-400">₹{paymentDetails.amount || 1299}</span>
          </div>
        </div>

        {/* Product Info Badge */}
        <div className="flex items-center gap-3 p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl">
          <Headphones className="w-8 h-8 text-cyan-400 flex-shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-white">Lasavo Audio Pro TWS Earbuds</div>
            <div className="text-slate-400">60H Playtime • 45ms Gaming Latency • Fast Charge</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base shadow-lg shadow-cyan-500/25 transition-all"
        >
          {lang === 'hi' ? 'होम पेज पर लौटें' : 'Back to Home'}
        </button>

      </div>
    </div>
  );
}
