import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appNotLoggedIn]',
})
export class NotLoggedInDirective {
  constructor(readonly tpl: TemplateRef<any>) {}
}
