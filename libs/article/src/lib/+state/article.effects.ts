import { Inject, Injectable } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { BlogActionsService, BLOG_ACTION_TOKEN, IBlogActions } from '@dev-together/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
} from 'rxjs/operators';
import * as ArticleActions from './article.actions';
import { go } from '@dev-together/router';
import { Article } from '../shared/article.abstract';

@Injectable()
export class ArticleEffects {
  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticle),
      concatMap((action) =>
        this.articleService.getArticle(action.slug).pipe(
          map((response) =>
            ArticleActions.loadArticleSuccess({ article: response.article })
          ),
          catchError((error) => of(ArticleActions.loadArticleFail({ error })))
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      concatMap((action) =>
        this.articleService.deleteArticle(action.slug).pipe(
          map((_) => go({ to: { path: ['/'] } })),
          catchError((error) => of(ArticleActions.deleteArticleFail(error)))
        )
      )
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadComments),
      concatMap((action) =>
        this.articleService.getComments(action.slug).pipe(
          map((data) =>
            ArticleActions.loadCommentsSuccess({ comments: data.comments })
          ),
          catchError((error) => of(ArticleActions.loadCommentsFail(error)))
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteComment),
      concatMap((action) =>
        this.articleService.deleteComment(action.slug, action.commentId).pipe(
          map((_) =>
            ArticleActions.deleteCommentSuccess({ commentId: action.commentId })
          ),
          catchError((error) => of(ArticleActions.deleteCommentFail(error)))
        )
      )
    )
  );

  favorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.setFavoriteArticle),
      map((action) => action.slug),
      concatMap((slug) =>
        this.articleService.favorite(slug).pipe(
          map((response) =>
            ArticleActions.setFavoriteArticleSuccess({
              article: response.article,
            })
          ),
          catchError((error) =>
            of(ArticleActions.setFavoriteArticleFail(error))
          )
        )
      )
    )
  );

  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.setFollowUser),
      map((action) => action.id),
      concatMap((id) =>
        this.blogActionsService.followUser(id).pipe(
          map((response) =>
            ArticleActions.setFollowUserSuccess({ profile: response.profile })
          ),
          catchError((error) => of(ArticleActions.setFollowUserFail(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: Article,
    @Inject(BLOG_ACTION_TOKEN) private blogActionsService: IBlogActions
  ) {}
}
