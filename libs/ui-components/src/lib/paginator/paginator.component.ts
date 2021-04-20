import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-together-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  @Input() startingPage: number = 1;
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() displayedPages: number = 6;

  @Output() pageSelect: EventEmitter<number> = new EventEmitter();

  private savedStartingPage: number = 1;
  private endNumber: number = 1;
  private lastPageRevealed: boolean = false;

  constructor() {}

  ngOnInit() {
    this.savedStartingPage = this.startingPage;
  }

  selectPage(pageNo: number): void {
    if (pageNo === this.currentPage) {
      return;
    }

    const oldPage = this.currentPage;
    this.currentPage = pageNo;

    if (this.currentPage === this.totalPages) {
      this.lastPageRevealed = true;
    }

    if (
      this.lastPageRevealed &&
      this.endNumber === this.currentPage &&
      this.endNumber !== this.totalPages
    ) {
      this.lastPageRevealed = false;
    }

    if (
      this.currentPage >= this.displayedPages &&
      this.totalPages !== this.currentPage &&
      this.currentPage > oldPage &&
      !this.lastPageRevealed
    ) {
      this.startingPage++;
      this.endNumber = this.startingPage + this.displayedPages - 1;
    }

    if (
      this.currentPage <= this.startingPage &&
      this.savedStartingPage !== this.startingPage
    ) {
      this.startingPage--;
      this.endNumber = this.startingPage + this.displayedPages - 1;
    }

    this.pageSelect.emit(this.currentPage);
  }

  prev(): void {
    this.currentPage > this.startingPage &&
      this.selectPage(Math.max(this.startingPage, this.currentPage - 1));
  }

  next(): void {
    this.totalPages > this.currentPage &&
      this.selectPage(Math.min(this.totalPages, this.currentPage + 1));
  }
}
