import { Injectable } from '@angular/core';
import { Article } from '@dev-together/article';
import { StorageService, User } from '@dev-together/auth';
import { DB } from '@dev-together/shared';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { ArticleQuery } from '../+state/blog.models';
import { Blog } from './blog.abstract';

@Injectable()
export class MockBlogService extends Blog {
  users: User[];

  constructor(private storageService: StorageService) {
    super();
    this.users = this.storageService.getItem('IM_USERS') || [];
  }

  query(
    config: ArticleQuery
  ): Observable<{ articles: Article[]; count: number }> {
    const { type, pageIndex = 1, filters } = config;

    const { articles } = DB;
    const token = this.storageService.getItem('token');
    const user = this.users.find((u) => u.token === token);

    const personalArticles = articles.filter((a) => a.author.id === user.id);

    let response: { articles: Article[]; count: number } =
      type === 'ALL'
        ? {
            articles: articles
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .slice(
                (pageIndex - 1) * (filters.limit || 10),
                pageIndex * (filters.limit || 10)
              ),
            count: 73,
          }
        : {
            articles: personalArticles
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .slice(
                (pageIndex - 1) * (filters.limit || 10),
                pageIndex * (filters.limit || 10)
              ),
            count: personalArticles.length,
          };

    if (filters.tag !== 'All') {
      const articles = response.articles.filter((a) =>
        a.tags.includes(filters.tag)
      );

      response = { articles, count: articles.length };
    }

    if (filters.author) {
      const articles = response.articles.filter(
        (a) => a.author.username === filters.author
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
