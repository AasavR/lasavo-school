import React, { useState } from 'react';
import { ASTROLAS_PACKAGES } from '../data/astrologyData';

export default function RazorpayModal({ isOpen, onClose, selectedPackage }) {
  const [customerName, setCustomerName] = useState('Aarav Sharma');
  const [customerEmail, setCustomerEmail] = useState('aarav.sharma@example.com');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [dob, setDob] = useState('1996-08-18');
  const [birthTime, setBirthTime] = useState('10:30 AM');
  const [birthCity, setBirthCity] = useState('New Delhi');
  
  const [activePackage, setActivePackage] = useState(selectedPackage || ASTROLAS_PACKAGES[0]);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null | 'verifying' | 'success' | 'failed'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentPkg = selectedPackage || activePackage;
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TWRYKe5DWcerEE';

  const handleStartPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Call Backend Order Endpoint
      const orderAmountPaise = (currentPkg.price || 1499) * 100; // in paise
      
      let createOrderRes;
      try {
        createOrderRes = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: orderAmountPaise,
            currency: 'INR',
            receipt: `rcpt_astrolas_${Date.now()}`,
            notes: {
              package_id: currentPkg.id,
              package_title: currentPkg.title,
              customer_name: customerName,
              customer_email: customerEmail,
              customer_phone: customerPhone,
              dob: dob
            }
          })
        });
      } catch (err) {
        // Fallback to Netlify direct function path if relative rewrite fails
        createOrderRes = await fetch('/.netlify/functions/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: orderAmountPaise,
            currency: 'INR',
            receipt: `rcpt_astrolas_${Date.now()}`,
            notes: { package_title: currentPkg.title, customer_name: customerName }
          })
        });
      }

      if (!createOrderRes.ok) {
        const errData = await createOrderRes.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to initialize Astrolas secure booking order');
      }

      const orderData = await createOrderRes.json();
      const orderId = orderData.id || orderData.order_id;

      // 2. Open Standard Secure Payment Modal
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Payment gateway SDK failed to load. Please check your internet connection.');
      }

      const options = {
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Astrolas Astro-Numerology',
        description: `${currentPkg.title}`,
        image: 'https://cdn-icons-png.flaticon.com/512/3594/3594184.png',
        order_id: orderId,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone
        },
        notes: {
          address: 'Astrolas Headquarters, New Delhi',
          service: currentPkg.title
        },
        theme: {
          color: '#F59E0B' // Golden amber accent
        },
        handler: async function (response) {
          setPaymentStatus('verifying');
          try {
            // 3. Verify Payment Signature on Backend
            let verifyRes;
            try {
              verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature
                })
              });
            } catch (vErr) {
              verifyRes = await fetch('/.netlify/functions/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature
                })
              });
            }

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setPaymentStatus('success');
              setPaymentDetails({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                packageTitle: currentPkg.title,
                amountPaid: currentPkg.priceFormatted,
                name: customerName,
                email: customerEmail,
                dob: dob
              });

              // Trigger confetti celebration
              if (window.confetti) {
                window.confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              }
            } else {
              setPaymentStatus('failed');
              setErrorMsg(verifyData.error || 'Payment verification failed');
            }
          } catch (err) {
            setPaymentStatus('failed');
            setErrorMsg(err.message || 'Error verifying payment signature');
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setErrorMsg('Payment cancelled by user');
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (response) {
        setLoading(false);
        setPaymentStatus('failed');
        setErrorMsg(response.error.description || 'Payment process failed');
      });

      rzpInstance.open();
      setLoading(false);

    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(false);
      setErrorMsg(err.message || 'An error occurred during checkout setup.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm transition"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 text-2xl font-serif">
            🔮
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase">
              <span>Astrolas Direct Booking Vault</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-0.5 font-serif">
              {paymentStatus === 'success' ? 'Booking Confirmed! 🎉' : `Book ${currentPkg.title}`}
            </h3>
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300 flex items-center justify-between">
            <span>⚠️ {errorMsg}</span>
            <button onClick={() => setErrorMsg('')} className="text-rose-400 font-bold ml-2">✕</button>
          </div>
        )}

        {/* Payment Verification Spinner */}
        {paymentStatus === 'verifying' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-bold text-amber-300">Verifying Encrypted Booking Signature...</p>
            <p className="text-xs text-slate-400">Communicating with Astrolas secure serverless vault</p>
          </div>
        )}

        {/* Success View */}
        {paymentStatus === 'success' && paymentDetails && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3 font-mono text-xs">
              <div className="flex items-center space-x-2 text-sm font-bold text-emerald-400">
                <span>✓</span>
                <span>Astrolas Consultation Confirmed</span>
              </div>
              <div className="space-y-1.5 text-slate-200">
                <p>• <strong className="text-amber-300">Package:</strong> {paymentDetails.packageTitle}</p>
                <p>• <strong className="text-amber-300">Amount Paid:</strong> {paymentDetails.amountPaid}</p>
                <p>• <strong className="text-amber-300">Transaction Ref:</strong> {paymentDetails.paymentId}</p>
                <p>• <strong className="text-amber-300">Order ID:</strong> {paymentDetails.orderId}</p>
                <p>• <strong className="text-amber-300">Client Name:</strong> {paymentDetails.name}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <p className="font-bold text-amber-400">What Happens Next?</p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Your Astro-Numerology chart and name correction dossier is being prepared by our Master Numerologists. A custom PDF report will be delivered to <span className="text-white font-bold">{paymentDetails.email}</span> within 24 hours.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Close Confirmation & View Chart
            </button>
          </div>
        )}

        {/* Form Input View */}
        {paymentStatus !== 'success' && paymentStatus !== 'verifying' && (
          <form onSubmit={handleStartPayment} className="space-y-5">
            
            {/* Package Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
                Selected Astrolas Series
              </label>
              <select
                value={currentPkg.id}
                onChange={(e) => {
                  const found = ASTROLAS_PACKAGES.find(p => p.id === e.target.value);
                  if (found) setActivePackage(found);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-amber-400"
              >
                {ASTROLAS_PACKAGES.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.priceFormatted})
                  </option>
                ))}
              </select>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-300">Client Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-300">Mobile Phone *</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-300">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-300">Time of Birth</label>
                <input
                  type="text"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  placeholder="e.g. 10:30 AM"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-300">Place of Birth</label>
                <input
                  type="text"
                  value={birthCity}
                  onChange={(e) => setBirthCity(e.target.value)}
                  placeholder="e.g. New Delhi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-300">Total payable:</span>
              <span className="text-xl font-bold text-amber-300">{currentPkg.priceFormatted}</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Opening Encrypted Checkout...</span>
              ) : (
                <>
                  <span>🔒</span>
                  <span>Confirm & Pay ({currentPkg.priceFormatted})</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-slate-500 flex items-center justify-center space-x-2 font-mono">
              <i className="fa-solid fa-lock text-emerald-400"></i>
              <span>256-Bit SSL Encrypted Astrolas Gateway • Instant PDF Delivery</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
