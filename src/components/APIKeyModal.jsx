import React, { useState, useEffect } from 'react';

export default function APIKeyModal({ isOpen, onClose, onSaveKeys }) {
  const [provider, setProvider] = useState('kimi'); // 'kimi' | 'gemini' | 'openai' | 'openrouter'
  const [apiKey, setApiKey] = useState('');
  const [savedStatus, setSavedStatus] = useState('');

  useEffect(() => {
    const savedProv = localStorage.getItem('lasavo_ai_provider') || 'kimi';
    const savedKey = localStorage.getItem('lasavo_ai_api_key') || '';
    setProvider(savedProv);
    setApiKey(savedKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('lasavo_ai_provider', provider);
    localStorage.setItem('lasavo_ai_api_key', apiKey.trim());
    setSavedStatus('✅ API Configuration Saved! Live AI Model active.');
    setTimeout(() => {
      setSavedStatus('');
      onSaveKeys({ provider, apiKey: apiKey.trim() });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🤖</span>
            <h2 className="text-lg font-bold text-white">Connect Live AI Model API</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm transition"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Connect your <strong>Kimi K3 (Moonshot AI)</strong>, <strong>Google Gemini</strong>, or <strong>OpenAI / OpenRouter</strong> API Key so every student input queries the live LLM neural network directly.
        </p>

        {savedStatus && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs p-3 rounded-xl mb-4 font-semibold">
            {savedStatus}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select AI Model Provider</label>
            <select
              value={provider}
              onChange={e => setProvider(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="kimi">Kimi K3 (Moonshot AI API)</option>
              <option value="gemini">Google Gemini 1.5 / 2.5 Flash API</option>
              <option value="openai">OpenAI ChatGPT (GPT-4o / GPT-3.5)</option>
              <option value="openrouter">OpenRouter AI (DeepSeek / Llama 3)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Enter {provider.toUpperCase()} API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder={
                provider === 'kimi' ? 'sk-... (Moonshot AI API Key)' :
                provider === 'gemini' ? 'AIzaSy... (Google Gemini API Key)' :
                'sk-proj-... (API Key)'
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Key is stored locally in your browser session for direct HTTP querying.
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition transform active:scale-95 mt-2"
          >
            Save & Activate Live AI Queries
          </button>
        </form>
      </div>
    </div>
  );
}
