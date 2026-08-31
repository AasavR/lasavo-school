import React, { useState } from 'react';
import { X, Box, Database, LayoutGrid, Upload, Check, Sparkles } from './Icons';

export default function UploadModal({ isOpen, onClose }) {
  const [assetType, setAssetType] = useState('model'); // model | dataset | space
  const [assetName, setAssetName] = useState('');
  const [license, setLicense] = useState('mit');
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setAssetName('');
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Upload Open Weights / Asset</h2>
              <p className="text-xs text-slate-400 font-mono">Publish to OpenWeights Hub</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Upload Successfully Published!</h3>
            <p className="text-xs text-slate-400 font-mono">Your open asset is now live on the global node network.</p>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="space-y-4 text-xs font-mono">
            
            <div className="space-y-1.5">
              <label className="text-slate-400">Asset Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'model', label: 'Model Weights', icon: Box },
                  { id: 'dataset', label: 'Dataset', icon: Database },
                  { id: 'space', label: 'Space App', icon: LayoutGrid }
                ].map(t => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAssetType(t.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                        assetType === t.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px]">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400">Repository Name (e.g. openweights/my-model-7b)</label>
              <input
                type="text"
                required
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="openweights/my-custom-model"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400">Open License</label>
              <select
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="mit">MIT Open Source</option>
                <option value="apache-2.0">Apache 2.0</option>
                <option value="cc-by-4.0">Creative Commons BY 4.0</option>
                <option value="open-rail">OpenRAIL-M</option>
              </select>
            </div>

            <div className="p-6 rounded-xl border-2 border-dashed border-slate-800 bg-slate-950 text-center space-y-2">
              <Upload className="w-6 h-6 text-slate-500 mx-auto" />
              <p className="text-slate-400 text-xs">
                Drag and drop <span className="text-amber-400">.safetensors</span>, <span className="text-amber-400">.gguf</span>, or dataset files here
              </p>
              <span className="text-[10px] text-slate-600">Git LFS chunking enabled automatically</span>
            </div>

            <button
              type="submit"
              disabled={isUploading || !assetName.trim()}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              {isUploading ? 'Publishing to Open Weights Cluster...' : 'Publish Open Asset'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
