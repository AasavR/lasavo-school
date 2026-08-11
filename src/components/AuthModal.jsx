import React, { useState } from 'react';
import { GRADES, BOARDS } from '../data/curriculumData';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('class-10');
  const [board, setBoard] = useState('CBSE');
  const [parentPhone, setParentPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');

    // Check if user is stored in localStorage or fallback to standard demo user profile
    const savedUserData = localStorage.getItem(`lasavo_user_${username.toLowerCase()}`);
    let userObj;
    if (savedUserData) {
      userObj = JSON.parse(savedUserData);
    } else {
      userObj = {
        username: username,
        studentName: username.charAt(0).toUpperCase() + username.slice(1),
        grade: grade,
        board: board,
        parentPhone: parentPhone || '+91 98765 43210',
        isLoggedIn: true
      };
    }
    
    onLoginSuccess(userObj);
    onClose();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !username.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');

    const newUserData = {
      username: username,
      studentName: studentName,
      grade: grade,
      board: board,
      parentPhone: parentPhone || '+91 98765 43210',
      isLoggedIn: true,
      registeredAt: new Date().toISOString()
    };

    localStorage.setItem(`lasavo_user_${username.toLowerCase()}`, JSON.stringify(newUserData));
    onLoginSuccess(newUserData);
    onClose();
  };

  const handleDemoLogin = (demoType) => {
    const demoUser = {
      username: demoType === 'cbse10' ? 'aarav_cbse10' : 'priya_icse12',
      studentName: demoType === 'cbse10' ? 'Aarav Sharma (CBSE Class 10)' : 'Priya Nair (ICSE Class 12)',
      grade: demoType === 'cbse10' ? 'class-10' : 'class-12',
      board: demoType === 'cbse10' ? 'CBSE' : 'ICSE',
      parentPhone: '+91 98765 43210',
      isLoggedIn: true
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden animate-fade-in">
        {/* Glow accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow">
              L
            </div>
            <h2 className="text-lg font-bold text-white">Student Account Login</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm transition"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-950 p-1 rounded-2xl mb-6 border border-slate-800">
          <button
            onClick={() => { setAuthTab('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              authTab === 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setAuthTab('signup'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              authTab === 'signup' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs p-3 rounded-xl mb-4">
            ⚠️ {error}
          </div>
        )}

        {authTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Username or Roll No.</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. aarav_cbse10"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition transform active:scale-95 mt-2"
            >
              Sign In to Attend Classes
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Academic Board</label>
                <select
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {BOARDS.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Grade / Class</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {GRADES.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Choose Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. aarav_student"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Parent Phone (for updates)</label>
              <input
                type="text"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition transform active:scale-95 mt-2"
            >
              Create Account & Register Board
            </button>
          </form>
        )}

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
          <span className="relative bg-slate-900 px-3 text-[10px] text-slate-500 uppercase font-semibold">Or Quick Demo Login</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleDemoLogin('cbse10')}
            className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition"
          >
            <div className="text-[11px] font-bold text-white">Class 10 (CBSE)</div>
            <div className="text-[9px] text-slate-400">Demo Student Access</div>
          </button>
          <button
            onClick={() => handleDemoLogin('icse12')}
            className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition"
          >
            <div className="text-[11px] font-bold text-white">Class 12 (ICSE)</div>
            <div className="text-[9px] text-slate-400">Demo Student Access</div>
          </button>
        </div>
      </div>
    </div>
  );
}
