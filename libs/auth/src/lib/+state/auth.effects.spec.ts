import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StoreModule, Action } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { FormsFacade } from '@dev-together/forms';
import { AuthService } from '../shared/auth.service';
import { LocalStorageService, StorageService } from '../shared/storage.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from '@nrwl/angular/testing';
import { cold } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { User } from './auth.models';
import * as AuthActions from './auth.actions';
import * as FormsActions from '@dev-together/forms';
import { AuthFacade } from './auth.facade';
import { Auth } from '../shared/auth.abstract';
import { ApiService } from '@dev-together/api';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
  let service: Auth;
  let formsFacade: FormsFacade;
  let router: Router;
  let storage: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        ApiService,
        {
          provide: Auth,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            user: jest.fn(),
          },
        },
        {
          provide: AuthFacade,
          useValue: {
            status$: cold('a', { a: false }),
            toggleStatus: jest.fn(),
          },
        },
        {
          provide: FormsFacade,
          useValue: {
            data$: cold('a', { a: {} }),
            isValid$: cold('a', { a: true }),
            submitForm: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: jest.fn(),
          },
        },
        {
          provide: StorageService,
          useClass: LocalStorageService,
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(Auth);
    formsFacade = TestBed.inject(FormsFacade);
    router = TestBed.inject(Router);
    storage = TestBed.inject(StorageService);

    spyOn(storage, 'setItem').and.callThrough();
    spyOn(storage, 'removeItem').and.callThrough();
    spyOn(router, 'navigateByUrl').and.callThrough();
  });

  describe('getUser$', () => {
    it('should dispatch a GetUserSuccess action when service call succeeds', () => {
      const result: User = {
        email: 'test@test.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };

      const getUserAction = AuthActions.getUser();
      const getUserSuccessAction = AuthActions.getUserSuccess({ user: result });

      actions$ = hot('-a---', { a: getUserAction });
      const response = cold('-a|', { a: { user: result } });
      const expected = cold('--b', { b: getUserSuccessAction });

      service.user = jest.fn(() => response);

      expect(effects.getUser$).toBeObservable(expected);
    });

    it('should dispatch a GetUserError when service call fails', () => {
      const result = {
        code: 403,
        message: 'Invalid token.',
      };
      const getUserAction = AuthActions.getUser();
      const getUserErrorAction = AuthActions.getUserError({ error: result });

      actions$ = hot('-a---', { a: getUserAction });
      const response = cold('-#', null, result);
      const expected = cold('--b', { b: getUserErrorAction });

      service.user = jest.fn(() => response);

      expect(effects.getUser$).toBeObservable(expected);
    });
  });

  describe('login$', () => {
    it('should dispatch a LoginSuccess action with user information when login succeeds', () => {
      const result: User = {
        email: 'test@test.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };

      const loginAction = AuthActions.login();
      const loginSuccessAction = AuthActions.loginSuccess({ user: result });

      actions$ = hot('-a---', { a: loginAction });
      const response = cold('-a|', { a: { user: result } });
      const expected = cold('--b', { b: loginSuccessAction });

      service.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should dispatch a SetErrors & ToggleStatus actions if the login service throws', () => {
      const result = {
        error: {
          errors: { email: ['is invalid'] },
        },
      };
      const loginAction = AuthActions.login();
      const setErrors = FormsActions.setErrors({ errors: result.error.errors });
      const toggleStatus = AuthActions.toggleStatus();

      actions$ = hot('-a---', { a: loginAction });
      const response = cold('-#', null, result);
      const expected = cold('--(bc)', { b: setErrors, c: toggleStatus });

      service.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('register$', () => {
    it('should dispatch a RegisterSuccess action with user information when registration succeeds', () => {
      const result: User = {
        email: 'test@test.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };

      const registerAction = AuthActions.register();
      const registerSuccessAction = AuthActions.registerSuccess({
        user: result,
      });

      actions$ = hot('-a---', { a: registerAction });
      const response = cold('-a|', { a: { user: result } });
      const expected = cold('--b', { b: registerSuccessAction });

      service.register = jest.fn(() => response);

      expect(effects.register$).toBeObservable(expected);
    });

    it('should dispatch a SetErrors & ToggleStatus actions if the register service throws', () => {
      const result = {
        error: {
          errors: { email: ['already exists'] },
        },
      };
      const registerAction = AuthActions.register();
      const setErrors = FormsActions.setErrors({ errors: result.error.errors });
      const toggleStatus = AuthActions.toggleStatus();

      actions$ = hot('-a---', { a: registerAction });
      const response = cold('-#', null, result);
      const expected = cold('--(bc)', { b: setErrors, c: toggleStatus });

      service.register = jest.fn(() => response);

      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should dispatch a RouterNavigation action when login succeeds and save token in storage', (done: any) => {
      const result: User = {
        email: 'test@test.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };

      const loginSuccessAction = AuthActions.loginSuccess({ user: result });
      actions$ = of(loginSuccessAction);

      effects.loginSuccess$.subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        const token = storage.getItem('token');
        expect(token).toBe(result.token);
        done();
      });
    });
  });

  describe('registerSuccess$', () => {
    it('should dispatch a RouterNavigation action when register succeeds', (done: any) => {
      const result: User = {
        email: 'test@test.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };

      const registerSuccessAction = AuthActions.registerSuccess({
        user: result,
      });
      actions$ = of(registerSuccessAction);

      effects.registerSuccess$.subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
        done();
      });
    });
  });

  describe('logout$', () => {
    it('should dispatch a RouterNavigation action when user logouts and remove token from storage', (done: any) => {
      const logoutAction = AuthActions.logout();
      actions$ = of(logoutAction);

      effects.logout$.subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        const token = storage.getItem('token');
        expect(token).toBeNull();
        done();
      });
    });
  });
});
