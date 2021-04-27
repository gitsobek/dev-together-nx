import { Injectable, InjectionToken, Provider } from '@angular/core';
import {
  ApiService,
  ArticleResponse,
  ProfileResponse,
} from '@dev-together/api';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { DB } from '../fake-db';

export interface IBlogActions {
  followUser: (userId: string) => Observable<ProfileResponse>;
}

@Injectable({ providedIn: 'root' })
export class BlogActionsService implements IBlogActions {
  constructor(private apiService: ApiService) {}

  followUser(userId: string): Observable<ProfileResponse> {
    return this.apiService.post<ProfileResponse, void>(
      `/profiles/${userId}/follow`,
      null
    );
  }
}

@Injectable({ providedIn: 'root' })
export class MockBlogActionsService implements IBlogActions {
  constructor() {}

  followUser(userId: string): Observable<ProfileResponse> {
    const { articles, users } = DB;

    const profileIndex = users.findIndex((user) => user.id === userId);

    const newUsers = [
      ...users.slice(0, profileIndex),
      Object.assign({}, users[profileIndex], {
        following: !users[profileIndex].following,
      }),
      ...users.slice(profileIndex + 1),
    ];

    DB.users = newUsers;

    const newArticles = articles.map((article) =>
      article.author.id === userId
        ? {
            ...article,
            author: { ...article.author, following: !article.author.following },
          }
        : { ...article }
    );

    DB.articles = newArticles;

    const response = {
      code: 200,
      profile: newUsers[profileIndex],
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }
}

export const BLOG_ACTION_TOKEN = new InjectionToken<IBlogActions>(
  'Blog actions service'
);

export const BLOG_ACTION_PROVIDER: Provider[] = [
  {
    provide: BLOG_ACTION_TOKEN,
    useClass: MockBlogActionsService,
  },
];
