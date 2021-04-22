import { ErrorResponse } from '@dev-together/api';
import { createAction, props } from '@ngrx/store';
import { User } from './auth.models';

/* -- User data -- */
export const getUser = createAction('[Auth] GET_USER');
export const getUserSuccess = createAction('[Auth] GET_USER_SUCCESS', props<{ user: User }>());
export const getUserError = createAction('[Auth] GET_USER_ERROR', props<{ error: ErrorResponse }>());

/* -- Login -- */
export const login = createAction('[Auth] LOGIN');
export const loginSuccess = createAction('[Auth] LOGIN_SUCCESS', props<{ user: User }>());
export const loginError = createAction('[Auth] LOGIN_ERROR');

/* -- Register -- */
export const register = createAction('[Auth] REGISTER');
export const registerSuccess = createAction('[Auth] REGISTER_SUCCESS', props<{ user: User }>());
export const registerError = createAction('[Auth] REGISTER_ERROR');

/* -- Status -- */
export const toggleStatus = createAction('[Auth] TOGGLE_STATUS');

/* -- No user -- */
export const logout = createAction('[Auth] LOGOUT');