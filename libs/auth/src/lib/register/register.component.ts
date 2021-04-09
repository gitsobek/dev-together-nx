import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'dev-together-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @HostBinding('class.auth-content') authStyling: boolean = true;

  constructor(private authFacade: AuthFacade) {}

  submit(): void {
    this.authFacade.register();
  }
}
