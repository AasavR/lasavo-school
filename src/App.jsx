import React, { useState } from 'react';
import EarbudsHeader from './components/EarbudsHeader';
import EarbudsHero from './components/EarbudsHero';
import ModelSelectionCatalog from './components/ModelSelectionCatalog';
import SoundSimulator from './components/SoundSimulator';
import EarbudsColorCustomizer from './components/EarbudsColorCustomizer';
import BatteryCalculator from './components/BatteryCalculator';
import ComparisonMatrix from './components/ComparisonMatrix';
import ReviewsAndFAQ from './components/ReviewsAndFAQ';
import EarbudsFooter from './components/EarbudsFooter';
import AmazonDealModal from './components/AmazonDealModal';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import { useRazorpayCheckout } from './hooks/useRazorpayCheckout';
import { Loader2 } from 'lucide-react';
import './index.css';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { initiatePayment, loading: paymentLoading, error: paymentError, setError: setPaymentError } = useRazorpayCheckout();

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePayWithRazorpay = (amount = 1299, productName = 'Lasavo Audio Earbuds') => {
    initiatePayment({
      amount: amount,
      productName: productName,
      description: `Lasavo Genuine Audio - ₹${amount}`,
      onSuccess: (details) => {
        setPaymentDetails({ ...details, amount });
        setIsSuccessModalOpen(true);
      },
      onError: (err) => {
        console.error('Razorpay Payment Error:', err);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between relative">
      
      {/* Navigation Header */}
      <EarbudsHeader
        lang={lang}
        setLang={setLang}
        onOpenDealModal={() => setIsDealModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        onPayOnline={(amt, name) => handlePayWithRazorpay(amt || 1299, name || 'Lasavo Audio Pro TWS')}
        paymentLoading={paymentLoading}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Product Showcase Hero */}
        <EarbudsHero
          lang={lang}
          onOpenDealModal={() => setIsDealModalOpen(true)}
          onScrollToSection={handleScrollToSection}
          onPayOnline={(amt, name) => handlePayWithRazorpay(amt || 1299, name || 'Lasavo Audio Pro TWS')}
          paymentLoading={paymentLoading}
        />

        {/* 3 Models Catalog Section (₹350, ₹500, ₹1,299) */}
        <ModelSelectionCatalog
          lang={lang}
          onPayOnline={(amt, name) => handlePayWithRazorpay(amt, name)}
          paymentLoading={paymentLoading}
        />

        {/* Live Audio Equalizer & Sound Simulator */}
        <SoundSimulator lang={lang} />

        {/* 360 Degree Color Variant Customizer */}
        <EarbudsColorCustomizer lang={lang} />

        {/* Playtime & Battery Usage Calculator */}
        <BatteryCalculator lang={lang} />

        {/* Competitor Spec Comparison Table */}
        <ComparisonMatrix lang={lang} />

        {/* Customer Reviews & Accordion FAQ */}
        <ReviewsAndFAQ lang={lang} />

      </main>

      {/* Footer */}
      <EarbudsFooter
        lang={lang}
        setLang={setLang}
        onOpenDealModal={() => setIsDealModalOpen(true)}
      />

      {/* Amazon Coupon & Deal Modal */}
      <AmazonDealModal
        isOpen={isDealModalOpen}
        onClose={() => setIsDealModalOpen(false)}
        lang={lang}
        onPayOnline={() => {
          setIsDealModalOpen(false);
          handlePayWithRazorpay(1039, 'Lasavo Audio Pro TWS (Coupon Offer)');
        }}
        paymentLoading={paymentLoading}
      />

      {/* Razorpay Payment Verification Success Receipt Modal */}
      <PaymentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        paymentDetails={paymentDetails}
        lang={lang}
      />

      {/* Global Payment Loading Overlay */}
      {paymentLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 bg-slate-900 border border-cyan-500/40 px-6 py-4 rounded-2xl shadow-2xl">
            <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            <span className="text-white font-bold">
              {lang === 'hi' ? 'Razorpay ऑनलाइन पेमेंट लोड हो रहा है...' : 'Opening Razorpay Checkout...'}
            </span>
          </div>
        </div>
      )}

      {/* Global Payment Error Notification */}
      {paymentError && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-rose-950/90 border border-rose-500/50 text-rose-200 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-xs uppercase text-rose-400">Payment Notice</div>
            <div className="text-sm font-semibold">{paymentError}</div>
          </div>
          <button
            onClick={() => setPaymentError(null)}
            className="text-xs bg-rose-900/60 hover:bg-rose-800 px-3 py-1.5 rounded-lg text-white font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

    </div>
  );
}
