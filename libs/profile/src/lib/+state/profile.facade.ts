import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { ProfileState } from './profile.reducer';
import { profileQuery } from './profile.selectors';

@Injectable()
export class ProfileFacade {
  profile$ = this.store.select(profileQuery.getProfile);
  isProfileLoaded$ = this.store.select(profileQuery.isProfileLoaded);

  constructor(private store: Store<ProfileState>) {}

  getProfile(username: string) {
    this.store.dispatch(ProfileActions.getProfile({ id: username }));
  }

  updateProfile() {
    this.store.dispatch(ProfileActions.editProfile());
  }

  setFollow(id: string) {
    this.store.dispatch(ProfileActions.setFollow({ id }));
  }

  initializeProfile() {
    this.store.dispatch(ProfileActions.initializeProfile());
  }
}