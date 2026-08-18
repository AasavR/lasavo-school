import React, { useState } from 'react';
import AIDoctorPlatform from './components/AIDoctorPlatform';
import SubscriptionModal from './components/SubscriptionModal';
import AuthModal from './components/AuthModal';
import APIKeyModal from './components/APIKeyModal';
import './index.css';

export default function App() {
  // Navigation Tabs: 'doctor' (AI Doctor & Tele-Consultation), 'aiconsultation' (AI Clinical & Phytomedicine Suite), 'mentalwellness' (Video Psychology Avatar), 'pharma' (E-Pharmacy), 'labtests' (Diagnostics)
  const [activeTab, setActiveTab] = useState('doctor');

  // Subscription & Payment State
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('free'); // 'free' | 'starter' | 'pro' | 'enterprise'

  // Auth & API Key Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Patient / User', email: 'patient@lasavo.health', role: 'Patient' });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* Top Tele-Health Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
        
        {/* Brand Logo & IIT Delhi Partnership Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-indigo-600 flex items-center justify-center font-black text-xl text-slate-950 shadow-lg shadow-teal-500/20">
            🏥
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-extrabold text-white tracking-tight">Lasavo Health AI</h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                IIT Delhi Partnered
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Pan-India AI Doctor & Tele-Health Platform</p>
          </div>
        </div>

        {/* Core Tele-Health Navigation Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800/80 text-xs font-bold space-x-1 flex-wrap">
          
          {/* TAB 1: AI Doctor Avatars */}
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              activeTab === 'doctor'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black shadow-lg shadow-teal-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🩺 AI Doctor Avatars</span>
          </button>

          {/* TAB 2: AI Consultation & Clinical Suite (Everything about AI Consultation) */}
          <button
            onClick={() => setActiveTab('aiconsultation')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              activeTab === 'aiconsultation'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black shadow-lg shadow-teal-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🤖 AI Consultation Suite</span>
            <span className="text-[9px] font-black uppercase px-1 py-0.5 rounded bg-slate-900 text-teal-300">
              Full AI Engine
            </span>
          </button>

          {/* TAB 3: Mental Wellness & Video Psychology Avatar */}
          <button
            onClick={() => setActiveTab('mentalwellness')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              activeTab === 'mentalwellness'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🧠 Video Psychology Avatar</span>
          </button>

          {/* TAB 4: Pan-India E-Pharmacy */}
          <button
            onClick={() => setActiveTab('pharma')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              activeTab === 'pharma'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>💊 E-Pharmacy</span>
          </button>

          {/* TAB 5: Diagnostic Lab Tests */}
          <button
            onClick={() => setActiveTab('labtests')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              activeTab === 'labtests'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔬 Lab Diagnostics</span>
          </button>

        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSubModalOpen(true)}
            className="bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-lg shadow-teal-500/20 transition flex items-center space-x-1.5 active:scale-95"
          >
            <span>💳 Tele-Health Pass</span>
            <span className="bg-slate-950/20 text-slate-950 px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase">
              {currentPlan.toUpperCase()}
            </span>
          </button>

          <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl text-xs font-semibold transition"
          >
            👤 {user.name}
          </button>
        </div>
      </header>

      {/* Main App Content View */}
      <main className="flex-1 flex flex-col p-4 md:p-6">
        <AIDoctorPlatform initialTab={activeTab === 'aiconsultation' ? 'botanical' : activeTab === 'doctor' ? 'teleconsult' : activeTab} forcedActiveTab={activeTab} />
      </main>

      {/* Subscription & Tele-Consultation Pass Modal */}
      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        currentPlan={currentPlan}
        onSelectPlan={(newPlan) => setCurrentPlan(newPlan)}
      />

      {/* Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          setUser={setUser}
        />
      )}

      {/* API Key Modal */}
      {isApiKeyOpen && (
        <APIKeyModal
          onClose={() => setIsApiKeyOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 px-6 text-center text-xs text-slate-400 bg-slate-950">
        © 2026 Lasavo Private Limited • Co-developed with IIT Delhi Technology Innovation Hub • Pan-India Tele-Health Service
      </footer>

    </div>
  );
}