import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ApiService,
  ArticleResponse,
  CommentResponse,
  CommentsResponse,
} from '@dev-together/api';
import { Article } from './article.abstract';

@Injectable()
export class MockArticleService extends Article {
  constructor() {
    super();
  }

  getArticle(slug: string): Observable<ArticleResponse> {
    return of(null);
  }

  getComments(slug: string): Observable<CommentsResponse> {
    return of(null);
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
    return of(null);
  }
}
