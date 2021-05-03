import { ErrorResponse } from '@dev-together/api';
import { Profile } from '@dev-together/profile';
import { createAction, props } from '@ngrx/store';
import { Article, Comment } from './article.models';

/* -- Article data -- */
export const initializeArticle = createAction('[Article] INITIALIZE_ARTICLE');

export const loadArticle = createAction(
  '[Article] LOAD_ARTICLE',
  props<{ slug: string }>()
);
export const loadArticleSuccess = createAction(
  '[Article] LOAD_ARTICLE_SUCCESS',
  props<{ article: Article }>()
);
export const loadArticleFail = createAction(
  '[Article] LOAD_ARTICLE_FAIL',
  props<{ error: ErrorResponse }>()
);

/* -- Article actions -- */
export const deleteArticle = createAction(
  '[Article] DELETE_ARTICLE',
  props<{ slug: string }>()
);
export const deleteArticleSuccess = createAction(
  '[Article] DELETE_ARTICLE_SUCCESS',
  props<{ slug: string }>()
);
export const deleteArticleFail = createAction(
  '[Article] DELETE_ARTICLE_FAIL',
  props<{ error: ErrorResponse }>()
);

export const setFavoriteArticle = createAction(
  '[Article] FAVORITE_ARTICLE',
  props<{ slug: string }>()
);

export const setFavoriteArticleSuccess = createAction(
  '[Article] FAVORITE_ARTICLE_SUCCESS',
  props<{ article: Article }>()
);

export const setFavoriteArticleFail = createAction(
  '[Article] FAVORITE_ARTICLE_FAIL',
  props<{ error: ErrorResponse }>()
);

export const setFollowUser = createAction(
  '[Article] FOLLOW_USER',
  props<{ id: string }>()
);
export const setFollowUserSuccess = createAction(
  '[Article] FOLLOW_USER_SUCCESS',
  props<{ profile: Profile }>()
);
export const setFollowUserFail = createAction(
  '[Article] FOLLOW_USER_FAIL',
  props<{ error: ErrorResponse }>()
);

/* -- Comments data -- */
export const loadComments = createAction(
  '[Article] LOAD_COMMENTS',
  props<{ slug: string }>()
);
export const loadCommentsSuccess = createAction(
  '[Article] LOAD_COMMENTS_SUCCESS',
  props<{ comments: Comment[] }>()
);
export const loadCommentsFail = createAction(
  '[Article] LOAD_COMMENTS_FAIL',
  props<{ error: ErrorResponse }>()
);

export const addComment = createAction(
  '[Article] ADD_COMMENT',
  props<{ slug: string }>()
);
export const addCommentFail = createAction(
  '[Article] ADD_COMMENT_FAIL',
  props<{ error: ErrorResponse }>()
);
export const addCommentSuccess = createAction(
  '[Article] ADD_COMMENT_SUCCESS',
  props<{ comment: Comment }>()
);
export const setCommentStatus = createAction('[Article] SET_COMMENT_STATUS');

export const deleteComment = createAction(
  '[Article] DELETE_COMMENT',
  props<{ slug: string; commentId: number }>()
);
export const deleteCommentFail = createAction(
  '[Article] DELETE_COMMENT_FAIL',
  props<{ error: ErrorResponse }>()
);
export const deleteCommentSuccess = createAction(
  '[Article] DELETE_COMMENT_SUCCESS',
  props<{ commentId: number }>()
);
