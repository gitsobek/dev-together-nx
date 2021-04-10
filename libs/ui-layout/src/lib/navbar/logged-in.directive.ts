import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLoggedIn]',
})
export class LoggedInDirective {
  constructor(readonly tpl: TemplateRef<any>) {}
}
