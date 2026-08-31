import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_PAST_CHAT_SESSIONS, PRESET_SAMPLE_QUERIES } from '../data/pastChatsData';
import { searchRAGMemory, generateRAGSynthesis } from '../services/ragMemoryEngine';
import GitHubNetlifyModal from './GitHubNetlifyModal';

export default function RAGMemoryStudio() {
  const [sessions, setSessions] = useState(INITIAL_PAST_CHAT_SESSIONS);
  const [selectedSessionId, setSelectedSessionId] = useState(sessions[0].id);
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topK, setTopK] = useState(4);
  const [retrievedChunks, setRetrievedChunks] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `👋 **Welcome to OmniMemory RAG Studio!**

I am equipped with **Cross-Session Retrieval-Augmented Generation (RAG)** memory. 

I have indexed your past conversation logs, including your **two separate trips to Latvia & Riga** (May 2023 & Dec 2024).

Click one of the **Preset Queries** below or type any question to see how RAG pulls context from prior chats!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      chunksCount: 0
    }
  ]);

  // Modals & settings
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionText, setNewSessionText] = useState('');
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  // Execute RAG Search & Synthesis
  const handleSendQuery = async (queryToRun) => {
    const text = queryToRun || queryInput;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    if (!queryToRun) setQueryInput('');
    setIsLoading(true);

    try {
      // 1. Perform RAG Vector Search over past chat sessions
      const chunks = searchRAGMemory(text, sessions, topK);
      setRetrievedChunks(chunks);

      // 2. Synthesize AI Response from RAG Context
      const synthesisText = await generateRAGSynthesis(text, chunks, apiKey);

      const aiMsg = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: synthesisText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chunksCount: chunks.length,
        retrievedFrom: [...new Set(chunks.map(c => c.sessionTitle))]
      };

      setChatHistory(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('RAG Error:', err);
      setChatHistory(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: `⚠️ **RAG Retrieval Exception**: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          chunksCount: 0
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new session to memory store
  const handleCreateSession = (e) => {
    e.preventDefault();
    if (!newSessionTitle.trim() || !newSessionText.trim()) return;

    const newSession = {
      id: `session-custom-${Date.now()}`,
      title: newSessionTitle,
      date: new Date().toISOString().split('T')[0],
      category: "Custom Chat Log",
      tags: ["User Added", "Custom"],
      messages: [
        {
          sender: "user",
          timestamp: new Date().toLocaleString(),
          text: newSessionText
        }
      ]
    };

    setSessions(prev => [newSession, ...prev]);
    setSelectedSessionId(newSession.id);
    setNewSessionTitle('');
    setNewSessionText('');
    setShowAddSessionModal(false);
  };

  const currentSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans flex flex-col justify-between">
      
      {/* Navigation Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1px] shadow-lg shadow-sky-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-sky-400 font-black text-xl">
                🧠
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">OmniMemory RAG Studio</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-semibold">
                  Cross-Session AI
                </span>
              </div>
              <p className="text-xs text-slate-400">Long-term chat context retrieval & intelligence synthesis engine</p>
            </div>
          </div>

          {/* Action & Config Toolbar */}
          <div className="flex items-center gap-2">
            
            {/* Top-K Selector */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <span className="text-slate-400">Top-K Chunks:</span>
              <select
                value={topK}
                onChange={e => setTopK(Number(e.target.value))}
                className="bg-transparent text-sky-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value={2} className="bg-slate-900">2 Chunks</option>
                <option value={4} className="bg-slate-900">4 Chunks</option>
                <option value={6} className="bg-slate-900">6 Chunks</option>
              </select>
            </div>

            {/* API Key Modal Button */}
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
            >
              <span>🔑</span> {apiKey ? 'API Key Set' : 'LLM API Key'}
            </button>

            {/* Deploy to GitHub & Netlify Button */}
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition flex items-center gap-2"
            >
              <span>🚀</span> Deploy GitHub & Netlify
            </button>

          </div>

        </div>
      </header>

      {/* Main Studio Body */}
      <main className="max-w-7xl w-full mx-auto p-4 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: RAG Memory Store & Context Retriever (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Section 1: Past Chat Sessions Store */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🗃️</span>
                <h2 className="text-sm font-bold text-slate-200">Past Chat History Index</h2>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                  {sessions.length} Sessions
                </span>
              </div>
              <button
                onClick={() => setShowAddSessionModal(true)}
                className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 font-semibold transition"
              >
                + Add Session
              </button>
            </div>

            {/* Past Sessions List */}
            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
              {sessions.map(s => {
                const isSelected = s.id === selectedSessionId;
                const isLatvia = s.id.includes('latvia');

                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSessionId(s.id)}
                    className={`text-left p-3 rounded-xl border transition flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-500/50 shadow-md shadow-sky-500/5'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isLatvia ? 'text-amber-400' : 'text-slate-200'}`}>
                        {s.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{s.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {s.tags?.map(t => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Session Preview */}
            <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-3 text-xs space-y-2 mt-1">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/60 pb-1.5">
                <span className="font-semibold text-slate-300">Session Viewer: {currentSession.title}</span>
                <span className="font-mono text-[10px]">{currentSession.date}</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-2 text-slate-300">
                {currentSession.messages.map((m, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className={`font-bold text-[10px] uppercase ${m.sender === 'user' ? 'text-sky-400' : 'text-emerald-400'}`}>
                      {m.sender}:
                    </span>
                    <p className="bg-slate-900/60 p-2 rounded-lg text-slate-300 text-xs border border-slate-800/40">
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Retrieved RAG Context Chunks Inspector */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 flex-grow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">⚡</span>
                <h2 className="text-sm font-bold text-slate-200">Retrieved RAG Chunks Inspector</h2>
              </div>
              <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full font-mono">
                {retrievedChunks.length} Chunks Matched
              </span>
            </div>

            {retrievedChunks.length === 0 ? (
              <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-6 text-center text-slate-400 text-xs flex flex-col items-center justify-center flex-grow gap-2">
                <span className="text-2xl opacity-60">🎯</span>
                <p>Run a query on the right panel (e.g. <i>"show me all context of Latvia, Riga"</i>) to view live retrieved RAG passages & similarity scores.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                {retrievedChunks.map((chunk, idx) => {
                  const matchPct = Math.round(chunk.score * 100);
                  const isHighMatch = matchPct > 70;

                  return (
                    <div
                      key={idx}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1.5 relative overflow-hidden"
                    >
                      {/* Similarity Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-sky-400">
                          Chunk #{idx + 1} • {chunk.sessionTitle}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          isHighMatch
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {matchPct}% Match
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-mono bg-slate-900/80 p-2 rounded border border-slate-800/60">
                        "{chunk.rawText}"
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span>Date: {chunk.sessionDate}</span>
                        <span>Sender: {chunk.sender}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: RAG Query & AI Intelligence Synthesizer (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4">
          
          {/* Top Panel: Presets & AI Chat Stream */}
          <div className="flex flex-col gap-4 flex-grow">
            
            {/* Presets Toolbar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Try Preset Cross-Session Queries:</span>
                <span className="text-[10px] text-sky-400 font-mono">1-Click Evaluation</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_SAMPLE_QUERIES.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendQuery(p.query)}
                    className="text-left bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-sky-500/50 p-2.5 rounded-xl text-xs transition group flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 group-hover:text-sky-300 flex items-center gap-1.5">
                        <span>{p.icon}</span> {p.label}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                        {p.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 truncate">"{p.query}"</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Stream Window */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 flex-grow overflow-y-auto max-h-[500px] min-h-[350px] space-y-4">
              {chatHistory.map((msg) => {
                const isUser = msg.sender === 'user';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="font-bold uppercase text-slate-300">
                        {isUser ? 'You' : 'OmniMemory RAG AI'}
                      </span>
                      <span>•</span>
                      <span className="font-mono">{msg.timestamp}</span>
                      {msg.chunksCount > 0 && (
                        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-mono">
                          ⚡ RAG Pulled {msg.chunksCount} Chunks
                        </span>
                      )}
                    </div>

                    {/* Bubble Content */}
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[92%] ${
                        isUser
                          ? 'bg-sky-600 text-white rounded-tr-none font-medium'
                          : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none shadow-lg'
                      }`}
                    >
                      <div className="prose prose-invert max-w-none text-xs whitespace-pre-wrap">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-xs text-sky-400 animate-pulse">
                  <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching past chat vector index & synthesizing cross-session intelligence...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

          </div>

          {/* Bottom Panel: Prompt Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2 rounded-2xl focus-within:border-sky-500 transition"
          >
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask anything across past chats (e.g., 'show me all context of Latvia, Riga')..."
              className="flex-grow bg-transparent px-3 py-2 text-xs text-slate-100 focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !queryInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 font-bold text-xs text-white transition flex items-center gap-1.5 shadow-lg shadow-sky-600/20"
            >
              <span>Ask RAG</span>
              <span>➔</span>
            </button>
          </form>

        </div>

      </main>

      {/* Footer Info */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-3 px-4 text-center text-xs text-slate-400 flex flex-wrap items-center justify-between max-w-7xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>RAG Vector Memory Engine • Ready for Netlify & GitHub</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDeployModalOpen(true)} className="hover:text-sky-400 transition">
            GitHub Setup
          </button>
          <span>•</span>
          <button onClick={() => setIsDeployModalOpen(true)} className="hover:text-emerald-400 transition">
            Netlify Deployment
          </button>
        </div>
      </footer>

      {/* Deployment Modal */}
      <GitHubNetlifyModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🔑</span> Custom Gemini API Key
            </h3>
            <p className="text-xs text-slate-400">
              Optional: Enter your Gemini API key for direct Google LLM generation. If left blank, the built-in high-precision RAG synthesizer is used automatically.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-sky-300 font-mono focus:outline-none focus:border-sky-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Session Modal */}
      {showAddSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleCreateSession} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📝</span> Add Custom Chat Session to Memory
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Session Title</label>
              <input
                type="text"
                required
                value={newSessionTitle}
                onChange={e => setNewSessionTitle(e.target.value)}
                placeholder="e.g. Latvia Trip #3 - Summer Festival in Jurmala"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Chat Content / Notes</label>
              <textarea
                required
                rows={4}
                value={newSessionText}
                onChange={e => setNewSessionText(e.target.value)}
                placeholder="e.g. Traveled to Jurmala beach in Latvia. Stayed at Baltic Beach Hotel..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddSessionModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-xs text-white"
              >
                Index Session
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
