import { Injectable } from '@angular/core';
import { asyncScheduler, Observable, of, throwError } from 'rxjs';
import {
  ApiResponse,
  ApiService,
  ArticleResponse,
  CommentResponse,
  CommentsResponse,
} from '@dev-together/api';
import { scheduled } from 'rxjs';
import { delay, switchMap, take } from 'rxjs/operators';
import { DB, slugify } from '@dev-together/shared';
import { Article, Comment } from '../+state/article.models';
import { StorageService, User } from '@dev-together/auth';
import { ArticleAbstract } from './article.abstract';

@Injectable()
export class MockArticleService extends ArticleAbstract {
  users: User[];

  constructor(private storageService: StorageService) {
    super();
    this.users = this.storageService.getItem('IM_USERS') || [];
  }

  publishArticle(article: Article): Observable<ArticleResponse> {
    const { articles } = DB;

    let duplicatedTitlesNum = articles.filter((a) => a.title === article.title)
      .length;

    const token = this.storageService.getItem('token');
    const { token: _, email, ...restOfUser } = this.users.find(
      (u) => u.token === token
    );

    const newArticle = {
      ...article,
      slug:
        slugify(article.title) +
        (duplicatedTitlesNum > 0 ? '-' + duplicatedTitlesNum++ : '-1'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorites: 0,
      favorited: false,
      author: {
        ...restOfUser,
        following: false,
      },
    };

    DB.articles = [newArticle, ...DB.articles];
    DB.comments = [{ _slug: newArticle.slug, comments: [] }, ...DB.comments];

    const response = {
      code: 200,
      article: newArticle,
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  getArticle(slug: string): Observable<ArticleResponse> {
    const { articles } = DB;

    const article = articles.find((a) => a.slug === slug) || null;

    return scheduled([article], asyncScheduler).pipe(
      delay(500), 
      take(1),
      switchMap((article) => {
        if (article) {
          return of({
            code: 200,
            article
          });
        }

        return throwError({
          code: 404,
          error: null,
          message: 'No article found.'
        });
      })
    );
  }

  getComments(slug: string): Observable<CommentsResponse> {
    const { comments } = DB;

    const response = {
      code: 200,
      comments: comments.find((a) => a._slug === slug)?.comments || null,
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  deleteArticle(slug: string): Observable<ApiResponse> {
    const { articles } = DB;

    const updatedArticles = articles.filter((a) => a.slug !== slug);
    DB.articles = updatedArticles;
    
    const response = {
      code: 200,
      message: 'Article has been deleted successfully.'
    }

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  deleteComment(slug: string, commentId: number): Observable<void> {
    const { comments } = DB;

    let commentEntityIdx = comments.findIndex((c) => c._slug === slug);
    const newComments = [
      ...comments.slice(0, commentEntityIdx),
      Object.assign({}, comments[commentEntityIdx], {
        comments: comments[commentEntityIdx].comments.filter(
          (c) => c.id !== commentId
        ),
      }),
      ...comments.slice(commentEntityIdx + 1),
    ];

    DB.comments = newComments;

    return scheduled([null], asyncScheduler).pipe(delay(500), take(1));
  }

  addComment(slug: string, payload: string): Observable<CommentResponse> {
    const { comments, users } = DB;

    const allComments = comments.map((c) => c.comments);
    const scaledComments = allComments.reduce((a, b) => a.concat(b), []);
    const id = Math.max(...scaledComments.map((c) => c.id), 0) + 1;

    const token = this.storageService.getItem('token');
    const idx = this.users.findIndex((user) => user.token === token);
    const user = this.users[idx];

    const profile = users.find((u) => u.id === user.id);

    const comment: Comment = {
      id,
      body: payload,
      createdAt: new Date().toISOString(),
      author: profile,
    };

    let commentEntityIdx = comments.findIndex((c) => c._slug === slug);
    const newComments = [
      ...comments.slice(0, commentEntityIdx),
      Object.assign({}, comments[commentEntityIdx], {
        comments: [...comments[commentEntityIdx].comments, comment],
      }),
      ...comments.slice(commentEntityIdx + 1),
    ];

    DB.comments = newComments;

    const response = {
      code: 200,
      comment,
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
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

