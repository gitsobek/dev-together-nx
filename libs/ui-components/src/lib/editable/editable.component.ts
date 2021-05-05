import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take, takeUntil } from 'rxjs/operators';
import { EditModeDirective } from './edit-mode.directive';
import { ViewModeDirective } from './view-mode.directive';

@Component({
  selector: 'dev-together-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableComponent implements OnInit {
  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;
  @Input() disabled: boolean = false;
  @Output() update = new EventEmitter();

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';
  unsubscribe$: Subject<void>;

  constructor(private host: ElementRef, private cdr: ChangeDetectorRef) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick')
      .pipe(
        filter(() => !this.disabled),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);
        this.cdr.markForCheck();
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => !this.element.contains(target)),
      take(1)
    );

    this.editMode$
      .pipe(switchMapTo(clickOutside$), takeUntil(this.unsubscribe$))
      .subscribe((_) => this.toViewMode());
  }
}
