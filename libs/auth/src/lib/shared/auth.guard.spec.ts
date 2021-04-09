import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { LocalStorageService, StorageService } from '../shared/storage.service';
import { AuthGuardService } from './auth.guard';

@Component({
  selector: 'app-test-comp',
  template: '',
})
class TestComponent {}

describe('AuthGuardService', () => {
  let storage: StorageService;
  let guard: AuthGuardService;

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
  });

  it('should return false if the user state is not logged in', () => {
    expect(guard.canActivate()).toBe(false);
  });

  it('should return true if the user state is logged in', () => {
    storage.setItem('token', 'abc');

    expect(guard.canActivate()).toBe(true);
  });
});
