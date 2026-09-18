'use client';

import React from 'react';
import { Code, Star, Layers, Tag } from 'lucide-react';
import { Snippet } from '../types/snippet';

interface StatsOverviewProps {
  snippets: Snippet[];
  activeCategory: string;
}

export function StatsOverview({ snippets, activeCategory }: StatsOverviewProps) {
  const totalCount = snippets.length;
  const favoriteCount = snippets.filter((s) => s.isFavorite).length;

  const languages = Array.from(new Set(snippets.map((s) => s.language)));
  const uniqueTags = Array.from(new Set(snippets.flatMap((s) => s.tags)));

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 backdrop-blur-md transition-all hover:border-zinc-700/80">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Code className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">Total Snippets</p>
            <p className="text-xl font-bold text-white">{totalCount}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 backdrop-blur-md transition-all hover:border-zinc-700/80">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Star className="h-4 w-4 fill-amber-400/20" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">Favorites</p>
            <p className="text-xl font-bold text-white">{favoriteCount}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 backdrop-blur-md transition-all hover:border-zinc-700/80">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">Languages</p>
            <p className="text-xl font-bold text-white">{languages.length}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 backdrop-blur-md transition-all hover:border-zinc-700/80">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Tag className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">Total Tags</p>
            <p className="text-xl font-bold text-white">{uniqueTags.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
