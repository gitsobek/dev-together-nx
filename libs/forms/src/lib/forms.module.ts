import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { InputComponent } from './fields/input/input.component';
import { TextareaComponent } from './fields/textarea/textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsFacade } from './+state/forms.facade';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  formsFeatureKey,
  formsReducer,
  formsInitialState,
} from './+state/forms.reducer';
import { CustomFieldDirective } from './form/custom-field.directive';
import { ErrorsComponent } from './errors/errors.component';
import { DropDownInputComponent } from './fields/drop-down-input/drop-down-input.component';
import { UiComponentsModule } from '@dev-together/ui-components';
import { AccessControlDirective } from '@dev-together/shared';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiComponentsModule,
    StoreModule.forFeature(formsFeatureKey, formsReducer, {
      initialState: formsInitialState,
    }),
    EffectsModule.forFeature([]),
  ],
  providers: [FormsFacade],
  declarations: [
    FormComponent,
    CustomFieldDirective,
    AccessControlDirective,
    InputComponent,
    TextareaComponent,
    ErrorsComponent,
    DropDownInputComponent,
  ],
  entryComponents: [InputComponent, TextareaComponent, DropDownInputComponent],
  exports: [FormComponent, ErrorsComponent],
})
export class FormsModule {}
