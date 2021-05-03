import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BlogFacade } from '@dev-together/blog';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ProfileFacade } from './+state/profile.facade';

@Injectable()
export class ProfileResolver implements Resolve<boolean> {
  constructor(
    private profileFacade: ProfileFacade,
    private blogFacade: BlogFacade
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const username = route.params['username'];
    this.profileFacade.getProfile(username);

    return this.profileFacade.isProfileLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      tap(() => this.blogFacade.setAuthor(username))
    );
  }
}
