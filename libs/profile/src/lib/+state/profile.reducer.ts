import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { Profile } from './profile.models';

export const profileFeatureKey = 'profile';

export interface ProfileState {
  readonly [profileFeatureKey]: Profile;
}

interface LoadingState {
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
}

export type ProfileNgrxState = Profile & LoadingState;

export const profileInitialState: ProfileNgrxState = {
  id: '',
  username: '',
  bio: '',
  image: '',
  following: false,
  joinedAt: '',
  loading: false,
  loaded: false,
  hasError: false,
};

const reducer = createReducer(
  profileInitialState,

  on(ProfileActions.getProfile, (state, _) => ({
    ...state,
    loading: true,
  })),
  on(
    ProfileActions.getProfileSuccess,
    ProfileActions.editProfileSuccess,
    (state, action) => ({
      ...state,
      ...action.profile,
      loading: false,
      loaded: true,
    })
  ),
  on(
    ProfileActions.initializeProfile,
    ProfileActions.getProfileFail,
    () => profileInitialState
  ),
  on(ProfileActions.setFollowSuccess, (state, action) => ({
    ...state,
    ...action.profile,
  }))
);

export function profileReducer(
  state: ProfileNgrxState | undefined,
  action: Action
): ProfileNgrxState {
  return reducer(state, action);
}
