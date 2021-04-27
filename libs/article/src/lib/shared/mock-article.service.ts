import { Injectable } from '@angular/core';
import { asyncScheduler, Observable, of } from 'rxjs';
import {
  ApiService,
  ArticleResponse,
  CommentResponse,
  CommentsResponse,
} from '@dev-together/api';
import { Article } from './article.abstract';
import { scheduled } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { DB } from '@dev-together/shared';

@Injectable()
export class MockArticleService extends Article {
  constructor() {
    super();
  }

  getArticle(slug: string): Observable<ArticleResponse> {
    const { articles } = DB;

    const response = {
      code: 200,
      article: articles.find((a) => a.slug === slug) || null,
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  getComments(slug: string): Observable<CommentsResponse> {
    const { comments } = DB;

    const response = {
      code: 200,
      comments: comments[slug],
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  deleteArticle(slug: string): Observable<void> {
    return of(null);
  }

  deleteComment(slug: string, commentId: number): Observable<void> {
    return of(null);
  }

  addComment(slug: string, payload: string): Observable<CommentResponse> {
    return of(null);
  }

  favorite(slug: string): Observable<ArticleResponse> {
    const { articles } = DB;

    const articleIndex = articles.findIndex((a) => a.slug === slug);

    const toLike = !articles[articleIndex].favorited;
    const delta = toLike ? 1 : -1;

    const newArticles = [
      ...articles.slice(0, articleIndex),
      Object.assign({}, articles[articleIndex], {
        favorited: !articles[articleIndex].favorited,
        favorites: articles[articleIndex].favorites + delta,
      }),
      ...articles.slice(articleIndex + 1),
    ];

    DB.articles = newArticles;

    const response = {
      code: 200,
      article: newArticles[articleIndex],
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }
}
