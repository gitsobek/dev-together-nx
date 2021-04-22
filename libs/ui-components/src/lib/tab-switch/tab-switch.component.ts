import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ListType } from '@dev-together/blog';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs/operators';
import { TabSwitchConfig } from '../ui-components.models';

@Component({
  selector: 'dev-together-tab-switch',
  templateUrl: './tab-switch.component.html',
  styleUrls: ['./tab-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabSwitchComponent implements OnDestroy, AfterViewInit {
  @ViewChild('target') target: ElementRef;

  @Input() set config(value: TabSwitchConfig[]) {
    this.tabConfig = value;
  }

  @Output() setType: EventEmitter<ListType> = new EventEmitter();
  unsubscribe$: Subject<void>;

  documentRef: Document;
  tabConfig: TabSwitchConfig[] = [];

  constructor(
    @Inject(DOCUMENT) _documentRef: Document,
    private renderer: Renderer2
  ) {
    this.unsubscribe$ = new Subject();
    this.documentRef = _documentRef;
  }

  ngAfterViewInit() {
    fromEvent(this.documentRef, 'click')
    .pipe(
      debounceTime(0),
      map((el: MouseEvent) =>
        this.target.nativeElement.contains(el.target) ? el.target : null
      ),
      filter((v) => !!v && !(v as HTMLElement).classList.contains('active')),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    )
    .subscribe((ref: HTMLElement) => {
      if (this.target.nativeElement.classList.contains('left')) {
        this.renderer.removeClass(this.target.nativeElement, 'left');
        this.renderer.addClass(this.target.nativeElement, 'right');
      } else {
        this.renderer.removeClass(this.target.nativeElement, 'right');
        this.renderer.addClass(this.target.nativeElement, 'left');
      }

      const toRemove = Array.from(
        this.target.nativeElement.childNodes
      ).find((c: HTMLElement) => c.classList.contains('active'));
      this.renderer.removeClass(toRemove, 'active');
      this.renderer.addClass(ref, 'active');

      this.setType.emit(ref.getAttribute('type') as ListType);
    });
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
