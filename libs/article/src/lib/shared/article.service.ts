import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiService,
  ArticleResponse,
  CommentResponse,
  CommentsResponse,
} from '@dev-together/api';
import { Article } from './article.abstract';

@Injectable()
export class ArticleService extends Article {
  constructor(private apiService: ApiService) {
    super();
  }

  getArticle(slug: string): Observable<ArticleResponse> {
    return this.apiService.get<ArticleResponse>('/articles/' + slug);
  }

  getComments(slug: string): Observable<CommentsResponse> {
    return this.apiService.get<CommentsResponse>(`/articles/${slug}/comments`);
  }

  deleteArticle(slug: string): Observable<void> {
    return this.apiService.delete<void>('/articles/' + slug);
  }

  deleteComment(slug: string, commentId: number): Observable<void> {
    return this.apiService.delete<void>(
      `/articles/${slug}/comments/${commentId}`
    );
  }

  addComment(slug: string, payload: string): Observable<CommentResponse> {
    return this.apiService.post<CommentResponse, { body: string }>(
      `/articles/${slug}/comments`,
      {
        body: payload,
      }
    );
  }

  favorite(slug: string): Observable<ArticleResponse> {
    return this.apiService.post<ArticleResponse, void>(
      `/articles/${slug}/favorite`,
      null
    );
  }
}
