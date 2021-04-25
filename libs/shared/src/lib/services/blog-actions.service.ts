import { Injectable, InjectionToken, Provider } from '@angular/core';
import {
  ApiService,
  ArticleResponse,
  ProfileResponse,
} from '@dev-together/api';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { delay, take } from 'rxjs/operators';

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
    const response = {
      code: 200,
      profile: null,
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
