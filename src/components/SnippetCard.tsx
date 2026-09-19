'use client';

import React, { useState } from 'react';
import { Copy, Check, Star, Trash2, Tag, Calendar, Edit3 } from 'lucide-react';
import { Snippet } from '../types/snippet';

interface SnippetCardProps {
  snippet: Snippet;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (snippet: Snippet) => void;
  onSelectTag: (tag: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  React: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  TypeScript: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CSS: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Backend: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  DevOps: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Database: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Utility: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
};

export function SnippetCard({
  snippet,
  onToggleFavorite,
  onDelete,
  onEdit,
  onSelectTag
}: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const badgeStyle = CATEGORY_COLORS[snippet.category] || 'bg-violet-500/10 text-violet-400 border-violet-500/20';

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-xl transition-all duration-200 hover:border-indigo-500/40 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-indigo-500/5">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
            {snippet.category}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFavorite(snippet.id)}
              className={`rounded-lg p-1.5 transition-colors ${
                snippet.isFavorite
                  ? 'text-amber-400 hover:bg-amber-400/10'
                  : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
              }`}
              title={snippet.isFavorite ? 'Remove Favorite' : 'Add Favorite'}
            >
              <Star className={`h-4 w-4 ${snippet.isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => onEdit(snippet)}
              className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
              title="Edit Snippet"
            >
              <Edit3 className="h-4 w-4" />
            </button>

            <button
              onClick={() => onDelete(snippet.id)}
              className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
              title="Delete Snippet"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
          {snippet.title}
        </h3>

        <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
          {snippet.description}
        </p>

        <div className="relative mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-3">
          <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              {snippet.language}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md bg-zinc-800/80 px-2 py-1 text-[11px] text-zinc-300 backdrop-blur-sm transition-colors hover:bg-indigo-600 hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="max-h-48 overflow-x-auto pr-16 text-xs font-mono text-zinc-200 scrollbar-thin">
            <code>{snippet.code}</code>
          </pre>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/60 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {snippet.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className="inline-flex items-center gap-1 rounded-md bg-zinc-800/50 px-2 py-0.5 text-[11px] font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-indigo-400"
            >
              <Tag className="h-2.5 w-2.5 opacity-60" />
              #{tag}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
          <Calendar className="h-3 w-3" />
          <span>{snippet.createdAt}</span>
        </div>
      </div>
    </div>
  );
}
