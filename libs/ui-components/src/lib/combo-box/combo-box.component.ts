import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl
} from '@angular/forms';
import { limit, Mapper, Pure } from '@dev-together/shared';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ComboBoxDirective } from './combo-box.directive';

@Component({
  selector: 'dev-together-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboBoxComponent implements OnInit, ControlValueAccessor {
  @Input()
  items: readonly string[] = [];

  @Input()
  unselect$: Subject<any>;

  @Output()
  update: EventEmitter<string> = new EventEmitter();

  @ContentChild(ComboBoxDirective, { read: ElementRef })
  field: ElementRef;

  @HostListener('keydown.arrowDown', ['1'])
  @HostListener('keydown.arrowUp', ['-1'])
  onArrow(step: number) {
    this.index = this.isOpen
      ? limit(this.calculatedIndex + step, this.filteredItems.length - 1)
      : 0;
  }

  @HostListener('keydown.enter')
  onEnter() {
    this.isOpen &&
      this.filteredItems[this.calculatedIndex] &&
      this.selectItem(this.filteredItems[this.calculatedIndex]);
  }

  @HostListener('focusin')
  onFocus() {
    this.onTouched();
  }

  @HostListener('input')
  onInput() {
    this.index = this.calculatedIndex;
  }

  @HostListener('keydown.esc')
  @HostListener('focusout')
  close() {
    this.index = NaN;
  }

  private onChange: (value: any[]) => void;
  private onTouched: () => void;
  private index = NaN;
  private formValue = null;
  private unsubscribe$: Subject<void>;
  disabled: boolean;

  private get value(): string {
    return String(this.field.nativeElement.value);
  }

  get filteredItems(): readonly string[] {
    const _items = this.items.filter(
      (val) => !(this.formValue || []).includes(val)
    );
    return this.filter(_items, this.value);
  }

  get isOpen(): boolean {
    return !isNaN(this.index);
  }

  private get calculatedIndex(): number {
    return limit(this.index, this.filteredItems.length - 1);
  }

  @Pure
  private filter(items: readonly string[], value: string): readonly string[] {
    return items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
  }

  constructor(@Self() private controlDirective: NgControl) {
    controlDirective.valueAccessor = this;
    this.unsubscribe$ = new Subject();
  }

  ngOnInit() {
    this.controlDirective.control.setValidators([this.validate.bind(this)]);
    this.controlDirective.control.updateValueAndValidity();

    this.unselect$
      .asObservable()
      .pipe(
        tap((item) => {
          this.formValue = this.formValue.filter((v) => v !== item);
          this.onChange(this.formValue);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  writeValue(obj: any[]): void {
    this.formValue = obj;
    this.update.emit(this.formValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate({ value }: FormControl) {
    const isNotValid = !value || (value && !value.length);
    
    return isNotValid && {
      required: true
    }
  }

  private selectItem(value: string) {
    this.formValue = [...this.formValue, value];
    this.onChange(this.formValue);
    this.field.nativeElement.value = '';
    this.close();
  }

  readonly isActive: Mapper<number, boolean> = (index) =>
    this.calculatedIndex === index;

  onClick(item: string) {
    this.selectItem(item);
  }

  onMouseEnter(index: number) {
    this.index = index;
  }

  toggle() {
    this.index = this.isOpen ? NaN : 0;
  }

  noop(event: Event) {
    event.preventDefault();
  }
}
