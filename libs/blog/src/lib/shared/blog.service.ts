import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@dev-together/api';
import { Observable } from 'rxjs';
import { ArticleQuery } from '../+state/blog.models';
import { Article } from '@dev-together/article';
import { Blog } from './blog.abstract';

@Injectable()
export class BlogService extends Blog {
  constructor(private apiService: ApiService) {
    super();
  }

  query(
    config: ArticleQuery
  ): Observable<{ articles: Article[]; count: number }> {
    return this.apiService.get(
      `/articles/${config.type.toLowerCase()}`,
      this.toHttpParams(config.filters)
    );
  }

  getTags(): Observable<{ tags: string[] }> {
    return this.apiService.get('/articles/tags');
  }

  private toHttpParams(params) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams()
    );
  }
}
