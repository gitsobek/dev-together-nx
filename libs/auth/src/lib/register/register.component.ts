import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'dev-together-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @HostBinding('class.auth-content') authStyling: boolean = true;

  readonly status$: Observable<boolean>;

  constructor(private authFacade: AuthFacade) {
    this.status$ = this.authFacade.status$;
  }

  submit(): void {
    this.authFacade.register();
  }
}
