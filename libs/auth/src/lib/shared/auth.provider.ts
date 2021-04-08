import { InjectionToken, Provider } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Field } from '@dev-together/forms';
import { Observable } from 'rxjs';
import { first, map, pluck } from 'rxjs/operators';

const loginForm: Field[] = [
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Username',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

const registerForm: Field[] = [
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'Username',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

const configMap: Record<'login' | 'register', Field[]> = {
  login: loginForm,
  register: registerForm,
};

export const FORM_CONFIG = new InjectionToken<Observable<Field[]>>(
  'Form configuration based on current view'
);

export const FORM_PROVIDER: Provider[] = [
  {
    provide: FORM_CONFIG,
    deps: [ActivatedRoute],
    useFactory: formFactory
  },
];

export function formFactory({ data }: ActivatedRoute): Observable<Field[]> {
  return data.pipe(
    first(),
    pluck('key'),
    map((key: 'login' | 'register') => configMap[key]),
  );
}
