import React, { useState } from 'react';
import { SUPPORTED_CHAINS, RWA_ASSETS } from '../data/rwaData';

export default function CrossChainBridgeModal({ isOpen, onClose }) {
  const [sourceChain, setSourceChain] = useState(SUPPORTED_CHAINS[0]);
  const [destChain, setDestChain] = useState(SUPPORTED_CHAINS[1]);
  const [selectedAsset, setSelectedAsset] = useState(RWA_ASSETS[0]);
  const [amount, setAmount] = useState('10');
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeStep, setBridgeStep] = useState(0);

  if (!isOpen) return null;

  const handleBridgeAction = () => {
    setIsBridging(true);
    setBridgeStep(1);
    
    setTimeout(() => {
      setBridgeStep(2);
    }, 1500);

    setTimeout(() => {
      setBridgeStep(3);
    }, 3200);
  };

  const resetBridge = () => {
    setIsBridging(false);
    setBridgeStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#0F172A] border border-cyan-500/30 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm"
        >
          ✕
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Chainlink CCIP Cross-Chain RWA Bridge</h3>
            <p className="text-xs text-slate-400">Agnostic Multi-Chain Asset Relayer for p2ppro.me</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1">Select Asset to Bridge</label>
            <select
              value={selectedAsset.id}
              onChange={(e) => setSelectedAsset(RWA_ASSETS.find(a => a.id === e.target.value))}
              className="w-full p-3 rounded-xl glass-input text-white bg-slate-900"
            >
              {RWA_ASSETS.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">From Origin Chain:</span>
              <select
                value={sourceChain.id}
                onChange={(e) => setSourceChain(SUPPORTED_CHAINS.find(c => c.id === e.target.value))}
                className="w-full bg-transparent text-white font-bold text-xs outline-none cursor-pointer"
              >
                {SUPPORTED_CHAINS.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">To Target Chain:</span>
              <select
                value={destChain.id}
                onChange={(e) => setDestChain(SUPPORTED_CHAINS.find(c => c.id === e.target.value))}
                className="w-full bg-transparent text-white font-bold text-xs outline-none cursor-pointer"
              >
                {SUPPORTED_CHAINS.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Bridge Quantity ({selectedAsset.symbol})</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 rounded-xl glass-input text-white font-bold text-sm"
            />
          </div>

          {bridgeStep > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-bold">CCIP Relayer Status:</span>
                <span className="text-slate-400">
                  {bridgeStep === 1 && 'Locking Tokens...'}
                  {bridgeStep === 2 && 'Chainlink Consensus...'}
                  {bridgeStep === 3 && 'Complete!'}
                </span>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-700" 
                  style={{ width: bridgeStep === 1 ? '35%' : bridgeStep === 2 ? '75%' : '100%' }}
                ></div>
              </div>

              {bridgeStep === 3 && (
                <div className="text-emerald-400 font-bold text-center text-xs pt-1">
                  Successfully Bridged {amount} {selectedAsset.symbol} to {destChain.name}!
                </div>
              )}
            </div>
          )}

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Relayer Mechanism:</span>
              <span className="text-cyan-300">Chainlink CCIP Programmable Token Transfer</span>
            </div>
            <div className="flex justify-between">
              <span>Est. Network Gas Fee:</span>
              <span className="text-slate-200">~$0.85 USD ({sourceChain.avgFee})</span>
            </div>
          </div>

          {bridgeStep === 3 ? (
            <button
              onClick={resetBridge}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
            >
              Perform Another Bridge
            </button>
          ) : (
            <button
              onClick={handleBridgeAction}
              disabled={isBridging}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
            >
              {isBridging ? 'Relaying Cross-Chain Transfer...' : `Bridge ${selectedAsset.symbol} to ${destChain.name}`}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
