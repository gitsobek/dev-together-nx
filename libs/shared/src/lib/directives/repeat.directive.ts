import {
  Directive,
  Inject,
  Input,
  SimpleChange,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgChanges } from '../models';

const MAX_VALUE = 0x10000;

export class RepeatContext {
  constructor(
    readonly $implicit: number,
    readonly first: boolean,
    readonly last: boolean
  ) {}
}

@Directive({
  selector: '[repeat][repeatOf]',
})
export class RepeatDirective {
  @Input('repeatOf')
  count: number = 0;

  @Input('repeatStartingNumber')
  startingNumber: number = 0;

  private safeCount: number;
  private ctrLength: number;

  constructor(
    @Inject(ViewContainerRef) private readonly viewContainer: ViewContainerRef,
    @Inject(TemplateRef)
    private readonly templateRef: TemplateRef<RepeatContext>
  ) {}

  ngOnInit() {
    this.renderElements();
  }

  ngOnChanges(changes: NgChanges<RepeatDirective>) {
    !changes.startingNumber.firstChange && this.renderElements(true);
  }

  private renderElements(clear = false) {
    if (clear) {
      this.removeContainers(this.safeCount);
    }

    this.safeCount = Math.floor(Math.max(0, Math.min(this.count, MAX_VALUE)));
    const { length } = this.viewContainer;
    this.ctrLength = length;

    if (this.safeCount < length) {
      this.removeContainers(length - this.safeCount);
    } else {
      this.addContainers(length, this.safeCount);
    }
  }

  private addContainers(length: number, count: number) {
    for (let i = length; i < count; i++) {
      this.viewContainer.createEmbeddedView<RepeatContext>(
        this.templateRef,
        new RepeatContext(i + this.startingNumber, i === 0, i === count - 1)
      );
    }
  }

  private removeContainers(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.viewContainer.remove();
    }
  }
}
