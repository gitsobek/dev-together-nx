import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Blog, blogFeatureKey } from './blog.reducer';

const blogFeatureSelector = createFeatureSelector<Blog>(blogFeatureKey);

export const getQuery = createSelector(
  blogFeatureSelector,
  (state: Blog) => state.query
);
export const getArticles = createSelector(
  blogFeatureSelector,
  (state: Blog) => state.articles.entities
);
export const getArticlesCount = createSelector(
  blogFeatureSelector,
  (state: Blog) => state.articles.count
);
export const getTags = createSelector(
  blogFeatureSelector,
  (state: Blog) => state.tags
);
export const getSelectedTag = createSelector(
  blogFeatureSelector,
  (state: Blog) => state.query.filters.tag
);
export const isLoading = createSelector(
  blogFeatureSelector,
  (state: Blog) => state.articles.loading
);
export const isError = createSelector(
  blogFeatureSelector,
  (state: Blog) => state.articles.hasError
);

export const blogQuery = {
  getTags,
  getQuery,
  getArticles,
  getArticlesCount,
  getSelectedTag,
  isLoading,
  isError,
};
