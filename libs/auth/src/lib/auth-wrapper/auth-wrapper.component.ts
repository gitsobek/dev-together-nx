import { ChangeDetectionStrategy, Component, ContentChild, Inject, ViewEncapsulation } from '@angular/core';
import { Field, FormsFacade } from '@dev-together/forms';
import { Observable } from 'rxjs';
import { FORM_CONFIG, FORM_PROVIDER } from '../shared/auth.provider';

@Component({
  selector: 'dev-together-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
  providers: [FORM_PROVIDER],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthWrapperComponent {
  data$: Observable<any>;
  form$: Observable<Field[]>;

  formConfig$: Observable<Field[]>;

  constructor(
    private formsFacade: FormsFacade,
    @Inject(FORM_CONFIG) readonly _formConfig$: Observable<Field[]>,
    ) {
    this.formConfig$ = _formConfig$;
   }

  ngOnInit(): void {
    this.formConfig$.subscribe((form: Field[]) => {
      this.formsFacade.setForm(form);
      this.data$ = this.formsFacade.data$;
      this.form$ = this.formsFacade.form$;
    })
  }

  ngOnDestroy(): void {
    this.formsFacade.initializeForm();
  }

  onFormUpdate(changes: any) {
    this.formsFacade.updateData(changes);
  }
}