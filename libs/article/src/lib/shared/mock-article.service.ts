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
import { Comment } from '../+state/article.models';
import { StorageService, User } from '@dev-together/auth';

@Injectable()
export class MockArticleService extends Article {
  users: User[];

  constructor(private storageService: StorageService) {
    super();
    this.users = this.storageService.getItem('IM_USERS') || [];
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
      comments: comments.find((a) => a._slug === slug)?.comments || null,
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  deleteArticle(slug: string): Observable<void> {
    return of(null);
  }

  deleteComment(slug: string, commentId: number): Observable<void> {
    const { comments } = DB;

    let commentEntityIdx = comments.findIndex((c) => c._slug === slug);
    const newComments = [
      ...comments.slice(0, commentEntityIdx),
      Object.assign({}, comments[commentEntityIdx], {
        comments: comments[commentEntityIdx].comments.filter(c => c.id !== commentId),
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

    const profile = users.find(u => u.id === user.id);

    const comment: Comment = {
      id,
      body: payload,
      createdAt: new Date().toUTCString(),
      author: profile
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
