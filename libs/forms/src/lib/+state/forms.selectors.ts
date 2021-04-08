import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formsFeatureKey } from './forms.reducer';
import { Form } from './forms.models';

const formsFeature = createFeatureSelector<Form>(formsFeatureKey);

export const getData = createSelector(
  formsFeature,
  (state: Form) => state.data
);
export const getForm = createSelector(
  formsFeature,
  (state: Form) => state.form
);
export const isValid = createSelector(
  formsFeature,
  (state: Form) => state.valid
);
export const getErrors = createSelector(
  formsFeature,
  (state: Form) => state.errors
);
export const isTouched = createSelector(
  formsFeature,
  (state: Form) => state.touched
);

export const formsQuery = {
  getData,
  getForm,
  isValid,
  getErrors,
  isTouched,
};
