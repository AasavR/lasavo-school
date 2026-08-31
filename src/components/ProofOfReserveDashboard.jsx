import React from 'react';
import { PROOF_OF_RESERVES } from '../data/rwaData';

export default function ProofOfReserveDashboard() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-mono mb-2 border border-blue-500/30">
          <i className="fa-solid fa-shield-halved"></i>
          <span>CHAINLINK PROOF OF RESERVE (PoR) TRANSPARENCY</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">
          On-Chain <span className="gold-gradient-text">Proof of Reserves</span> & Vault Audits
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          P2PPro guarantees 1:1 real world collateralization backed by automated oracle feeds, tier-1 custodial banks, and independent audit firms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROOF_OF_RESERVES.map((item, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl border-slate-800 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  {item.collateralization} Collateralized
                </span>
                <span className="text-xs font-mono text-cyan-400">Chainlink Verified</span>
              </div>

              <h3 className="text-base font-bold text-white">{item.assetName}</h3>

              <div className="space-y-2 text-xs font-mono bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">Custody Vault:</span>
                  <span className="text-slate-200 font-semibold">{item.custodian}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Location:</span>
                  <span className="text-slate-300">{item.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Audit Firm:</span>
                  <span className="text-amber-400 font-semibold">{item.auditFirm}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Tokens On-Chain:</span>
                <span className="text-white font-bold">{item.onChainTokens}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Vault Balance:</span>
                <span className="text-emerald-400 font-bold">{item.vaultBalance}</span>
              </div>

              <a
                href={item.verifierLink}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block w-full py-2 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-[11px] transition-colors border border-slate-700"
              >
                <i className="fa-solid fa-arrow-up-right-from-square mr-1"></i>
                Verify On Chainlink PoR Feed
              </a>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
