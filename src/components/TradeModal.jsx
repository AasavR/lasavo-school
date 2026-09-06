import React, { useState } from 'react';
import { openRazorpayCheckout } from '../services/razorpayService';

export default function TradeModal({ asset, isOpen, onClose, connectedWallet, onOpenWallet }) {
  const [paymentMethod, setPaymentMethod] = useState('crypto'); // 'crypto', 'fiat'
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState(1);
  const [payToken, setPayToken] = useState('USDC');
  const [userEmail, setUserEmail] = useState('investor@p2ppro.me');
  const [userPhone, setUserPhone] = useState('9876543210');
  const [isProcessing, setIsProcessing] = useState(false);
  const [tradeSuccess, setTradeSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  if (!isOpen || !asset) return null;

  const unitPrice = parseFloat(asset.valuation.replace('$', '').replace(' / token', '').replace('/ oz', '').replace(',', '')) || 100;
  const totalCostUSD = (unitPrice * amount).toFixed(2);
  const totalCostINR = Math.round(unitPrice * amount * 86.5).toLocaleString('en-IN');

  const handleExecuteTrade = (e) => {
    e.preventDefault();

    if (paymentMethod === 'fiat') {
      setIsProcessing(true);
      openRazorpayCheckout({
        amountInUSD: parseFloat(totalCostUSD),
        asset,
        quantity: amount,
        userEmail,
        userPhone,
        onSuccess: (res) => {
          setIsProcessing(false);
          setPaymentDetails(res);
          setTradeSuccess(true);
          if (window.confetti) {
            window.confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          }
        },
        onFailure: (err) => {
          setIsProcessing(false);
          alert(`Razorpay Payment Notice: ${err}`);
        }
      });
      return;
    }

    // Crypto Settlement
    if (!connectedWallet) {
      onOpenWallet();
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDetails({
        paymentId: '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        method: 'Web3 Wallet Smart Contract'
      });
      setTradeSuccess(true);
      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#0F172A] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-lg">
            {asset.symbol.substring(0, 3)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{asset.name}</h3>
            <p className="text-xs text-slate-400">Unit Price: {asset.valuation} • {asset.collateralRatio}</p>
          </div>
        </div>

        {/* Trade Form */}
        {tradeSuccess ? (
          <div className="text-center py-6 space-y-4 font-mono">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h4 className="text-lg font-bold text-white">Order Confirmed & Tokens Allocated!</h4>
            <p className="text-xs text-slate-300">
              Successfully acquired <span className="text-amber-400 font-bold">{amount} {asset.symbol}</span> for <span className="text-emerald-400 font-bold">${totalCostUSD} USD</span> (₹{totalCostINR} INR).
            </p>
            
            {paymentDetails && (
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-left space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Transaction / Payment ID:</span>
                  <span className="text-cyan-300 font-bold truncate max-w-[200px]">{paymentDetails.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Settlement Channel:</span>
                  <span className="text-amber-400 font-semibold">{paymentMethod === 'fiat' ? 'Razorpay UPI / Cards' : 'Web3 Smart Contract'}</span>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
            >
              Return to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleExecuteTrade} className="space-y-4 text-xs font-mono">
            
            {/* Buy / Sell Switcher */}
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

            {/* Payment Method Switcher: Crypto vs Fiat Razorpay */}
            <div>
              <label className="block text-slate-300 mb-1.5 font-bold">Select Payment Gateway</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
                    paymentMethod === 'crypto'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-base">⚡</span>
                  <div className="text-left">
                    <span className="block font-bold">Crypto / Web3</span>
                    <span className="text-[10px] text-slate-400 font-sans">USDC, ETH, SOL</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('fiat')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
                    paymentMethod === 'fiat'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-base">💳</span>
                  <div className="text-left">
                    <span className="block font-bold">Razorpay Fiat</span>
                    <span className="text-[10px] text-slate-400 font-sans">UPI, Cards, NetBanking</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Quantity Input */}
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

            {/* If Crypto Selected: Currency Dropdown */}
            {paymentMethod === 'crypto' && (
              <div>
                <label className="block text-slate-300 mb-1">Settlement Token</label>
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
            )}

            {/* If Fiat Selected: Pre-fill Details */}
            {paymentMethod === 'fiat' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Email (Receipt)</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Phone / UPI Contact</label>
                  <input
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* Cost Summary */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Unit Rate:</span>
                <span className="text-white font-bold">${unitPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Investment:</span>
                <span className="text-amber-400 font-extrabold text-sm">
                  ${totalCostUSD} USD <span className="text-xs font-normal text-slate-400">(~₹{totalCostINR} INR)</span>
                </span>
              </div>
              <div className="flex justify-between text-slate-500 text-[10px] pt-1 border-t border-slate-900">
                <span>Payment Gateway Fee:</span>
                <span className="text-emerald-400">
                  {paymentMethod === 'fiat' ? '0.00% Zero Brokerage' : 'Network Gas Only'}
                </span>
              </div>
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all ${
                paymentMethod === 'fiat'
                  ? 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
              }`}
            >
              {isProcessing 
                ? 'Processing Payment...' 
                : paymentMethod === 'fiat'
                  ? `Pay ₹${totalCostINR} INR via Razorpay (UPI / Card)`
                  : connectedWallet 
                    ? `Confirm Crypto Swap: ${amount} ${asset.symbol}` 
                    : 'Connect Wallet to Trade'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
