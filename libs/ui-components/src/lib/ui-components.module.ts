import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TabSwitchComponent } from './tab-switch/tab-switch.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SnackbarComponent,
    TabSwitchComponent
  ],
  exports: [
    SnackbarComponent,
    TabSwitchComponent
  ]
})
export class UiComponentsModule {}
