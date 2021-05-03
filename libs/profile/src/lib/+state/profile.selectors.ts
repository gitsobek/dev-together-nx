import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Profile } from './profile.models';
import { profileFeatureKey, ProfileNgrxState } from './profile.reducer';

const getProfile = createFeatureSelector<ProfileNgrxState>(profileFeatureKey);
const isProfileLoaded = createSelector(
  getProfile,
  (state: ProfileNgrxState) => state.loaded
);

export const profileQuery = {
  getProfile,
  isProfileLoaded,
};
