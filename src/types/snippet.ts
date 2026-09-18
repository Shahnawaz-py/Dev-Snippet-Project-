export type SnippetCategory = 'React' | 'TypeScript' | 'CSS' | 'Backend' | 'DevOps' | 'Database' | 'Utility';

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: SnippetCategory;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
}

export type FilterCategory = 'All' | SnippetCategory | 'Favorites';
