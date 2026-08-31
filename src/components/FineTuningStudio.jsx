import React, { useState, useEffect } from 'react';
import { 
  Cpu, Play, RefreshCw, Activity, Layers, Download, Check, 
  Sparkles, Sliders, Terminal, ShieldCheck, Zap 
} from './Icons';
import { MODELS_DATA, DATASETS_DATA } from '../data/mockData';

export default function FineTuningStudio() {
  const [selectedModel, setSelectedModel] = useState(MODELS_DATA[0].id);
  const [selectedDataset, setSelectedDataset] = useState(DATASETS_DATA[0].id);
  const [method, setMethod] = useState('QLoRA'); // LoRA | QLoRA | DPO | GRPO
  const [learningRate, setLearningRate] = useState('2e-4');
  const [epochs, setEpochs] = useState(3);
  const [loraRank, setLoraRank] = useState(16);
  
  // Training Simulation State
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(150);
  const [lossHistory, setLossHistory] = useState([]);
  const [trainingLogs, setTrainingLogs] = useState([]);

  const handleStartFineTuning = () => {
    setIsTraining(true);
    setCurrentStep(0);
    setCurrentEpoch(1);
    setLossHistory([2.85]);
    setTrainingLogs([
      `[AutoTrain] Initializing cluster node with 8x NVIDIA H100 SXM5 80GB...`,
      `[AutoTrain] Loading base model: ${selectedModel} in 4-bit NormalFloat precision...`,
      `[AutoTrain] Injecting LoRA adapter modules into target_modules: [q_proj, v_proj, k_proj, o_proj]...`,
      `[AutoTrain] Trainable Parameters: 84,213,760 / 70,128,450,000 (0.12%)`,
      `[AutoTrain] Epoch 1/3 started. Batch size: 32 per GPU. Total steps: 150.`
    ]);
  };

  useEffect(() => {
    if (!isTraining) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          setIsTraining(false);
          setTrainingLogs(logs => [...logs, `[AutoTrain] 🎉 Training Complete! Adapter weights exported to openweights/DeepSeek-R1-LoRA-Custom.`]);
          return totalSteps;
        }

        const nextStep = prev + 5;
        const newLoss = Math.max(0.25, 2.85 * Math.exp(-nextStep / 45) + (Math.random() * 0.08 - 0.04));
        setLossHistory(hist => [...hist, newLoss]);
        
        if (nextStep % 50 === 0) {
          const ep = Math.min(epochs, Math.floor(nextStep / 50) + 1);
          setCurrentEpoch(ep);
          setTrainingLogs(logs => [
            ...logs,
            `[Step ${nextStep}/${totalSteps}] Epoch ${ep} | Training Loss: ${newLoss.toFixed(4)} | Learning Rate: ${learningRate} | GPU Memory: 18.4 GB`
          ]);
        }

        return nextStep;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isTraining, totalSteps, epochs, learningRate]);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>No-Code AI Fine-Tuning Engine</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              AutoTrain Fine-Tuning Studio
            </h1>
            <p className="text-sm text-slate-300">
              Fine-tune open LLMs, Vision, and Code models with 1-click using QLoRA, DPO, or GRPO. Zero GPU infrastructure boilerplate required.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-300 font-mono bg-purple-500/20 px-3 py-1.5 rounded-xl border border-purple-500/30 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              8x H100 Cluster Ready
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Configurator + Live Training Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Hyperparameter Configurator (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white">Training Job Configuration</h2>
          </div>

          <div className="space-y-4 text-xs font-mono">
            
            {/* Base Model Select */}
            <div className="space-y-1.5">
              <label className="text-slate-400">Target Base Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-purple-500"
              >
                {MODELS_DATA.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.size})</option>
                ))}
              </select>
            </div>

            {/* Target Dataset Select */}
            <div className="space-y-1.5">
              <label className="text-slate-400">Target Fine-Tuning Dataset</label>
              <select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-purple-500"
              >
                {DATASETS_DATA.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.rows} samples)</option>
                ))}
              </select>
            </div>

            {/* Fine-Tuning Technique */}
            <div className="space-y-1.5">
              <label className="text-slate-400">Fine-Tuning Method</label>
              <div className="grid grid-cols-4 gap-2">
                {['QLoRA', 'LoRA', 'DPO', 'GRPO'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`py-2 rounded-xl text-center font-bold transition ${
                      method === m
                        ? 'bg-purple-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Hyperparameters Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400">Learning Rate</label>
                <input
                  type="text"
                  value={learningRate}
                  onChange={(e) => setLearningRate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Epochs</label>
                <input
                  type="number"
                  value={epochs}
                  onChange={(e) => setEpochs(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">LoRA Rank (r): {loraRank}</label>
              <input
                type="range"
                min="8"
                max="128"
                step="8"
                value={loraRank}
                onChange={(e) => setLoraRank(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <button
              onClick={handleStartFineTuning}
              disabled={isTraining}
              className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition active:scale-95 mt-4"
            >
              {isTraining ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Training Run Active...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Launch AutoTrain Job</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: Training Progress & Real-Time Loss Curve (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                Live Training Loss Chart
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Step: {currentStep} / {totalSteps} • Epoch {currentEpoch} of {epochs}
              </p>
            </div>

            {currentStep >= totalSteps && (
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Training Completed
              </span>
            )}
          </div>

          {/* Loss Curve SVG Visualization */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 h-56 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Loss: {lossHistory.length ? lossHistory[lossHistory.length - 1].toFixed(4) : '3.000'}</span>
              <span>100% Convergence Target</span>
            </div>

            <svg className="w-full h-36 overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="100%" y2="20" stroke="#1e293b" strokeDasharray="4" />
              <line x1="0" y1="60" x2="100%" y2="60" stroke="#1e293b" strokeDasharray="4" />
              <line x1="0" y1="100" x2="100%" y2="100" stroke="#1e293b" strokeDasharray="4" />

              {/* Loss Line Plot */}
              {lossHistory.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  points={lossHistory.map((val, i) => {
                    const x = (i / Math.max(1, lossHistory.length - 1)) * 400;
                    const y = Math.max(10, Math.min(130, (val / 3.0) * 120));
                    return `${x},${130 - y}`;
                  }).join(' ')}
                />
              )}
            </svg>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Step 0</span>
              <span>Step {totalSteps}</span>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-1.5 h-44 overflow-y-auto">
            <div className="text-[11px] text-slate-500 flex items-center gap-1 border-b border-slate-800 pb-1 mb-2">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              Training Terminal Stream
            </div>

            {trainingLogs.length ? (
              trainingLogs.map((log, idx) => (
                <div key={idx} className="text-emerald-400">{log}</div>
              ))
            ) : (
              <span className="text-slate-600 italic">Configure job and click "Launch AutoTrain Job" to start.</span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
