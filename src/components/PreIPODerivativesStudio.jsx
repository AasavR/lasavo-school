import React, { useState } from 'react';
import { RWA_ASSETS } from '../data/rwaData';

export default function PreIPODerivativesStudio({ onOpenWallet }) {
  const preIpoAssets = RWA_ASSETS.filter(a => a.category === 'preipo');
  const [selectedAsset, setSelectedAsset] = useState(preIpoAssets[0]);
  const [exposureType, setExposureType] = useState('spot');
  const [collateralToken, setCollateralToken] = useState('USDC');
  const [amountTokens, setAmountTokens] = useState(10);
  const [leverage, setLeverage] = useState(2);
  const [optionType, setOptionType] = useState('call');
  const [strikePrice, setStrikePrice] = useState(220);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const unitPrice = parseFloat(selectedAsset.valuation.replace('$', '').replace(' / token', ''));
  const totalNotional = unitPrice * amountTokens;
  const reqCollateral = exposureType === 'leverage' 
    ? (totalNotional / leverage).toFixed(2)
    : (totalNotional * 1.5).toFixed(2);

  const liquidationPrice = exposureType === 'leverage'
    ? (unitPrice * (1 - 0.8 / leverage)).toFixed(2)
    : 'N/A (No Liquidation)';

  const handleMintDerivative = () => {
    setIsMinting(true);
    setMintSuccess(false);
    setTimeout(() => {
      setIsMinting(false);
      setMintSuccess(true);
      if (window.confetti) {
        window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }, 1800);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-mono mb-3 border border-purple-500/30">
          <i className="fa-solid fa-rocket"></i>
          <span>DECENTRALIZED PRE-IPO DERIVATIVE ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pre-IPO Equity <span className="purple-gradient-text">Synthetics & Options Studio</span>
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Gain friction-free synthetic long/short exposure to late-stage tech giants prior to IPO. Over-collateralized by USDC or Vault Gold.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Select Pre-IPO Target Valuation
          </h3>

          <div className="space-y-3">
            {preIpoAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => {
                  setSelectedAsset(asset);
                  setMintSuccess(false);
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  selectedAsset.id === asset.id
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-300 font-mono">
                      {asset.symbol.replace('p', '')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{asset.name.split(' (')[0]}</h4>
                      <p className="text-xs font-mono text-purple-300">{asset.impliedMarketCap}</p>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <p className="text-sm font-extrabold text-white">{asset.valuation.split(' /')[0]}</p>
                    <p className="text-[10px] text-emerald-400">{asset.price24hChange}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel p-4 rounded-2xl border-slate-800 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold">
              <i className="fa-solid fa-shield"></i>
              <span>Over-Collateralized Smart Contract Escrow</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Synthetic pre-IPO derivatives on P2PPro are backed by 150% over-collateralization in USDC or physical vault gold. Liquidation thresholds are enforced via Chainlink oracle valuation feeds.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-purple-500/30 shadow-2xl relative">
            
            <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 mb-6">
              <button
                onClick={() => setExposureType('spot')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  exposureType === 'spot'
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Spot Synthetic (1x)
              </button>
              <button
                onClick={() => setExposureType('leverage')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  exposureType === 'leverage'
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Leveraged Long (2x - 5x)
              </button>
              <button
                onClick={() => setExposureType('options')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  exposureType === 'options'
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                P2P Options (Call/Put)
              </button>
            </div>

            <div className="space-y-5">
              
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                  <span>Number of {selectedAsset.symbol} Derivative Tokens:</span>
                  <span className="text-purple-400 font-bold">1 Token = ${unitPrice.toFixed(2)}</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={amountTokens}
                    onChange={(e) => setAmountTokens(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full pl-4 pr-16 py-3 rounded-xl glass-input font-mono font-bold text-lg text-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-purple-400 font-bold">
                    {selectedAsset.symbol}
                  </span>
                </div>
              </div>

              {exposureType === 'leverage' && (
                <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30">
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>Leverage Multiple:</span>
                    <span className="text-amber-400 font-bold">{leverage}x Collateralized</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="5"
                    step="1"
                    value={leverage}
                    onChange={(e) => setLeverage(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>2x Leverage</span>
                    <span>3x</span>
                    <span>4x</span>
                    <span>5x Max</span>
                  </div>
                </div>
              )}

              {exposureType === 'options' && (
                <div className="grid grid-cols-2 gap-4 bg-slate-900/80 p-4 rounded-xl border border-purple-500/30">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Option Style</label>
                    <select
                      value={optionType}
                      onChange={(e) => setOptionType(e.target.value)}
                      className="w-full p-2.5 rounded-lg glass-input text-xs font-semibold text-white bg-slate-950"
                    >
                      <option value="call">Call Option (Bullish)</option>
                      <option value="put">Put Option (Bearish Hedge)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Strike Valuation ($)</label>
                    <input
                      type="number"
                      value={strikePrice}
                      onChange={(e) => setStrikePrice(parseFloat(e.target.value) || unitPrice)}
                      className="w-full p-2.5 rounded-lg glass-input text-xs font-mono font-semibold text-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">Select Collateral Asset</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCollateralToken('USDC')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      collateralToken === 'USDC'
                        ? 'bg-purple-950/50 border-purple-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>🔵 USDC Stablecoin</span>
                    <span className="text-[10px] font-mono text-emerald-400">1.00 USD</span>
                  </button>

                  <button
                    onClick={() => setCollateralToken('P2P-GOLD')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      collateralToken === 'P2P-GOLD'
                        ? 'bg-purple-950/50 border-purple-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>🥇 P2P Vault Gold</span>
                    <span className="text-[10px] font-mono text-amber-400">$2,742.50/oz</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Total Synthetic Exposure (Notional):</span>
                  <span className="text-white font-bold">${totalNotional.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Required Collateral Deposit ({collateralToken}):</span>
                  <span className="text-amber-400 font-bold">${reqCollateral} {collateralToken}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Est. Liquidation Trigger Price:</span>
                  <span className="text-rose-400 font-bold">{liquidationPrice}</span>
                </div>
                <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800 text-[11px]">
                  <span>Chainlink Oracle Gas Fee:</span>
                  <span className="text-cyan-400">0.0004 ETH (~$0.95)</span>
                </div>
              </div>

              {mintSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-3">
                  <i className="fa-solid fa-circle-check text-lg text-emerald-400"></i>
                  <div>
                    <p className="font-bold">Synthetic Contract Successfully Minted!</p>
                    <p className="text-[11px] text-emerald-400">Minted {amountTokens} {selectedAsset.symbol} on P2PPro. Tx Hash: 0x9f8...a12b</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleMintDerivative}
                disabled={isMinting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center space-x-3"
              >
                {isMinting ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    <span>Verifying Collateral & Executing Smart Contract...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    <span>Execute & Mint {selectedAsset.symbol} Derivative</span>
                  </>
                )}
              </button>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
