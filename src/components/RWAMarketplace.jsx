import React, { useState } from 'react';
import { RWA_ASSETS, SUPPORTED_CHAINS } from '../data/rwaData';

export default function RWAMarketplace({ onSelectAsset, onMintPreIPO }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [activeDetailAsset, setActiveDetailAsset] = useState(null);

  const filteredAssets = RWA_ASSETS.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'all' || asset.riskRating.toLowerCase().includes(riskFilter.toLowerCase());
    return matchesCategory && matchesSearch && matchesRisk;
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-mono mb-2">
            <i className="fa-solid fa-layer-group"></i>
            <span>MULTI-ASSET PROTOCOL MARKETPLACE</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Institutional Asset <span className="gold-gradient-text">Vaults</span> & <span className="cyan-gradient-text">Derivatives</span>
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Direct peer-to-peer ownership and synthetic derivative trading with instant cross-chain liquidity.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Verticals
          </button>
          <button
            onClick={() => setSelectedCategory('preipo')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'preipo'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            🚀 Pre-IPO Derivatives
          </button>
          <button
            onClick={() => setSelectedCategory('realestate')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'realestate'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20 font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            🏢 Real Estate
          </button>
          <button
            onClick={() => setSelectedCategory('debt')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'debt'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            📜 Fixed Income / T-Bills
          </button>
          <button
            onClick={() => setSelectedCategory('gold')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'gold'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20 font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            🥇 Vault Gold & Metals
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SpaceX, OpenAI, NYC Real Estate, Gold..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium focus:ring-1 focus:ring-amber-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Risk Level Filter Dropdown */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-mono whitespace-nowrap">Filter Risk Profile:</span>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs text-slate-200 font-medium bg-slate-900"
          >
            <option value="all">All Risk Tiers</option>
            <option value="safe">Safe Haven / Risk-Free</option>
            <option value="low">Low Risk</option>
            <option value="moderate">Moderate</option>
            <option value="high">High Growth / Pre-IPO</option>
          </select>
        </div>

      </div>

      {/* RWA Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div 
            key={asset.id}
            className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-amber-500/40 group transition-all duration-300"
          >
            {/* Card Header & Image Banner */}
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img 
                  src={asset.image} 
                  alt={asset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"></div>
                
                {/* Category & APY Tag Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-200 border border-slate-700">
                    {asset.tag}
                  </span>
                  {asset.apy && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/40 font-semibold">
                      {asset.apy}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-amber-400 border border-amber-500/30">
                    {asset.symbol}
                  </span>
                </div>

                {/* Valuation overlay bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Valuation / Price</p>
                    <p className="text-xl font-black text-white font-mono">{asset.valuation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">24h Performance</p>
                    <p className={`text-xs font-mono font-bold ${asset.price24hChange.includes('+') ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {asset.price24hChange}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body Info */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {asset.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                    {asset.description}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Min Investment</span>
                    <span className="text-slate-200 font-semibold">${asset.minInvestment} USDC</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Collateral / Deed</span>
                    <span className="text-amber-400 font-semibold truncate block">{asset.collateralRatio}</span>
                  </div>
                </div>

                {/* Supported Chain Logos */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Supported Chains:</span>
                  <div className="flex items-center space-x-1">
                    {asset.chainSupport.map((chainId) => {
                      const c = SUPPORTED_CHAINS.find(x => x.id === chainId);
                      return c ? <span key={chainId} title={c.name}>{c.icon}</span> : null;
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveDetailAsset(asset)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700"
              >
                <i className="fa-solid fa-circle-info mr-1 text-cyan-400"></i>
                Audit & Specs
              </button>

              <button
                onClick={() => onSelectAsset(asset)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
              >
                <i className="fa-solid fa-bolt mr-1"></i>
                Trade Asset
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Asset Audit & Specifications Deep-Dive Modal */}
      {activeDetailAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveDetailAsset(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl font-black text-amber-400 font-mono">
                {activeDetailAsset.symbol.substring(0, 3)}
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono">
                  {activeDetailAsset.categoryLabel}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">{activeDetailAsset.name}</h3>
                <p className="text-xs text-slate-400">Vault Contract ID: 0x99A8...B4F2 • Chainlink PoR Verified</p>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block uppercase">Current Unit Price</span>
                <span className="text-lg font-bold text-white">{activeDetailAsset.valuation}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase">Implied Vault Cap</span>
                <span className="text-lg font-bold text-amber-400">{activeDetailAsset.impliedMarketCap}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase">Custody Vault Trust</span>
                <span className="text-slate-200 font-semibold">{activeDetailAsset.verifiedVault}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase">Oracle Feed</span>
                <span className="text-cyan-400 font-semibold">{activeDetailAsset.oracleSource}</span>
              </div>
            </div>

            {/* Key Asset Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Institutional Features & Rights</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeDetailAsset.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <i className="fa-solid fa-check text-emerald-400"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <p className="font-semibold text-slate-200 mb-1">Asset Structure Overview:</p>
              <p>{activeDetailAsset.description}</p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveDetailAsset(null)}
                className="w-1/2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
              >
                Close Audit Window
              </button>

              <button
                onClick={() => {
                  const target = activeDetailAsset;
                  setActiveDetailAsset(null);
                  onSelectAsset(target);
                }}
                className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
              >
                Proceed to Trade Asset
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
