import React from 'react';
import { Box, ShieldCheck, Heart, Github, ExternalLink } from './Icons';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-white text-base tracking-tight">OpenWeights Hub</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            The community-owned open machine learning platform. Open weights, datasets, spaces, WebGPU inference, and decentralized cluster nodes.
          </p>
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>Anti-Acquisition Open Charter Active</span>
          </div>
        </div>

        {/* Core Ecosystem Links */}
        <div className="space-y-2 font-mono">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">Ecosystem</h4>
          <ul className="space-y-1.5 text-xs">
            <li><button onClick={() => setActiveTab('models')} className="hover:text-amber-400">Models Catalog (128K)</button></li>
            <li><button onClick={() => setActiveTab('datasets')} className="hover:text-amber-400">Datasets Hub (38K)</button></li>
            <li><button onClick={() => setActiveTab('spaces')} className="hover:text-amber-400">Spaces Web App Gallery</button></li>
            <li><button onClick={() => setActiveTab('finetune')} className="hover:text-amber-400">AutoTrain Studio</button></li>
          </ul>
        </div>

        {/* Developer & APIs */}
        <div className="space-y-2 font-mono">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">Developers</h4>
          <ul className="space-y-1.5 text-xs">
            <li><button onClick={() => setActiveTab('inference')} className="hover:text-amber-400">Serverless Inference API</button></li>
            <li><a href="https://github.com/AasavR/open-weights-hub" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center gap-1">Python SDK (openweights) <ExternalLink className="w-3 h-3" /></a></li>
            <li><button onClick={() => setActiveTab('pricing')} className="hover:text-amber-400">Pricing & Nodes</button></li>
            <li><button onClick={() => setActiveTab('community')} className="hover:text-amber-400">ArXiv Papers & Research</button></li>
          </ul>
        </div>

        {/* Open Community */}
        <div className="space-y-3 font-mono">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">Open Source</h4>
          <p className="text-xs text-slate-400">
            OpenWeights is built and maintained by open-source AI contributors worldwide.
          </p>
          <div className="flex items-center gap-3 text-slate-300">
            <a href="https://github.com/AasavR/open-weights-hub" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-amber-400">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500">
        <span>© 2026 OpenWeights Hub Foundation. All open weights preserved.</span>
        <span className="flex items-center gap-1 mt-2 sm:mt-0">
          Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for the Open AI Community.
        </span>
      </div>
    </footer>
  );
}
