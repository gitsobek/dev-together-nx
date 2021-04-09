import { ValidatorFn } from '@angular/forms';

export interface Form {
  data: any;
  form: Field[];
  valid: boolean;
  errors: Errors;
  touched: boolean;
  submitted: boolean;
}

export interface Field {
  type: FieldType;
  name: string;
  label?: string;
  placeholder?: string;
  validator?: ValidatorFn[];
  attrs?: any;
  defaultValue?: string | number | boolean;
}

export interface Errors {
  [key: string]: string[]
}

export type FieldType = 'INPUT' | 'TEXTAREA';
