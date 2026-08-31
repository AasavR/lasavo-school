import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ModelsHub from './components/ModelsHub';
import DatasetsHub from './components/DatasetsHub';
import SpacesHub from './components/SpacesHub';
import FineTuningStudio from './components/FineTuningStudio';
import InferenceAPI from './components/InferenceAPI';
import CommunityHub from './components/CommunityHub';
import PricingHub from './components/PricingHub';
import UploadModal from './components/UploadModal';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('models'); // models | datasets | spaces | finetune | inference | community | pricing
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col relative overflow-x-hidden">
      
      {/* Background Cosmic Starfield Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full filter blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-[700px] h-[700px] bg-indigo-600/10 rounded-full filter blur-[160px] pointer-events-none z-0"></div>

      {/* Main Sticky Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenUploadModal={() => setIsUploadOpen(true)}
      />

      {/* Main Platform Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'models' && <ModelsHub onOpenUploadModal={() => setIsUploadOpen(true)} />}
        {activeTab === 'datasets' && <DatasetsHub />}
        {activeTab === 'spaces' && <SpacesHub />}
        {activeTab === 'finetune' && <FineTuningStudio />}
        {activeTab === 'inference' && <InferenceAPI />}
        {activeTab === 'community' && <CommunityHub />}
        {activeTab === 'pricing' && <PricingHub />}
      </main>

      {/* Upload Model / Dataset Modal */}
      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}