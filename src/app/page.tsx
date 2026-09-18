'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { StatsOverview } from '../components/StatsOverview';
import { SnippetCard } from '../components/SnippetCard';
import { SnippetModal } from '../components/SnippetModal';
import { INITIAL_SNIPPETS } from '../lib/initialData';
import { Snippet, FilterCategory } from '../types/snippet';
import { Code2, FilterX, GitBranch, Terminal } from 'lucide-react';

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('devpulse_snippets');
    if (saved) {
      try {
        setSnippets(JSON.parse(saved));
      } catch {
        setSnippets(INITIAL_SNIPPETS);
      }
    } else {
      setSnippets(INITIAL_SNIPPETS);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('devpulse_snippets', JSON.stringify(snippets));
    }
  }, [snippets, isInitialized]);

  const filteredSnippets = useMemo(() => {
    return snippets.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesCategory = true;
      if (selectedCategory === 'Favorites') {
        matchesCategory = s.isFavorite;
      } else if (selectedCategory !== 'All') {
        matchesCategory = s.category === selectedCategory;
      }

      let matchesTag = true;
      if (selectedTag) {
        matchesTag = s.tags.includes(selectedTag);
      }

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [snippets, searchQuery, selectedCategory, selectedTag]);

  const handleToggleFavorite = (id: string) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this snippet?')) {
      setSnippets((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSaveSnippet = (
    data: Omit<Snippet, 'id' | 'createdAt'> & { id?: string }
  ) => {
    if (data.id) {
      setSnippets((prev) =>
        prev.map((s) =>
          s.id === data.id
            ? {
                ...s,
                title: data.title,
                description: data.description,
                code: data.code,
                language: data.language,
                category: data.category,
                tags: data.tags,
              }
            : s
        )
      );
    } else {
      const newSnippet: Snippet = {
        ...data,
        id: `snp-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setSnippets((prev) => [newSnippet, ...prev]);
    }
  };

  const handleOpenCreate = () => {
    setEditingSnippet(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCreateModal={handleOpenCreate}
      />

      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <StatsOverview snippets={snippets} activeCategory={selectedCategory} />

        {selectedTag && (
          <div className="flex items-center justify-between rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5">
            <span className="text-xs text-indigo-300">
              Filtering by tag: <strong className="font-semibold">#{selectedTag}</strong>
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs font-medium text-indigo-400 hover:text-white transition-colors"
            >
              Clear Tag Filter
            </button>
          </div>
        )}

        {filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
                onEdit={handleOpenEdit}
                onSelectTag={(tag) => setSelectedTag(tag)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 py-16 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-400 mb-4">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-white">No snippets found</h3>
            <p className="mt-1 text-xs text-zinc-400 max-w-sm">
              No code snippets matched your current search or category filter. Try clearing filters or create a new snippet.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
              >
                <FilterX className="h-3.5 w-3.5" />
                <span>Clear Filters</span>
              </button>
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-indigo-500"
              >
                <span>Add New Snippet</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <span className="font-semibold text-zinc-300">DevPulse</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <p>Built with Next.js App Router &amp; Tailwind CSS</p>
        </div>
      </footer>

      <SnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSnippet}
        editingSnippet={editingSnippet}
      />
    </div>
  );
}
