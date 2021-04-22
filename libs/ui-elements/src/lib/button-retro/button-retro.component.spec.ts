import { ButtonRetroComponent } from './button-retro.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ButtonRetroComponent', () => {
  let comp: ButtonRetroComponent;
  let spinner: SpinnerComponent;

  let compFixture: ComponentFixture<ButtonRetroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonRetroComponent, SpinnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    compFixture = TestBed.createComponent(ButtonRetroComponent);
    comp = compFixture.componentInstance;
    compFixture.detectChanges();
  });

  it('should render with no spinner', () => {
    expect(comp.isLoading).toBe(false);
  });

  it('should find a specified text inside the button', () => {
    comp.text = 'Login';
    compFixture.detectChanges();
    const button: DebugElement = compFixture.debugElement;
    const label: HTMLElement = button.query(By.css('.label')).nativeElement;
    expect(label.textContent).toEqual('Login');
  });

  it('should display spinner inside the button when loading is set to true', () => {
    comp.isLoading = true;
    compFixture.detectChanges();
    const button: DebugElement = compFixture.debugElement;
    let spinner: HTMLElement = button.query(By.css('dev-together-spinner'))
      .nativeElement;
    expect(spinner).toBeDefined();

    const bottomDiv: HTMLElement = button.query(By.css('div:first-child'))
      .nativeElement;
    expect(Array.from(bottomDiv.classList)).toContain('is-loading');

    comp.isLoading = false;
    compFixture.detectChanges();
    expect(button.query(By.css('dev-together-spinner'))).toBeFalsy();
  });
});
