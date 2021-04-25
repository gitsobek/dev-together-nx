import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ArticleActions from './article.actions';
import { ArticleState } from './article.reducer';
import { articleQuery } from './article.selectors';

@Injectable()
export class ArticleFacade {
  article$ = this.store.select(articleQuery.getArticle);
  comments$ = this.store.select(articleQuery.getComments);
  isArticleLoaded$ = this.store.select(articleQuery.isArticleLoaded);
  hasArticleError$ = this.store.select(articleQuery.hasArticleError);
  articleAuthor$ = this.store.select(articleQuery.getAuthor);

  constructor(private store: Store<ArticleState>) {}

  initializeArticle() {
    this.store.dispatch(ArticleActions.initializeArticle());
  }

  loadArticle(slug: string) {
    this.store.dispatch(ArticleActions.loadArticle({ slug }));
  }

  addComment(slug: string) {
    this.store.dispatch(ArticleActions.addComment({ slug }));
  }

  deleteArticle(slug: string) {
    this.store.dispatch(ArticleActions.deleteArticle({ slug }));
  }

  loadComments(slug: string) {
    this.store.dispatch(ArticleActions.loadComments({ slug }));
  }

  deleteComment(data: { commentId: number; slug: string }) {
    this.store.dispatch(ArticleActions.deleteComment(data));
  }

  setFollowUser(username: string) {
    this.store.dispatch(ArticleActions.setFollowUser({ username }));
  }

  setFavoriteArticle(slug: string) {
    this.store.dispatch(ArticleActions.setFavoriteArticle({ slug }));
  }
}
