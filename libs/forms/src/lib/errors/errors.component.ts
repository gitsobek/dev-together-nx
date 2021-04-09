import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormsFacade } from '../+state/forms.facade';

@Component({
  selector: 'dev-together-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent implements OnInit, OnDestroy {
  errors: string[];
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private formsFacade: FormsFacade,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    combineLatest([this.formsFacade.submitted$, this.formsFacade.errors$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([submitted, e]) => {
        if (submitted) {
          this.errors = Object.keys(e || {}).map(
            (key) => `${key} ${e[key].join(', ')}`
          );
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.formsFacade.initializeErrors();
  }
}
