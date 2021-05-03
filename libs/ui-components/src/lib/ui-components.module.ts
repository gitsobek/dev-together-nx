import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TabSwitchComponent } from './tab-switch/tab-switch.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RepeatDirective } from '@dev-together/shared';
import { ModalComponent } from './modal/modal.component';
import { UiElementsModule } from '@dev-together/ui-elements';
import { ModalCloseDirective } from './modal/modal-close.directive';
import { EditableComponent } from './editable/editable.component';
import { ViewModeDirective } from './editable/view-mode.directive';
import { EditModeDirective } from './editable/edit-mode.directive';
import { EditOnEnterDirective } from './editable/edit-on-enter.directive';

@NgModule({
  imports: [CommonModule, UiElementsModule],
  declarations: [
    SnackbarComponent,
    TabSwitchComponent,
    PaginatorComponent,
    RepeatDirective,
    ModalComponent,
    ModalCloseDirective,
    EditableComponent,
    EditOnEnterDirective,
    ViewModeDirective,
    EditModeDirective
  ],
  exports: [
    SnackbarComponent,
    TabSwitchComponent,
    PaginatorComponent,
    ModalComponent,
    EditableComponent,
    EditOnEnterDirective,
    ViewModeDirective,
    EditModeDirective
  ],
})
export class UiComponentsModule {}
