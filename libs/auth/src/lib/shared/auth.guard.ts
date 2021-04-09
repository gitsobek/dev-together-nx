import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  storage: StorageService;

  constructor(
    @Inject(StorageService) readonly _storage: StorageService,
    private router: Router
  ) {
    this.storage = _storage;
  }

  canActivate(): boolean {
    const token = this.storage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
