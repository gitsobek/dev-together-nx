import { Injectable } from '@angular/core';
import { UserResponse } from '@dev-together/api';
import { asyncScheduler, Observable, of, scheduled, throwError } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { LoginUser, RegisterUser, User } from '../+state/auth.models';
import { StorageService } from './storage.service';

@Injectable()
export class MockAuthService {
  users: User[];

  constructor(private storageService: StorageService) {
    this.users = this.storageService.getItem('IM_USERS') || [];
  }

  user(): Observable<UserResponse> {
    const token = this.storageService.getItem('token');
    const idx = this.users.findIndex((user) => user.token === token);
    const user = this.users[idx];

    return scheduled([user], asyncScheduler).pipe(
      delay(500),
      take(1),
      switchMap((user) => {
        if (user) {
          return of({
            code: 200,
            user,
          });
        }

        return throwError({
          code: 401,
          error: {
            errors: {
              token: ['is invalid'],
            },
          },
          message: 'Invalid token.',
        });
      })
    );
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    const idx = this.users?.findIndex(
      (user) => user.email === credentials.email
    );
    const user = this.users[idx] || null;

    return scheduled([user], asyncScheduler).pipe(
      delay(3000),
      take(1),
      switchMap((user) => {
        if (user) {
          const token = Math.random().toString(36).substr(2);
          this.users[idx].token = token;
          this.storageService.setItem('IM_USERS', this.users);

          return of({
            code: 200,
            message: 'You have successfully logged in.',
            user: {
              ...user,
              token,
            },
          });
        }

        return throwError({
          code: 401,
          error: {
            errors: {
              email: ['or password is incorrect'],
            },
          },
          message: 'Invalid token.',
        });
      })
    );
  }

  register(credentials: RegisterUser): Observable<UserResponse> {
    this.users.push({
      email: credentials.email,
      token: '',
      username: credentials.username,
      bio: '',
      image: '',
    });

    this.storageService.setItem('IM_USERS', this.users);

    const res = {
      code: 200,
      message: 'You have successfully registered in.',
    };

    return scheduled([res], asyncScheduler).pipe(delay(3000), take(1));
  }
}