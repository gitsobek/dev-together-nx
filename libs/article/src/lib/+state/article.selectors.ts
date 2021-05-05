import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState, articleFeatureKey } from './article.reducer';

const articleFeatureSelector = createFeatureSelector<ArticleState>(
  articleFeatureKey
);
export const getArticle = createSelector(
  articleFeatureSelector,
  (state: ArticleState) => state.data
);
export const getComments = createSelector(
  articleFeatureSelector,
  (state: ArticleState) => state.comments
);
export const isArticleLoaded = createSelector(
  articleFeatureSelector,
  (state: ArticleState) => state.loaded
);
export const hasArticleError = createSelector(
  articleFeatureSelector,
  (state: ArticleState) => state.hasError
);
export const getAuthor = createSelector(
  articleFeatureSelector,
  (state: ArticleState) => state.data.author
);
export const isCommentsLoading = createSelector(
  articleFeatureSelector,
  (state: ArticleState) => state.commentsLoading
);
export const isPublishing = createSelector(
  articleFeatureSelector,
  (state: ArticleState) => state.publishing
);

export const articleQuery = {
  getArticle,
  getComments,
  hasArticleError,
  isArticleLoaded,
  getAuthor,
  isCommentsLoading,
  isPublishing
};
