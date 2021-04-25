import {
  ArticleResponse,
  CommentResponse,
  CommentsResponse,
} from '@dev-together/api';
import { Observable } from 'rxjs';

export abstract class Article {
  abstract getArticle(slug: string): Observable<ArticleResponse>;
  abstract getComments(slug: string): Observable<CommentsResponse>;
  abstract deleteArticle(slug: string): Observable<void>;
  abstract deleteComment(slug: string, commentId: number): Observable<void>;
  abstract addComment(
    slug: string,
    payload: string
  ): Observable<CommentResponse>;
  abstract favorite(slug: string): Observable<ArticleResponse>;
}
