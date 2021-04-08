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
import { FormsEffects } from './+state/forms.effects';
import { CustomFieldDirective } from './form/custom-field.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(formsFeatureKey, formsReducer, {
      initialState: formsInitialState,
    }),
    EffectsModule.forFeature([FormsEffects])
  ],
  providers: [FormsFacade],
  declarations: [FormComponent, CustomFieldDirective, InputComponent, TextareaComponent],
  entryComponents: [InputComponent, TextareaComponent],
  exports: [FormComponent],
})
export class FormsModule {}
