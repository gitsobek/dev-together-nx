import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  let comp: SnackbarComponent;
  let compFixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    compFixture = TestBed.createComponent(SnackbarComponent);
    comp = compFixture.componentInstance;

    spyOn(comp, 'close');
  });

  it('should close the notification after 3 seconds', fakeAsync(() => {
    compFixture.detectChanges();
    expect(comp.close).toHaveBeenCalledTimes(0);

    tick(3000);

    expect(comp.close).toHaveBeenCalledTimes(1);
  }));

  it('should close the notification on button click', () => {
    compFixture.detectChanges();

    const notification: DebugElement = compFixture.debugElement;
    const button: HTMLElement = notification.query(By.css('button'))
      .nativeElement;

    button.click();
    compFixture.detectChanges();

    expect(comp.close).toHaveBeenCalled();
  });

  it('should not close on mouseenter and close after mouseleave', fakeAsync(() => {
    compFixture.detectChanges();
    expect(comp.close).toHaveBeenCalledTimes(0);

    tick(2000);

    const notification: HTMLElement = compFixture.debugElement.nativeElement;
    notification.dispatchEvent(new MouseEvent('mouseenter'));
    compFixture.detectChanges();

    tick(5000);
    expect(comp.close).toHaveBeenCalledTimes(0);

    notification.dispatchEvent(new MouseEvent('mouseleave'));
    expect(comp.close).toHaveBeenCalledTimes(0);

    tick(3000);
    expect(comp.close).toHaveBeenCalledTimes(1);
  }));
});
