import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInDirective } from './logged-in.directive';
import { NotLoggedInDirective } from './not-logged-in.directive';
import { User } from '@dev-together/auth';

interface TemplateContext<T> {
  $implicit: T;
}

@Component({
  selector: 'dev-together-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @ContentChild(LoggedInDirective, { static: true, read: TemplateRef })
  loggedInTpl: TemplateRef<any> | null = null;

  @ContentChild(NotLoggedInDirective, { static: true, read: TemplateRef })
  notLoggedInTpl: TemplateRef<any> | null = null;

  @Input() set user(value: User) {
    this.loggedUser = value;
  }

  @Input() set isLogged(value: boolean) {
    this.isLoggedIn = value;
  }

  get loggedInTplContext(): TemplateContext<User> {
    return { $implicit: this.loggedUser };
  }

  get notLoggedInTplContext(): TemplateContext<null> {
    return { $implicit: null };
  }

  isLoggedIn: boolean;
  loggedUser: User;

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
