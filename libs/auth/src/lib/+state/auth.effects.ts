import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '@dev-together/api';
import { FormsFacade } from '@dev-together/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { StorageService } from '../shared/storage.service';

import * as fromForms from '@dev-together/forms';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        this.authService.user().pipe(
          map((data: UserResponse) =>
            AuthActions.getUserSuccess({ user: data.user })
          ),
          catchError((err: HttpErrorResponse) =>
            of(AuthActions.getUserError({ error: err }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(() => this.formsFacade.submitForm()),
      withLatestFrom(this.formsFacade.isValid$),
      filter(([_, status]) => status),
      withLatestFrom(this.formsFacade.data$),
      exhaustMap(([_, data]) =>
        this.authService.login(data).pipe(
          map((data: UserResponse) =>
            AuthActions.loginSuccess({ user: data.user })
          ),
          catchError((response: HttpErrorResponse) =>
            of(fromForms.setErrors({ errors: response.error.errors }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      tap(() => this.formsFacade.submitForm()),
      withLatestFrom(this.formsFacade.isValid$),
      filter(([_, status]) => status),
      withLatestFrom(this.formsFacade.data$),
      exhaustMap(([_, data]) =>
        this.authService.register(data).pipe(
          map((data: UserResponse) =>
            AuthActions.registerSuccess({ user: data.user })
          ),
          catchError((response: HttpErrorResponse) =>
            of(fromForms.setErrors({ errors: response.error.errors }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.storageService.setItem('token', action.user.token);
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.storageService.removeItem('token');
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private storageService: StorageService,
    private formsFacade: FormsFacade,
    private authService: AuthService,
    private router: Router
  ) {}
}
