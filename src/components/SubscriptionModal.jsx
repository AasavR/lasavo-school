import React, { useState } from 'react';

export default function SubscriptionModal({ isOpen, onClose, currentPlan = 'free', onSelectPlan }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const plans = [
    {
      id: 'starter',
      name: 'Starter Student',
      badge: 'Popular for K-10',
      priceINR: billingCycle === 'monthly' ? 499 : 4999,
      priceUSD: billingCycle === 'monthly' ? 9 : 89,
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      features: [
        'Access to all CBSE & ICSE Class 1-10 modules',
        '2-Way Interactive AI Avatar Tutor sessions (50 hrs/mo)',
        'NCERT Aligned Question Bank & Automated Quizzes',
        'Parent Progress Dashboard & TMS Analytics',
        'Basic Email Support'
      ],
      popular: false,
      color: 'from-blue-600 to-cyan-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white'
    },
    {
      id: 'pro',
      name: 'Pro Academy & SaaS Pass',
      badge: 'Best Value',
      priceINR: billingCycle === 'monthly' ? 1499 : 14999,
      priceUSD: billingCycle === 'monthly' ? 29 : 289,
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      features: [
        'Unrestricted Class 1-12 AI Avatar Video/Audio Tutoring',
        'Unlimited NCERT & JEE/NEET Practice Tests',
        'Full Civil Engineering BIM/CAD AI Analysis Tools',
        'RoofRestore Lead Generation & Prospecting Engine',
        '24/7 Priority AI Tutor & Engineer Support',
        'Multi-device simultaneous login'
      ],
      popular: true,
      color: 'from-indigo-600 to-purple-600',
      buttonBg: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30'
    },
    {
      id: 'enterprise',
      name: 'Enterprise & School Suite',
      badge: 'For Institutions',
      priceINR: billingCycle === 'monthly' ? 4999 : 49999,
      priceUSD: billingCycle === 'monthly' ? 99 : 999,
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      features: [
        'Unlimited School/Institution Accounts & Seat Licenses',
        'Customized NCERT Curriculum & Custom Avatar Training',
        'Automated PE Stamping Workbench & Bulk CAD/BIM AI',
        'Dedicated Outbound Lead Automation Campaign Manager',
        'API Access & Custom Webhook Integrations',
        'Dedicated Account Manager & SLA Guarantee'
      ],
      popular: false,
      color: 'from-amber-600 to-orange-600',
      buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white'
    }
  ];

  const handleCheckout = (plan) => {
    setLoadingPlan(plan.id);

    // Simulate Razorpay Gateway Integration
    setTimeout(() => {
      setLoadingPlan(null);
      setSuccessMessage(`Successfully subscribed to ${plan.name} (${currency} ${currency === 'INR' ? plan.priceINR : plan.priceUSD}${plan.period})!`);
      if (onSelectPlan) {
        onSelectPlan(plan.id);
      }
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full p-6 md:p-8 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-9 h-9 rounded-full flex items-center justify-center text-lg transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Lasavo Monetization & Subscriptions
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Unlock Full Access to Lasavo AI SaaS Suite
          </h2>
          <p className="text-xs text-slate-400">
            Scale your learning, engineering workflows, and lead generation with AI. Upgrade or change your plan anytime.
          </p>

          {/* Controls: Billing Cycle & Currency Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {/* Billing Cycle */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-xl font-bold transition ${
                  billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-xl font-bold transition flex items-center space-x-1 ${
                  billingCycle === 'yearly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Pass</span>
                <span className="text-[9px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-full uppercase font-black">
                  Save 20%
                </span>
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1 rounded-xl transition ${
                  currency === 'INR' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-xl transition ${
                  currency === 'USD' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs text-center font-bold animate-bounce">
            🎉 {successMessage}
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = currency === 'INR' ? `₹${plan.priceINR.toLocaleString('en-IN')}` : `$${plan.priceUSD}`;
            const isCurrent = currentPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`bg-slate-950 rounded-3xl p-6 border flex flex-col justify-between relative transition hover:scale-[1.02] ${
                  plan.popular
                    ? 'border-indigo-500/80 ring-2 ring-indigo-500/30 shadow-2xl shadow-indigo-500/10'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    {!plan.popular && (
                      <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline space-x-1 mb-6">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{price}</span>
                    <span className="text-xs text-slate-400 font-semibold">{plan.period}</span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-6 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-indigo-400 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout(plan)}
                  disabled={loadingPlan === plan.id || isCurrent}
                  className={`w-full py-3 rounded-2xl font-bold text-xs transition flex items-center justify-center space-x-2 ${
                    isCurrent
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                      : plan.buttonBg
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <span className="animate-pulse">Connecting to Razorpay...</span>
                  ) : isCurrent ? (
                    <span>Current Active Plan</span>
                  ) : (
                    <span>Subscribe via Razorpay 💳</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap justify-between items-center text-[11px] text-slate-500">
          <div className="flex items-center space-x-4">
            <span>🔒 256-Bit SSL Encrypted</span>
            <span>⚡ Instant Activation</span>
            <span>💳 Razorpay & UPI Supported</span>
          </div>
          <span>Cancel anytime with 1-click refund policy.</span>
        </div>

      </div>
    </div>
  );
}
