import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

interface Notification<I> {
  content: I;
  observer: Observer<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService extends BehaviorSubject<
  readonly Notification<any>[]
> {
  constructor() {
    super([]);
  }

  show<I>(content: I): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const notification = {
        content,
        observer,
      };

      this.next([...this.value, notification]);
      observer.next(true);

      return () => { this.next(this.value.filter((v) => v !== notification)) };
    });
  }
}
