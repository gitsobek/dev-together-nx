import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  ApiService,
  ArticleResponse,
  CommentResponse,
  CommentsResponse,
} from '@dev-together/api';
import { ArticleAbstract } from './article.abstract';
import { Article } from '../+state/article.models';

@Injectable()
export class ArticleService extends ArticleAbstract {
  constructor(private apiService: ApiService) {
    super();
  }

  publishArticle(article: Article): Observable<ArticleResponse> {
    if (article.slug) {
      return this.apiService.put<ArticleResponse, { article: Article }>('/articles/' + article.slug, {
        article: article,
      });
    }
    return this.apiService.post<ArticleResponse, { article: Article }>('/articles/', { article: article });
  }

  getArticle(slug: string): Observable<ArticleResponse> {
    return this.apiService.get<ArticleResponse>('/articles/' + slug);
  }

  getComments(slug: string): Observable<CommentsResponse> {
    return this.apiService.get<CommentsResponse>(`/articles/${slug}/comments`);
  }

  deleteArticle(slug: string): Observable<ApiResponse> {
    return this.apiService.delete<ApiResponse>('/articles/' + slug);
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
