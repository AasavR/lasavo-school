import React, { useState } from 'react';
import { 
  Terminal, Key, Copy, Check, ShieldCheck, Zap, Server, Code
} from './Icons';

export default function InferenceAPI() {
  const [apiKey, setApiKey] = useState('ow_live_994827a1f09b43e8a1d291e0a29');
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState('python'); // python | node | curl | rust

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const snippets = {
    python: `import requests\n\nAPI_URL = "https://api.openweights.io/v1/models/openweights/DeepSeek-R1-Distill-Llama-70B/generate"\nheaders = {"Authorization": "Bearer ${apiKey}"}\n\npayload = {\n    "prompt": "Solve this equation: 4x + 12 = 36",\n    "temperature": 0.7,\n    "max_tokens": 256\n}\n\nresponse = requests.post(API_URL, headers=headers, json=payload)\nprint(response.json())`,
    node: `import { OpenWeights } from '@openweights/sdk';\n\nconst ow = new OpenWeights({ apiKey: '${apiKey}' });\n\nconst response = await ow.models.generate({\n  model: 'openweights/DeepSeek-R1-Distill-Llama-70B',\n  prompt: 'Write a TypeScript interface for user state.',\n  temperature: 0.7\n});\n\nconsole.log(response.output);`,
    curl: `curl -X POST https://api.openweights.io/v1/models/openweights/DeepSeek-R1-Distill-Llama-70B/generate \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"prompt": "Hello OpenWeights", "temperature": 0.7}'`,
    rust: `use openweights_rs::Client;\n\n#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std::error::Error>> {\n    let client = Client::new("${apiKey}");\n    let res = client.generate("openweights/DeepSeek-R1-Distill-Llama-70B", "Hello").await?;\n    println!("{:#?}", res);\n    Ok(())\n}`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>Serverless Open Inference Endpoints</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Open Weights Serverless API
            </h1>
            <p className="text-sm text-slate-300">
              Low-latency serverless endpoints for 128k+ open models. Streaming, WebSockets, and OpenAI-compatible API endpoints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300 font-mono bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-emerald-400" />
              Latency: &lt;14ms Avg
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* API Key Manager (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Key className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">API Access Tokens</h2>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-slate-400">Active API Token</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={apiKey}
                  readOnly
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
                <button 
                  onClick={handleCopyKey}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 block">Quota & Usage</span>
              <div className="flex items-center justify-between text-white font-bold">
                <span>Free Tier Tier 1</span>
                <span className="text-emerald-400">100,000 req / mo</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-1/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Snippets (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              API Client Integration
            </h3>

            <div className="flex items-center gap-1">
              {['python', 'node', 'curl', 'rust'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition ${
                    activeLang === lang
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto min-h-[220px]">
            {snippets[activeLang]}
          </pre>
        </div>
      </div>
    </div>
  );
}
