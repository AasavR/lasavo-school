import React, { useState, useEffect, useRef } from 'react';
import { generateAITeacherResponse } from '../services/aiTeacherEngine';
import { TEACHERS_LIST, TEACHERS_MAP, DAILY_6_CLASS_SCHEDULE } from '../data/curriculumData';

export default function AIAvatarClassroom({ 
  selectedSubject, 
  selectedChapter, 
  selectedTeacher: initialTeacher, 
  userProfile,
  onBackToSyllabus 
}) {
  const [activeTeacher, setActiveTeacher] = useState(initialTeacher || TEACHERS_LIST[0]);
  const [streamMode, setStreamMode] = useState('video'); // 'video' | 'audio'
  const [activeClassNumber, setActiveClassNumber] = useState(1);

  // 1-Hour Session Timer (3600 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(3600);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Classroom dialogue & state
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);

  // Mic / Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // 1-Hour Countdown Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  // Format seconds as MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  // Calculate percentage of 1-hour class completed
  const progressPercent = Math.min(100, Math.round(((3600 - secondsRemaining) / 3600) * 100));

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-IN';

      rec.onstart = () => setIsListening(true);
      rec.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setSpeechText(transcript);
        setInput(transcript);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);

      recognitionRef.current = rec;
    }
  }, []);

  // Turn off Mic automatically whenever AI starts speaking
  useEffect(() => {
    if (isSpeaking && isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    }
  }, [isSpeaking, isListening]);

  // Initial Class Greeting
  useEffect(() => {
    const chapterName = selectedChapter?.title || DAILY_6_CLASS_SCHEDULE[activeClassNumber - 1]?.chapterTitle || 'today\'s NCERT topic';
    const greeting = `Welcome ${userProfile.studentName}! I am ${activeTeacher.name}. Today we are leading Class ${activeClassNumber} of 6 for today's 1-hour session on "${chapterName}". Feel free to ask any question—I will answer you and guide us back to today's topic so we complete our syllabus goals on time!`;
    
    setChatHistory([
      { role: 'assistant', content: greeting, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    
    if (!voiceMuted) {
      speakText(greeting, activeTeacher);
    }
  }, [selectedChapter, activeTeacher, activeClassNumber]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  // Handle Switching between Daily 6 Classes
  const handleSelectDailyClass = (classItem) => {
    setActiveClassNumber(classItem.classNumber);
    const assignedTeacher = TEACHERS_MAP[classItem.teacherId] || TEACHERS_LIST[0];
    setActiveTeacher(assignedTeacher);
    setSecondsRemaining(3600); // Reset 1-hour session timer
  };

  // Realistic Voice Synthesis with Diction & Gender Tuning
  const speakText = (text, teacherObj = activeTeacher) => {
    if (!('speechSynthesis' in window) || voiceMuted) return;

    window.speechSynthesis.cancel();

    // Clean text for natural speech diction (strip markdown, asterisks, brackets)
    const cleanedText = text
      .replace(/\*\*/g, '')
      .replace(/#/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '$1 over $2')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    const voices = window.speechSynthesis.getVoices();

    let selectedVoice = null;
    if (teacherObj.gender === 'male') {
      selectedVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('hi-IN')) && v.name.toLowerCase().includes('male')) ||
                      voices.find(v => v.lang.includes('en-IN')) ||
                      voices.find(v => v.name.toLowerCase().includes('male')) ||
                      voices[0];
    } else {
      selectedVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('hi-IN')) && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira'))) ||
                      voices.find(v => v.lang.includes('en-IN')) ||
                      voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha')) ||
                      voices[0];
    }

    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.pitch = teacherObj.voicePitch || (teacherObj.gender === 'male' ? 0.85 : 1.1);
    utterance.rate = teacherObj.voiceRate || 0.92;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (isListening && recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
        setIsListening(false);
      }
    };
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceToggle = () => {
    if (isSpeaking) return;

    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please type your response!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechText('');
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Speech start error", e);
      }
    }
  };

  const handleSendResponse = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading || isSpeaking) return;

    const userText = input;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setInput('');
    setSpeechText('');
    setChatHistory(prev => [...prev, { role: 'user', content: userText, timestamp: timeStr }]);
    setIsLoading(true);

    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      setIsListening(false);
    }

    try {
      const currentSchedule = DAILY_6_CLASS_SCHEDULE[activeClassNumber - 1];
      const aiReply = await generateAITeacherResponse({
        userPrompt: userText,
        teacher: activeTeacher,
        subject: selectedSubject || { subjectName: currentSchedule?.subject || 'Science' },
        chapter: selectedChapter || { title: currentSchedule?.chapterTitle || 'NCERT Class Module' },
        studentName: userProfile.studentName,
        chatHistory: chatHistory,
        currentStimulus: selectedChapter?.stimulusQuestion || null
      });

      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: aiReply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      speakText(aiReply, activeTeacher);
    } catch (err) {
      console.error("AI Response Error:", err);
      const fallbackReply = `Great question ${userProfile.studentName}! Let's answer this and navigate back to today's topic on our chalkboard.`;
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: fallbackReply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      speakText(fallbackReply, activeTeacher);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 space-y-4 flex flex-col min-h-[720px]">
      
      {/* Sleek Header Bar with 1-Hour Timer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 flex flex-wrap justify-between items-center gap-3 shrink-0 shadow-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToSyllabus}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            ← Back to Syllabus
          </button>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>{selectedChapter?.title || DAILY_6_CLASS_SCHEDULE[activeClassNumber - 1]?.chapterTitle}</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-extrabold uppercase">
                Class {activeClassNumber} of 6 Today
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              NCERT CBSE & ICSE Aligned • 1-Hour Interactive Session
            </p>
          </div>
        </div>

        {/* 1-Hour Live Countdown Timer & Mode Controls */}
        <div className="flex items-center space-x-3">
          {/* 1-Hour Countdown Timer */}
          <div className="bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl flex items-center space-x-2">
            <span className="text-xs text-slate-400">⏱️ Session Timer:</span>
            <span className="font-mono font-black text-amber-400 text-sm">{formatTime(secondsRemaining)}</span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              {progressPercent}% Complete
            </span>
          </div>

          {/* Mode Controls */}
          <button
            onClick={() => setStreamMode(streamMode === 'video' ? 'audio' : 'video')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
          >
            <span>{streamMode === 'video' ? '🎥 HD Video' : '📻 Low-Bandwidth Audio'}</span>
          </button>

          <button
            onClick={() => {
              if (isSpeaking) window.speechSynthesis.cancel();
              setVoiceMuted(!voiceMuted);
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs transition"
          >
            {voiceMuted ? '🔇 Audio Muted' : '🔊 Voice Sound On'}
          </button>
        </div>
      </div>

      {/* Daily 6-Class Schedule Selector Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-md overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-400 flex items-center space-x-2">
            <span>📅 Today's Timetable: 6 Scheduled 1-Hour Classes</span>
            <span className="text-slate-500">• Click to Switch Class</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {DAILY_6_CLASS_SCHEDULE.map(c => {
            const isActive = activeClassNumber === c.classNumber;
            const assignedTeacher = TEACHERS_MAP[c.teacherId];
            return (
              <button
                key={c.classNumber}
                onClick={() => handleSelectDailyClass(c)}
                className={`p-2 rounded-xl text-left border transition flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-indigo-500 ring-1 ring-indigo-500/40 text-white'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-400 uppercase">Class {c.classNumber}</span>
                  <span className="text-[9px] text-slate-500">{c.timeSlot.split('-')[0]}</span>
                </div>
                <div className="text-xs font-bold text-slate-200 truncate mt-1">{c.icon} {c.subject.split('&')[0]}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{assignedTeacher?.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: AI Avatar Screen + Chalkboard + Sleek Chat */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        
        {/* Left Side: Avatar Screen & Teacher Switcher (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4 overflow-y-auto pr-1">
          {/* AI Avatar Display */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
            <div className={`absolute inset-0 bg-gradient-to-b ${activeTeacher.avatarBg} blur-3xl pointer-events-none`} />

            {streamMode === 'video' ? (
              <div className="relative flex flex-col items-center my-auto">
                <div className="relative">
                  <img
                    src={activeTeacher.image}
                    alt={activeTeacher.name}
                    className={`w-36 h-36 rounded-full object-cover border-4 transition-all duration-300 ${
                      isSpeaking ? 'border-emerald-400 shadow-2xl shadow-emerald-500/40 scale-105' : 'border-indigo-500/30'
                    }`}
                  />

                  {isSpeaking && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full flex items-center space-x-1.5 shadow-lg tracking-wider">
                      <span className="w-2 h-2 bg-slate-950 rounded-full animate-ping" />
                      <span>SPEAKING</span>
                    </div>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mt-3">{activeTeacher.name}</h3>
                <p className="text-xs text-indigo-300 font-medium">{activeTeacher.title}</p>
                <span className="text-[10px] text-slate-400 mt-1 italic">{activeTeacher.voiceStyle}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4 my-auto space-y-2">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl animate-pulse">
                  📻
                </div>
                <div className="text-xs font-bold text-amber-300">Audio Mode Active</div>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Streaming audio cleanly for low internet connections.
                </p>
              </div>
            )}
          </div>

          {/* Teacher Selection Bar (3 Women + 1 Man) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-lg">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              Select AI Teacher (3 Female • 1 Male):
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TEACHERS_LIST.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTeacher(t)}
                  className={`p-2 rounded-xl flex items-center space-x-2 border transition text-left ${
                    activeTeacher.id === t.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate leading-tight">{t.name}</div>
                    <div className="text-[9px] text-slate-400 truncate">{t.gender === 'female' ? 'Female Faculty' : 'Male Faculty'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Digital Chalkboard & 2-Way Speech Dialogue (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4 min-h-0">
          
          {/* Digital Chalkboard */}
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-4 shadow-xl shrink-0">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Digital Chalkboard</span>
              </div>
              <span className="text-[10px] text-slate-400">NCERT Aligned Key Concepts</span>
            </div>

            <div className="space-y-1.5">
              {(selectedChapter?.chalkboardKeypoints || [
                'Fundamental Theorem of Arithmetic',
                'HCF × LCM = Product of Two Numbers',
                'Euclid Division Lemma: a = bq + r',
                'Proof by contradiction for irrational numbers'
              ]).map((point, i) => (
                <div key={i} className="text-xs text-slate-200 flex items-start space-x-2 font-mono">
                  <span className="text-emerald-400 font-bold">›</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2-Way Interactive Live Chat Stream */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col min-h-0 shadow-2xl">
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] text-slate-500 mb-1 px-1">
                    {msg.role === 'user' ? userProfile.studentName : activeTeacher.name} • {msg.timestamp}
                  </div>
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-lg'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center space-x-2 text-indigo-400 text-xs p-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  <span>{activeTeacher.name} is formulating the response...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* 2-Way Input Form: Web Speech Microphone + Send */}
            <form onSubmit={handleSendResponse} className="mt-3 flex items-center space-x-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleVoiceToggle}
                disabled={isSpeaking || isLoading}
                className={`p-3 rounded-2xl border transition flex items-center justify-center ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-lg shadow-rose-600/30'
                    : isSpeaking
                    ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
                title={isSpeaking ? 'Microphone locked while teacher speaks' : isListening ? 'Click to stop recording' : 'Click to speak'}
              >
                🎤
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading || isSpeaking}
                placeholder={isSpeaking ? "Teacher is speaking..." : isListening ? "Listening to your voice..." : "Type your question or response here..."}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading || isSpeaking}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30"
              >
                Send
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
