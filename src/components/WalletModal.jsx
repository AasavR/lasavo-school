import React from 'react';
import { WALLET_TYPES, generateMockAddress, formatAddress } from '../services/walletService';

export default function WalletModal({ isOpen, onClose, activeChain, connectedWallet, onConnectWallet, onDisconnectWallet }) {
  if (!isOpen) return null;

  const handleSelectWallet = (wType) => {
    const mockAddr = generateMockAddress(wType.id, activeChain.id);
    onConnectWallet({
      type: wType,
      address: mockAddr,
      chain: activeChain
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#0F172A] border border-amber-500/30 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative font-sans">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm"
        >
          ✕
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <i className="fa-solid fa-wallet"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Connect Web3 Wallet</h3>
            <p className="text-xs text-slate-400 font-mono">Active Settlement: {activeChain.icon} {activeChain.name}</p>
          </div>
        </div>

        {connectedWallet ? (
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="font-bold flex items-center space-x-2">
                <span>{connectedWallet.type.icon}</span>
                <span>{connectedWallet.type.name} Connected</span>
              </span>
              <span>● Online</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px]">Active Address:</span>
              <span className="text-white font-bold text-sm block truncate">{connectedWallet.address}</span>
            </div>

            <button
              onClick={() => {
                onDisconnectWallet();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold border border-rose-500/40 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <p className="text-slate-400 text-[11px]">Select your preferred multi-chain Web3 wallet provider:</p>
            
            {WALLET_TYPES.map((w) => (
              <button
                key={w.id}
                onClick={() => handleSelectWallet(w)}
                className="w-full p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center space-x-3 text-left">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{w.icon}</span>
                  <div>
                    <h4 className="font-bold text-white text-xs group-hover:text-amber-400">{w.name}</h4>
                    <p className="text-[10px] text-slate-400 font-sans">{w.desc}</p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-slate-500 text-xs group-hover:text-amber-400"></i>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
