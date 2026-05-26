export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author: string;
  featuredImage: string | null;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}
