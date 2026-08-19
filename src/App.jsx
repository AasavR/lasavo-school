import React, { useState, useEffect } from 'react';
import LandingHero from './components/LandingHero';
import CurriculumBrowser from './components/CurriculumBrowser';
import AIAvatarClassroom from './components/AIAvatarClassroom';
import ParentTMSDashboard from './components/ParentTMSDashboard';
import AuthModal from './components/AuthModal';
import APIKeyModal from './components/APIKeyModal';
import SubscriptionModal from './components/SubscriptionModal';
import { TEACHERS_MAP } from './data/curriculumData';
import './index.css';

export default function App() {
  // Main View Router: 'landing' | 'curriculum' | 'classroom' | 'analytics'
  const [currentView, setCurrentView] = useState('landing');
  
  // Board & Grade Filters
  const [currentBoard, setCurrentBoard] = useState('CBSE');
  const [currentGrade, setCurrentGrade] = useState('class-10');

  // Selected Classroom Session state
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(TEACHERS_MAP['dr-ananya']);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAPIKeyModalOpen, setIsAPIKeyModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  // User Profile & Subscription
  const [userProfile, setUserProfile] = useState({
    isLoggedIn: false,
    studentName: 'Aarav Student',
    grade: 'class-10',
    board: 'CBSE',
    subscriptionTier: 'free' // 'free' | 'starter' | 'pro' | 'enterprise'
  });

  // Homework & Assignments Data for Parent TMS
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Class 10 Real Numbers: Euclid Division Lemma Worksheet', subject: 'Mathematics', dueDate: 'Tomorrow, 5:00 PM', completed: false },
    { id: 2, title: 'Light Refraction & Convex Lens Diagram Practice', subject: 'Physics', dueDate: 'Friday, 8:00 PM', completed: true },
    { id: 3, title: 'English Grammar: Active & Passive Voice Transformation', subject: 'English', dueDate: 'Saturday, 10:00 AM', completed: false }
  ]);

  // Analytics Progress Data
  const [progressData] = useState({
    totalClassesAttended: 14,
    streakDays: 5,
    accuracyRate: 92,
    studyHoursThisWeek: 8.5
  });

  const handleStartClass = (subj, ch, teacher) => {
    if (subj) setSelectedSubject(subj);
    if (ch) setSelectedChapter(ch);
    if (teacher) setSelectedTeacher(teacher);
    setCurrentView('classroom');
  };

  const handleAddAssignment = (newAssignment) => {
    setAssignments(prev => [newAssignment, ...prev]);
  };

  const handleToggleAssignment = (id) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const handleLogout = () => {
    setUserProfile({
      isLoggedIn: false,
      studentName: 'Aarav Student',
      grade: 'class-10',
      board: 'CBSE',
      subscriptionTier: 'free'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Primary Header Navbar */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
        
        {/* Logo & Platform Branding */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition">
            🎓
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-extrabold text-white tracking-tight">School.lasavo.org</h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Class 1-12 AI Faculty
              </span>
            </div>
            <p className="text-[11px] text-slate-400">CBSE & ICSE 2-Way Voice AI Avatar Platform</p>
          </div>
        </div>

        {/* View Navigation Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold space-x-1">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              currentView === 'landing' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🏠 Home
          </button>

          <button
            onClick={() => setCurrentView('curriculum')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              currentView === 'curriculum' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📚 Syllabus & NCERT
          </button>

          <button
            onClick={() => setCurrentView('classroom')}
            className={`px-3.5 py-1.5 rounded-xl transition flex items-center space-x-1 ${
              currentView === 'classroom' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🎥 AI Classroom</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => setCurrentView('analytics')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              currentView === 'analytics' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Parent & TMS
          </button>
        </div>

        {/* User Profile & API / Upgrade Action Buttons */}
        <div className="flex items-center space-x-2">
          
          {/* EdTech Subscription Pass Button */}
          <button
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition transform hover:scale-105 flex items-center space-x-1.5"
          >
            <span>💳 ₹40,000 / Yr Pass</span>
            <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded font-black uppercase">
              PRO TIER
            </span>
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={() => setIsAPIKeyModalOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs transition"
            title="Configure Live Kimi / Gemini API Key"
          >
            ⚙️ AI API Key
          </button>

          {userProfile.isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <div className="bg-slate-900 border border-slate-800 text-xs px-3 py-1.5 rounded-xl flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-white">{userProfile.studentName}</span>
                <span className="text-[10px] text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-md font-semibold">
                  {userProfile.board} {currentGrade.replace('class-', 'Class ')}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-xl transition"
                title="Log Out"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl transition"
            >
              Log In / Register
            </button>
          )}
        </div>
      </header>

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingHero
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onExploreClasses={() => setCurrentView('curriculum')}
            onSelectSampleModule={(subj, ch, t) => handleStartClass(subj, ch, t)}
          />
        )}

        {currentView === 'curriculum' && (
          <CurriculumBrowser
            currentBoard={currentBoard}
            currentGrade={currentGrade}
            onSelectBoard={setCurrentBoard}
            onSelectGrade={setCurrentGrade}
            onStartClass={handleStartClass}
          />
        )}

        {currentView === 'classroom' && (
          <AIAvatarClassroom
            selectedSubject={selectedSubject}
            selectedChapter={selectedChapter}
            selectedTeacher={selectedTeacher}
            userProfile={userProfile}
            onBackToSyllabus={() => setCurrentView('curriculum')}
          />
        )}

        {currentView === 'analytics' && (
          <ParentTMSDashboard
            userProfile={userProfile}
            progressData={progressData}
            assignments={assignments}
            onAddAssignment={handleAddAssignment}
            onToggleAssignment={handleToggleAssignment}
          />
        )}
      </main>

      {/* Auth Modal Overlay */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(profile) => {
          setUserProfile({ ...profile, isLoggedIn: true });
          setIsAuthModalOpen(false);
        }}
      />

      {/* API Key Modal Overlay */}
      <APIKeyModal
        isOpen={isAPIKeyModalOpen}
        onClose={() => setIsAPIKeyModalOpen(false)}
      />

      {/* Subscription Pricing Modal Overlay */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        currentPlan={userProfile.subscriptionTier}
        onSelectPlan={(newPlan) => setUserProfile(prev => ({ ...prev, subscriptionTier: newPlan }))}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 bg-slate-950 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-slate-400">School.lasavo.org</span>
          <span>•</span>
          <span>CBSE & ICSE Class 1 to 12 AI Avatar Education Portal</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-slate-400">
          <button onClick={() => setIsSubscriptionModalOpen(true)} className="hover:text-indigo-400">💳 ₹40,000 / Yr Pass</button>
          <span>•</span>
          <button onClick={() => setIsAPIKeyModalOpen(true)} className="hover:text-indigo-400">⚙️ AI Key Settings</button>
          <span>•</span>
          <span>NCERT Aligned</span>
        </div>
      </footer>

    </div>
  );
}