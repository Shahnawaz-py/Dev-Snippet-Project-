export const PREDEFINED_CATEGORIES = [
  'React',
  'TypeScript',
  'CSS',
  'Backend',
  'DevOps',
  'Database',
  'Utility'
] as const;

export type PredefinedCategory = typeof PREDEFINED_CATEGORIES[number];

export type SnippetCategory = PredefinedCategory | string;

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

export type FilterCategory = 'All' | 'Favorites' | SnippetCategory;

