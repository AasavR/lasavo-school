import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Square, Sliders, Gamepad2, Music, Mic, Sparkles, Activity } from 'lucide-react';
import { PRODUCT_DATA } from '../data/earbudsData';

export default function SoundSimulator({ lang }) {
  const [activeMode, setActiveMode] = useState('bass');
  const [isPlaying, setIsPlaying] = useState(false);
  const [bassLevel, setBassLevel] = useState(85);
  const [latencyMs, setLatencyMs] = useState(45);
  const [encLevel, setEncLevel] = useState(90);

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);

  // Initialize Web Audio API safely on user gesture
  const startAudioTest = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (isPlaying) {
        stopAudioTest();
        return;
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (activeMode === 'bass') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, ctx.currentTime); // Low sub-bass
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
      } else if (activeMode === 'gaming') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, ctx.currentTime); // Crisp gaming pulse
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // Clean vocal pitch
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch (e) {
      console.log('Web Audio API not supported or blocked:', e);
      setIsPlaying(true);
    }
  };

  const stopAudioTest = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) {}
      oscRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopAudioTest();
    };
  }, []);

  return (
    <section id="sound-simulator" className="py-16 bg-[#0B0F19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{lang === 'hi' ? 'लाइव वेब ऑडियो सिम्युलेटर' : 'Live Interactive Sound Equalizer'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'hi' ? 'लासावो एचडी साउंड तकनीक का अनुभव करें' : 'Test Lasavo Sound Quality Live'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'hi' 
              ? 'नीचे दिए गए ऑडियो मोड्स को चुनें और सीधे अपने ब्राउज़र में ईयरबड्स की साउंड क्षमता का परीक्षण करें।' 
              : 'Select audio profiles below to simulate sub-bass rumble, 45ms gaming mode, and Quad-Mic ENC voice isolation.'}
          </p>
        </div>

        {/* Audio Console Box */}
        <div className="mt-10 max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-[#0E1524] to-slate-900 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Bar Control */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                {lang === 'hi' ? 'ड्राइवर स्पेक्स' : 'Audio Engine Specs'}
              </span>
              <h3 className="text-xl font-bold text-white">13mm Titanium Dynamic Drivers</h3>
            </div>

            {/* Play/Stop Audio Button */}
            <button
              onClick={isPlaying ? stopAudioTest : startAudioTest}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all duration-200 ${
                isPlaying 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/30'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>{lang === 'hi' ? 'साउंड टेस्ट बंद करें' : 'Stop Audio Test'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{lang === 'hi' ? 'साउंड टेस्ट शुरू करें' : 'Start Audio Test'}</span>
                </>
              )}
            </button>
          </div>

          {/* Equalizer Spectrum Visualizer Animation */}
          <div className="py-8">
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>{lang === 'hi' ? 'फ्रीक्वेंसी स्पेक्ट्रम विजुअलाइज़र' : 'Frequency Spectrum Visualizer'}</span>
              <span className="text-cyan-400 font-bold">
                {activeMode === 'bass' ? '40Hz Sub-Bass' : activeMode === 'gaming' ? '45ms Ultra-Low Latency' : 'Quad-Mic ENC Active'}
              </span>
            </div>
            
            {/* Animated Equalizer Bars */}
            <div className="h-28 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex items-end justify-between gap-1 sm:gap-2 overflow-hidden">
              {[...Array(24)].map((_, idx) => {
                const randomHeight = isPlaying 
                  ? `${Math.max(20, Math.floor(Math.sin((idx + Date.now()/200) * 0.5) * 40 + 50))}%`
                  : '15%';
                return (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-cyan-600 via-blue-500 to-cyan-300 rounded-t-sm transition-all duration-150"
                    style={{ height: randomHeight }}
                  />
                );
              })}
            </div>
          </div>

          {/* Sound Mode Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {PRODUCT_DATA.soundModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveMode(mode.id);
                  if (isPlaying) {
                    stopAudioTest();
                    setTimeout(startAudioTest, 100);
                  }
                }}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
                  activeMode === mode.id 
                    ? 'bg-cyan-950/70 border-cyan-400/80 ring-2 ring-cyan-500/20 shadow-lg' 
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {mode.id === 'bass' && <Music className="w-5 h-5 text-cyan-400" />}
                  {mode.id === 'gaming' && <Gamepad2 className="w-5 h-5 text-cyan-400" />}
                  {mode.id === 'enc' && <Mic className="w-5 h-5 text-cyan-400" />}
                  <span className="font-bold text-white text-sm">
                    {lang === 'hi' ? mode.nameHi : mode.nameEn}
                  </span>
                </div>
                <div className="text-xs text-cyan-400 font-mono mb-1">{mode.freq}</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'hi' ? mode.descHi : mode.descEn}
                </p>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
