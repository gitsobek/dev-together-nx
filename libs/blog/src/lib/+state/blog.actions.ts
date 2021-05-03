import { createAction, props } from '@ngrx/store';
import { ArticleQuery, ListType } from './blog.models';
import { Article } from '@dev-together/article';
import { ErrorResponse } from '@dev-together/api';

/* -- Articles list -- */
export const loadArticles = createAction('[Blog] LOAD_ARTICLES');

export const loadArticlesSuccess = createAction(
  '[Blog] LOAD_ARTICLES_SUCCESS',
  props<{ articles: Article[]; count: number }>()
);

export const loadArticlesFail = createAction(
  '[Blog] LOAD_ARTICLES_FAIL',
  props<{ error: ErrorResponse }>()
);

/* -- Articles query -- */
export const setArticlesQuery = createAction(
  '[Blog] SET_ARTICLES_QUERY',
  props<{ query: ArticleQuery }>()
);

export const setArticlesLimit = createAction(
  '[Blog] SET_ARTICLES_LIMIT',
  props<{ pageSize: number }>()
);

export const setArticlesPage = createAction(
  '[Blog] SET_ARTICLES_PAGE',
  props<{ pageIndex: number }>()
);

export const setArticlesTag = createAction(
  '[Blog] SET_ARTICLES_TAG',
  props<{ tag: string }>()
);

export const setArticlesType = createAction(
  '[Blog] SET_ARTICLES_TYPE',
  props<{ listType: ListType }>()
);

export const setArticlesAuthor = createAction(
  '[Blog] SET_ARTICLES_AUTHOR',
  props<{ username: string }>()
);

/* -- Tags -- */
export const loadTags = createAction('[Blog] LOAD_TAGS');

export const loadTagsSuccess = createAction(
  '[Blog] LOAD_TAGS_SUCCESS',
  props<{ tags: string[] }>()
);

export const loadTagsFail = createAction(
  '[Blog] LOAD_TAGS_FAIL',
  props<{ error: ErrorResponse }>()
);
