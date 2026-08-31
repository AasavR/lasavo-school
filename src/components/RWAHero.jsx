import React from 'react';
import { SUPPORTED_CHAINS } from '../data/rwaData';

export default function RWAHero({ 
  onExplore, 
  onPreIPOClick, 
  onTokenizeClick, 
  onOpenDomainModal,
  onOpenCalculator
}) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-purple-500/10 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Protocol Status Pill */}
        <div className="flex items-center justify-center mb-6">
          <div 
            onClick={onOpenDomainModal}
            className="cursor-pointer inline-flex items-center space-x-3 px-4 py-2 rounded-full glass-panel border border-amber-500/30 text-xs font-mono text-amber-300 hover:border-amber-400 transition-all shadow-lg shadow-amber-500/10"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>p2ppro.me • Cross-Chain Settlement Protocol Active</span>
            <i className="fa-solid fa-chevron-right text-[10px] text-amber-400"></i>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
            Institutional <span className="gold-gradient-text">Real World Assets</span> & <span className="cyan-gradient-text">Pre-IPO Synthetics</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            The blockchain-agnostic protocol built for <span className="text-amber-400 font-medium">p2ppro.me</span>. Seamlessly trade fractionalized Pre-IPO equity derivatives, prime real estate, treasury debts, and physical vault gold across Ethereum, Solana, Arbitrum, Base & Avalanche.
          </p>
        </div>

        {/* Hero Action CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center space-x-3"
          >
            <i className="fa-solid fa-store text-base"></i>
            <span>Explore RWA Marketplace</span>
          </button>

          <button
            onClick={onPreIPOClick}
            className="px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-bold text-sm border border-purple-500/40 hover:border-purple-400 transition-all flex items-center space-x-3 shadow-lg shadow-purple-500/10"
          >
            <i className="fa-solid fa-rocket text-purple-400"></i>
            <span>Mint Pre-IPO Synthetics</span>
          </button>

          <button
            onClick={onOpenCalculator}
            className="px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 font-bold text-sm border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center space-x-3"
          >
            <i className="fa-solid fa-calculator text-cyan-400"></i>
            <span>Yield & ROI Calculator</span>
          </button>
        </div>

        {/* Protocol Statistics Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card p-5 rounded-2xl text-center border-slate-800">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Value Locked</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-mono">$1.42 Billion+</p>
            <p className="mt-1 text-[11px] text-emerald-400">● 100% Vault Verified</p>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border-slate-800">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Active P2P Derivatives</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">$480 Million</p>
            <p className="mt-1 text-[11px] text-slate-400">SpaceX, OpenAI, Stripe</p>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border-slate-800">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Supported Blockchains</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">12+ Chains</p>
            <p className="mt-1 text-[11px] text-cyan-300">Cross-Chain Agnostic</p>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border-slate-800">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Physical Vault Custody</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">Zurich & SG</p>
            <p className="mt-1 text-[11px] text-purple-300">Brinks LBMA 999.9</p>
          </div>
        </div>

        {/* Supported Chain Logos Bar */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
            Blockchain Agnostic Infrastructure Powered By Chainlink CCIP
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SUPPORTED_CHAINS.map((chain) => (
              <div 
                key={chain.id}
                className="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center space-x-2 text-xs font-medium text-slate-300 hover:border-slate-700 transition-colors"
              >
                <span>{chain.icon}</span>
                <span>{chain.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
