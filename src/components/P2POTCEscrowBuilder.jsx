import React, { useState } from 'react';
import { OTC_ACTIVE_DEALS, RWA_ASSETS, SUPPORTED_CHAINS } from '../data/rwaData';

export default function P2POTCEscrowBuilder() {
  const [deals, setDeals] = useState(OTC_ACTIVE_DEALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offeringAsset, setOfferingAsset] = useState(RWA_ASSETS[0].name);
  const [offeringAmount, setOfferingAmount] = useState('50');
  const [requestingAsset, setRequestingAsset] = useState('Vault Gold (P2P-GOLD)');
  const [requestingAmount, setRequestingAmount] = useState('3.8');
  const [makerChain, setMakerChain] = useState('Ethereum');
  const [expiryDays, setExpiryDays] = useState('3');
  const [creationSuccess, setCreationSuccess] = useState(false);

  const handleCreateDeal = (e) => {
    e.preventDefault();
    const newDeal = {
      id: `otc-${deals.length + 1}`,
      creator: '0x' + Math.random().toString(36).substring(2, 6).toUpperCase() + '...P2P',
      makerChain: makerChain,
      offering: `${offeringAmount} ${offeringAsset.split(' (')[0]}`,
      offeringValue: `$${(parseFloat(offeringAmount || 1) * 210).toFixed(0)}`,
      requesting: `${requestingAmount} ${requestingAsset}`,
      requestingValue: `$${(parseFloat(requestingAmount || 1) * 2742).toFixed(0)}`,
      expiry: `${expiryDays} Days Left`,
      escrowStatus: 'Locked in Smart Contract',
      collateralProof: 'P2PPro Escrow Authority'
    };

    setDeals([newDeal, ...deals]);
    setCreationSuccess(true);
    setTimeout(() => {
      setCreationSuccess(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/30">
            <i className="fa-solid fa-handshake"></i>
            <span>PEER-TO-PEER BILATERAL OTC DEALS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            P2P Pro <span className="cyan-gradient-text">OTC Escrow Marketplace</span>
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Swap tokenized RWAs, pre-IPO shares, and precious metals directly with peers with zero intermediary fees.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center space-x-2"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Create Custom P2P OTC Deal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div key={deal.id} className="glass-card p-6 rounded-2xl border-slate-800 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs font-mono">
                <span className="text-slate-400">Maker: {deal.creator}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {deal.makerChain}
                </span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 mb-3 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Offering (Maker Escrowed):</span>
                <p className="text-sm font-bold text-emerald-400">{deal.offering}</p>
                <p className="text-[11px] font-mono text-slate-400">Est. Value: {deal.offeringValue}</p>
              </div>

              <div className="text-center text-slate-500 text-xs py-1">
                <i className="fa-solid fa-arrow-down-up text-cyan-400"></i>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Requesting (Taker Deposit):</span>
                <p className="text-sm font-bold text-amber-400">{deal.requesting}</p>
                <p className="text-[11px] font-mono text-slate-400">Est. Value: {deal.requestingValue}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 space-y-3">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>{deal.expiry}</span>
                <span className="text-cyan-300">● {deal.escrowStatus}</span>
              </div>

              <button 
                onClick={() => alert(`Initiating direct swap acceptance for ${deal.id} on ${deal.makerChain}`)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-300 font-bold text-xs transition-colors border border-cyan-500/30"
              >
                Accept & Execute Swap
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm"
            >
              ✕
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Create Bilateral P2P OTC Deal</h3>
                <p className="text-xs text-slate-400">Zero Slippage • Multi-Chain Peer Escrow</p>
              </div>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Select Settlement Chain</label>
                <select
                  value={makerChain}
                  onChange={(e) => setMakerChain(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-slate-200 bg-slate-900"
                >
                  {SUPPORTED_CHAINS.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.symbol})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">You Deposit (Offering)</label>
                  <select
                    value={offeringAsset}
                    onChange={(e) => setOfferingAsset(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-slate-200 bg-slate-900"
                  >
                    {RWA_ASSETS.map(a => (
                      <option key={a.id} value={a.name}>{a.symbol}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Amount</label>
                  <input
                    type="text"
                    value={offeringAmount}
                    onChange={(e) => setOfferingAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">You Receive (Requesting)</label>
                  <input
                    type="text"
                    value={requestingAsset}
                    onChange={(e) => setRequestingAsset(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Amount Target</label>
                  <input
                    type="text"
                    value={requestingAmount}
                    onChange={(e) => setRequestingAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Escrow Lock Duration</label>
                <select
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-slate-200 bg-slate-900"
                >
                  <option value="1">24 Hours</option>
                  <option value="3">3 Days</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                </select>
              </div>

              {creationSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-center font-bold">
                  Deal Created & Locked into Escrow!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
              >
                Lock Escrow & Publish Deal
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
}
