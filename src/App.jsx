import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection, addDoc, updateDoc } from 'firebase/firestore';

import LandingHero from './components/LandingHero';
import CurriculumBrowser from './components/CurriculumBrowser';
import AIAvatarClassroom from './components/AIAvatarClassroom';
import ParentTMSDashboard from './components/ParentTMSDashboard';
import AuthModal from './components/AuthModal';
import APIKeyModal from './components/APIKeyModal';
import { TEACHERS_MAP } from './data/curriculumData';
import './index.css';

const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "demo-app.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "demo-app",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "demo-app.appspot.com",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  // Navigation & View State: 'landing' | 'curriculum' | 'classroom' | 'analytics'
  const [currentView, setCurrentView] = useState('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAPIKeyModalOpen, setIsAPIKeyModalOpen] = useState(false);

  // User Profile & Auth
  const [userProfile, setUserProfile] = useState({
    studentName: 'Aarav Student',
    grade: 'class-10',
    board: 'CBSE',
    parentPhone: '+91 98765 43210',
    isLoggedIn: false,
    isEnrolled: true
  });

  // Selected Class & Chapter State
  const [currentBoard, setCurrentBoard] = useState('CBSE');
  const [currentGrade, setCurrentGrade] = useState('class-10');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(TEACHERS_MAP.ananya || Object.values(TEACHERS_MAP)[0]);

  // Notification Toast
  const [notification, setNotification] = useState(null);

  // Progress & Homework Data
  const [progressData, setProgressData] = useState({
    totalHoursLearned: 18.5,
    streakDays: 7,
    quizzesCompleted: 14,
    avgAccuracy: 92,
    subjectMastery: {
      'Mathematics (NCERT)': 88,
      'Physics & Science': 82,
      'Chemistry': 79,
      'Computer Science & AI': 96,
      'English Literature': 90
    }
  });

  const [assignments, setAssignments] = useState([
    { id: 'a1', subject: 'Mathematics', title: 'Solve NCERT Real Numbers Ex 1.2', dueDate: 'Tomorrow', status: 'Pending', assignedBy: 'Dr. Ananya Sharma' },
    { id: 'a2', subject: 'Physics', title: 'Snell\'s Law Refraction Calculations', dueDate: 'In 2 days', status: 'Completed', assignedBy: 'Prof. Priya Iyer' },
    { id: 'a3', subject: 'Computer Science', title: 'Python List Comprehension Script', dueDate: 'In 4 days', status: 'Pending', assignedBy: 'Dr. Rajesh Verma' }
  ]);

  // Load saved session from localStorage on start
  useEffect(() => {
    const activeSession = localStorage.getItem('lasavo_active_session');
    if (activeSession) {
      try {
        const parsed = JSON.parse(activeSession);
        setUserProfile(parsed);
        if (parsed.grade) setCurrentGrade(parsed.grade);
        if (parsed.board) setCurrentBoard(parsed.board);
      } catch (e) {
        console.warn("Session restore error", e);
      }
    }
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLoginSuccess = (userObj) => {
    setUserProfile(userObj);
    localStorage.setItem('lasavo_active_session', JSON.stringify(userObj));
    if (userObj.grade) setCurrentGrade(userObj.grade);
    if (userObj.board) setCurrentBoard(userObj.board);
    
    showNotification(`Welcome back, ${userObj.studentName}! Logged into ${userObj.board} ${userObj.grade.replace('class-', 'Class ')}.`);
    setCurrentView('curriculum');
  };

  const handleLogout = () => {
    localStorage.removeItem('lasavo_active_session');
    setUserProfile(prev => ({ ...prev, isLoggedIn: false }));
    showNotification("Logged out successfully.");
    setCurrentView('landing');
  };

  const handleStartClass = (subj, chapter, teacher) => {
    setSelectedSubject(subj);
    setSelectedChapter(chapter);
    setSelectedTeacher(teacher || TEACHERS_MAP[subj.teacherId] || Object.values(TEACHERS_MAP)[0]);
    setCurrentView('classroom');
    showNotification(`Entering ${teacher?.name || 'AI Avatar'}'s 2-Way Classroom...`);
  };

  const handleAddAssignment = (newObj) => {
    setAssignments(prev => [{ id: 'assign_' + Date.now(), ...newObj }, ...prev]);
    showNotification(`New homework assigned: ${newObj.title}`);
  };

  const handleToggleAssignment = (item) => {
    setAssignments(prev => prev.map(a => a.id === item.id ? { ...a, status: a.status === 'Pending' ? 'Completed' : 'Pending' } : a));
    showNotification(`Homework status updated.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-400 flex items-center space-x-3 animate-fade-in">
          <span className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 md:px-8 py-3.5 flex flex-wrap justify-between items-center gap-3">
        {/* Brand */}
        <button 
          onClick={() => setCurrentView('landing')}
          className="flex items-center space-x-3 focus:outline-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
            L
          </div>
          <div className="text-left">
            <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
              School.lasavo.org
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-semibold tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded-full">
              CBSE & ICSE AI Faculty
            </span>
          </div>
        </button>

        {/* Center Navigation Tabs */}
        <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-2xl text-xs font-medium">
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
            📚 Syllabus & Classes
          </button>

          <button
            onClick={() => {
              if (!selectedChapter) {
                // Pick default chapter
                setSelectedSubject({ subjectName: 'Mathematics', teacherId: 'ananya' });
                setSelectedChapter({
                  title: 'Chapter 1: Real Numbers & Euclid Lemma',
                  ncertRef: 'NCERT Mathematics Class 10 - Chapter 1',
                  chalkboardKeypoints: [
                    'Theorem: Fundamental Theorem of Arithmetic',
                    'Every composite number = product of primes uniquely',
                    'Proof by Contradiction: Prove √5 is irrational',
                    'HCF(a,b) × LCM(a,b) = a × b'
                  ],
                  stimulusQuestion: {
                    prompt: 'Student, if HCF of 12 and 18 is 6, what is their LCM?',
                    expectedAnswer: '36',
                    hint: 'Use the formula: HCF × LCM = Product of two numbers (12 × 18 = 216).',
                    explanation: 'Spot on! HCF × LCM = 12 × 18 = 216. So LCM = 216 / 6 = 36.'
                  }
                });
                setSelectedTeacher(Object.values(TEACHERS_MAP)[0]);
              }
              setCurrentView('classroom');
            }}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              currentView === 'classroom' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎥 AI Classroom
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

        {/* User Profile & API Key Buttons */}
        <div className="flex items-center space-x-2">
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
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition transform hover:scale-105"
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
        onLoginSuccess={handleLoginSuccess}
      />

      {/* API Key Modal Overlay */}
      <APIKeyModal
        isOpen={isAPIKeyModalOpen}
        onClose={() => setIsAPIKeyModalOpen(false)}
        onSaveKeys={() => showNotification("AI Model API Key updated!")}
      />
    </div>
  );
}