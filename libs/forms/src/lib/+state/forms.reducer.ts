import { Form } from './forms.models';
import { on, createReducer, Action } from '@ngrx/store';
import * as FormsActions from './forms.actions';

export const formsFeatureKey = 'forms';

export interface FormsState {
  [formsFeatureKey]: Form;
}

export const formsInitialState: Form = {
  data: {},
  form: [],
  valid: true,
  errors: {},
  touched: false,
};

const reducer = createReducer(
  formsInitialState,
  on(FormsActions.setData, (state, action) => ({
    ...state,
    data: action.data,
  })),
  on(FormsActions.updateData, (state, action) => {
    const updatedData = { ...state.data, ...action.data };
    return { ...state, data: updatedData, touched: true };
  }),
  on(FormsActions.initializeForm, () => formsInitialState),
  on(FormsActions.setForm, (state, action) => ({
    ...state,
    form: action.form.slice(0),
  })),
  on(FormsActions.initializeErrors, (state, _) => ({
    ...state,
    errors: {},
  })),
  on(FormsActions.setErrors, (state, action) => ({
    ...state,
    errors: action.errors,
  })),
  on(FormsActions.resetForm, (state, _) => ({ ...state, touched: false }))
);

export function formsReducer(state: Form, action: Action): Form {
  return reducer(state, action);
}
