import { Inject, Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, share, startWith } from 'rxjs/operators';
import { WINDOW } from '../providers/window.provider';

@Injectable()
export class MatchMediaService {
  windowRef: Window;
  constructor(@Inject(WINDOW) _windowRef: Window) {
    this.windowRef = _windowRef;
  }

  matches(query: string): Observable<boolean> {
    const media = this.windowRef.matchMedia(query);

    return fromEvent(media, 'change').pipe(
      startWith(() => media.matches),
      map(() => media.matches),
      share()
    );
  }
}
