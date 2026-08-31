import React, { useState } from 'react';

export default function TradeModal({ asset, isOpen, onClose, connectedWallet, onOpenWallet }) {
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState(1);
  const [payToken, setPayToken] = useState('USDC');
  const [isProcessing, setIsProcessing] = useState(false);
  const [tradeSuccess, setTradeSuccess] = useState(false);

  if (!isOpen || !asset) return null;

  const unitPrice = parseFloat(asset.valuation.replace('$', '').replace(' / token', '').replace('/ oz', '').replace(',', '')) || 100;
  const totalCost = (unitPrice * amount).toFixed(2);

  const handleExecuteTrade = (e) => {
    e.preventDefault();
    if (!connectedWallet) {
      onOpenWallet();
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTradeSuccess(true);
      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#0F172A] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm"
        >
          ✕
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-lg">
            {asset.symbol.substring(0, 3)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{asset.name}</h3>
            <p className="text-xs text-slate-400">Unit Price: {asset.valuation} • {asset.collateralRatio}</p>
          </div>
        </div>

        {tradeSuccess ? (
          <div className="text-center py-6 space-y-4 font-mono">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h4 className="text-lg font-bold text-white">Order Executed Successfully!</h4>
            <p className="text-xs text-slate-300">
              Purchased {amount} {asset.symbol} for ${totalCost} {payToken}. Tx confirmed on P2PPro protocol.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
            >
              Return to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleExecuteTrade} className="space-y-4 text-xs font-mono">
            
            <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  tradeType === 'buy' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Buy / Acquire {asset.symbol}
              </button>
              <button
                type="button"
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  tradeType === 'sell' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sell / Redeem Token
              </button>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Quantity ({asset.symbol})</label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 1)}
                className="w-full p-3 rounded-xl glass-input text-white font-bold text-base"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Payment / Settlement Currency</label>
              <select
                value={payToken}
                onChange={(e) => setPayToken(e.target.value)}
                className="w-full p-3 rounded-xl glass-input text-white bg-slate-900"
              >
                <option value="USDC">USDC Stablecoin</option>
                <option value="USDT">USDT Tether</option>
                <option value="ETH">ETH (Ethereum Native)</option>
                <option value="SOL">SOL (Solana Native)</option>
                <option value="P2P-GOLD">P2P Vault Gold</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Unit Rate:</span>
                <span className="text-white font-bold">${unitPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Amount:</span>
                <span className="text-amber-400 font-extrabold text-sm">${totalCost} {payToken}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[10px] pt-1 border-t border-slate-900">
                <span>Protocol Swap Fee:</span>
                <span className="text-emerald-400">0.00% (Zero Counterparty Fee)</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
            >
              {isProcessing 
                ? 'Confirming Transaction...' 
                : connectedWallet 
                  ? `Confirm Order: ${tradeType.toUpperCase()} ${amount} ${asset.symbol}` 
                  : 'Connect Wallet to Trade'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
