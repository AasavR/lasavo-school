import React from 'react';
import { MessageSquare, ThumbsUp, ExternalLink, Sparkles } from './Icons';
import { PAPERS_DATA } from '../data/mockData';

export default function CommunityHub() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open Research & Peer Discussion</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Daily Trending Machine Learning Papers
          </h1>
          <p className="text-sm text-slate-300">
            Read, upvote, and discuss cutting-edge machine learning research with the global open-source community.
          </p>
        </div>
      </div>

      {/* Papers Feed */}
      <div className="space-y-4">
        {PAPERS_DATA.map(paper => (
          <div key={paper.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-rose-400">arXiv:{paper.id}</span>
                  <span className="text-xs font-mono text-slate-500">• {paper.date}</span>
                </div>
                <h2 className="text-base font-bold text-white hover:text-rose-400 transition mt-1">
                  {paper.title}
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{paper.authors}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 hover:bg-slate-800 text-xs font-mono font-bold">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{paper.upvotes}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {paper.abstract}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                {paper.comments} community discussions
              </span>

              <a
                href={paper.arxivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-rose-400 hover:underline"
              >
                <span>Read ArXiv PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
