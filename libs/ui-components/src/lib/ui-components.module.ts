import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TabSwitchComponent } from './tab-switch/tab-switch.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RepeatDirective } from '@dev-together/shared';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SnackbarComponent,
    TabSwitchComponent,
    PaginatorComponent,
    RepeatDirective
  ],
  exports: [
    SnackbarComponent,
    TabSwitchComponent,
    PaginatorComponent
  ]
})
export class UiComponentsModule {}
