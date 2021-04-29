import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { LocalStorageService, StorageService } from '../shared/storage.service';
import { AuthGuardService } from './auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-comp',
  template: '',
})
class TestComponent {}

describe('AuthGuardService', () => {
  let storage: StorageService;
  let guard: AuthGuardService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: TestComponent,
          },
        ]),
      ],
      providers: [
        {
          provide: StorageService,
          useClass: LocalStorageService,
        },
        AuthGuardService,
      ],
    });
    storage = TestBed.inject(StorageService);
    guard = TestBed.inject(AuthGuardService);
    router = TestBed.inject(Router);
  });

  it('should return false if the user state is not logged in', () => {
    const navigateSpy = spyOn(router, 'navigate');
    expect(guard.canActivate()).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should return true if the user state is logged in', () => {
    storage.setItem('token', 'abc');

    expect(guard.canActivate()).toBe(true);
  });
});
