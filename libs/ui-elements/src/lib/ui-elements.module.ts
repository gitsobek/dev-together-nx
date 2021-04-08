import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonRetroComponent } from './button-retro/button-retro.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonRetroComponent
  ],
  exports: [
    ButtonRetroComponent
  ],
})
export class UiElementsModule {}
