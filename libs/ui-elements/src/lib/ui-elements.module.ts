import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonRetroComponent } from './button-retro/button-retro.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonRetroComponent,
    SpinnerComponent
  ],
  exports: [
    ButtonRetroComponent,
    SpinnerComponent
  ],
})
export class UiElementsModule {}
