import { Directive, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAccessControl]',
  exportAs: 'appAccessControl',
})
export class AccessControlDirective {
  constructor(@Self() private ngControl: NgControl) {}

  get value() {
    return this.ngControl.value;
  }

  get valueChanges() {
    return this.ngControl.valueChanges;
  }
}
