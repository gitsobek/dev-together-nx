import { Inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Blog } from '../shared/blog.abstract';
import * as BlogActions from './blog.actions';
import { BlogFacade } from './blog.facade';
import { BLOG_ACTION_TOKEN, IBlogActions } from '@dev-together/shared';

@Injectable()
export class BlogEffects {
  setBlogParameter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BlogActions.setArticlesQuery,
        BlogActions.setArticlesPage,
        BlogActions.setArticlesTag,
        BlogActions.setArticlesType
      ),
      map(() => BlogActions.loadArticles())
    )
  );

  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadTags),
      switchMap(() =>
        this.blogService.getTags().pipe(
          map((response) =>
            BlogActions.loadTagsSuccess({ tags: response.tags })
          ),
          catchError((err) => of(BlogActions.loadTagsFail({ error: err })))
        )
      )
    )
  );

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadArticles),
      withLatestFrom(this.blogFacade.query$),
      concatMap(([_, config]) =>
        this.blogService.query(config).pipe(
          map((response) =>
            BlogActions.loadArticlesSuccess({
              articles: response.articles,
              count: response.count,
            })
          ),
          catchError((error) => of(BlogActions.loadArticlesFail({ error })))
        )
      )
    )
  );

  setFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.setFavoriteArticle),
      concatMap((action) =>
        this.blogActionsService.favorite(action.slug, action.status).pipe(
          map((response) =>
            BlogActions.setFavoriteArticleSuccess({ article: response.article })
          ),
          catchError((error) => of(BlogActions.setFavoriteArticleFail(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private blogService: Blog,
    private blogFacade: BlogFacade,
    @Inject(BLOG_ACTION_TOKEN) private blogActionsService: IBlogActions
  ) {}
}
