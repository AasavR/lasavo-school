import React from 'react';

export default function RWAFooter({ onOpenDomainModal, setActiveTab }) {
  return (
    <footer className="bg-[#070A10] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center font-black text-amber-400 text-sm">
                  P2P
                </div>
              </div>
              <span className="text-xl font-extrabold text-white">P2PPro.me</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The universal blockchain-agnostic protocol for tokenized real world assets, pre-IPO equity synthetics, institutional real estate, and physical vault gold.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={onOpenDomainModal}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px]"
              >
                Domain: p2ppro.me
              </button>

              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[11px]">
                Chainlink CCIP Verified
              </span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3 font-mono">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Protocol Verticals</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-amber-400 transition-colors">
                  RWA Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('preipo')} className="hover:text-purple-400 transition-colors">
                  Pre-IPO Synthetics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('otc')} className="hover:text-cyan-400 transition-colors">
                  P2P OTC Deals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tokenize')} className="hover:text-emerald-400 transition-colors">
                  Tokenize New Asset
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3 font-mono">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Settlement Layers</h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>⚡ Ethereum Mainnet</li>
              <li>🟣 Solana Network</li>
              <li>🔵 Arbitrum One</li>
              <li>🔵 Base Layer 2</li>
              <li>🔺 Avalanche C-Chain</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3 font-mono">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Vault Custodians</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Physical reserves audited by Deloitte Switzerland & KPMG. Vaults operated by Brinks Zurich, Loomis Singapore, and BNY Mellon Trust.
            </p>
            <div className="flex items-center space-x-3 text-slate-400 text-base pt-2">
              <a href="#twitter" className="hover:text-amber-400"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#telegram" className="hover:text-cyan-400"><i className="fa-brands fa-telegram"></i></a>
              <a href="#github" className="hover:text-white"><i className="fa-brands fa-github"></i></a>
              <a href="#discord" className="hover:text-purple-400"><i className="fa-brands fa-discord"></i></a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} P2PPro Protocol (p2ppro.me). All rights reserved. Decentralized RWA Infrastructure.</p>
          <div className="flex space-x-4">
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#docs" className="hover:text-slate-400">Developer Specs</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
