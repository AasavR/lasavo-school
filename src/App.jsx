import React, { useState } from 'react';
import AstroHeader from './components/AstroHeader';
import NumerologyCalculator from './components/NumerologyCalculator';
import PalmistryScanner from './components/PalmistryScanner';
import PackagesSection from './components/PackagesSection';
import InstagramNumerologists from './components/InstagramNumerologists';
import DailyHoroscope from './components/DailyHoroscope';
import AstrolasAIChat from './components/AstrolasAIChat';
import RazorpayModal from './components/RazorpayModal';
import AstroFooter from './components/AstroFooter';
import './index.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('calculator');
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [selectedPackageForCheckout, setSelectedPackageForCheckout] = useState(null);

  const handleOpenRazorpayModal = (pkg) => {
    setSelectedPackageForCheckout(pkg);
    setIsRazorpayModalOpen(true);
  };

  const handleCloseRazorpayModal = () => {
    setIsRazorpayModalOpen(false);
    setSelectedPackageForCheckout(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col relative overflow-x-hidden">
      
      {/* Background Cosmic Starfield Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full filter blur-[150px] pointer-events-none z-0"></div>

      {/* Main Header Navbar */}
      <AstroHeader
        onOpenCalculator={() => setActiveSection('calculator')}
        onSelectPackage={handleOpenRazorpayModal}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 space-y-12 pb-20">
        
        {/* 1. Chaldean Numerology & Lo Shu Grid Calculator */}
        <NumerologyCalculator onBookPackage={handleOpenRazorpayModal} />

        {/* 2. Hast Rekha Palmistry & Palm Line Scanner */}
        <PalmistryScanner onBookPackage={handleOpenRazorpayModal} />

        {/* 3. Curated Numerology & Palmistry Packages */}
        <PackagesSection onSelectPackage={handleOpenRazorpayModal} />

        {/* 4. Instagram Numerologists & Client Testimonials */}
        <InstagramNumerologists onBookPackage={handleOpenRazorpayModal} />

        {/* 5. Daily Zodiac Horoscope & Transits */}
        <DailyHoroscope />

        {/* 6. 24/7 AI Astro-Numerologist Assistant */}
        <AstrolasAIChat onBookPackage={handleOpenRazorpayModal} />

      </main>

      {/* Footer */}
      <AstroFooter onBookPackage={handleOpenRazorpayModal} />

      {/* Razorpay Checkout Modal */}
      <RazorpayModal
        isOpen={isRazorpayModalOpen}
        onClose={handleCloseRazorpayModal}
        selectedPackage={selectedPackageForCheckout}
      />

    </div>
  );
}