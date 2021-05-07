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
import { FormsFacade } from '../+state/forms.facade';
import { Field } from '../+state/forms.models';

const VALIDATORS: Record<string, string> = {
  required: 'is required',
  email: 'has wrong format',
  minlength: 'needs to have min. $num characters',
};

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

  constructor(private fb: FormBuilder, private formsFacade: FormsFacade) {
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
        (f$) => combineLatest([f$, this.data$]),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(([form, data]: [FormGroup, any]) => {
        const errors = (<any>Object).fromEntries(
          Object.entries(form.controls)
            .map(([key, _]) => [
              key,
              Object.keys(form.controls[key].errors || {}).map((v) => {
                const text = VALIDATORS[v];
                if (text.includes('$num')) {
                  return text.replace(
                    '$num',
                    form.controls[key]?.errors[v]?.requiredLength || 3
                  );
                }
                return text;
              }),
            ])
            .filter(([, v]) => v.length)
        );

        this.formsFacade.setErrors(errors);
        this.formsFacade.validateForm(form.valid);

        !!data ? form.patchValue(data, { emitEvent: false }) : form.reset();
      });
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
