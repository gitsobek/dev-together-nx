import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth, authFeatureKey, Status } from './auth.reducer';

export const getAuth = createFeatureSelector<Auth>(authFeatureKey);

export const isLoggedIn = createSelector(
  getAuth,
  (auth: Auth) => auth.loggedIn
);
export const getUser = createSelector(getAuth, (auth: Auth) => auth.user);

export const getStatus = createSelector(
  getAuth,
  (auth: Auth) => auth.status === Status.IN_PROGRESS
);

export const authQuery = {
  getAuth,
  isLoggedIn,
  getUser,
  getStatus,
};
