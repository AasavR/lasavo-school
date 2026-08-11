import React, { useState } from 'react';
import { BOARDS, GRADES } from '../data/curriculumData';

export default function LandingHero({ onOpenAuth, onExploreClasses, onSelectSampleModule }) {
  const [demoMode, setDemoMode] = useState('video'); // 'video' | 'audio'
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoSpeechText, setDemoSpeechText] = useState('Welcome to Lasavo AI School! I am Dr. Ananya. Are you ready for Chapter 1 Real Numbers? Let us test your knowledge!');

  const toggleDemoSpeech = () => {
    setDemoPlaying(!demoPlaying);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 max-w-6xl mx-auto w-full space-y-12">
      {/* Hero Header */}
      <section className="text-center max-w-3xl mt-4">
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span>Tailored for Indian Boards (CBSE & ICSE) • Class 1 to 12</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
          Interactive AI Avatar Classroom for <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Every NCERT Subject & Grade
          </span>
        </h1>

        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Log into your account, pick your Academic Board (CBSE/ICSE) and Class (1st to 12th), and experience 2-way live video learning with realistic AI professors. Automatically switches to clear audio during low internet connectivity.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onOpenAuth}
            className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl shadow-indigo-600/30 transition transform hover:scale-105 active:scale-95 text-sm"
          >
            🔑 Log In / Register to Attend Class
          </button>
          <button
            onClick={onExploreClasses}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold py-3.5 px-6 rounded-2xl text-sm transition"
          >
            📚 Browse CBSE & ICSE Syllabus
          </button>
        </div>
      </section>

      {/* Live AI Avatar Demo Preview Showcase */}
      <section className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap justify-between items-center mb-6 gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-lg font-bold text-white">Live AI Avatar Classroom Preview</h2>
            </div>
            <p className="text-xs text-slate-400">2-Way Spoken Conversation & Response Stimuli Engine</p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 font-medium">Mode:</span>
            <button
              onClick={() => setDemoMode('video')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                demoMode === 'video' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎥 HD Video Avatar
            </button>
            <button
              onClick={() => setDemoMode('audio')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                demoMode === 'audio' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎙️ Low-Bandwidth Audio Mode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Avatar Video Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden min-h-[300px]">
            {demoMode === 'video' ? (
              <div className="relative flex flex-col items-center">
                <div className="w-36 h-36 rounded-full border-4 border-indigo-500/40 p-1 relative overflow-hidden shadow-2xl mb-4 bg-gradient-to-tr from-amber-500/20 to-purple-600/20">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                    alt="Dr. Ananya Sharma AI Avatar"
                    className={`w-full h-full rounded-full object-cover transition duration-300 ${
                      demoPlaying ? 'scale-105 border-2 border-emerald-400' : ''
                    }`}
                  />
                  {demoPlaying && (
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse pointer-events-none" />
                  )}
                </div>

                <div className="text-center">
                  <div className="text-sm font-bold text-white">Dr. Ananya Sharma</div>
                  <div className="text-xs text-amber-400 font-medium">IIT Bombay • AI Mathematics Faculty</div>
                </div>

                {/* Lip Sync & Audio Equalizer Animation */}
                <div className="mt-3 flex items-center space-x-1">
                  <span className={`w-1 bg-indigo-400 rounded-full transition-all ${demoPlaying ? 'h-5 animate-pulse' : 'h-2'}`} />
                  <span className={`w-1 bg-purple-400 rounded-full transition-all ${demoPlaying ? 'h-7 animate-pulse delay-75' : 'h-2'}`} />
                  <span className={`w-1 bg-emerald-400 rounded-full transition-all ${demoPlaying ? 'h-4 animate-pulse delay-150' : 'h-2'}`} />
                  <span className={`w-1 bg-indigo-400 rounded-full transition-all ${demoPlaying ? 'h-8 animate-pulse delay-100' : 'h-2'}`} />
                  <span className={`w-1 bg-pink-400 rounded-full transition-all ${demoPlaying ? 'h-3 animate-pulse' : 'h-2'}`} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl">
                  📻
                </div>
                <div className="text-xs font-bold text-amber-300">Audio-Only Connection Active</div>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Optimized low-data mode for 2G/3G speeds or unstable network connections. Class streams audio without buffering!
                </p>
                <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 text-[10px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Bandwidth: ~12 kbps (Ultra Light)</span>
                </div>
              </div>
            )}

            <button
              onClick={toggleDemoSpeech}
              className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition active:scale-95 flex items-center space-x-2"
            >
              <span>{demoPlaying ? '⏸️ Pause Speech' : '▶️ Listen to AI Avatar Prompt'}</span>
            </button>
          </div>

          {/* Digital Chalkboard & Stimulus Response Interactive Box */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner">
              <div className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mb-2">Live Chalkboard & Subtitles</div>
              <p className="text-sm font-medium text-slate-100 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mb-4">
                "{demoSpeechText}"
              </p>

              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 text-xs">
                <div className="font-bold text-emerald-400 mb-1 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                  <span>2-Way Stimulus Checkpoint</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  "If HCF(a,b) = 6 and a × b = 216, what is LCM(a,b)?"
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button 
                    onClick={() => {
                      setDemoSpeechText("Spot on! HCF × LCM = 216. So LCM = 216 / 6 = 36. Excellent answer!");
                      setDemoPlaying(true);
                    }}
                    className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    🗣️ Answer "36"
                  </button>
                  <button 
                    onClick={() => {
                      setDemoSpeechText("No problem! Remember the formula: HCF × LCM = Product of two numbers. Try dividing 216 by 6!");
                      setDemoPlaying(true);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs transition"
                  >
                    ❓ Request Hint
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 bg-slate-950/60 px-4 py-3 rounded-xl border border-slate-800">
              <span>Selected Syllabus: <strong className="text-white">Class 10 CBSE Mathematics</strong></span>
              <button
                onClick={onOpenAuth}
                className="text-indigo-400 hover:text-indigo-300 font-bold underline"
              >
                Log In to Start Full Class →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="w-full space-y-6">
        <div className="text-center">
          <h3 className="text-xs uppercase font-bold text-indigo-400 tracking-widest mb-2">Designed For Indian Schooling</h3>
          <h2 className="text-2xl font-bold text-white">Everything You Need for Class 1st to Class 12th</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              🏛️
            </div>
            <h4 className="text-base font-bold text-white mb-2">CBSE & ICSE Board Section</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curriculum tailored to NCERT textbooks and Indian academic standards for Class 1 through Class 12.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 hover:border-purple-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              🤖
            </div>
            <h4 className="text-base font-bold text-white mb-2">AI Video & Audio Avatar</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time video presenting with animated lip-sync. Automatically falls back to clear audio if internet signal drops.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              🗣️
            </div>
            <h4 className="text-base font-bold text-white mb-2">2-Way Stimulus Pedagogy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Active learning driven by questions, voice responses, immediate corrections, and intelligent hints if silent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
