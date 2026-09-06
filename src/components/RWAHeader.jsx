import React, { useState } from 'react';
import { LIVE_TICKERS, SUPPORTED_CHAINS } from '../data/rwaData';
import { formatAddress } from '../services/walletService';

export default function RWAHeader({ 
  activeTab, 
  setActiveTab, 
  activeChain, 
  setActiveChain, 
  connectedWallet, 
  onOpenWalletModal,
  onOpenDomainModal,
  onOpenBridgeModal
}) {
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Live Market Ticker Bar */}
      <div className="bg-[#070A10] border-b border-slate-800/50 py-1.5 px-4 overflow-hidden text-xs font-mono text-slate-400">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 shrink-0 pr-4 border-r border-slate-800 bg-[#070A10] z-10 font-sans font-semibold text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>LIVE RWA & STOCK ORACLE</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-ticker space-x-8 pl-4">
              {[...LIVE_TICKERS, ...LIVE_TICKERS].map((item, idx) => (
                <div key={idx} className="inline-flex items-center space-x-2">
                  <span className="text-slate-300 font-semibold">{item.symbol}</span>
                  <span className="text-slate-200">{item.price || item.yield}</span>
                  <span className={item.isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                    {item.change}
                  </span>
                  <span className="text-slate-600">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center space-x-8">
          <div 
            onClick={() => setActiveTab('marketplace')} 
            className="cursor-pointer flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-cyan-400 p-[2px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center font-black text-amber-400 text-lg">
                P2P
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-extrabold tracking-tight text-white font-sans">P2PPro</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">.me</span>
              </div>
              <p className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">Pre-IPO Stocks & RWA Protocol</p>
            </div>
          </div>

          {/* Dedicated Verticals Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'marketplace' 
                  ? 'bg-slate-800/80 text-amber-400 font-semibold border border-amber-500/30 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <i className="fa-solid fa-store mr-1.5 text-amber-400"></i>
              Marketplace
            </button>

            <button
              onClick={() => setActiveTab('preipo')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'preipo' 
                  ? 'bg-slate-800/80 text-purple-400 font-semibold border border-purple-500/30 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <i className="fa-solid fa-chart-line mr-1.5 text-purple-400"></i>
              Pre-IPO Stocks
            </button>

            <button
              onClick={() => setActiveTab('realestate')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'realestate' 
                  ? 'bg-slate-800/80 text-cyan-400 font-semibold border border-cyan-500/30 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <i className="fa-solid fa-building mr-1.5 text-cyan-400"></i>
              Real Estate
            </button>

            <button
              onClick={() => setActiveTab('otc')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'otc' 
                  ? 'bg-slate-800/80 text-amber-400 font-semibold border border-amber-500/30 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <i className="fa-solid fa-robot mr-1.5 text-emerald-400"></i>
              Stock Bot & OTC
            </button>

            <button
              onClick={() => setActiveTab('tokenize')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'tokenize' 
                  ? 'bg-slate-800/80 text-emerald-400 font-semibold border border-emerald-500/30 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <i className="fa-solid fa-plus-circle mr-1.5 text-emerald-400"></i>
              List Opportunity
            </button>

            <button
              onClick={() => setActiveTab('por')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'por' 
                  ? 'bg-slate-800/80 text-blue-400 font-semibold border border-blue-500/30 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <i className="fa-solid fa-shield-halved mr-1.5 text-blue-400"></i>
              Proof of Reserves
            </button>
          </nav>
        </div>

        {/* Action Controls & Wallet Connection */}
        <div className="flex items-center space-x-3">
          
          {/* Domain Setup Badge Button */}
          <button
            onClick={onOpenDomainModal}
            className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono transition-all"
            title="Configure Domain Settings for p2ppro.me"
          >
            <i className="fa-solid fa-globe"></i>
            <span>p2ppro.me Config</span>
          </button>

          {/* Cross-Chain Bridge Button */}
          <button
            onClick={onOpenBridgeModal}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
          >
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
            <span className="hidden sm:inline">CCIP Bridge</span>
          </button>

          {/* Network Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>{activeChain.icon}</span>
              <span className="hidden md:inline">{activeChain.name}</span>
              <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
            </button>

            {isChainDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-400 border-b border-slate-800 mb-1">
                  Select Settlement Chain
                </div>
                {SUPPORTED_CHAINS.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => {
                      setActiveChain(chain);
                      setIsChainDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      activeChain.id === chain.id 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{chain.icon}</span>
                      <span>{chain.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">● {chain.avgFee}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect / Connected Wallet Button */}
          {connectedWallet ? (
            <button
              onClick={onOpenWalletModal}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>{connectedWallet.type.icon}</span>
              <span>{formatAddress(connectedWallet.address)}</span>
            </button>
          ) : (
            <button
              onClick={onOpenWalletModal}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 hover:opacity-95 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all"
            >
              <i className="fa-solid fa-wallet"></i>
              <span>Connect Wallet</span>
            </button>
          )}

        </div>

      </div>

      {/* Mobile Nav Tabs */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-xs space-x-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'marketplace' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300'
          }`}
        >
          Marketplace
        </button>
        <button
          onClick={() => setActiveTab('preipo')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'preipo' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-slate-300'
          }`}
        >
          Pre-IPO Stocks
        </button>
        <button
          onClick={() => setActiveTab('realestate')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'realestate' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-300'
          }`}
        >
          Real Estate
        </button>
        <button
          onClick={() => setActiveTab('otc')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'otc' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300'
          }`}
        >
          Stock Bot & OTC
        </button>
        <button
          onClick={() => setActiveTab('tokenize')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'tokenize' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-300'
          }`}
        >
          List Opportunity
        </button>
      </div>
    </header>
  );
}
