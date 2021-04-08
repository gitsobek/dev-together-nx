import { createAction, props } from '@ngrx/store';
import { Route } from './router.models';

export const go = createAction('[Router] GO', props<{ to: Route }>());
export const back = createAction('[Router] BACK');
export const forward = createAction('[Router] FORWARD');