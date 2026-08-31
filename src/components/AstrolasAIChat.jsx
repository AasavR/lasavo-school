import React, { useState } from 'react';

export default function AstrolasAIChat({ onBookPackage }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! I am Astrolas AI, your 24/7 Astro-Numerology Guide. Ask me anything about Chaldean name spelling totals, mobile SIM numbers, Lo Shu missing digits, or planetary remedies!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      let aiResponseText = '';
      
      try {
        const res = await fetch('/api/kimi-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userText, context: 'Numerology and Astrology' })
        });
        if (res.ok) {
          const data = await res.json();
          aiResponseText = data.reply || data.choices?.[0]?.message?.content;
        }
      } catch (err) {
        // Fallback response generator
      }

      if (!aiResponseText) {
        const lower = userText.toLowerCase();
        if (lower.includes('mobile') || lower.includes('phone') || lower.includes('sim')) {
          aiResponseText = 'Mobile phone numbers ending or totaling in 8 or 4 can create sudden delays unless harmonized with your birth chart (Mulank/Bhagyank). Compounds like 14, 23, 32, 41 (single digit 5) or 24, 33, 42 (single digit 6) are considered most lucky for business and wealth!';
        } else if (lower.includes('name') || lower.includes('spelling')) {
          aiResponseText = 'In Chaldean Numerology, changing your name spelling to compound 24, 32, 33, or 42 aligns your aura with Venus (6) and Mercury (5). Avoid total compounds 18, 29, or 44 which carry karmic stress.';
        } else if (lower.includes('loshu') || lower.includes('missing')) {
          aiResponseText = 'Missing numbers in your 3x3 Lo Shu Grid can be remediated using specific gemstones, metal watches, Rudraksha beads, and door pyramids. You can also get a 1-on-1 personalized dossier with exact remedies via our Astrolas series!';
        } else {
          aiResponseText = `According to Chaldean & Vedic Astro-Numerology principles regarding "${userText}": Every number emits a unique planetary sound wave. For deep personalized analysis and official name correction, explore our authentic Astrolas series!`;
        }
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Thank you for your question. For a complete in-depth analysis of your birth chart, you can book an Astrolas consultation series!' }]);
    }
  };

  return (
    <section id="ai-chat" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <span>🔮</span>
          <span>Instant AI Guidance</span>
        </div>
        <h2 className="text-3xl font-bold text-white font-serif">Astrolas 24/7 AI Astro-Numerologist</h2>
        <p className="text-xs text-slate-400">Ask instant questions about name totals, mobile numbers, and planetary remedies</p>
      </div>

      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-4 backdrop-blur-md">
        
        {/* Chat History Box */}
        <div className="h-80 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none font-sans'
                }`}
              >
                {m.sender === 'ai' && <span className="font-bold text-amber-400 block mb-1">🔮 Astrolas AI:</span>}
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-amber-300 animate-pulse">
                🔮 Astrolas AI is consulting planetary charts...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question (e.g. Is mobile total 6 good for business?)"
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
          >
            Ask AI
          </button>
        </form>

        <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-900">
          <span>Powered by Astrolas Chaldean & Lo Shu Engine</span>
          <button onClick={() => onBookPackage(null)} className="text-amber-400 hover:underline font-bold">
            Book Detailed Astrolas Consultation $\rightarrow$
          </button>
        </div>

      </div>

    </section>
  );
}
