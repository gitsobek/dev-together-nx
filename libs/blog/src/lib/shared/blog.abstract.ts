import { Observable } from 'rxjs';
import { ArticleQuery } from '../+state/blog.models';
import { Article } from '@dev-together/article';

export abstract class Blog {
  abstract query(
    config: ArticleQuery
  ): Observable<{ articles: Article[]; count: number }>;
  abstract getTags(): Observable<{ tags: string[] }>;
}
