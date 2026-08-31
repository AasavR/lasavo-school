import React, { useState } from 'react';

export default function GitHubNetlifyModal({ isOpen, onClose }) {
  const [copiedSection, setCopiedSection] = useState(null);

  if (!isOpen) return null;

  const gitCommands = `# 1. Initialize Git Repository (if not already done)
git init
git add .
git commit -m "feat: Add Cross-Session RAG Chat Memory & Insight Studio"

# 2. Add your GitHub remote repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/omnimemory-rag-latvia.git
git branch -M main
git push -u origin main`;

  const netlifyConfig = `# netlify.toml - Netlify Build & SPA Deployment Configuration
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

  const netlifyCliCommands = `# Quick CLI Deployment to Netlify
npx netlify-cli deploy --prod --dir=dist

# Or connect GitHub repo directly in Netlify Dashboard:
# 1. Go to https://app.netlify.com/start
# 2. Select "Import an existing project" -> GitHub
# 3. Pick your repo 'omnimemory-rag-latvia'
# 4. Build command: npm run build | Publish dir: dist`;

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xl">
              🚀
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">GitHub & Netlify Deployment Guide</h2>
              <p className="text-xs text-slate-400">Deploy OmniMemory RAG Studio to a new GitHub repo & Netlify site</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Section 1: GitHub Repository Setup */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-sky-400 flex items-center gap-2">
              <span>🐙</span> Step 1: Create GitHub Repository
            </h3>
            <button
              onClick={() => handleCopy(gitCommands, 'git')}
              className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono transition flex items-center gap-1"
            >
              {copiedSection === 'git' ? '✓ Copied!' : 'Copy Commands'}
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto">
            {gitCommands}
          </pre>
        </div>

        {/* Section 2: Netlify Configuration (netlify.toml) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <span>📄</span> Step 2: Netlify Configuration (netlify.toml)
            </h3>
            <button
              onClick={() => handleCopy(netlifyConfig, 'netlifyConfig')}
              className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono transition flex items-center gap-1"
            >
              {copiedSection === 'netlifyConfig' ? '✓ Copied!' : 'Copy Config'}
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto">
            {netlifyConfig}
          </pre>
          <p className="text-xs text-slate-400">
            Note: <code className="text-amber-300">netlify.toml</code> is already generated in your root directory!
          </p>
        </div>

        {/* Section 3: Netlify Deployment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
              <span>⚡</span> Step 3: Deploy to Netlify
            </h3>
            <button
              onClick={() => handleCopy(netlifyCliCommands, 'netlifyCli')}
              className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 font-mono transition flex items-center gap-1"
            >
              {copiedSection === 'netlifyCli' ? '✓ Copied!' : 'Copy Steps'}
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs font-mono text-purple-300 overflow-x-auto">
            {netlifyCliCommands}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Status: Ready for Build & Push
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 font-semibold text-sm text-white transition shadow-lg shadow-sky-600/20"
          >
            Got it, close
          </button>
        </div>

      </div>
    </div>
  );
}
