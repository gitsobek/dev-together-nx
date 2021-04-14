export interface ArticleQuery {
  type: ListType;
  pageIndex: number;
  filters: Partial<Filters>;
}

export type ListType = 'ALL' | 'PERSONAL';

export interface Filters {
  tag: string;
  author: string;
  limit: number;
}
