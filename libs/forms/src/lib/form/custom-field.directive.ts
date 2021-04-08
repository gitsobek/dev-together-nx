import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldType } from '../+state/forms.models';
import { InputComponent } from '../fields/input/input.component';
import { TextareaComponent } from '../fields/textarea/textarea.component';

const componentStore: Map<FieldType, Type<any>> = new Map<FieldType, Type<any>>()
  .set('INPUT', InputComponent)
  .set('TEXTAREA', TextareaComponent);

@Directive({
  selector: '[appCustomField]',
})
export class CustomFieldDirective {
  @Input() field: Field;
  @Input() group: FormGroup;
  component: ComponentRef<any>;

  constructor(
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!componentStore.has(this.field.type)) {
        throw new ReferenceError('No component found for type ' + this.field?.type?.toLowerCase())
    }

    const component = componentStore.get(this.field.type);
    const componentRef = this.resolver.resolveComponentFactory<any>(
      component
    );
    this.component = this.container.createComponent(componentRef);
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }
}
