import { Injectable } from '@angular/core';
import { UserResponse } from '@dev-together/api';
import { asyncScheduler, Observable, of, scheduled, throwError } from 'rxjs';
import { catchError, delay, map, switchMap, take } from 'rxjs/operators';
import { LoginUser, RegisterUser, User } from '../+state/auth.models';
import { StorageService } from './storage.service';

const USERS: User[] = [];

@Injectable()
export class MockAuthService {
  constructor(private storageService: StorageService) {}

  user(): Observable<UserResponse> {
    const token = this.storageService.getItem('token');
    return of(null);
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    const user = USERS.find((user) => user.email === credentials.email) || null;

    return scheduled([user], asyncScheduler).pipe(
      delay(300),
      take(1),
      map((user) => {
        if (user) {
          return {
            code: 200,
            message: 'You have successfully logged in.',
            user: {
              ...user,
              token: Math.random().toString(36).substr(2),
            },
          };
        }

        throw new Error('No user');
      }),
      catchError(() =>
        of({
          code: 401,
          message: 'Wrong credentials.',
        })
      )
    );
  }

  register(credentials: RegisterUser): Observable<UserResponse> {
    USERS.push({
      email: credentials.email,
      token: '',
      username: credentials.username,
      bio: '',
      image: '',
    });

    const res = {
      code: 200,
      message: 'You have successfully registered in.',
    };

    return scheduled([res], asyncScheduler).pipe(delay(300), take(1));
  }
}
