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
  isCommentsLoading$ = this.store.select(articleQuery.isCommentsLoading);
  isPublishing$ = this.store.select(articleQuery.isPublishing);

  constructor(private store: Store<ArticleState>) {}

  initializeArticle() {
    this.store.dispatch(ArticleActions.initializeArticle());
  }

  publishArticle() {
    this.store.dispatch(ArticleActions.publishArticle());
  }

  setPublishStatus() {
    this.store.dispatch(ArticleActions.setPublishStatus());
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

  setCommentStatus() {
    this.store.dispatch(ArticleActions.setCommentStatus());
  }

  loadComments(slug: string) {
    this.store.dispatch(ArticleActions.loadComments({ slug }));
  }

  deleteComment(data: { slug: string; commentId: number }) {
    this.store.dispatch(ArticleActions.deleteComment(data));
  }

  setFollowUser(userId: string) {
    this.store.dispatch(ArticleActions.setFollowUser({ id: userId }));
  }

  setFavoriteArticle(slug: string) {
    this.store.dispatch(ArticleActions.setFavoriteArticle({ slug }));
  }
}
