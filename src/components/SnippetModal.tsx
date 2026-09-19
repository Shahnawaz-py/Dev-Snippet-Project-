'use client';

import React, { useState, useEffect } from 'react';
import { X, Code2, Sparkles } from 'lucide-react';
import { Snippet, PREDEFINED_CATEGORIES } from '../types/snippet';

interface SnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (snippet: Omit<Snippet, 'id' | 'createdAt'> & { id?: string }) => void;
  editingSnippet?: Snippet | null;
}

export function SnippetModal({
  isOpen,
  onClose,
  onSave,
  editingSnippet
}: SnippetModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('typescript');
  const [categorySelect, setCategorySelect] = useState<string>('React');
  const [customCategory, setCustomCategory] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title);
      setDescription(editingSnippet.description);
      setCode(editingSnippet.code);
      setLanguage(editingSnippet.language);
      setTagsInput(editingSnippet.tags.join(', '));

      const isPredefined = (PREDEFINED_CATEGORIES as readonly string[]).includes(editingSnippet.category);
      if (isPredefined) {
        setCategorySelect(editingSnippet.category);
        setCustomCategory('');
      } else {
        setCategorySelect('Custom');
        setCustomCategory(editingSnippet.category);
      }
    } else {
      setTitle('');
      setDescription('');
      setCode('');
      setLanguage('typescript');
      setCategorySelect('React');
      setCustomCategory('');
      setTagsInput('');
    }
  }, [editingSnippet, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    const finalCategory =
      categorySelect === 'Custom'
        ? customCategory.trim() || 'Custom'
        : categorySelect;

    onSave({
      id: editingSnippet?.id,
      title: title.trim(),
      description: description.trim(),
      code: code.trim(),
      language: language.toLowerCase().trim(),
      category: finalCategory,
      tags,
      isFavorite: editingSnippet ? editingSnippet.isFavorite : false
    });

    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {editingSnippet ? 'Edit Snippet' : 'Create New Snippet'}
              </h2>
              <p className="text-xs text-zinc-400">
                Save and organize your developer code snippets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300">Snippet Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. useDebounce Custom Hook"
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300">Category</label>
              <select
                value={categorySelect}
                onChange={(e) => setCategorySelect(e.target.value)}
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {PREDEFINED_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="Custom">Custom</option>
              </select>
              {categorySelect === 'Custom' && (
                <input
                  type="text"
                  required
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category name..."
                  className="mt-2 w-full rounded-xl border border-indigo-500/50 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300">Language</label>
              <input
                type="text"
                required
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="e.g. typescript, css, sql, python"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of what this code does..."
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300">Code Snippet</label>
            <textarea
              required
              rows={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste or write your code here..."
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="react, hook, async, state"
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:from-indigo-500 hover:to-cyan-500 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>{editingSnippet ? 'Update Snippet' : 'Save Snippet'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
