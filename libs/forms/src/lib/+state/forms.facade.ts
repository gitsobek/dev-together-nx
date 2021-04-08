import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Field } from './forms.models';
import { FormsState } from './forms.reducer';
import { formsQuery } from './forms.selectors';
import * as FormsActions from './forms.actions';

@Injectable()
export class FormsFacade {
  data$ = this.store.select(formsQuery.getData);
  form$ = this.store.select(formsQuery.getForm);
  errors$ = this.store.select(formsQuery.getErrors);
  touched$ = this.store.select(formsQuery.isTouched);

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

  resetForm() {
    this.store.dispatch(FormsActions.resetForm());
  }
}
