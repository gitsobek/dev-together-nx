import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RepeatDirective } from '@dev-together/shared';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent, RepeatDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.currentPage = 1;
    component.totalPages = 24;

    fixture.detectChanges();
  });

  it('should display six pages', () => {
    const paginator: DebugElement = fixture.debugElement;
    const items: DebugElement[] = paginator.queryAll(
      By.css('li:not(:first-child):not(:last-child)')
    );

    expect(items.length).toEqual(6);
  });

  it('should set a correct page after hitting next multiple times and emit a value', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.currentPage).toEqual(component.startingPage);

    for (let i = 0; i < 3; i++) {
      component.next();
    }

    fixture.detectChanges();
    expect(component.currentPage).toEqual(4);
    expect(component.pageSelect.subscribe(page => expect(page).toEqual(4)));
  });
});
