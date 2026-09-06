import React, { useState } from 'react';
import { RWA_ASSETS, STOCK_BOT_CONFIG } from '../data/rwaData';
import { forwardToStockBot } from '../services/stockBotService';
import { openRazorpayCheckout } from '../services/razorpayService';

export default function PreIPODerivativesStudio({ onOpenWallet }) {
  const preIpoAssets = RWA_ASSETS.filter(a => a.category === 'preipo');
  const [selectedAsset, setSelectedAsset] = useState(preIpoAssets[0]);
  const [exposureType, setExposureType] = useState('spot');
  const [paymentMode, setPaymentMode] = useState('razorpay'); // 'razorpay', 'crypto'
  const [amountTokens, setAmountTokens] = useState(10);
  const [leverage, setLeverage] = useState(2);
  const [optionType, setOptionType] = useState('call');
  const [strikePrice, setStrikePrice] = useState(220);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [stockBotMsg, setStockBotMsg] = useState('');

  const unitPrice = parseFloat(selectedAsset.valuation.replace('$', '').replace(' / token', ''));
  const totalNotionalUSD = (unitPrice * amountTokens).toFixed(2);
  const totalNotionalINR = Math.round(unitPrice * amountTokens * 86.5).toLocaleString('en-IN');

  const handleMintDerivative = () => {
    setIsMinting(true);
    setMintSuccess(false);

    if (paymentMode === 'razorpay') {
      openRazorpayCheckout({
        amountInUSD: parseFloat(totalNotionalUSD),
        asset: selectedAsset,
        quantity: amountTokens,
        onSuccess: async (res) => {
          setIsMinting(false);
          const botRes = await forwardToStockBot({
            stockSymbol: selectedAsset.symbol,
            stockName: selectedAsset.name,
            quantity: amountTokens,
            totalAmountUSD: totalNotionalUSD,
            paymentChannel: 'Razorpay Live UPI / Card',
            paymentId: res.paymentId,
            customerEmail: 'investor@p2ppro.me'
          });
          setStockBotMsg(botRes.botMessage);
          setMintSuccess(true);
          if (window.confetti) {
            window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          }
        },
        onFailure: (err) => {
          setIsMinting(false);
          alert(`Razorpay Payment Notice: ${err}`);
        }
      });
      return;
    }

    // Crypto fallback
    setTimeout(async () => {
      setIsMinting(false);
      const botRes = await forwardToStockBot({
        stockSymbol: selectedAsset.symbol,
        stockName: selectedAsset.name,
        quantity: amountTokens,
        totalAmountUSD: totalNotionalUSD,
        paymentChannel: 'Web3 Wallet Escrow',
        paymentId: '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        customerEmail: 'investor@p2ppro.me'
      });
      setStockBotMsg(botRes.botMessage);
      setMintSuccess(true);
      if (window.confetti) {
        window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }, 1800);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Studio Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-mono mb-3 border border-purple-500/30">
          <i className="fa-solid fa-chart-line"></i>
          <span>DEDICATED PRE-IPO STOCKS VERTICAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pre-IPO Stock <span className="purple-gradient-text">Synthetics & Stock Bot Hub</span>
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Trade private tech giants prior to IPO with automated stock bot order execution ({STOCK_BOT_CONFIG.telegramHandle}) and Live Razorpay UPI / Cards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Pre-IPO Stocks List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Select Available Pre-IPO Stock
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              ● Stock Bot Active
            </span>
          </div>

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

          {/* Stock Bot Box */}
          <div className="glass-panel p-4 rounded-2xl border-purple-500/30 text-xs space-y-2 font-mono">
            <div className="flex items-center space-x-2 text-purple-300 font-bold">
              <i className="fa-solid fa-robot"></i>
              <span>{STOCK_BOT_CONFIG.botName}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              All stock orders on P2PPro are forwarded directly to the automated order matcher queue at <span className="text-cyan-300 font-bold">{STOCK_BOT_CONFIG.telegramHandle}</span> for zero-delay settlement.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Order Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-purple-500/30 shadow-2xl relative">
            
            {/* Exposure Switcher */}
            <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 mb-6">
              <button
                onClick={() => setExposureType('spot')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  exposureType === 'spot'
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Spot Stock (1x)
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
                P2P Stock Options
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-5">
              
              {/* Payment Mode Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">Select Payment Rail</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('razorpay')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
                      paymentMode === 'razorpay'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-base">💳</span>
                    <div className="text-left">
                      <span className="block font-bold">Live Razorpay</span>
                      <span className="text-[10px] text-slate-400 font-sans">UPI, Cards (rzp_live_...)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('crypto')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
                      paymentMode === 'crypto'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-base">⚡</span>
                    <div className="text-left">
                      <span className="block font-bold">Web3 Crypto</span>
                      <span className="text-[10px] text-slate-400 font-sans">USDC, ETH, SOL</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                  <span>Number of {selectedAsset.symbol} Stock Tokens:</span>
                  <span className="text-purple-400 font-bold">1 Stock = ${unitPrice.toFixed(2)}</span>
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

              {/* Cost Summary */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Stock Notional Value:</span>
                  <span className="text-white font-bold">${totalNotionalUSD} USD (~₹{totalNotionalINR} INR)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Stock Bot Dispatch:</span>
                  <span className="text-purple-400 font-bold">{STOCK_BOT_CONFIG.telegramHandle}</span>
                </div>
              </div>

              {/* Mint Success & Stock Bot Notification */}
              {mintSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono space-y-1">
                  <div className="flex items-center space-x-2 font-bold text-emerald-400">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Stock Order Executed & Forwarded!</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{stockBotMsg}</p>
                </div>
              )}

              {/* CTA Action Button */}
              <button
                onClick={handleMintDerivative}
                disabled={isMinting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center space-x-3"
              >
                {isMinting ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    <span>Processing Order & Dispatching to Stock Bot...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-bolt"></i>
                    <span>Buy {amountTokens} {selectedAsset.symbol} Stock ({paymentMode === 'razorpay' ? 'Razorpay Live UPI' : 'Web3'})</span>
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
