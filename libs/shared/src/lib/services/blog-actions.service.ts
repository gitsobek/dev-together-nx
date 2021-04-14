import { inject, Injectable, InjectionToken, Provider } from '@angular/core';
import {
  ApiService,
  ArticleResponse,
  ProfileResponse,
} from '@dev-together/api';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { delay, take } from 'rxjs/operators';

export interface IBlogActions {
  followUser: (userId: string, status: boolean) => Observable<ProfileResponse>;
  favorite: (slug: string, status: boolean) => Observable<ArticleResponse>;
}

@Injectable({ providedIn: 'root' })
export class BlogActionsService implements IBlogActions {
  constructor(private apiService: ApiService) {}

  followUser(userId: string, status: boolean): Observable<ProfileResponse> {
    return this.apiService.post<ProfileResponse, { status: boolean }>(
      `/profiles/${userId}/follow`,
      { status }
    );
  }

  favorite(slug: string, status: boolean): Observable<ArticleResponse> {
    return this.apiService.post<ArticleResponse, { status: boolean }>(
      `/articles/${slug}/favorite`,
      { status }
    );
  }
}

@Injectable({ providedIn: 'root' })
export class MockBlogActionsService implements IBlogActions {
  constructor() {}

  followUser(userId: string, status: boolean): Observable<ProfileResponse> {
    const response = {
      code: 200,
      profile: null,
    };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  favorite(slug: string, status: boolean): Observable<ArticleResponse> {
    const response = {
      code: 200,
      article: null,
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
