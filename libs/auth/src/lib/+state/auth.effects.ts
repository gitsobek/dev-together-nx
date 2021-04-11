import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '@dev-together/api';
import { FormsFacade } from '@dev-together/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from, Observable, of, pipe } from 'rxjs';
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
import { SnackbarService } from '@dev-together/ui-components';

import * as fromForms from '@dev-together/forms';
import * as AuthActions from './auth.actions';
import { Auth } from '../shared/auth.abstract';
import { AuthFacade } from './auth.facade';

@Injectable()
export class AuthEffects {
  loginOrRegisterValidation = <T>() => (source: Observable<T>) =>
    source.pipe(
      tap(() => this.formsFacade.submitForm()),
      withLatestFrom(this.formsFacade.isValid$),
      filter(([_, valid]) => !!valid),
      withLatestFrom(this.authFacade.status$),
      filter(([, status]) => !status),
      tap(() => this.authFacade.toggleStatus())
    );

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
      this.loginOrRegisterValidation(),
      withLatestFrom(this.formsFacade.data$),
      exhaustMap(([_, data]) =>
        this.authService.login(data).pipe(
          switchMap((data: UserResponse) =>
            this.snackbarService.show(data.message).pipe(map(() => data))
          ),
          map((response: UserResponse) =>
            AuthActions.loginSuccess({ user: response.user })
          ),
          catchError((err: HttpErrorResponse) =>
            from([
              fromForms.setErrors({ errors: err.error.errors }),
              AuthActions.toggleStatus(),
            ])
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      this.loginOrRegisterValidation(),
      withLatestFrom(this.formsFacade.data$),
      exhaustMap(([_, data]) =>
        this.authService.register(data).pipe(
          switchMap((data: UserResponse) =>
            this.snackbarService.show(data.message).pipe(map(() => data))
          ),
          map((response: UserResponse) =>
            AuthActions.registerSuccess({ user: response.user })
          ),
          catchError((err: HttpErrorResponse) =>
            from([
              fromForms.setErrors({ errors: err.error.errors }),
              AuthActions.toggleStatus(),
            ])
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
    private snackbarService: SnackbarService,
    private storageService: StorageService,
    private formsFacade: FormsFacade,
    private authFacade: AuthFacade,
    private authService: Auth,
    private router: Router
  ) {}
}
