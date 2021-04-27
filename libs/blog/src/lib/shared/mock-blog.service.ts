import { Injectable } from '@angular/core';
import { Article } from '@dev-together/article';
import { DB } from '@dev-together/shared';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { ArticleQuery } from '../+state/blog.models';
import { Blog } from './blog.abstract';

@Injectable()
export class MockBlogService extends Blog {
  constructor() {
    super();
  }

  query(
    config: ArticleQuery
  ): Observable<{ articles: Article[]; count: number }> {
    const { type, pageIndex = 1, filters } = config;

    const { articles } = DB;

    let response: { articles: Article[]; count: number } =
      type === 'ALL'
        ? {
            articles: articles
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .slice(
                (pageIndex - 1) * (filters.limit || 10),
                pageIndex * (filters.limit || 10)
              ),
            count: 100,
          }
        : {
            articles: [],
            count: 0,
          };

    if (filters.tag !== 'All') {
      const articles = response.articles.filter((a) =>
        a.tags.includes(filters.tag)
      );

      response = { articles, count: articles.length };
    }

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  getTags(): Observable<{ tags: string[] }> {
    const tags = [
      'Angular',
      'React',
      'Vue.js',
      'RxJS',
      'Java',
      'Kotlin',
      'Go',
      'Docker',
      'Kubernetes',
    ];

    return scheduled([{ tags }], asyncScheduler).pipe(delay(500), take(1));
  }
}
