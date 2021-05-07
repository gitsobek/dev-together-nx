import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '@dev-together/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'dev-together-drop-down-input',
  templateUrl: './drop-down-input.component.html',
  styleUrls: ['./drop-down-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownInputComponent {
  @Input() field: Field;
  @Input() group: FormGroup;

  items: string[] = [];
  unselect$: Subject<any> = new Subject();

  constructor() {}

  trackByFn(index) {
    return index;
  }
}
