import React, { useState } from 'react';
import { 
  Database, Search, Download, Copy, Check, Table, Filter, 
  Sparkles, Layers, ShieldCheck, Terminal
} from './Icons';
import { DATASETS_DATA } from '../data/mockData';

export default function DatasetsHub() {
  const [selectedDataset, setSelectedDataset] = useState(DATASETS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSplit, setSelectedSplit] = useState('train');
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredDatasets = DATASETS_DATA.filter(ds => 
    ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ds.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ds.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopySnippet = () => {
    const code = `from openweights import load_dataset\n\ndataset = load_dataset("${selectedDataset.id}", split="${selectedSplit}")\nprint(dataset)`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Datasets Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              <Database className="w-3.5 h-3.5" />
              <span>Decentralized Data Repository</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Open Datasets Hub & Viewer
            </h1>
            <p className="text-sm text-slate-300">
              Explore 38,000+ open-source machine learning datasets for pre-training, fine-tuning, and alignment. Inspect real-time Parquet tabular previews and stream directly with Python.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition">
              <Database className="w-4 h-4" />
              Upload Dataset
            </button>
          </div>
        </div>
      </div>

      {/* Dataset Directory & Interactive Tabular Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Datasets List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets by name or domain..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1 no-scrollbar">
            {filteredDatasets.map(ds => {
              const isSelected = selectedDataset.id === ds.id;
              return (
                <div
                  key={ds.id}
                  onClick={() => setSelectedDataset(ds)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/50 shadow-lg ring-1 ring-indigo-500/30'
                      : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-white hover:text-indigo-400 transition">
                        {ds.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono">{ds.id}</p>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                      {ds.rows} rows
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {ds.description}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-[11px]">
                    <span className="text-slate-400 font-mono text-[10px]">{ds.category}</span>
                    <span className="text-slate-400 font-mono text-[10px]">Size: {ds.size}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Tabular Dataset Previewer & Code (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{selectedDataset.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  {selectedDataset.license}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedDataset.id}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Split:</span>
              {['train', 'validation', 'test'].map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSplit(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                    selectedSplit === s 
                      ? 'bg-indigo-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Dataset Statistics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">TOTAL ROWS</span>
              <span className="text-sm font-extrabold text-indigo-400 font-mono mt-0.5 block">{selectedDataset.rows}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">DATASET SIZE</span>
              <span className="text-sm font-extrabold text-cyan-400 font-mono mt-0.5 block">{selectedDataset.size}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">FORMAT</span>
              <span className="text-sm font-extrabold text-emerald-400 font-mono mt-0.5 block">Parquet / JSONL</span>
            </div>
          </div>

          {/* Tabular Data Preview Table */}
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Table className="w-4 h-4 text-indigo-400" />
                Live Parquet Row Preview ({selectedDataset.previewData.length} sample rows shown)
              </span>
            </div>

            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
                    {selectedDataset.sampleColumns.map(col => (
                      <th key={col} className="p-3 border-r border-slate-800/60 font-semibold whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {selectedDataset.previewData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      {selectedDataset.sampleColumns.map(col => (
                        <td key={col} className="p-3 border-r border-slate-800/60 max-w-[220px] truncate">
                          {String(row[col] || '-')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Python Snippet */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Stream with Python</span>
              <button 
                onClick={handleCopySnippet}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-400 overflow-x-auto">
              {`from openweights import load_dataset\n\ndataset = load_dataset("${selectedDataset.id}", split="${selectedSplit}")`}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
