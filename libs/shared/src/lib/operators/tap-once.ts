import { Observable, defer } from 'rxjs';
import { tap } from 'rxjs/operators';

export function tapOnce<T>(fn: (v: T) => any) {
  return (source$: Observable<T>) =>
    defer(() => {
      let isFirst = true;

      return source$.pipe(
        tap((v) => {
          if (isFirst) {
            fn(v);
            isFirst = false;
          }
        })
      );
    });
}
