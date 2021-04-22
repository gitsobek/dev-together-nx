import { Action, createReducer, on } from '@ngrx/store';
import { ArticleQuery } from './blog.models';
import * as BlogActions from './blog.actions';
import { Article } from '@dev-together/article';

export const blogFeatureKey = 'blog';

export interface ArticleCollectionState {
  entities: Article[];
  count: number;
  loaded: boolean;
  loading: boolean;
  hasError: boolean;
}

export interface Blog {
  query: ArticleQuery;
  articles: ArticleCollectionState;
  tags: string[]
}

export interface BlogState {
  readonly [blogFeatureKey]: Blog;
}

export const blogInitialState: Blog = {
  query: {
    type: 'ALL',
    pageIndex: 1,
    filters: {
      tag: 'All',
      limit: 10,
    },
  },
  articles: {
    entities: [],
    count: 0,
    loaded: false,
    loading: false,
    hasError: false,
  },
  tags: ['All']
};

const reducer = createReducer(
  blogInitialState,
  on(BlogActions.setArticlesPage, (state, action) => {
    const query = {
      ...state.query,
      pageIndex: action.pageIndex,
    };
    return { ...state, query };
  }),
  on(BlogActions.setArticlesLimit, (state, action) => {
    const filters = {
      ...state.query.filters,
      limit: action.pageSize,
    };
    const query = {
      ...state.query,
      filters,
    };
    return { ...state, query };
  }),
  on(BlogActions.setArticlesQuery, (state, action) => ({
    ...state,
    query: action.query,
  })),
  on(BlogActions.setArticlesTag, (state, action) => {
    const filters = {
      ...state.query.filters,
      tag: action.tag,
    };
    const query = {
      ...state.query,
      filters,
    };
    return { ...state, query };
  }),
  on(BlogActions.setArticlesType, (state, action) => {
    const query = {
      ...state.query,
      type: action.listType,
    };
    return { ...state, query };
  }),
  on(BlogActions.loadArticles, (state, _) => {
    const articles = { ...state.articles, loading: true };
    return { ...state, articles };
  }),
  on(BlogActions.loadArticlesSuccess, (state, action) => {
    const articles = {
      ...state.articles,
      entities: action.articles,
      count: action.count,
      loading: false,
      loaded: true,
      hasError: false,
    };
    return { ...state, articles };
  }),
  on(BlogActions.loadArticlesFail, (state, _) => {
    const articles = {
      ...state.articles,
      entities: [],
      count: 0,
      loading: false,
      loaded: false,
      hasError: true,
    };
    return { ...state, articles };
  }),
  on(BlogActions.setFavoriteArticleSuccess, (state, action) => ({
    ...state,
    articles: updateArticles(state.articles, action.article),
  })),
  on(BlogActions.loadTagsSuccess, (state, action) => ({
    ...state,
    tags: ['All', ...action.tags]
  })),
  on(BlogActions.loadTagsFail, (state, _) => ({
    ...state,
    tags: ['All']
  }))
);

function updateArticles(
  articles: ArticleCollectionState,
  payload: Article
): ArticleCollectionState {
  const idx = articles.entities.findIndex((a) => a.slug === payload.slug);
  const entities = [
    ...articles.entities.slice(0, idx),
    Object.assign({}, articles.entities[idx], payload),
    ...articles.entities.slice(idx + 1),
  ];
  return {
    ...articles,
    entities,
    loading: false,
    loaded: true,
    hasError: false,
  };
}

export function blogReducer(state: Blog | undefined, action: Action): Blog {
  return reducer(state, action);
}