import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalConfig } from '../ui-components.models';
import { ModalCloseDirective } from './modal-close.directive';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let service: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent, ModalCloseDirective],
      providers: [ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    service = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should show modal on invoking service method and emit true value on clicking 'Yes' button", (done) => {
    const mockConfig: ModalConfig = {
      content: 'Hi',
      showButtons: true,
    };

    const modal: DebugElement = fixture.debugElement;
    const content: DebugElement = modal.query(By.css('.modal'));
    expect(content).toBeFalsy();

    const close$$ = service.open(mockConfig);
    close$$.subscribe((v) => {
      expect(v).toBe(true)
      done();
    });

    fixture.detectChanges();

    const yesBtn: HTMLElement = modal.query(
      By.css('.buttons > button:first-child')
    ).nativeElement;

    yesBtn.click();
    fixture.detectChanges();
  });

  it("should show modal on invoking service method and emit false value on clicking 'No' button", (done) => {
    const mockConfig: ModalConfig = {
      content: 'Hi',
      showButtons: true,
    };

    const modal: DebugElement = fixture.debugElement;
    const content: DebugElement = modal.query(By.css('.modal'));
    expect(content).toBeFalsy();

    const close$$ = service.open(mockConfig);

    close$$.subscribe((v) => {
      expect(v).toBe(false);
      done();
    });

    fixture.detectChanges();

    const noBtn: HTMLElement = modal.query(
      By.css('.buttons > button:last-child')
    ).nativeElement;

    noBtn.click();
    fixture.detectChanges();
  });

  it("should show modal on invoking service method and emit null value on clicking 'Escape' key", (done) => {
    const mockConfig: ModalConfig = {
      content: 'Hi',
    };

    const modal: DebugElement = fixture.debugElement;
    let content: DebugElement = modal.query(By.css('.modal'));
    expect(content).toBeFalsy();

    const close$$ = service.open(mockConfig);
    fixture.detectChanges();

    close$$.subscribe((v) => {
      expect(v).toBe(null);
      done();
    });

    document.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Escape"
    }));

    fixture.detectChanges();
  });
});
