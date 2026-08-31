import React, { useState } from 'react';
import { 
  Box, Database, LayoutGrid, Cpu, Terminal, MessageSquare, 
  DollarSign, Search, ShieldCheck, Sparkles, Plus, Menu, X, 
  Github, ExternalLink, Activity, Zap
} from './Icons';

export default function Navbar({ activeTab, setActiveTab, onOpenUploadModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'models', label: 'Models', icon: Box, count: '128K' },
    { id: 'datasets', label: 'Datasets', icon: Database, count: '38K' },
    { id: 'spaces', label: 'Spaces', icon: LayoutGrid, count: '18K' },
    { id: 'finetune', label: 'AutoTrain', icon: Cpu, badge: 'GPU' },
    { id: 'inference', label: 'Inference API', icon: Terminal, badge: 'v2' },
    { id: 'community', label: 'Papers & Hub', icon: MessageSquare },
    { id: 'pricing', label: 'Pricing', icon: DollarSign }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Open Independence Announcement Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-indigo-600 to-cyan-600 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>
          <strong>OpenWeights Hub Initiative:</strong> Decentralized, open-source replacement for Hugging Face. Pure open weights forever.
        </span>
        <a 
          href="https://github.com/AasavR/open-weights-hub" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-amber-200 ml-2 inline-flex items-center gap-1"
        >
          GitHub <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('models')}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Box className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-200 bg-clip-text text-transparent">
                    OpenWeights
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    HUB
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 inline" /> Anti-Acquisition AI
                </p>
              </div>
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 128k+ models, datasets, spaces, papers... (Cmd+K)"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-10 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Action Buttons & Status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">WebGPU Cluster Online</span>
            </div>

            <button
              onClick={onOpenUploadModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Upload Model
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.count && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search OpenWeights..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500"
            />
          </div>
          <button
            onClick={() => { onOpenUploadModal(); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            Upload Model / Dataset
          </button>
        </div>
      )}
    </header>
  );
}
