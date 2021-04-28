import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalConfig } from '../ui-components.models';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  readonly modal$$: BehaviorSubject<ModalConfig | null> = new BehaviorSubject(
    null
  );
  readonly close$$: Subject<boolean | null> = new Subject();

  constructor() {}

  open(config: ModalConfig): Observable<boolean | null> {
    !this.modal$$.getValue() && this.modal$$.next(config);

    return this.close$$.asObservable().pipe(tap(() => this.modal$$.next(null)));
  }
}
