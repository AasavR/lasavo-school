import React, { useState } from 'react';
import AIDoctorPlatform from './components/AIDoctorPlatform';
import CurriculumBrowser from './components/CurriculumBrowser';
import AIAvatarClassroom from './components/AIAvatarClassroom';
import ParentTMSDashboard from './components/ParentTMSDashboard';
import CivilEngineeringPipelineApp from './components/CivilEngineeringPipelineApp';
import RoofRestoreAIOutreachHub from './components/RoofRestoreAIOutreachHub';
import SubscriptionModal from './components/SubscriptionModal';
import AuthModal from './components/AuthModal';
import APIKeyModal from './components/APIKeyModal';
import './index.css';

export default function App() {
  // Navigation Tabs: 'doctor' (IIT Delhi AI Health), 'academy' (E-Learning), 'engineering' (Civil AI), 'outreach' (Micro-SaaS Hub)
  const [activeTab, setActiveTab] = useState('doctor');
  const [academySubView, setAcademySubView] = useState('browser'); // 'browser' | 'classroom' | 'tms'
  
  // Classroom Session state
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeTeacher, setActiveTeacher] = useState(null);
  const [currentBoard, setCurrentBoard] = useState('CBSE');
  const [currentGrade, setCurrentGrade] = useState('class-10');

  // Subscription & Payment State
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('free'); // 'free' | 'starter' | 'pro' | 'enterprise'

  // Auth & API Key Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Guest User', email: 'guest@lasavo.ai', role: 'Student' });

  const handleStartClassroom = (subj, ch, teacher) => {
    setActiveSubject(subj);
    setActiveChapter(ch);
    setActiveTeacher(teacher);
    setAcademySubView('classroom');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top SaaS Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
        
        {/* Brand Logo & Platform Switcher */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-600/30">
            L
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-extrabold text-white tracking-tight">Lasavo AI Suite</h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Monetized
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Multi-Industry AI & SaaS Platform</p>
          </div>
        </div>

        {/* Core Product Navigation Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800/80 text-xs font-bold space-x-1">
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-4 py-2 rounded-xl transition flex items-center space-x-2 ${
              activeTab === 'doctor'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black shadow-lg shadow-teal-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🩺 AI Doctor & Tele-Health</span>
            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              IIT Delhi
            </span>
          </button>

          <button
            onClick={() => setActiveTab('academy')}
            className={`px-4 py-2 rounded-xl transition flex items-center space-x-2 ${
              activeTab === 'academy'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🎓 AI Academy</span>
            <span className="text-[9px] opacity-75">(E-Learning)</span>
          </button>

          <button
            onClick={() => setActiveTab('engineering')}
            className={`px-4 py-2 rounded-xl transition flex items-center space-x-2 ${
              activeTab === 'engineering'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏗️ Civil & Structural AI</span>
          </button>

          <button
            onClick={() => setActiveTab('outreach')}
            className={`px-4 py-2 rounded-xl transition flex items-center space-x-2 ${
              activeTab === 'outreach'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚡ AI Micro-SaaS</span>
            <span className="text-[9px] opacity-75">(Outreach)</span>
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-3">
          {/* Subscription Upgrade Button */}
          <button
            onClick={() => setIsSubModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition flex items-center space-x-1.5 active:scale-95"
          >
            <span>💳 Upgrade Plan</span>
            <span className="bg-slate-950/20 text-slate-950 px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase">
              {currentPlan.toUpperCase()}
            </span>
          </button>

          {/* User Profile / Auth */}
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
        
        {/* TAB 0: Lasavo & IIT Delhi AI Doctor & Tele-Health Platform */}
        {activeTab === 'doctor' && (
          <div className="flex-1">
            <AIDoctorPlatform />
          </div>
        )}

        {/* TAB 1: Lasavo AI Academy */}
        {activeTab === 'academy' && (
          <div className="flex-1 flex flex-col space-y-6">
            
            {/* Academy Sub-navigation */}
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-4 max-w-6xl w-full mx-auto">
              <div className="flex space-x-2 text-xs font-bold">
                <button
                  onClick={() => setAcademySubView('browser')}
                  className={`px-4 py-2 rounded-xl transition ${
                    academySubView === 'browser'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📚 NCERT Curriculum Browser
                </button>
                <button
                  onClick={() => setAcademySubView('classroom')}
                  className={`px-4 py-2 rounded-xl transition ${
                    academySubView === 'classroom'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🎥 Live AI Avatar Classroom
                </button>
                <button
                  onClick={() => setAcademySubView('tms')}
                  className={`px-4 py-2 rounded-xl transition ${
                    academySubView === 'tms'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📊 Parent TMS Dashboard
                </button>
              </div>

              <div className="hidden sm:block text-xs text-slate-400">
                Curriculum: <span className="text-indigo-400 font-bold">{currentBoard} {currentGrade}</span>
              </div>
            </div>

            {/* Sub-view switcher */}
            {academySubView === 'browser' && (
              <CurriculumBrowser
                currentBoard={currentBoard}
                currentGrade={currentGrade}
                onSelectBoard={setCurrentBoard}
                onSelectGrade={setCurrentGrade}
                onStartClass={handleStartClassroom}
              />
            )}

            {academySubView === 'classroom' && (
              <AIAvatarClassroom
                subject={activeSubject}
                chapter={activeChapter}
                teacher={activeTeacher}
                onBack={() => setAcademySubView('browser')}
              />
            )}

            {academySubView === 'tms' && (
              <ParentTMSDashboard />
            )}
          </div>
        )}

        {/* TAB 2: Lasavo Civil & Structural AI SaaS */}
        {activeTab === 'engineering' && (
          <div className="flex-1">
            <CivilEngineeringPipelineApp />
          </div>
        )}

        {/* TAB 3: Lasavo Micro-SaaS Outbound Hub */}
        {activeTab === 'outreach' && (
          <div className="flex-1">
            <RoofRestoreAIOutreachHub />
          </div>
        )}

      </main>

      {/* Subscription Pricing & Razorpay Checkout Modal */}
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
      <footer className="border-t border-slate-800/60 py-4 px-6 text-center text-xs text-slate-500 bg-slate-950">
        © 2026 Lasavo AI SaaS Suite • All Rights Reserved • Razorpay Monetized & AI Powered
      </footer>

    </div>
  );
}