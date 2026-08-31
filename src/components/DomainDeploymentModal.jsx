import React, { useState } from 'react';

export default function DomainDeploymentModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState('');

  if (!isOpen) return null;

  const dnsRecords = [
    { type: 'A Record', host: '@ (root domain)', value: '75.2.60.5', note: 'Primary Load Balancer for p2ppro.me' },
    { type: 'CNAME', host: 'www', value: 'astrolas.netlify.app', note: 'Subdomain routing for astrolas.netlify.app' },
    { type: 'TXT', host: '_web3', value: 'ipfs=QmP2PProProtocolVaultRWA99', note: 'DeFi ENS / IPFS Handshake' },
    { type: 'TXT', host: '_ccip', value: 'chainlink-ccip-p2ppro-v1', note: 'Chainlink Cross-Chain Handshake' }
  ];

  const handleCopy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-[#0F172A] border border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm"
        >
          ✕
        </button>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-mono font-bold">
            .me
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[11px] font-mono">
              <span>DOMAIN DEPLOYMENT WIZARD</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-0.5">p2ppro.me Domain Configuration</h3>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2 font-mono">
          <p className="font-bold text-amber-400">Domain Ownership Verified: p2ppro.me</p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Follow these DNS records to connect your domain registrar (GoDaddy, Namecheap, Cloudflare, or Porkbun) to your astrolas.netlify.app production build.
          </p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <h4 className="text-slate-400 font-bold uppercase text-[11px]">Required DNS Zone Records:</h4>
          
          <div className="space-y-2">
            {dnsRecords.map((rec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">{rec.type}</span>
                    <span className="text-slate-300 font-bold">{rec.host}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{rec.value}</p>
                  <p className="text-[10px] text-slate-500">{rec.note}</p>
                </div>

                <button
                  onClick={() => handleCopy(rec.value, idx)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors shrink-0 self-start sm:self-auto"
                >
                  {copied === idx ? 'Copied! ✓' : 'Copy Record'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 space-y-1">
          <p className="font-bold flex items-center space-x-2">
            <i className="fa-solid fa-lock"></i>
            <span>Automatic Let's Encrypt TLS/SSL Enabled</span>
          </p>
          <p className="text-[11px] text-slate-400">
            HTTPS will activate automatically within 5 minutes of updating DNS records for p2ppro.me pointing to astrolas.netlify.app.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
        >
          Close Deployment Guide
        </button>

      </div>
    </div>
  );
}
