import { ApiService, ProfileResponse, UserResponse } from '@dev-together/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileAbstract } from './profile.abstract';
import { Profile } from '../+state/profile.models';

@Injectable()
export class ProfileService extends ProfileAbstract {
  constructor(private apiService: ApiService) {
    super();
  }

  getProfile(username: string): Observable<Profile> {
    return this.apiService
      .get('/profiles/' + username)
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  updateProfile(user: Profile): Observable<ProfileResponse> {
    return this.apiService.put<ProfileResponse, { user: Profile }>('/user', { user });
  }
}
