import { Component, ElementRef, Inject, Input } from '@angular/core';
import { fromEvent, Observer, timer } from 'rxjs';
import { repeatWhen, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'dev-together-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  @Input()
  observer: Observer<boolean>;

  readonly mouseenter$ = fromEvent(this.elementRef.nativeElement, 'mouseenter');
  readonly mouseleave$ = fromEvent(this.elementRef.nativeElement, 'mouseleave');
  readonly close$ = timer(3000).pipe(
    takeUntil(this.mouseenter$),
    repeatWhen(() => this.mouseleave$),
    tap(this.close.bind(this))
  );

  get container(): HTMLElement {
    return this.elementRef.nativeElement.querySelector('aside') as HTMLElement;
  }

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  close(): void {
    this.container.style.animation = 'hide 0.3s';
  }

  onAnimationDone(event: AnimationEvent): void {
    event.animationName === 'hide' && this.observer.complete();
  }
}
