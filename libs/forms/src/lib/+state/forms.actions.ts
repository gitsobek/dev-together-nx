import { props, createAction } from '@ngrx/store';
import { Errors } from './forms.models';

/* -- Form value -- */
export const setData = createAction('[Forms] SET_DATA', props<{ data: any }>());
export const updateData = createAction('[Forms] UPDATE_DATA', props<{ data: any }>());

/* -- Form structure -- */
export const initializeForm = createAction('[Forms] INITIALIZE_FORM');
export const setForm = createAction('[Forms] SET_FORM', props<{ form: any }>());
export const initializeErrors = createAction('[Forms] INITIALIZE_ERRORS');
export const setErrors = createAction('[Forms] SET_ERRORS', props<{ errors: Errors }>());
export const resetForm = createAction('[Forms] RESET_FORM');