import {
  ApiResponse,
  ArticleResponse,
  CommentResponse,
  CommentsResponse,
} from '@dev-together/api';
import { Observable } from 'rxjs';
import { Article } from '../+state/article.models';

export abstract class ArticleAbstract {
  abstract publishArticle(article: Article): Observable<ArticleResponse>;
  abstract getArticle(slug: string): Observable<ArticleResponse>;
  abstract getComments(slug: string): Observable<CommentsResponse>;
  abstract deleteArticle(slug: string): Observable<ApiResponse>;
  abstract deleteComment(slug: string, commentId: number): Observable<void>;
  abstract addComment(
    slug: string,
    payload: string
  ): Observable<CommentResponse>;
  abstract favorite(slug: string): Observable<ArticleResponse>;
}
