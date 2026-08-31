import React, { useState } from 'react';

export default function YieldCalculator() {
  const [investment, setInvestment] = useState(50000);
  const [years, setYears] = useState(3);
  
  const [allocGold, setAllocGold] = useState(30);
  const [allocPreIPO, setAllocPreIPO] = useState(25);
  const [allocRE, setAllocRE] = useState(25);
  const [allocDebt, setAllocDebt] = useState(20);

  const apyGold = 0.08;
  const apyPreIPO = 0.22;
  const apyRE = 0.092;
  const apyDebt = 0.0525;

  const totalAlloc = allocGold + allocPreIPO + allocRE + allocDebt;

  const weightedAPY = (
    (allocGold / 100) * apyGold +
    (allocPreIPO / 100) * apyPreIPO +
    (allocRE / 100) * apyRE +
    (allocDebt / 100) * apyDebt
  );

  const futureValue = investment * Math.pow(1 + weightedAPY, years);
  const totalProfit = futureValue - investment;
  const annualIncome = investment * weightedAPY;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/30">
          <i className="fa-solid fa-calculator"></i>
          <span>PORTFOLIO YIELD SIMULATOR</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">
          Institutional RWA <span className="cyan-gradient-text">Yield & ROI Calculator</span>
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Simulate compound returns by balancing physical gold reserves, pre-IPO equity synthetics, real estate rental yields, and US T-Bills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6 font-mono text-xs">
          
          <div>
            <div className="flex justify-between text-slate-300 mb-2">
              <span className="font-bold text-sm">Initial Capital Investment ($ USD):</span>
              <span className="text-amber-400 font-extrabold text-base">${investment.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="500000"
              step="5000"
              value={investment}
              onChange={(e) => setInvestment(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-2">
              <span>Investment Horizon:</span>
              <span className="text-cyan-400 font-bold">{years} {years === 1 ? 'Year' : 'Years'}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 5].map((y) => (
                <button
                  key={y}
                  onClick={() => setYears(y)}
                  className={`flex-1 py-2 rounded-xl text-xs transition-colors ${
                    years === y
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {y} {y === 1 ? 'Yr' : 'Yrs'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h4 className="text-slate-400 font-bold uppercase text-[11px]">Asset Class Allocation Breakdown:</h4>

            <div>
              <div className="flex justify-between text-purple-300 mb-1">
                <span>🚀 Pre-IPO Synthetics (SpaceX/OpenAI)</span>
                <span>{allocPreIPO}% (~22.0% Est. APY)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocPreIPO}
                onChange={(e) => setAllocPreIPO(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-cyan-300 mb-1">
                <span>🏢 Commercial Real Estate Vaults</span>
                <span>{allocRE}% (~9.2% Rental APY)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocRE}
                onChange={(e) => setAllocRE(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-amber-300 mb-1">
                <span>🥇 LBMA Zurich Vault Gold (P2P-GOLD)</span>
                <span>{allocGold}% (~8.0% Historical APY)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocGold}
                onChange={(e) => setAllocGold(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-emerald-300 mb-1">
                <span>📜 US T-Bills & Private Credit</span>
                <span>{allocDebt}% (~5.25% APY)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocDebt}
                onChange={(e) => setAllocDebt(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {totalAlloc !== 100 && (
            <p className="text-rose-400 text-[11px]">Note: Total allocation is {totalAlloc}% (Adjust sliders to equal 100%)</p>
          )}

        </div>

        <div className="lg:col-span-5">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border-cyan-500/40 shadow-2xl space-y-6 text-center">
            
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30">
              ESTIMATED PORTFOLIO METRICS
            </span>

            <div>
              <p className="text-xs font-mono text-slate-400 uppercase">Effective Net Portfolio APY</p>
              <p className="text-4xl font-extrabold text-cyan-400 font-mono mt-1">
                {(weightedAPY * 100).toFixed(2)}% <span className="text-sm font-normal text-slate-400">APY</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left font-mono text-xs">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Annual Income</span>
                <span className="text-lg font-extrabold text-emerald-400">${annualIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Total Profit ({years} yrs)</span>
                <span className="text-lg font-extrabold text-amber-400">+${totalProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left font-mono space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Projected Future Portfolio Value:</span>
                <span className="text-white font-extrabold text-base">${futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Calculated via automated daily compound interest model across on-chain RWA yield streams.
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
