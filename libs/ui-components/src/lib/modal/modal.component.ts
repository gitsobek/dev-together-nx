import { Component, Inject } from '@angular/core';
import { DestroyService } from '@dev-together/shared';
import { ModalService } from './modal.service';

@Component({
  selector: 'dev-together-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [DestroyService],
})
export class ModalComponent {
  constructor(@Inject(ModalService) readonly modalService: ModalService) {}
}
