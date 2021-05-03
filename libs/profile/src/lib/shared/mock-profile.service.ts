import { Injectable } from '@angular/core';
import { asyncScheduler, Observable, of, scheduled, throwError } from 'rxjs';
import { delay, switchMap, take } from 'rxjs/operators';
import { ProfileAbstract } from './profile.abstract';
import { Profile } from '../+state/profile.models';
import { DB } from '@dev-together/shared';
import { ProfileResponse } from '@dev-together/api';
import { StorageService, User } from '@dev-together/auth';

@Injectable()
export class MockProfileService extends ProfileAbstract {
  constructor(private storageService: StorageService) {
    super();
  }

  getProfile(username: string): Observable<Profile> {
    const { users } = DB;

    const user = users.find((u) => u.username === username) || null;

    return scheduled([user], asyncScheduler).pipe(
      delay(500),
      take(1),
      switchMap((user) => {
        if (user) {
          return of(user);
        }

        return throwError({
          code: 500,
          message: 'An error has occurred while fetching profile.',
        });
      })
    );
  }

  updateProfile(user: Profile): Observable<ProfileResponse> {
    const { users } = DB;

    const userIdx = users.findIndex((u) => u.username === user.username);

    const newUser = {
      ...users[userIdx],
      ...user,
      image: user.image ? user.image : '/assets/no-user.png',
    };
    const newUsers = [
      ...users.slice(0, userIdx),
      Object.assign({}, users[userIdx], newUser),
      ...users.slice(userIdx + 1),
    ];

    DB.users = newUsers;

    const usersStorage = (this.storageService.getItem('IM_USERS') ||
      []) as User[];
    const _sIdx = usersStorage.findIndex(
      (_user) => _user.username === user.username
    );
    usersStorage[_sIdx] = { ...usersStorage[_sIdx], ...newUser };

    this.storageService.setItem('IM_USERS', usersStorage);

    const result = {
      code: 200,
      profile: newUser,
      message: 'Your profile has been updated succesfully.',
    };

    return scheduled([result], asyncScheduler).pipe(delay(500), take(1));
  }
}
