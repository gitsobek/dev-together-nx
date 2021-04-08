import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { Field } from '../+state/forms.models';

@Component({
  selector: 'dev-together-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<any>;
  @Input() form$: Observable<Field[]>;
  @Input() touchedForm$: Observable<boolean>;
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
  unsubscribe$: Subject<void>;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.form$
      .pipe(
        map((form: Field[]) => {
          const group = this.fb.group({});
          form.forEach((field) =>
            group.addControl(field.name, this.control(field))
          );
          return group;
        }),
        tap((f: FormGroup) => (this.form = f)),
        tap((f: FormGroup) => this.listenFormChanges(f)),
        (f$) => combineLatest([f$, this.data$])
      )
      .subscribe(
        ([form, data]: [FormGroup, any]) =>
          !!data && form.patchValue(data, { emitEvent: false })
      );
  }

  control = (field: Field): FormControl =>
    this.fb.control(field.defaultValue || '', field.validator);

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  listenFormChanges(form: FormGroup): void {
    form.valueChanges
      .pipe(debounceTime(50), takeUntil(this.unsubscribe$))
      .subscribe((changes: any) => this.updateForm.emit(changes));
  }
}
