import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'dev-together-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @HostBinding('class.auth-content') authStyling: boolean = true;

  constructor(private authFacade: AuthFacade) {}

  submit(): void {
    this.authFacade.login();
  }
}
