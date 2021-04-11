import { Directive, ElementRef, Inject, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pairwise,
  startWith,
  takeUntil,
} from 'rxjs/operators';
import { WINDOW } from '../providers/window.provider';
import { DestroyService } from '../services/destroy.service';

const THRESHOLD = 200;

@Directive({
  selector: '[sticky]',
  providers: [DestroyService],
})
export class StickyDirective {
  constructor(
    @Inject(WINDOW) windowRef: Window,
    @Inject(DestroyService) destroy$: DestroyService,
    renderer: Renderer2,
    { nativeElement }: ElementRef<HTMLElement>
  ) {
    fromEvent(windowRef, 'scroll')
      .pipe(
        map(() => windowRef.scrollY),
        pairwise(),
        map(([prev, next]) => next < THRESHOLD || prev > next),
        distinctUntilChanged(),
        startWith(true),
        takeUntil(destroy$)
      )
      .subscribe((stuck) =>
        renderer.setAttribute(nativeElement, 'data-stuck', String(stuck))
      );
  }
}
