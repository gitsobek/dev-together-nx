import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TabSwitchComponent } from './tab-switch/tab-switch.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RepeatDirective } from '@dev-together/shared';
import { ModalComponent } from './modal/modal.component';
import { UiElementsModule } from '@dev-together/ui-elements';
import { ModalCloseDirective } from './modal/modal-close.directive';

@NgModule({
  imports: [CommonModule, UiElementsModule],
  declarations: [
    SnackbarComponent,
    TabSwitchComponent,
    PaginatorComponent,
    RepeatDirective,
    ModalComponent,
    ModalCloseDirective
  ],
  exports: [SnackbarComponent, TabSwitchComponent, PaginatorComponent, ModalComponent],
})
export class UiComponentsModule {}
