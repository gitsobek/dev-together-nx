import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Errors, Field } from './forms.models';
import { FormsState } from './forms.reducer';
import { formsQuery } from './forms.selectors';
import * as FormsActions from './forms.actions';

@Injectable()
export class FormsFacade {
  data$ = this.store.select(formsQuery.getData);
  form$ = this.store.select(formsQuery.getForm);
  errors$ = this.store.select(formsQuery.getErrors);
  isValid$ = this.store.select(formsQuery.isValid);
  touched$ = this.store.select(formsQuery.isTouched);
  submitted$ = this.store.select(formsQuery.isSubmitted);

  constructor(private store: Store<FormsState>) {}

  initializeForm() {
    this.store.dispatch(FormsActions.initializeForm());
  }

  setForm(form: Field[]) {
    this.store.dispatch(FormsActions.setForm({ form }));
  }

  setData(data: any) {
    this.store.dispatch(FormsActions.setData({ data }));
  }

  updateData(data: any) {
    this.store.dispatch(FormsActions.updateData({ data }));
  }

  initializeErrors() {
    this.store.dispatch(FormsActions.initializeErrors());
  }

  setErrors(errors: Errors) {
    this.store.dispatch(FormsActions.setErrors({ errors }))
  }

  submitForm() {
    this.store.dispatch(FormsActions.submitForm());
  }

  validateForm(valid: boolean) {
    this.store.dispatch(FormsActions.validateForm({ valid }));
  }

  resetForm() {
    this.store.dispatch(FormsActions.resetForm());
  }
}
