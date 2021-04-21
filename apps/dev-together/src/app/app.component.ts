import { Component, OnInit } from '@angular/core';
import { AuthFacade, StorageService, User } from '@dev-together/auth';
import { MatchMediaService } from '@dev-together/shared';
import { SnackbarService } from '@dev-together/ui-components';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'dev-together-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
  buttonsHide$: Observable<boolean>;

  constructor(
    private authFacade: AuthFacade,
    private storageService: StorageService,
    readonly snackbarService: SnackbarService,
    private matchMediaService: MatchMediaService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.authFacade.user$;
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;

    this.buttonsHide$ = this.matchMediaService.matches('(max-width: 600px)');

    of(this.storageService.getItem('token'))
      .pipe(
        filter((v) => !!v),
        tap(() => this.authFacade.user())
      )
      .subscribe();
  }
}
