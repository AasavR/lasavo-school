import React, { useState, useEffect, useRef } from 'react';
import { generateAITeacherResponse } from '../services/aiTeacherEngine';
import { TEACHERS_LIST } from '../data/curriculumData';

export default function AIAvatarClassroom({ 
  selectedSubject, 
  selectedChapter, 
  selectedTeacher: initialTeacher, 
  userProfile,
  onBackToSyllabus 
}) {
  const [activeTeacher, setActiveTeacher] = useState(initialTeacher || TEACHERS_LIST[0]);
  const [streamMode, setStreamMode] = useState('video'); // 'video' | 'audio'

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
    const greeting = `Welcome ${userProfile.studentName}! I am ${activeTeacher.name}. Today we are exploring ${selectedChapter?.title || 'our NCERT module'}. Feel free to ask me anything or answer my prompts!`;
    
    setChatHistory([
      { role: 'assistant', content: greeting, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    
    if (!voiceMuted) {
      speakText(greeting, activeTeacher);
    }
  }, [selectedChapter, activeTeacher]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

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

    // Filter voice based on teacher gender and accent
    let selectedVoice = null;
    if (teacherObj.gender === 'male') {
      selectedVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('hi-IN')) && v.name.toLowerCase().includes('male')) ||
                      voices.find(v => v.lang.includes('en-IN')) ||
                      voices.find(v => v.name.toLowerCase().includes('male')) ||
                      voices[0];
    } else {
      selectedVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('hi-IN')) && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('heera'))) ||
                      voices.find(v => v.lang.includes('en-IN')) ||
                      voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha')) ||
                      voices[0];
    }

    if (selectedVoice) utterance.voice = selectedVoice;

    // Pitch, Tempo (Rate), & Tenor
    utterance.pitch = teacherObj.voicePitch || (teacherObj.gender === 'male' ? 0.85 : 1.1);
    utterance.rate = teacherObj.voiceRate || 0.92;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      // Ensure mic is stopped when AI starts speaking
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
    if (isSpeaking) return; // Prevent mic from turning on while AI is speaking

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

    // Stop mic if running
    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      setIsListening(false);
    }

    try {
      // Invoke AI model response tailored directly to student's turn
      const aiReply = await generateAITeacherResponse({
        userPrompt: userText,
        teacher: activeTeacher,
        subject: selectedSubject,
        chapter: selectedChapter,
        studentName: userProfile.studentName,
        chatHistory: chatHistory,
        currentStimulus: selectedChapter?.stimulusQuestion
      });

      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: aiReply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      speakText(aiReply, activeTeacher);
    } catch (err) {
      console.error("AI Response Error:", err);
      const fallbackReply = `I hear you, ${userProfile.studentName}! Let's examine this concept together from another angle.`;
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
    <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 space-y-4 flex flex-col h-[calc(100vh-90px)] min-h-[680px]">
      {/* Sleek Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 flex flex-wrap justify-between items-center gap-3 shrink-0 shadow-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToSyllabus}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            ← Back to Syllabus
          </button>
          <div>
            <h2 className="text-sm font-bold text-white">
              {selectedChapter?.title || 'NCERT Interactive Classroom'}
            </h2>
            <p className="text-[11px] text-indigo-400 font-medium">{selectedChapter?.ncertRef}</p>
          </div>
        </div>

        {/* Clean Mode Toggle */}
        <div className="flex items-center space-x-2">
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
                  <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold truncate">{t.name}</div>
                    <div className="text-[9px] opacity-75 truncate">{t.gender === 'male' ? '♂️ Male Voice' : '♀️ Female Voice'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Digital Chalkboard */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-2 flex-1 flex flex-col">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              📝 Digital Chalkboard & Key Formulas
            </div>
            <div className="flex-1 bg-slate-950 rounded-2xl p-3 border border-slate-800 text-xs space-y-2">
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {(selectedChapter?.chalkboardKeypoints || [
                  'Fundamental Theorem of Arithmetic',
                  'HCF(a,b) × LCM(a,b) = a × b',
                  'Proof by Contradiction Method'
                ]).map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Sleek Chat Stream (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col shadow-2xl overflow-hidden min-h-0">
          
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/40 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Live AI Dialogue ({activeTeacher.name})</span>
            </div>
            <span className="text-[10px] text-slate-400">Student: {userProfile.studentName}</span>
          </div>

          {/* Chat Stream Window */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md sm:max-w-lg rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-none' 
                    : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-bl-none'
                }`}>
                  <div className="text-[10px] font-semibold mb-1 opacity-75 flex justify-between items-center space-x-4">
                    <span>{msg.role === 'user' ? userProfile.studentName : activeTeacher.name}</span>
                    <span className="font-normal opacity-60">{msg.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700/60 text-slate-300 text-xs px-4 py-3 rounded-2xl rounded-bl-none flex items-center space-x-2 shadow-md">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200" />
                  <span className="ml-2 text-slate-400">{activeTeacher.name} is thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Clean Input Controls */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800 space-y-2">
            <form onSubmit={handleSendResponse} className="flex items-center space-x-2">
              {/* Mic Voice Button - Disabled during AI Speech */}
              <button
                type="button"
                disabled={isSpeaking || isLoading}
                onClick={handleVoiceToggle}
                className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                  isSpeaking 
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : isListening 
                      ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
                title={isSpeaking ? "Mic disabled while AI is speaking" : isListening ? "Listening... Click to stop" : "Speak to AI Teacher"}
              >
                <span>
                  {isSpeaking ? '🔊 AI Speaking...' : isListening ? '🎙️ Listening...' : '🎤 Voice Input'}
                </span>
              </button>

              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isSpeaking ? `${activeTeacher.name} is speaking...` : isListening ? "Listening to your voice..." : `Ask ${activeTeacher.name} anything...`}
                className="flex-1 bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 shadow-inner"
              />

              <button
                type="submit"
                disabled={isLoading || isSpeaking || !input.trim()}
                className={`px-5 py-3 rounded-2xl font-bold text-xs text-white shadow-lg transition-all shrink-0 ${
                  isLoading || isSpeaking || !input.trim() 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : `${activeTeacher.btnColor} shadow-indigo-600/20 active:scale-95`
                }`}
              >
                Send
              </button>
            </form>

            {speechText && (
              <div className="text-[10px] text-emerald-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                Voice input detected: "{speechText}"
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
