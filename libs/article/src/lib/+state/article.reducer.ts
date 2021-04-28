import { Action, createReducer, on } from '@ngrx/store';
import * as ArticleActions from './article.actions';
import { Article, Comment } from './article.models';

export const articleFeatureKey = 'article';

export interface ArticleState {
  data: Article;
  comments: Comment[];
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  commentsLoaded: boolean;
  commentsLoading: boolean;
  commentsHasError: boolean;
}

export interface ArticleRootState {
  readonly [articleFeatureKey]: ArticleState;
}

export const articleInitialState: ArticleState = {
  data: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tags: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favorites: 0,
    author: {
      id: '',
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
  comments: [],
  loaded: false,
  loading: false,
  hasError: false,
  commentsLoaded: false,
  commentsLoading: false,
  commentsHasError: false,
};

const reducer = createReducer(
  articleInitialState,
  on(ArticleActions.initializeArticle, () => articleInitialState),
  on(ArticleActions.loadArticle, (state) => ({ ...state, loading: true })),
  on(ArticleActions.loadArticleSuccess, (state, action) => ({
    ...state,
    data: action.article,
    loaded: true,
    loading: false,
  })),
  on(ArticleActions.loadArticleFail, (state) => ({
    ...state,
    data: articleInitialState.data,
    loaded: false,
    loading: false,
    hasError: true,
  })),
  on(ArticleActions.deleteArticleSuccess, () => articleInitialState),
  on(ArticleActions.setFavoriteArticleSuccess, (state, action) => ({
    ...state,
    data: action.article,
  })),
  on(ArticleActions.setFollowUserSuccess, (state, action) => {
    const data: Article = { ...state.data, author: action.profile };
    return { ...state, data };
  }),
  on(ArticleActions.loadCommentsSuccess, (state, action) => ({
    ...state,
    comments: action.comments,
  })),
  on(ArticleActions.loadCommentsFail, (state) => ({
    ...state,
    comments: articleInitialState.comments,
  })),
  on(ArticleActions.addComment, (state, _) => ({
    ...state,
    commentsLoading: true,
  })),
  on(ArticleActions.addCommentSuccess, (state, action) => {
    const comments: Comment[] = [action.comment, ...state.comments];
    return { ...state, comments, commentsLoaded: true, commentsLoading: false };
  }),
  on(ArticleActions.addCommentFail, (state, _) => ({
    ...state,
    comments: articleInitialState.comments,
    commentsLoaded: false,
    commentsLoading: false,
    commentsHasError: true,
  })),
  on(ArticleActions.deleteCommentSuccess, (state, action) => {
    const comments: Comment[] = state.comments.filter(
      (item) => item.id !== action.commentId
    );
    return { ...state, comments };
  })
);

export function articleReducer(
  state: ArticleState | undefined,
  action: Action
): ArticleState {
  return reducer(state, action);
}
