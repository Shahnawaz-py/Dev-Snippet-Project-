import { Snippet } from '../types/snippet';

export const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: 'snp-1',
    title: 'useDebounce Custom React Hook',
    description: 'Delays updating state value until specified timeout passes. Ideal for search inputs.',
    language: 'typescript',
    category: 'React',
    tags: ['react', 'hooks', 'performance', 'debounce'],
    isFavorite: true,
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    createdAt: '2026-09-10'
  },
  {
    id: 'snp-2',
    title: 'Glassmorphism CSS Utility Class',
    description: 'Modern translucent backdrop blur glass effect with frosted border.',
    language: 'css',
    category: 'CSS',
    tags: ['css', 'styling', 'ui', 'glassmorphism'],
    isFavorite: true,
    code: `.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 16px;
}`,
    createdAt: '2026-09-12'
  },
  {
    id: 'snp-3',
    title: 'Safe Fetch Wrapper with Retry',
    description: 'Async HTTP request handler with automatic retry backoff strategy.',
    language: 'typescript',
    category: 'Utility',
    tags: ['fetch', 'api', 'async', 'network'],
    isFavorite: false,
    code: `async function fetchWithRetry<T>(
  url: string,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP error \${res.status}\`);
    return await res.json();
  } catch (error) {
    if (retries <= 1) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry<T>(url, retries - 1, delay * 1.5);
  }
}`,
    createdAt: '2026-09-14'
  },
  {
    id: 'snp-4',
    title: 'PostgreSQL Recursive Tree Query',
    description: 'Query hierarchical category trees using common table expression (CTE).',
    language: 'sql',
    category: 'Database',
    tags: ['sql', 'postgres', 'cte', 'database'],
    isFavorite: false,
    code: `WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id, 1 as depth
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  SELECT c.id, c.name, c.parent_id, ct.depth + 1
  FROM categories c
  INNER JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY depth, name;`,
    createdAt: '2026-09-15'
  },
  {
    id: 'snp-5',
    title: 'Docker Compose Node & Postgres Setup',
    description: 'Production container setup for Web App and PostgreSQL persistent database.',
    language: 'yaml',
    category: 'DevOps',
    tags: ['docker', 'compose', 'postgres', 'backend'],
    isFavorite: true,
    code: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:secret@db:5432/appdb
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
    createdAt: '2026-09-16'
  },
  {
    id: 'snp-6',
    title: 'Express JWT Authorization Middleware',
    description: 'Validates Bearer token headers in API requests before proceeding.',
    language: 'typescript',
    category: 'Backend',
    tags: ['express', 'auth', 'jwt', 'security'],
    isFavorite: false,
    code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
  });
}`,
    createdAt: '2026-09-17'
  }
];
