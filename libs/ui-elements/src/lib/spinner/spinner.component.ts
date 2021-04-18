import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'dev-together-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @HostBinding('style.--fillColor')
  @Input()
  color: string;

  @Input()
  width: string = '5em';

  @Input()
  height: string = '5em';

  @Input()
  thickness: string = '5px';

  @Input()
  position: string = 'center';

  constructor() {}
}
