import React, { useState } from 'react';
import { 
  Box, Search, Filter, Download, Heart, Sparkles, Terminal, 
  Copy, Check, Play, Settings, Layers, Code, ShieldCheck, 
  Zap, FileCode, Sliders, RefreshCw
} from './Icons';
import { MODELS_DATA } from '../data/mockData';

export default function ModelsHub({ onOpenUploadModal }) {
  const [selectedTask, setSelectedTask] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModel, setActiveModel] = useState(MODELS_DATA[0]);
  const [activeTab, setActiveTab] = useState('playground'); // playground | overview | files | code
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Playground state
  const [promptText, setPromptText] = useState(MODELS_DATA[0].defaultPrompt);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(512);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are an expert AI reasoning assistant on OpenWeights Hub.');

  const tasks = [
    { id: 'all', label: 'All Tasks' },
    { id: 'text-generation', label: 'Text Generation (LLM)' },
    { id: 'image-generation', label: 'Image Generation' },
    { id: 'automatic-speech-recognition', label: 'Speech Recognition' },
    { id: 'text-to-speech', label: 'Text to Speech' }
  ];

  const filteredModels = MODELS_DATA.filter(model => {
    const matchesTask = selectedTask === 'all' || model.task === selectedTask;
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTask && matchesSearch;
  });

  const handleSelectModel = (model) => {
    setActiveModel(model);
    setPromptText(model.defaultPrompt);
    setGeneratedOutput('');
  };

  const handleRunInference = () => {
    setIsGenerating(true);
    setGeneratedOutput('');
    
    let simulatedResponse = "";
    if (activeModel.task === 'image-generation') {
      simulatedResponse = "🎨 [WebGPU Image Rendered]: High-resolution 1024x1024 tensor buffer generated in 1.18 seconds. Image frame ready in memory.";
    } else if (activeModel.task === 'automatic-speech-recognition') {
      simulatedResponse = "🎙️ [Whisper Audio Transcription]: \"Welcome to OpenWeights Hub, the community-governed AI weights repository.\" (Confidence: 99.4%)";
    } else if (activeModel.task === 'text-to-speech') {
      simulatedResponse = "🔊 [Kokoro TTS Synthesized]: Audio buffer generated. Sample Rate: 24000Hz, Channels: 1. Duration: 3.4s.";
    } else {
      simulatedResponse = `[${activeModel.name} Response]:\n\n<thought>\nStep 1: Analyze input prompt and verify mathematical/logical constraints.\nStep 2: Formulate induction hypothesis for integer n >= 1.\nStep 3: Base case n = 1 -> 1 = 1^2 (True).\nStep 4: Inductive step: Assume true for k, then sum(k+1) = k^2 + (2k + 1) = (k + 1)^2.\n</thought>\n\nProof by Mathematical Induction:\n\n1. Base Case: For n = 1, the sum is 1, which equals 1^2. The statement holds for n = 1.\n\n2. Inductive Hypothesis: Assume that for n = k, 1 + 3 + 5 + ... + (2k - 1) = k^2.\n\n3. Inductive Step: We must prove for n = k + 1:\n   1 + 3 + ... + (2k - 1) + (2k + 1) = k^2 + (2k + 1)\n   = (k + 1)^2.\n\nTherefore, by mathematical induction, the formula holds for all n >= 1. ∎`;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < simulatedResponse.length) {
        setGeneratedOutput(prev => prev + simulatedResponse.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 12);
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getPythonSnippet = () => {
    return `# OpenWeights Python SDK integration
from openweights import AutoModelForCausalLM, AutoTokenizer

model_id = "${activeModel.id}"

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id, 
    device_map="auto",
    torch_dtype="bfloat16"
)

inputs = tokenizer("${promptText}", return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=${maxTokens}, temperature=${temperature})
print(tokenizer.decode(outputs[0], skip_special_tokens=True))`;
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Community Open Weights Standard</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Open Model Hub & WebGPU Inference
            </h1>
            <p className="text-sm text-slate-300">
              Explore 128,000+ open-source AI models. Test inference directly in your browser using WebGPU or run via zero-latency serverless APIs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenUploadModal}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              <Box className="w-4 h-4" />
              Upload Weights
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search model weights by name, architecture, author..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {tasks.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTask(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedTask === t.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Model List + Active Model Inspector / Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Model Catalog (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-slate-400">
              Showing {filteredModels.length} models
            </span>
            <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
              <Zap className="w-3 h-3" /> WebGPU Supported
            </span>
          </div>

          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1 no-scrollbar">
            {filteredModels.map((model) => {
              const isSelected = activeModel.id === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => handleSelectModel(model)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                      : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400">
                        <Box className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white hover:text-amber-400 transition flex items-center gap-1.5">
                          {model.name}
                          {model.trending && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-mono">
                              🔥 Trending
                            </span>
                          )}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-mono">{model.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Download className="w-3 h-3 text-slate-500" />
                      <span>{model.downloads}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 line-clamp-2">
                    {model.description}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                        {model.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono text-[10px]">
                        {model.size}
                      </span>
                    </div>

                    {model.webGpuReady && (
                      <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                        <Zap className="w-3 h-3" /> WebGPU Live
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Model Workbench & Playground (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[750px]">
          
          {/* Workbench Header */}
          <div className="p-4 md:p-6 bg-slate-950 border-b border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{activeModel.name}</h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                    {activeModel.license}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeModel.id}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>{activeModel.likes}</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono">
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeModel.downloads}</span>
                </button>
              </div>
            </div>

            {/* Model Workbench Tabs */}
            <div className="flex items-center gap-1 border-t border-slate-800/80 pt-3">
              {[
                { id: 'playground', label: 'Live Playground', icon: Play },
                { id: 'overview', label: 'Model Card & Benchmarks', icon: Box },
                { id: 'files', label: 'Files & Weights', icon: FileCode },
                { id: 'code', label: 'API Code', icon: Code }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workbench Tab Content Area */}
          <div className="p-4 md:p-6 flex-1 flex flex-col">
            
            {/* TAB 1: LIVE PLAYGROUND */}
            {activeTab === 'playground' && (
              <div className="flex-1 flex flex-col space-y-4">
                
                {/* Parameter Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <div>
                    <div className="flex items-center justify-between text-slate-400 mb-1 font-mono">
                      <span>Temperature</span>
                      <span className="text-amber-400">{temperature}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="1.5" 
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-slate-400 mb-1 font-mono">
                      <span>Max New Tokens</span>
                      <span className="text-amber-400">{maxTokens}</span>
                    </div>
                    <input 
                      type="range" 
                      min="64" 
                      max="2048" 
                      step="64"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                {/* Prompt Input Area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>Inference Prompt</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Engine: WebGPU / OpenInference-v2</span>
                  </label>
                  <textarea
                    rows={4}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500 resize-none"
                    placeholder="Enter prompt for model execution..."
                  />
                </div>

                {/* Execution Trigger */}
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quantization: {activeModel.precision}</span>
                  </div>

                  <button
                    onClick={handleRunInference}
                    disabled={isGenerating || !promptText.trim()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition active:scale-95"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Inferring...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-slate-950" />
                        <span>Run Model</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Output Display Terminal */}
                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col font-mono text-xs overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      Execution Output Stream
                    </span>
                    {generatedOutput && (
                      <button 
                        onClick={() => handleCopyCode(generatedOutput)}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-slate-200 leading-relaxed font-mono">
                    {generatedOutput ? (
                      generatedOutput
                    ) : (
                      <span className="text-slate-600 italic">
                        Click "Run Model" above to trigger live inference on OpenWeights WebGPU cluster.
                      </span>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: OVERVIEW & BENCHMARKS */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">Model Description</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeModel.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">Verified Benchmark Scores</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(activeModel.benchmarks).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 font-mono block">{key}</span>
                        <span className="text-base font-extrabold text-amber-400 font-mono mt-1 block">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                  <span className="font-bold text-indigo-300 block">Governance & License</span>
                  <p className="text-slate-300">
                    Licensed under <strong className="text-white">{activeModel.license}</strong>. 
                    Hosted on decentralized community nodes with zero restrictive API paywalls.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: FILES & WEIGHTS */}
            {activeTab === 'files' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-800">
                  <span>File Name</span>
                  <span>Size & Type</span>
                </div>

                <div className="space-y-2">
                  {activeModel.files.map((file, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-amber-400" />
                        <span className="text-slate-200 font-bold">{file.name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{file.size}</span>
                        <button className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: API CODE SNIPPETS */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Python Integration (openweights SDK)</span>
                  <button 
                    onClick={() => handleCopyCode(getPythonSnippet())}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
                  </button>
                </div>

                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto">
                  {getPythonSnippet()}
                </pre>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
