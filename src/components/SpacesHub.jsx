import React, { useState } from 'react';
import { 
  LayoutGrid, Play, Cpu, Heart, Sparkles, 
  Code, RefreshCw, Volume2, Monitor 
} from './Icons';
import { SPACES_DATA } from '../data/mockData';

export default function SpacesHub() {
  const [activeSpace, setActiveSpace] = useState(SPACES_DATA[0]);
  const [demoPrompt, setDemoPrompt] = useState('Generate an interactive visualization for step-by-step mathematical reasoning.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [demoResult, setDemoResult] = useState(null);

  const handleRunDemo = () => {
    setIsGenerating(true);
    setDemoResult(null);

    setTimeout(() => {
      setIsGenerating(false);
      if (activeSpace.id === 'flux-webgpu-studio') {
        setDemoResult({
          type: 'image',
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
          caption: 'Flux.1 WebGPU 1024x1024 Rendered in 1.1s (0 cloud cost)'
        });
      } else if (activeSpace.id === 'voice-cloner-pro') {
        setDemoResult({
          type: 'audio',
          audioText: 'Synthesized voice output generated with 24kHz zero-shot audio embeddings.',
          duration: '4.2 seconds'
        });
      } else {
        setDemoResult({
          type: 'reasoning',
          nodes: [
            { step: 1, title: 'Analyze Premise', detail: 'Parse target problem constraints & input variables.' },
            { step: 2, title: 'Branching Hypothesis', detail: 'Evaluate inductive vs deduction strategies.' },
            { step: 3, title: 'Synthesize Solution', detail: 'Verify zero loss in chain-of-thought.' }
          ]
        });
      }
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Interactive AI Apps & Hardware Containers</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Open Spaces Hub
            </h1>
            <p className="text-sm text-slate-300">
              Host and run Gradio, Streamlit, Docker, and WebGPU apps in seconds. Zero-cost hardware allocation powered by decentralized community GPUs.
            </p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition">
            <Sparkles className="w-4 h-4" />
            Create New Space
          </button>
        </div>
      </div>

      {/* Spaces Gallery & Interactive Demo Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Spaces Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-mono text-slate-400 px-1 block">Featured Open Spaces</span>

          <div className="space-y-3">
            {SPACES_DATA.map(space => {
              const isSelected = activeSpace.id === space.id;
              return (
                <div
                  key={space.id}
                  onClick={() => { setActiveSpace(space); setDemoResult(null); }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/50 shadow-lg ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-xs font-bold text-white hover:text-cyan-400 transition">
                      {space.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                      {space.sdk}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {space.description}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      {space.hardware}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-500" />
                      {space.likes}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live App Sandbox Container (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[600px]">
          
          {/* Header */}
          <div className="p-4 md:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">{activeSpace.title}</h2>
                <p className="text-xs text-slate-400 font-mono">
                  by {activeSpace.author} • {activeSpace.sdk} Container
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-mono border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Space Active
              </span>
            </div>
          </div>

          {/* Sandbox Body */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
            
            {/* Input Form for Space */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Interactive App Input Prompt</span>
                <span className="text-cyan-400 font-mono text-[10px]">{activeSpace.hardware}</span>
              </label>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={demoPrompt}
                  onChange={(e) => setDemoPrompt(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                  placeholder="Enter app prompt..."
                />

                <button
                  onClick={handleRunDemo}
                  disabled={isGenerating || !demoPrompt.trim()}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-slate-950" />
                  )}
                  <span>{isGenerating ? 'Executing...' : 'Run Space'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Output Render View */}
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
              
              {isGenerating ? (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mx-auto"></div>
                  <p className="text-xs font-mono text-slate-400">Allocating WebGPU hardware & executing container worker...</p>
                </div>
              ) : demoResult ? (
                <div className="w-full space-y-4">
                  {demoResult.type === 'image' && (
                    <div className="space-y-3 text-center">
                      <img 
                        src={demoResult.url} 
                        alt="Generated render" 
                        className="max-h-[320px] rounded-xl mx-auto border border-slate-800 object-cover shadow-2xl"
                      />
                      <p className="text-xs text-emerald-400 font-mono">{demoResult.caption}</p>
                    </div>
                  )}

                  {demoResult.type === 'audio' && (
                    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-4 max-w-md mx-auto">
                      <Volume2 className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
                      <div>
                        <p className="text-xs font-bold text-white">{demoResult.audioText}</p>
                        <span className="text-[11px] text-slate-400 font-mono mt-1 block">Duration: {demoResult.duration}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  )}

                  {demoResult.type === 'reasoning' && (
                    <div className="space-y-3 max-w-xl mx-auto">
                      <span className="text-xs font-mono text-cyan-400 block font-bold">Reasoning Tree Graph</span>
                      {demoResult.nodes.map(n => (
                        <div key={n.step} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                            {n.step}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-white">{n.title}</h4>
                            <p className="text-[11px] text-slate-400 font-mono">{n.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-2 text-slate-500">
                  <LayoutGrid className="w-10 h-10 mx-auto text-slate-700" />
                  <p className="text-xs font-mono">Click "Run Space" to launch interactive container preview</p>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
