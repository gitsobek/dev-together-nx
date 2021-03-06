import { Inject, Injectable } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { BLOG_ACTION_TOKEN, IBlogActions } from '@dev-together/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import * as ArticleActions from './article.actions';
import { go } from '@dev-together/router';
import { ArticleAbstract } from '../shared/article.abstract';
import { FormsFacade } from '@dev-together/forms';
import * as fromForms from '@dev-together/forms';
import { ArticleFacade } from './article.facade';
import { SnackbarService } from '@dev-together/ui-components';
import { ApiResponse } from '@dev-together/api';

@Injectable()
export class ArticleEffects {
  publishArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.publishArticle),
      tap(() => this.formsFacade.submitForm()),
      withLatestFrom(this.formsFacade.isValid$, this.formsFacade.data$),
      filter(([_, valid]) => !!valid),
      tap(() => this.articleFacade.setPublishStatus()),
      concatMap(([a, v, data]) =>
        this.articleService.publishArticle(data).pipe(
          map((result) =>
            go({
              to: { path: ['article', result.article.slug] },
            })
          ),
          catchError((error) =>
            of(ArticleActions.publishArticleFail({ error }))
          )
        )
      )
    )
  );

  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticle),
      concatMap((action) =>
        this.articleService.getArticle(action.slug).pipe(
          map((response) =>
            ArticleActions.loadArticleSuccess({ article: response.article })
          ),
          catchError((error) =>
            from([
              ArticleActions.loadArticleFail({ error }),
              go({ to: { path: ['/'] } }),
            ])
          )
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      concatMap((action) =>
        this.articleService.deleteArticle(action.slug).pipe(
          switchMap((response: ApiResponse) =>
            this.snackbarService.show(response.message)
          ),
          switchMap((_) =>
            from([
              ArticleActions.initializeArticle(),
              go({ to: { path: ['/'] } }),
            ])
          ),
          catchError((error) => of(ArticleActions.deleteArticleFail({ error })))
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
          catchError((error) => of(ArticleActions.loadCommentsFail({ error })))
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.addComment),
      tap(() => this.formsFacade.submitForm()),
      withLatestFrom(this.formsFacade.isValid$, this.formsFacade.data$),
      filter(([_, valid]) => !!valid),
      tap(() => this.articleFacade.setCommentStatus()),
      concatMap(([action, _, data]) =>
        this.articleService.addComment(action.slug, data.comment).pipe(
          switchMap((response) =>
            from([
              ArticleActions.addCommentSuccess({ comment: response.comment }),
              fromForms.resetForm(),
            ])
          ),
          catchError((error) => of(ArticleActions.addCommentFail({ error })))
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
          catchError((error) => of(ArticleActions.deleteCommentFail({ error })))
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
            of(ArticleActions.setFavoriteArticleFail({ error }))
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
          catchError((error) => of(ArticleActions.setFollowUserFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleAbstract,
    private articleFacade: ArticleFacade,
    private formsFacade: FormsFacade,
    private snackbarService: SnackbarService,
    @Inject(BLOG_ACTION_TOKEN) private blogActionsService: IBlogActions
  ) {}
}
