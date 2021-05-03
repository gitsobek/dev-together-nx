import { ErrorResponse } from '@dev-together/api';
import { Profile } from '@dev-together/profile';
import { createAction, props } from '@ngrx/store';

export const initializeProfile = createAction('[Profile] INITIALIZE_PROFILE');
export const getProfile = createAction(
  '[Profile] GET_PROFILE',
  props<{ id: string }>()
);
export const getProfileSuccess = createAction(
  '[Profile] GET_PROFILE_SUCCESS',
  props<{ profile: Profile }>()
);
export const getProfileFail = createAction(
  '[Profile] GET_PROFILE_FAIL',
  props<{ error: ErrorResponse }>()
);
export const editProfile = createAction('[Profile] EDIT_PROFILE');
export const editProfileSuccess = createAction(
  '[Profile] EDIT_PROFILE_SUCCESS',
  props<{ profile: Profile }>()
);
export const editProfileFail = createAction(
  '[Profile] EDIT_PROFILE_FAIL',
  props<{ error: ErrorResponse }>()
);
export const setFollow = createAction(
  '[Profile] SET_FOLLOW',
  props<{ id: string }>()
);
export const setFollowSuccess = createAction(
  '[Profile] SET_FOLLOW_SUCCESS',
  props<{ profile: Profile }>()
);
export const setFollowFail = createAction(
  '[Profile] SET_FOLLOW_FAIL',
  props<{ error: ErrorResponse }>()
);
