import React from 'react';
import { DollarSign, Check, ShieldCheck, Zap, Cpu, Server, Sparkles } from './Icons';

export default function PricingHub() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Non-Profit Community Governed</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Simple, Transparent Open Infrastructure
        </h1>
        <p className="text-sm text-slate-300">
          OpenWeights is owned by the open source AI community. 100% free forever for open weights hosting, public spaces, and WebGPU local execution.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tier 1: Community Free */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Community Free</span>
            <div>
              <span className="text-3xl font-extrabold text-white">$0</span>
              <span className="text-xs text-slate-400 font-mono"> / forever</span>
            </div>
            <p className="text-xs text-slate-300">
              Perfect for open source research, model hosting, public dataset publishing, and WebGPU in-browser inference.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Public Models & Datasets</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> WebGPU Zero-Cost Local Inference</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 100,000 Free API Requests / mo</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Community Spaces & Gradio Demos</li>
            </ul>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">
            Start Free
          </button>
        </div>

        {/* Tier 2: Pro Developer (Featured) */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/60 border border-amber-500/50 space-y-6 flex flex-col justify-between relative shadow-2xl ring-1 ring-amber-500/30">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full font-mono">
            Most Popular
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">PRO DEVELOPER</span>
            <div>
              <span className="text-3xl font-extrabold text-white">$12</span>
              <span className="text-xs text-slate-400 font-mono"> / month</span>
            </div>
            <p className="text-xs text-slate-300">
              For active developers building AI apps, fine-tuning custom adapters, and needing zero-queue dedicated GPUs.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Everything in Free</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Zero-Queue Dedicated Nvidia H100/A10G GPUs</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 5,000,000 API Tokens / mo</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> AutoTrain Fine-Tuning Credits ($50/mo)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Private Model & Dataset Storage</li>
            </ul>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20">
            Upgrade to Pro
          </button>
        </div>

        {/* Tier 3: Enterprise & Decentralized Nodes */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">ENTERPRISE CLOUD</span>
            <div>
              <span className="text-3xl font-extrabold text-white">$99</span>
              <span className="text-xs text-slate-400 font-mono"> / month</span>
            </div>
            <p className="text-xs text-slate-300">
              Dedicated high-throughput model endpoints, custom SLA, and private VPC deployment options.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Custom Dedicated Cluster (8x H100 SXM5)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> SOC2 Type II & HIPAA Compliance</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Unlimited Priority Inference API</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Dedicated 24/7 AI Engineer Support</li>
            </ul>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">
            Contact Enterprise
          </button>
        </div>

      </div>

      {/* Independence Charter */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-cyan-500/10 border border-slate-800 space-y-3 text-center">
        <h3 className="text-lg font-bold text-white">The OpenWeights Anti-Acquisition Charter</h3>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
          OpenWeights Hub is governed by an immutable open trust foundation. No single corporate entity can acquire, restrict access to, or lock down weights hosted on this platform.
        </p>
      </div>
    </div>
  );
}
