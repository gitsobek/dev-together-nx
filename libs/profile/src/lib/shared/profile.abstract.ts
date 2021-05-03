import { ProfileResponse } from '@dev-together/api';
import { Observable } from 'rxjs';
import { Profile } from '../+state/profile.models';

export abstract class ProfileAbstract {
  abstract getProfile(username: string): Observable<Profile>;
  abstract updateProfile(user: Profile): Observable<ProfileResponse>
}
