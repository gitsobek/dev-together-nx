import { createReducer, Action, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './auth.models';

export const authFeatureKey = 'auth';

export enum Status {
  INIT = 'INIT',
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface Auth {
  loggedIn: boolean;
  user: User;
  status: Status;
}

export interface AuthState {
  readonly [authFeatureKey]: Auth;
}

export const authInitialState: Auth = {
  loggedIn: false,
  user: null,
  status: Status.INIT,
};

const reducer = createReducer(
  authInitialState,
  on(AuthActions.getUserSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: action.user,
  })),
  on(AuthActions.getUserError, () => ({
    ...authInitialState,
  })),
  on(AuthActions.login, AuthActions.register, (state, _) => ({
    ...state,
    status: Status.IN_PROGRESS,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: action.user,
    status: Status.INIT,
  })),
  on(
    AuthActions.registerSuccess,
    AuthActions.loginError,
    AuthActions.registerError,
    (state, _) => ({
      ...state,
      status: Status.INIT,
    })
  ),
  on(AuthActions.logout, () => ({
    ...authInitialState,
  }))
);

export function authReducer(state: Auth | undefined, action: Action): Auth {
  return reducer(state, action);
}
