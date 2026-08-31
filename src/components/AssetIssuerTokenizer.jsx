import React, { useState } from 'react';
import { SUPPORTED_CHAINS } from '../data/rwaData';

export default function AssetIssuerTokenizer() {
  const [step, setStep] = useState(1);
  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');
  const [assetCategory, setAssetCategory] = useState('realestate');
  const [totalValuation, setTotalValuation] = useState('');
  const [legalFramework, setLegalFramework] = useState('spv');
  const [custodian, setCustodian] = useState('brinks');
  const [primaryChain, setPrimaryChain] = useState('ethereum');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmitAsset = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      if (window.confetti) {
        window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      }
    }, 2000);
  };

  return (
    <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-2 border border-emerald-500/30">
          <i className="fa-solid fa-coins"></i>
          <span>RWA ASSET ORIGINATOR WORKBENCH</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">
          Tokenize & List New RWA on <span className="gold-gradient-text">p2ppro.me</span>
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl mx-auto">
          Institutional wizard for asset managers, real estate funds, and vault custodians to issue compliant multi-chain tokens with Chainlink Proof-of-Reserve.
        </p>
      </div>

      <div className="flex items-center justify-between max-w-2xl mx-auto mb-8 text-xs font-mono">
        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-800'}`}>1</div>
          <span>Asset & Legal</span>
        </div>
        <div className="w-12 h-0.5 bg-slate-800"></div>
        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-800'}`}>2</div>
          <span>Custody & Oracle</span>
        </div>
        <div className="w-12 h-0.5 bg-slate-800"></div>
        <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-800'}`}>3</div>
          <span>Deploy & List</span>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 max-w-2xl mx-auto">
        
        {isCompleted ? (
          <div className="text-center py-8 space-y-4 font-mono">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Smart Contract Successfully Deployed!</h3>
            <p className="text-xs text-slate-300">
              Your RWA contract <span className="text-amber-400">({assetSymbol})</span> has been submitted to the p2ppro.me verification queue and Chainlink PoR feed.
            </p>
            <button
              onClick={() => {
                setStep(1);
                setIsCompleted(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
            >
              Tokenize Another Asset
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitAsset} className="space-y-5 text-xs font-mono">
            
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-1">Asset Category Vertical</label>
                  <select
                    value={assetCategory}
                    onChange={(e) => setAssetCategory(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-white bg-slate-900"
                  >
                    <option value="preipo">Pre-IPO Shares / Equity Synthetic</option>
                    <option value="realestate">Institutional Real Estate Vault</option>
                    <option value="debt">Corporate Credit & Sovereign Debt</option>
                    <option value="gold">Vault Precious Metals (Gold/Silver)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Asset Title / Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dubai Luxury Tech Tower"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl glass-input text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Token Symbol</label>
                    <input
                      type="text"
                      placeholder="e.g. DXB-RE"
                      value={assetSymbol}
                      onChange={(e) => setAssetSymbol(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl glass-input text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Total Valuation ($ USD)</label>
                    <input
                      type="text"
                      placeholder="e.g. 50,000,000"
                      value={totalValuation}
                      onChange={(e) => setTotalValuation(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl glass-input text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Legal Jurisdiction Framework</label>
                    <select
                      value={legalFramework}
                      onChange={(e) => setLegalFramework(e.target.value)}
                      className="w-full p-3 rounded-xl glass-input text-white bg-slate-900"
                    >
                      <option value="spv">Delaware SPV Trust (USA)</option>
                      <option value="regd">SEC Regulation D / Reg S</option>
                      <option value="swiss">Liechtenstein TVTG / Swiss DLT</option>
                      <option value="vara">UAE VARA Compliant Structure</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Continue to Custody & Oracle Configuration →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-1">Custody & Physical Vault Partner</label>
                  <select
                    value={custodian}
                    onChange={(e) => setCustodian(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-white bg-slate-900"
                  >
                    <option value="brinks">Brinks Vault Switzerland AG</option>
                    <option value="loomis">Loomis International SG</option>
                    <option value="bny">BNY Mellon Qualified Custodial Trust</option>
                    <option value="apex">Apex Custody SPV Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Primary Settlement Blockchain</label>
                  <select
                    value={primaryChain}
                    onChange={(e) => setPrimaryChain(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-white bg-slate-900"
                  >
                    {SUPPORTED_CHAINS.map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block">Chainlink Proof-of-Reserve Integration</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Once registered, Chainlink PoR will continuously query your custodian bank API to verify 1:1 asset backing on p2ppro.me.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/2 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-1/2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase"
                  >
                    Review & Deploy →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Asset Name:</span>
                    <span className="text-white font-bold">{assetName || 'Dubai Luxury Tech Tower'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Token Symbol:</span>
                    <span className="text-amber-400 font-bold">{assetSymbol || 'DXB-RE'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Valuation:</span>
                    <span className="text-white font-bold">${totalValuation || '50,000,000'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Chain:</span>
                    <span className="text-cyan-400 font-bold">{primaryChain.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25"
                  >
                    {isSubmitting ? 'Deploying ERC-3643 Contract...' : 'Deploy Smart Contract & Publish'}
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>

    </section>
  );
}
